using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Letsridein.Models;
using Letsridein.Models.Enum;
using Letsridein.Models.Notifications;

namespace Letsridein.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TripRequestsController : ControllerBase
    {
        private readonly LetsRideinContext _context;

        public TripRequestsController(LetsRideinContext context)
        {
            _context = context;
        }

        // GET: api/TripRequests
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TripRequest>>> GetTripRequest()
        {
            return await _context.TripRequest.ToListAsync();
        }

        [HttpGet]
        [Route("RemoveRequest/{id}")]
        public IActionResult RemoveRequest(int id)
        {
            var request = _context.TripRequest.FirstOrDefault(x => x.Id == id);
            _context.Remove(request);
            _context.SaveChanges();
            return Ok();
        }
        [HttpGet]
        [Route("ApproveOrRejectRequest/{id}/{Status}")]
        public async Task<ActionResult<TripRequest>> ApproveOrRejectRequest(int id, int Status)
        {
            var tripRequest = await _context.TripRequest.FindAsync(id);
            var trip = await _context.Trip.FindAsync(tripRequest.TripId);
            if (tripRequest == null)
            {
                return NotFound();
            }
            tripRequest.Status = Status;
            string passengerName = _context.User.Find(trip.DriverId).Username;
           
            if (Status == (int) TripRequestStatus.Approved)
            {
                string notificationText = ReplaceNotificationBody(passengerName, NotificationsTemplates.requestAccepted);
                PushNotification(notificationText, tripRequest.TripId, tripRequest.PassengerId);


            }
             if (Status == (int) TripRequestStatus.Reject)
            {
                string notificationText = ReplaceNotificationBody(passengerName, NotificationsTemplates.requestReject);
                PushNotification(notificationText, tripRequest.TripId,tripRequest.PassengerId);

            }

            await _context.SaveChangesAsync();
            return Ok(_context.TripRequest.Where(x=>x.TripId == trip.Id).Include(x=>x.Passenger).ToList());
        }

        private bool TripRequestExists(int id)
        {
            return _context.TripRequest.Any(e => e.Id == id);
        }

        /// <summary>
        /// Get All And Search Trip Request By Passenger Id 
        /// </summary>
        /// <param name="SearchModel">Object of TripRequest</param>
        /// <param name="PageNo">integer variable</param>
        /// <param name="PageSize">integer variable</param>
        [HttpGet]
        [Route("GetAllAndSearchTripRequestByPassengerId")]
        public async Task<ActionResult<IEnumerable<TripRequest>>> GetAllAndSearchTripRequestByPassengerId(TripRequest SearchModel = default(TripRequest), int PageNo = 1, int PageSize = 10)
        {
            return await _context.TripRequest.Include(request => request.Trip).Where(request => request.PassengerId == SearchModel.PassengerId &&
                                            (SearchModel.Status == 0 || request.Status == SearchModel.Status))
                 .OrderByDescending(y => y.Id).Skip((PageNo - 1) * PageSize).Take(PageSize).ToListAsync();
        }


        /// <summary>
        /// New Request 
        /// </summary>
        /// <param name="NewTripRequest">Object of Trip Request</param>
        /// <returns>TripRequest </returns>
        [HttpPost]
        [Route("NewRequest")]
        public async Task<IActionResult> NewRequest([FromBody] TripRequest NewTripRequest,int tripid)
        {
            NewTripRequest.RequestDate = DateTime.Today.Date;
            NewTripRequest.TripId = tripid;
            List<TripRequest> list = _context.TripRequest.Where(request => request.TripId == NewTripRequest.TripId).ToList().ToList();
            Trip TripObj = _context.Trip.Where(trip => trip.Id == NewTripRequest.TripId).FirstOrDefault();
            DateTime tripDate = TripObj.StartDate;
            TimeSpan time = TimeSpan.Parse(TripObj.StartTime);
            tripDate = tripDate + time;
            if (tripDate < DateTime.Now)
            {
                return BadRequest("This trip is expired!");
            }
            else if (list.Where(x => x.PassengerId == NewTripRequest.PassengerId).Count() > 0)
            {
                return BadRequest("Passenger exist in this trip!");
            }
            else if (list.Where(x=>x.Status == (int) TripRequestStatus.Approved).Count() >= TripObj.SeatsNo)
            {
                return BadRequest("Trip is full board!");
            }
            else
            {
                NewTripRequest.Status = (int)TripRequestStatus.New;
                
                await _context.TripRequest.AddAsync(NewTripRequest);
                await _context.SaveChangesAsync();
                string passengerName = _context.User.Find(NewTripRequest.PassengerId).Username;
                string notificationText = ReplaceNotificationBody(passengerName, NotificationsTemplates.newRequest);
                PushNotification(notificationText, NewTripRequest.TripId,NewTripRequest.Trip.DriverId);
            }
            return CreatedAtAction("GetTripRequest", new { id = NewTripRequest.Id }, NewTripRequest);

        }
        // GET: api/TripRequests/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TripRequest>> GetTripRequest(int id)
        {
            var tripRequest = await _context.TripRequest.FindAsync(id);

            if (tripRequest == null)
            {
                return NotFound();
            }

            return tripRequest;
        }

        public string ReplaceNotificationBody(string username , string notifyBody) {
            notifyBody = notifyBody.Replace("{User}", username);
            return notifyBody;
        }

        public void PushNotification(string notificationText , int tripId,int userId) {

            Notification notification = new Notification
            {
                UserId=userId,
                NotificationText = notificationText,
                IsOpened = false,
                NotifyDate = DateTime.Now,
                NotifyLink = "trip-details/" + tripId
            };

            try
            {
                _context.Notification.Add(notification);
                _context.SaveChanges();
            }
            catch(Exception e)
            {
                throw e;
            }
        }

    }
}
