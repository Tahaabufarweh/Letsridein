using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Letsridein.Models;

namespace Letsridein.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReportsController : ControllerBase
    {
        private readonly LetsRideinContext _context;
        public ReportsController(LetsRideinContext context)
        {
            _context = context;
        }
        
        /// <summary>
        /// Insert new report for specific user
        /// </summary>
        /// <param name="NewReport">object of Rating</param>
        /// <returns>Report Object</returns>
        [HttpPost]
        [Route("InsertNewReport")]
        public async Task<ActionResult<Report>> InsertNewReport([FromBody] Report NewReport,int id)
        {
            NewReport.ReportedUser = id;
           
            NewReport.ReportType = 1; 
            _context.Report.Add(NewReport);
            await _context.SaveChangesAsync();
            return CreatedAtAction("GetReport", new { id = NewReport.Id }, NewReport);
        }

        /// <summary>
        /// Get All Report By User Id
        /// </summary>
        /// <param name="UserId">int variable</param>
        /// <returns>Report List</returns>
        [HttpGet]
        [Route("GetAllReportByUserId/{UserId}")]
        public async Task<ActionResult<IEnumerable<Report>>> GetAllReportByUserId(int UserId)
        {
            return await _context.Report.Where(x => x.UserId == UserId).Include(x => x.User).OrderByDescending(x => x.Id).ToListAsync();
        }

        /// <summary>
        /// Get Report
        /// </summary>
        /// <param name="Id">int variable</param>
        /// <returns>Report object</returns>
        [HttpGet("{id}")]
        public async Task<ActionResult<Report>> GetReport(int id)
        {
            var report = await _context.Report.FindAsync(id);

            if (report == null)
            {
                return NotFound();
            }

            return report;
        }
        /// <summary>
        /// Get All Report
        /// </summary>
        
        /// <returns>Report object</returns>
        [HttpGet]
        [Route("AllReports")]
        public IActionResult GetAllReports(int PageNo = 1, int PageSize = 10)
        {
            var totalReports = _context.Report.Count();
            var report = _context.Report.OrderByDescending(x => x.Id).Skip((PageNo - 1) * PageSize).Take(PageSize).Include(x=>x.User).Include(x=>x.ReportedUserNavigation)
                                                            .ToList();


            return Ok(new ReportModelPage()
            {
                Reports = report,
                TotalReports = totalReports
            });
        }

        /// <summary>
        /// Delete Report
        /// </summary>
        /// <param name="Id">int variable</param>
        [HttpDelete("{id}")]
        public async Task<ActionResult<Report>> DeleteReport(int id)
        {
            var report = await _context.Report.FindAsync(id);
            if (report == null)
            {
                return NotFound();
            }

            _context.Report.Remove(report);
            await _context.SaveChangesAsync();

            return report;
        }

    }
}

