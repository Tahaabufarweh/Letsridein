using System;
using System.Collections.Generic;

namespace Letsridein.Models
{
    public partial class User
    {
        public User()
        {
            AuthenticationProvider = new HashSet<AuthenticationProvider>();
            Notification = new HashSet<Notification>();
            RatingRatedUserNavigation = new HashSet<Rating>();
            RatingUser = new HashSet<Rating>();
            ReportReportedUserNavigation = new HashSet<Report>();
            ReportUser = new HashSet<Report>();
            Trip = new HashSet<Trip>();
            TripRequest = new HashSet<TripRequest>();
        }

        public int Id { get; set; }
        public string Country { get; set; }
        public bool? Gender { get; set; }
        public string FullName { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string CarInfo { get; set; }
        public string MobileNumber { get; set; }
        public DateTime? BirthDate { get; set; }
        public string ProfileImageName { get; set; }
        public string CarBrand { get; set; }
        public string CarModel { get; set; }
        public string ManufacturingYear { get; set; }
        public string CarNumber { get; set; }
        public string CarColor { get; set; }

        public ICollection<AuthenticationProvider> AuthenticationProvider { get; set; }
        public ICollection<Notification> Notification { get; set; }
        public ICollection<Rating> RatingRatedUserNavigation { get; set; }
        public ICollection<Rating> RatingUser { get; set; }
        public ICollection<Report> ReportReportedUserNavigation { get; set; }
        public ICollection<Report> ReportUser { get; set; }
        public ICollection<Trip> Trip { get; set; }
        public ICollection<TripRequest> TripRequest { get; set; }
    }
}
