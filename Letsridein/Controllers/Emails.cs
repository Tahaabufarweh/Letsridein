using Letsridein.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Threading.Tasks;

namespace Letsridein.Controllers
{
    public class Emails:EmailSender
    {
        public void SendEmail(string Email, string Subject, string Body)
        {
            try
            {
                SmtpClient client = new SmtpClient("nl1-wss2.a2hosting.com");
          
                client.UseDefaultCredentials = false;
                client.DeliveryMethod = SmtpDeliveryMethod.Network;
                client.Credentials = new System.Net.NetworkCredential("info@letsridein.com", "Samar@taha");

                MailAddress mailFrom = new MailAddress("info@letsridein.com", "Info");
                MailMessage mail = new MailMessage();
                mail.IsBodyHtml = true;
                mail.To.Add(Email);
                mail.From = mailFrom;
                mail.Subject = Subject;
                mail.Body = Body;
                client.Send(mail);
                mail.Dispose();
            }
            catch (Exception e) { var z = e; }
        }
    }
}
