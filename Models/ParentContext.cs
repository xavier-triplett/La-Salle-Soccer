using Microsoft.EntityFrameworkCore;

namespace Capstone.Models
{
	public class ParentContext : DbContext
	{
		public ParentContext(DbContextOptions<ParentContext> options) : base(options)
		{

		}

		public DbSet<Parent> Parent { get; set; }
	}
}
