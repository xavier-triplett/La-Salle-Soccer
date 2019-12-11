using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Capstone.Models
{
	using System;
	using System.Collections.Generic;
	using System.ComponentModel.DataAnnotations.Schema;

	public partial class Coach
	{
		public virtual User User { get; set; }


		public long CoachId { get; set; }
		public long UserId { get; set; }

		[NotMapped]
		public string FirstName { get; set; }

		[NotMapped]
		public string LastName { get; set; }

		[NotMapped]
		public string FullName { get; set; }

		[NotMapped]
		public DateTime DateOfBirth { get; set; }

		[NotMapped]
		public string Gender { get; set; }
	}
}
