using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Letsridein.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Letsridein.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NotificationsController : ControllerBase
    {
        private readonly LetsRideinContext _context;

        public NotificationsController(LetsRideinContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Route("GetNotifications/{userId}")] 
        public IActionResult GetNotifications(int userId)
        {
            var allNotifications = _context.Notification.Where(x => x.UserId == userId && x.NotifyDate >= DateTime.Now.AddDays(-2));

            return Ok(allNotifications);
        }
        
    }
}
