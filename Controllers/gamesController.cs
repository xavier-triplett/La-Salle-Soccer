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
	public class gamesController : ControllerBase
	{
        private Capstone_ProjectEntities db = new Capstone_ProjectEntities();

        // GET: api/games
        public List<game> Getgames()
        {
			IQueryable<game> items = db.games
				.Include(x => x.team)
				.Include(x => x.team1);

            List<game> games = items.ToList();

            games.ForEach(x =>
			{
				x.HomeTeamName = x.team.Name;
				x.AwayTeamName = x.team1.Name;
			});

            return games;
        }

        // GET: api/games/5
        [ResponseType(typeof(game))]
        public IHttpActionResult Getgame(long id)
        {
			game game = db.games
				.Include(x => x.team)
				.Include(x => x.team1)
				.Where(x => x.GameId == id)
				.FirstOrDefault();

			if (game == null)
			{
				return NotFound();
			}

			game.HomeTeamName = game.team.Name;
			game.AwayTeamName = game.team1.Name;

            return Ok(game);
        }

        // PUT: api/games/5
        [ResponseType(typeof(void))]
        public IHttpActionResult Putgame(long id, game game)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != game.GameId)
            {
                return BadRequest();
            }

            db.Entry(game).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!gameExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/games
        [ResponseType(typeof(game))]
        public IHttpActionResult Postgame(game game)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.games.Add(game);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = game.GameId }, game);
        }

        // DELETE: api/games/5
        [ResponseType(typeof(game))]
        public IHttpActionResult Deletegame(long id)
        {
            game game = db.games.Find(id);
            if (game == null)
            {
                return NotFound();
            }

            db.games.Remove(game);
            db.SaveChanges();

            return Ok(game);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool gameExists(long id)
        {
            return db.games.Count(e => e.GameId == id) > 0;
        }
    }
}