using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Letsridein.Models.Notifications
{
    public static class NotificationsTemplates
    {
        public static string requestAccepted = "{User} Accept your request";
        public static string requestReject = "{User} Reject your request";
        public static string cancelReject = "{User} cancel your request";
        public static string newRequest = "You have new request from {User} ";


    }
}
