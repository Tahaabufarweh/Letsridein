using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Twilio;
using Twilio.Rest.Api.V2010.Account;
using Twilio.Types;

namespace Letsridein.Controllers
{
    public class AuthMessageSender : ISmsSender
    {
            

        public string SendSmsAsync(string number, string Message)
        {
            const string accountSid = "ACfc253e6a508d1c0ed7b6b15f934b2afb";
            const string authToken = "8c38eca38b15d7e99a03d4bcbc93ac9b";

            TwilioClient.Init(accountSid, authToken);

            var message = MessageResource.Create(
                body: Message,
                from: new Twilio.Types.PhoneNumber("+18479062345"),
                to: new Twilio.Types.PhoneNumber(number)
            );

            return message.Sid;
        }
    }
}
