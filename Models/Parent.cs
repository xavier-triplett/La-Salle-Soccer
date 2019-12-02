using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Final.Models
{
	using System;
	using System.Collections.Generic;
	using System.ComponentModel.DataAnnotations.Schema;

	public partial class Parent
	{
		public virtual Player Player { get; set; }
		public virtual User User { get; set; }


		public long ParentId { get; set; }
		public long PlayerId { get; set; }
		public long UserId { get; set; }

		[NotMapped]
		public string FirstName { get; set; }

		[NotMapped]
		public string LastName { get; set; }

		[NotMapped]
		public DateTime DateOfBirth { get; set; }

		[NotMapped]
		public string Gender { get; set; }
	}
}
