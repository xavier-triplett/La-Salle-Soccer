using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;

namespace Final.Models
{
	public class ParentContext : Microsoft.EntityFrameworkCore.DbContext
	{
		public ParentContext(DbContextOptions<ParentContext> options) : base(options)
		{

		}

		public Microsoft.EntityFrameworkCore.DbSet<Parent> Parent { get; set; }
	}
}
