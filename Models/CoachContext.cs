using Microsoft.EntityFrameworkCore;

namespace Capstone.Models
{
	public class CoachContext : DbContext
	{
		public CoachContext(DbContextOptions<CoachContext> options) : base(options)
		{

		}

		public DbSet<Coach> Coach { get; set; }
		public DbSet<Team> Team { get; set; }

	}
}
