using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Capstone.Models
{
	using System;
	using System.Collections.Generic;

	public partial class User
	{
		public virtual Address Address { get; set; }


		public long UserId { get; set; }
		public long AddressId { get; set; }
		public string Username { get; set; }
		public string Password { get; set; }
		public string FirstName { get; set; }
		public string LastName { get; set; }
		public Nullable<System.DateTime> DateOfBirth { get; set; }
		public string Gender { get; set; }
	}
}