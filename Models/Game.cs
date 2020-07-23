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

	public partial class Game
	{
		public virtual Team HomeTeam { get; set; }
		public virtual Team AwayTeam { get; set; }


		[Key]
		public long GameId { get; set; }
		public long HomeTeamId { get; set; }
		public long AwayTeamId { get; set; }
		public DateTime? DateAndTime { get; set; }
		public int? HomeGoals { get; set; }
		public int? AwayGoals { get; set; }
		public int? HomePenaltyGoals { get; set; }
		public int? AwayPenaltyGoals { get; set; }

		[NotMapped]
		public string HomeTeamName { get; set; }
		[NotMapped]
		public string AwayTeamName { get; set; }
	}
}
