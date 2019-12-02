using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;

namespace Final.Models
{
	public class PlayerContext : Microsoft.EntityFrameworkCore.DbContext
	{
		public PlayerContext(DbContextOptions<PlayerContext> options) : base(options)
		{

		}

		public Microsoft.EntityFrameworkCore.DbSet<Player> Player { get; set; }
	}
}
