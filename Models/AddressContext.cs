using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;

namespace Final.Models
{
	public class AddressContext : Microsoft.EntityFrameworkCore.DbContext
	{
		public AddressContext(DbContextOptions<AddressContext> options) : base(options)
		{

		}

		public Microsoft.EntityFrameworkCore.DbSet<Address> Address { get; set; }
	}
}
