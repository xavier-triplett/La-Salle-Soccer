using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Capstone.Models
{
	using System;
	using System.Collections.Generic;

	public partial class Address
	{
		public long AddressId { get; set; }
		public string AddressLine1 { get; set; }
		public string AddressLine2 { get; set; }
		public string City { get; set; }
		public string State { get; set; }
		public Nullable<int> Zip { get; set; }
	}
}
