using Microsoft.EntityFrameworkCore;

namespace Capstone.Models
{
	public class DBContext : DbContext
	{
		public DBContext(DbContextOptions<DBContext> options) : base(options)
		{

		}

		public DbSet<SoccerUser> User { get; set; }
		public DbSet<UserAddress> Address { get; set; }
		public DbSet<Coach> Coach { get; set; }
		public DbSet<Player> Player { get; set; }
		public DbSet<Parent> Parent { get; set; }
		public DbSet<Game> Game { get; set; }
		public DbSet<Team> Team { get; set; }

	}
}
