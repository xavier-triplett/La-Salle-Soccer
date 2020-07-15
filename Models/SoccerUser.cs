using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Capstone.Models
{
	using System;
	using System.Collections.Generic;
	using System.ComponentModel.DataAnnotations;
	using System.ComponentModel.DataAnnotations.Schema;

    public partial class SoccerUser
	{
		public virtual UserAddress Address { get; set; }

		[Key]
		public long UserId { get; set; }
		public long AddressId { get; set; }
		public string Username { get; set; }
		public string Password { get; set; }
		public string FirstName { get; set; }
		public string LastName { get; set; }
		public Nullable<DateTime> DateOfBirth { get; set; }
		public string Gender { get; set; }

		[NotMapped]
		public string FullName { get; set; }

	}
}