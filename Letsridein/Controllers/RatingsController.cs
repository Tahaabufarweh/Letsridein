using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Letsridein.Models;

namespace Letsridein.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RatingsController : ControllerBase
    {
        private readonly LetsRideinContext _context;

        public RatingsController(LetsRideinContext context)
        {
            _context = context;
        }
        #region Rating

        /// <summary>
        /// Insert new rate for specific user
        /// </summary>
        /// <param name="NewRate">object of Rating</param>
        /// <returns>Rating Object</returns>
        [HttpPost]
        [Route("InsertNewRate")]
        public async Task<ActionResult<Rating>> InsertNewRate([FromBody] Rating NewRate,int ratedUser)
        {
            NewRate.RatedUser = ratedUser;
            _context.Rating.Add(NewRate);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetRating", new { id = NewRate.Id }, NewRate);
        }

        /// <summary>
        /// Get All Ratings By User Id
        /// </summary>
        /// <param name="UserId">int variable</param>
        /// <returns>Rating List</returns>
        [HttpGet]
        [Route("GetAllRatingsByUserId/{UserId}")]
        public async Task<ActionResult<IEnumerable<Rating>>> GetAllRatingsByUserId(int UserId)
        {
            return await _context.Rating.Where(x => x.RatedUser == UserId).Include(x => x.User).OrderByDescending(x => x.Id).ToListAsync();
        }

        /// <summary>
        /// Delete Rating
        /// </summary>
        /// <param name="Id">int variable</param>
        [HttpDelete]
        [Route("DeleteRating/{Id}")]
        public async Task<ActionResult<Rating>> DeleteRating(int Id)
        {
            var rating = await _context.Rating.FindAsync(Id);
            if (rating == null)
            {
                return NotFound();
            }

            _context.Rating.Remove(rating);
            await _context.SaveChangesAsync();

            return rating;
        }

        /// <summary>
        /// Get Rating
        /// </summary>
        /// <param name="Id">int variable</param>
        /// <returns>Rating object</returns>
        [HttpGet("{id}")]
        public async Task<ActionResult<Rating>> GetRating(int id)
        {
            var Rating = await _context.Rating.FindAsync(id);

            if (Rating == null)
            {
                return NotFound();
            }

            return Rating;
        }
        #endregion
    }
}
