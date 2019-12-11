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
    public class PlayersController : ControllerBase
    {
        private readonly PlayerContext _context;

        public PlayersController(PlayerContext context)
        {
            _context = context;
        }

		// GET: api/Players
		[HttpGet]
		public ActionResult<IEnumerable<Player>> GetPlayer()
		{
			List<Player> items = _context.Player
				.Include(x => x.Team)
				.Include(x => x.User)
				.ToList();
			items.ForEach(x =>
			{
				x.TeamName = x.Team.Name;
				x.FirstName = x.User.FirstName;
				x.LastName = x.User.LastName;
				x.FullName = x.User.FirstName + " " + x.User.LastName;
				x.DateOfBirth = x.User.DateOfBirth.Value;
				x.Gender = x.User.Gender;
			});
			return items;
		}

		// GET: api/Players/5
		[HttpGet("{id}")]
        public ActionResult<Player> GetPlayer(long id)
        {
			Player item = _context.Player
				.Include(x => x.User)
				.Where(x => x.PlayerId == id)
				.FirstOrDefault();

			if (item == null)
			{
				return NotFound();
			}

			item.FirstName = item.User.FirstName;
			item.LastName = item.User.LastName;
			item.DateOfBirth = item.User.DateOfBirth.Value;
			item.Gender = item.User.Gender;
			item.FullName = item.User.FirstName + " " + item.User.LastName;

			return item;
        }

        // PUT: api/Players/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPlayer(long id, Player player)
        {
            if (id != player.PlayerId)
            {
                return BadRequest();
            }

            _context.Entry(player).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PlayerExists(id))
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

        // POST: api/Players
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<Player>> PostPlayer(Player player)
        {
            _context.Player.Add(player);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPlayer", new { id = player.PlayerId }, player);
        }

        // DELETE: api/Players/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Player>> DeletePlayer(long id)
        {
            var player = await _context.Player.FindAsync(id);
            if (player == null)
            {
                return NotFound();
            }

            _context.Player.Remove(player);
            await _context.SaveChangesAsync();

            return player;
        }

        private bool PlayerExists(long id)
        {
            return _context.Player.Any(e => e.PlayerId == id);
        }
    }
}
