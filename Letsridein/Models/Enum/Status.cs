using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Letsridein.Models.Enum
{
    public enum TripStatus
    {
        Opened = 1,
        Closed = 2,
        FullBoard = 3,
        Deleted = 4
    }

    public enum TripRequestStatus
    {
        New=1,
        Approved = 2,
        Reject = 3
    }
}
