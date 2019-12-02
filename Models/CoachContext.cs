using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;

namespace Final.Models
{
	public class CoachContext : Microsoft.EntityFrameworkCore.DbContext
	{
		public CoachContext(DbContextOptions<CoachContext> options) : base(options)
		{

		}

		public Microsoft.EntityFrameworkCore.DbSet<Coach> Coach { get; set; }
	}
}
