using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;

namespace Final.Models
{
	public class UserContext : Microsoft.EntityFrameworkCore.DbContext
	{
		public UserContext(DbContextOptions<UserContext> options) : base(options)
		{

		}

		public Microsoft.EntityFrameworkCore.DbSet<User> User { get; set; }
	}
}
