﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Capstone.Models
{
	using System;
	using System.Collections.Generic;
	using System.ComponentModel.DataAnnotations;
	using System.ComponentModel.DataAnnotations.Schema;

	public partial class Player
	{
		public virtual Team Team { get; set; }
		public virtual User User { get; set; }


		[Key]
		public long PlayerId { get; set; }
		public long UserId { get; set; }
		public long TeamId { get; set; }
		public string DominateFoot { get; set; }

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

		[NotMapped]
		public string TeamName { get; set; }
	}
}
