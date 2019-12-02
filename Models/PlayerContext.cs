using Microsoft.EntityFrameworkCore;

namespace Capstone.Models
{
	public class PlayerContext : DbContext
	{
		public PlayerContext(DbContextOptions<PlayerContext> options) : base(options)
		{

		}

		public DbSet<Player> Player { get; set; }
	}
}
