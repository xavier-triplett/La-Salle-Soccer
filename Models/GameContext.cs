using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;

namespace Final.Models
{
	public class GameContext : Microsoft.EntityFrameworkCore.DbContext
	{
		public GameContext(DbContextOptions<GameContext> options) : base(options)
		{

		}

		public Microsoft.EntityFrameworkCore.DbSet<Game> Game { get; set; }
	}
}
