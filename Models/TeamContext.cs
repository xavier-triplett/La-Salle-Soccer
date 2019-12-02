using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;

namespace Final.Models
{
	public class TeamContext : Microsoft.EntityFrameworkCore.DbContext
	{
		public TeamContext(DbContextOptions<TeamContext> options) : base(options)
		{

		}

		public Microsoft.EntityFrameworkCore.DbSet<Team> Team { get; set; }
	}
}
