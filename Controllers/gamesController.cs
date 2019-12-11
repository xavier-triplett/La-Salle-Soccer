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
    public class GamesController : ControllerBase
    {
        private readonly DBContext _context;

        public GamesController(DBContext context)
        {
            _context = context;
        }

		// GET: api/Games
		[HttpGet]
		public ActionResult<IEnumerable<Game>> GetGame()
		{
			List<Game> items = _context.Game
				.Include(x => x.AwayTeam)
				.Include(x => x.HomeTeam)
				.ToList();
			items.ForEach(x =>
			{
				x.AwayTeamName = x.AwayTeam.Name;
				x.HomeTeamName = x.HomeTeam.Name;
			});
			return items;
		}

		// GET: api/Games/5
		[HttpGet("{id}")]
        public ActionResult<Game> GetGame(long id)
        {
			Game item = _context.Game
				.Include(x => x.AwayTeam)
				.Include(x => x.HomeTeam)
				.Where(x => x.GameId == id)
				.FirstOrDefault();

			if (item == null)
			{
				return NotFound();
			}

			item.AwayTeamName = item.AwayTeam.Name;
			item.HomeTeamName = item.HomeTeam.Name;

			return item;
        }

        // PUT: api/Games/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutGame(long id, Game game)
        {
            if (id != game.GameId)
            {
                return BadRequest();
            }

            _context.Entry(game).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!GameExists(id))
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

        // POST: api/Games
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<Game>> PostGame(Game game)
        {
            _context.Game.Add(game);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetGame", new { id = game.GameId }, game);
        }

        // DELETE: api/Games/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Game>> DeleteGame(long id)
        {
            var game = await _context.Game.FindAsync(id);
            if (game == null)
            {
                return NotFound();
            }

            _context.Game.Remove(game);
            await _context.SaveChangesAsync();

            return game;
        }

        private bool GameExists(long id)
        {
            return _context.Game.Any(e => e.GameId == id);
        }
    }
}
