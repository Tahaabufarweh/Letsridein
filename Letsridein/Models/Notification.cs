using System;
using System.Collections.Generic;

namespace Letsridein.Models
{
    public partial class Notification
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string NotificationText { get; set; }
        public bool IsOpened { get; set; }
        public DateTime NotifyDate { get; set; }
        public string NotifyLink { get; set; }

        public User User { get; set; }
    }
}
