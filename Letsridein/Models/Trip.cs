using System;
using System.Collections.Generic;

namespace Letsridein.Models
{
    public partial class Trip
    {
        public Trip()
        {
            TripRequest = new HashSet<TripRequest>();
        }

        public int Id { get; set; }
        public string FromDestination { get; set; }
        public string ToDestination { get; set; }
        public string StartTime { get; set; }
        public DateTime? ArriveTime { get; set; }
        public int DriverId { get; set; }
        public DateTime? ExpectedArrivalTime { get; set; }
        public string Details { get; set; }
        public string CarInfo { get; set; }
        public double Price { get; set; }
        public int Status { get; set; }
        public int SeatsNo { get; set; }
        public string CarBrand { get; set; }
        public string CarModel { get; set; }
        public string CarColor { get; set; }
        public string ManufacturingYear { get; set; }
        public bool? IsSmoker { get; set; }
        public bool? IsAnimals { get; set; }
        public bool IsArrived { get; set; }
        public string CarNo { get; set; }
        public DateTime StartDate { get; set; }

        public User Driver { get; set; }
        public ICollection<TripRequest> TripRequest { get; set; }
    }
}
