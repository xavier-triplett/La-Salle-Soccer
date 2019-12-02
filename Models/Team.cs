using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Capstone.Models
{ 
	using System;
	using System.Collections.Generic;
	using System.ComponentModel.DataAnnotations.Schema;

	public partial class Team
	{
		public virtual Coach Coach { get; set; }


		public long TeamId { get; set; }
		public long CoachId { get; set; }
		public string Name { get; set; }
		public string Gender { get; set; }
		public Nullable<int> BirthYear { get; set; }
		public string HomeLocation { get; set; }

		[NotMapped]
		public string CoachName { get; set; }
	}
}