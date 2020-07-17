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

	public partial class Questionnaire
	{
		public virtual Player Player { get; set; }

		[Key]
		public long QuestionnaireId { get; set; }
		public long PlayerId { get; set; }
		public DateTime PracticeTime { get; set; }
		public string Stable { get; set; }
		public string Program { get; set; }
		public DateTime DropOffTime { get; set; }
		public string CoachPhone { get; set; }
		public string EmergencyPhone { get; set; }
		public double Temperature { get; set; }
		public Boolean Fever { get; set; }
		public Boolean PastFever { get; set; }
		public Boolean Cough { get; set; }
		public Boolean ShortnessOfBreath { get; set; }
		public Boolean CovidContact { get; set; }
		public DateTime OutOfStateTime { get; set; }
		public DateTime PickUpTime { get; set; }

	}
}
