using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace Capstone
{
	public class Program
	{
		public static void Main(string[] args)
		{
			try
			{
				BuildWebHost(args).Run();
			}
			catch (Exception ex)
			{
				Console.WriteLine("Got exception: " + ex.Message);
				if (ex.InnerException != null)
				{
					Console.WriteLine("Got exception: " + ex.InnerException.Message);
				}
				Console.WriteLine("Stack: " + ex.StackTrace);
				throw ex;
			}
		}

		public static IWebHost BuildWebHost(string[] args)
		{
			var config = new ConfigurationBuilder()
			   .AddJsonFile("appsettings.json", optional: true)
			   .AddCommandLine(args)    // allows overriding with --server.urls or --urls (ex: --server.urls http://localhost:5001)
			   .AddEnvironmentVariables(prefix: "ASPNETCORE_")
			   .Build();

			IWebHost host = WebHost.CreateDefaultBuilder(args)
				.UseConfiguration(config)
				.UseContentRoot(Directory.GetCurrentDirectory())
				.UseIISIntegration()
				.UseStartup<Startup>()
				.Build();
			return host;
		}
	}
}
