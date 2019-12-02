using Microsoft.EntityFrameworkCore;

namespace Capstone.Models
{
	public class TeamContext : DbContext
	{
		public TeamContext(DbContextOptions<TeamContext> options) : base(options)
		{

		}

		public DbSet<Team> Team { get; set; }
	}
}
