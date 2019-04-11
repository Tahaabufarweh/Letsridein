using System;
using System.Collections.Generic;

namespace Letsridein.Models
{
    public partial class Report
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int ReportedUser { get; set; }
        public int ReportType { get; set; }
        public string Note { get; set; }

        public User ReportedUserNavigation { get; set; }
        public User User { get; set; }
    }
}
