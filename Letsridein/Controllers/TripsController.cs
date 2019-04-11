using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Letsridein.Models;
using Letsridein.Models.Enum;

namespace Letsridein.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TripsController : ControllerBase
    {
        #region Variables
        private readonly LetsRideinContext _context;
        #endregion

        #region Constructor
        public TripsController(LetsRideinContext context)
        {
            _context = context;
        }
        #endregion

        #region Public API

        /// <summary>
        /// Create New Trip 
        /// </summary>
        /// <param name="NewTrip">Object of trip</param>
        /// <returns>Trip </returns>
        [HttpPost]
        [Route("CreateNewTrip")]
        public async Task<IActionResult> CreateNewTrip([FromBody]Trip trip)
        {
            try
            {
                trip.Status = (int)TripStatus.Opened;
                trip.IsArrived = false;
                _context.Trip.Add(trip);
                await _context.SaveChangesAsync();
            }
            catch (Exception e)
            {
                throw e;
            }
            return Ok();
        }

        /// <summary>
        /// Update Trip By ID 
        /// </summary>
        /// <param name="OldTrip">Object of trip</param>
        /// <returns>Trip </returns>
        /// 
        [HttpPost]
        [Route("UpdateTripByID")]
        public async Task<IActionResult> UpdateTripByID(int id, Trip OldTrip)
        {
            try
            {
                Trip NewTrip = _context.Trip.Where(trip => trip.Id == OldTrip.Id).FirstOrDefault();
                NewTrip.FromDestination = OldTrip.FromDestination;
                NewTrip.ToDestination = OldTrip.ToDestination;
                NewTrip.StartTime = OldTrip.StartTime;
                NewTrip.ArriveTime = OldTrip.ArriveTime;
                NewTrip.DriverId = OldTrip.DriverId;
                NewTrip.ExpectedArrivalTime = OldTrip.ExpectedArrivalTime;
                NewTrip.Details = OldTrip.Details;
                NewTrip.CarInfo = OldTrip.CarInfo;
                NewTrip.Price = OldTrip.Price;
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TripExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
            return NoContent();
        }

        /// <summary>
        /// Update Trip Status 
        /// </summary>
        /// <param name="TripId">integer variable</param>
        /// <param name="Status">String variable</param>
        [HttpPost]
        [Route("UpdateTripStatus")]
        public async Task<IActionResult> UpdateTripStatus(int TripId, int Status)
        {
            Trip TripObj = _context.Trip.Where(trip => trip.Id == TripId).FirstOrDefault();
            TripObj.Status = Status;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        /// <summary>
        /// Delete trip 
        /// </summary>
        /// <param name="TripId">integer variable</param>
        [HttpPost]
        [Route("WithdrawTrip/{TripId}")]
        public async Task<ActionResult<Trip>> WithdrawTrip(int TripId)
        {
            var trip = await _context.Trip.FindAsync(TripId);
            if (trip == null)
            {
                return NotFound();
            }
            _context.Trip.Remove(trip);
            await _context.SaveChangesAsync();
            return trip;
        }


        /// <summary>
        /// Get All Trips By Driver Id
        /// </summary>
        /// <param name="DriverId">integer variable</param>
        /// <returns>list of trips </returns>
        [HttpGet]
        [Route("GetAllTripsByDriverId/{DriverId}")]
        public async Task<ActionResult<IEnumerable<Trip>>> GetAllTripsByDriverId(int DriverId)
        {
            var trip = await _context.Trip.Where(x => x.DriverId == DriverId).ToListAsync();
            if (trip == null)
            {
                return NotFound();
            }

            return trip;
        }



        [HttpGet]
        [Route("GetTripUserInfo/{UserId}")]
        public ActionResult<User> GetTripUserInfo(int UserId)
        {
            var User = _context.User.FirstOrDefault(x => x.Id == UserId);
            if (User == null)
            {
                return NotFound();
            }

            if(User.CarBrand == null && User.CarColor == null && User.CarModel == null && User.ManufacturingYear == null)
            {
                return BadRequest("You Don't Have Any Request");
            }

            return User;
        }

        /// <summary>
        /// Get Trips Search
        /// </summary>
        /// <param name="Search">FilterTripsResource object</param>
        /// <returns>list of trips </returns>
        [HttpPost]
        [Route("GetTripsSearch")]
        public async Task<ActionResult<TripsPageModel>> GetTripsSearch([FromBody]FilterTripsResource Search , int PageNo = 1, int PageSize = 10)
        {
            var totalItems = _context.Trip.Count();
            var trip = await _context.Trip.Where(x => (string.IsNullOrEmpty(Search.FromDest) || x.FromDestination.Contains(Search.FromDest))
                                                    && (string.IsNullOrEmpty(Search.ToDest) || x.FromDestination.Contains(Search.ToDest))
                                                    && (Search.StartTime == null || x.StartDate >= Search.StartTime)
                                                    && (Search.PriceMin == null || x.Price >= Search.PriceMin)
                                                    && (Search.PriceMax == null || x.Price <= Search.PriceMax))
                                                    .Include(x=>x.Driver)
                                                    .OrderBy(y => y.StartTime).Skip((PageNo - 1) * PageSize).Take(PageSize)
                                                    .ToListAsync();

            if (trip == null)
            {
                return NotFound();
            }

            return new TripsPageModel() {
                Trips = trip ,
                TotalTrips = totalItems
            };
        }

        /// <summary>
        /// Get Trip By Trip Id 
        /// </summary>
        /// <param name="TripId">integer variable</param>
        /// <returns>object of trips </returns>
        [HttpGet]
        [Route("GetTripById/{TripId}")]
        public IActionResult GetTripByTripId(int TripId)
        {
            var trip = _context.Trip.Where(x => x.Id == TripId)
                        .Include(x=>x.Driver)
                        .Include(x=>x.TripRequest)
                        .Include("TripRequest.Passenger")
                        .FirstOrDefault();

            if (trip == null)
            {
                return NotFound();
            }
            else
            {
                return Ok(trip);
            }
        }

        /// <summary>
        /// Check if trip startTime is passed 
        /// </summary>
        /// <param name="TripId">integer variable</param>
        /// <returns>bool </returns> 
        [HttpGet]
        [Route("CheckIfTripPassed")]
        public bool CheckIfTripPassed(int TripId)
        {
            return _context.Trip.Where(trip => trip.Id == TripId && Convert.ToDateTime(trip.StartTime) < DateTime.Now).ToList().Count() > 0 ? true : false;
        }

        /// <summary>
        /// Check if trip startTime is passed 
        /// </summary>
        /// <param name="TripId">integer variable</param>
        /// <returns>bool </returns> 
        [HttpGet]
        [Route("CheckIfTripPassed")]
        public bool CheckIfTripFullBoard(int TripId)
        {
            return _context.Trip.Where(trip => trip.Id == TripId && trip.Status == (int)TripStatus.FullBoard).ToList().Count() > 0 ? true : false;
        }
        private bool TripExists(int id)
        {
            return _context.Trip.Any(e => e.Id == id);
        }
        #endregion

    }
}
