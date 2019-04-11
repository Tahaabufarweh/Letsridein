using System;
using System.Collections.Generic;

namespace Letsridein.Models
{
    public partial class AuthenticationProvider
    {
        public int Id { get; set; }
        public string ProviderKey { get; set; }
        public int UserId { get; set; }
        public int ProviderType { get; set; }

        public User User { get; set; }
    }
}
