using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using Final.Models;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace Final.Controllers
{
	[ApiController]
	[Route("api/[controller]")]
	public class teamsController : ControllerBase
	{
		private readonly TeamContext _context;

		public TeamsController(TeamContext context)
		{
			_context = context;
		}

		[HttpGet]
		public async Task<ActionResult<IEnumerable<Team>>> GetTeam()
		{
			return await _context.Team.ToListAsync();
		}

		// GET: api/Teams/5
		[HttpGet("{id}")]
		public async Task<ActionResult<Team>> GetTeam(long id)
		{
			var team = await _context.Team.FindAsync(id);

			if (team == null)
			{
				return NotFound();
			}

			return team;
		}

		// PUT: api/Teams/5
		// To protect from overposting attacks, please enable the specific properties you want to bind to, for
		// more details see https://aka.ms/RazorPagesCRUD.
		[HttpPut("{id}")]
		public async Task<IActionResult> PutTeam(long id, Team team)
		{
			if (id != team.TeamId)
			{
				return BadRequest();
			}

			_context.Entry(team).State = EntityState.Modified;

			try
			{
				await _context.SaveChangesAsync();
			}
			catch (DbUpdateConcurrencyException)
			{
				if (!TeamExists(id))
				{
					return NotFound();
				}
				else
				{
					throw;
				}
			}

			return NoContent();
		}

		// POST: api/Teams
		// To protect from overposting attacks, please enable the specific properties you want to bind to, for
		// more details see https://aka.ms/RazorPagesCRUD.
		[HttpPost]
		public async Task<ActionResult<Team>> PostTeam(Team team)
		{
			_context.Team.Add(team);
			await _context.SaveChangesAsync();

			return CreatedAtAction("GetTeam", new { id = team.TeamId }, team);
		}

		// DELETE: api/Teams/5
		[HttpDelete("{id}")]
		public async Task<ActionResult<Team>> DeleteTeam(long id)
		{
			var team = await _context.Team.FindAsync(id);
			if (team == null)
			{
				return NotFound();
			}

			_context.Team.Remove(team);
			await _context.SaveChangesAsync();

			return team;
		}

		private bool TeamExists(long id)
		{
			return _context.Team.Any(e => e.TeamId == id);
		}
	}
}