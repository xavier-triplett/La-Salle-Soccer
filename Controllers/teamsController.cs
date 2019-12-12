using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Capstone.Models;

namespace Capstone.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TeamsController : ControllerBase
    {
        private readonly DBContext _context;

        public TeamsController(DBContext context)
        {
            _context = context;
        }

		[HttpGet("[action]/{userId}")]
		public ActionResult<Team> GetUsersTeam(long userId)
		{
			Player player = _context.Player
				.Include(x => x.User)
				.Where(x => x.User.UserId == userId)
				.FirstOrDefault();

			if (player == null)
			{
				return NotFound();
			}

			Team team = _context.Team
				.Where(x => x.TeamId == player.TeamId)
				.FirstOrDefault();

			if (team == null)
			{
				return NotFound();
			}

			return team;
		}

		// GET: api/Teams
		[HttpGet]
		public ActionResult<IEnumerable<Team>> GetTeam()
		{
			List<Team> items = _context.Team
				.Include(x => x.Coach)
					.ThenInclude(x => x.User)
				.ToList();
			items.ForEach(x =>
			{
				x.CoachName = x.Coach.User.FirstName + " " + x.Coach.User.LastName;
			});
			return items;
		}

		// GET: api/Teams/5
		[HttpGet("{id}")]
        public ActionResult<Team> GetTeam(long id)
        {
			Team item = _context.Team
				.Include(x => x.Coach)
					.ThenInclude(x => x.User)
				.Where(x => x.TeamId == id)
				.FirstOrDefault();

            if (item == null)
            {
                return NotFound();
            }

			item.CoachName = item.Coach.User.FirstName + " " + item.Coach.User.LastName;

            return item;
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
