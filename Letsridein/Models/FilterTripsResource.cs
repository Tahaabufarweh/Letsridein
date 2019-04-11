using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Letsridein.Models
{
    public class FilterTripsResource
    {

        public string FromDest { get; set; }
        public string ToDest { get; set; }
        public DateTime? StartTime { get; set; }
        public float? PriceMin { get; set; }
        public float? PriceMax { get; set; } 

    }
}
