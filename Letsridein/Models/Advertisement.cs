using System;
using System.Collections.Generic;

namespace Letsridein.Models
{
    public partial class Advertisement
    {
        public int Id { get; set; }
        public string AdvLink { get; set; }
        public string ImageName { get; set; }
        public bool? IsActive { get; set; }
    }
}
