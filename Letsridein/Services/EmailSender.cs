using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Letsridein.Services
{
   public interface EmailSender
    {
         void SendEmail(string Email, string Subject, string Body);
    }
}
