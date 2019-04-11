using System;
using System.Collections.Generic;

namespace Letsridein.Models
{
    public partial class TripRequest
    {
        public int Id { get; set; }
        public int PassengerId { get; set; }
        public DateTime RequestDate { get; set; }
        public string PassengerNote { get; set; }
        public int Status { get; set; }
        public int? PaymentMethod { get; set; }
        public int TripId { get; set; }

        public User Passenger { get; set; }
        public Trip Trip { get; set; }
    }
}
