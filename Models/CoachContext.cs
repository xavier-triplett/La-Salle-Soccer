using Microsoft.EntityFrameworkCore;

namespace Capstone.Models
{
	public class CoachContext : DbContext
	{
		public CoachContext(DbContextOptions<CoachContext> options) : base(options)
		{

		}

		public DbSet<Coach> Coach { get; set; }
	}
}
