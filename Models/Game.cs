using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Capstone.Models
{
	using System;
	using System.Collections.Generic;
	using System.ComponentModel.DataAnnotations.Schema;

	public partial class Game
	{
		public virtual Team HomeTeam { get; set; }
		public virtual Team AwayTeam { get; set; }


		public long GameId { get; set; }
		public long HomeTeamId { get; set; }
		public long AwayTeamId { get; set; }
		public Nullable<System.DateTime> DateAndTime { get; set; }
		public Nullable<int> HomeGoals { get; set; }
		public Nullable<int> AwayGoals { get; set; }
		public Nullable<int> HomePenaltyGoals { get; set; }
		public Nullable<int> AwayPenaltyGoals { get; set; }

		[NotMapped]
		public string HomeTeamName { get; set; }
		[NotMapped]
		public string AwayTeamName { get; set; }
	}
}
