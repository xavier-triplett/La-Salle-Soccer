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
	public class playersController : ControllerBase
	{
        private Capstone_ProjectEntities db = new Capstone_ProjectEntities();

        // GET: api/players
        public List<player> Getplayers()
        {
			IQueryable<player> items = db.players
				.Include(x => x.user)
				.Include(x => x.team);

            
            List<player> players = items.ToList();

            players.ForEach(x =>
			{
				x.FirstName = x.user.FirstName;
				x.LastName = x.user.LastName;
				x.DateOfBirth = (DateTime)x.user.DateOfBirth;
				x.Gender = x.user.Gender;
				x.TeamName = x.team.Name;
			});
			
			return players;
        }

        // GET: api/players/5
        [ResponseType(typeof(player))]
        public IHttpActionResult Getplayer(long id)
        {
			player player = db.players
				.Include(x => x.user)
				.Include(x => x.team)
				.Where(x => x.PlayerId == id)
				.FirstOrDefault();

			if (player == null)
			{
				return NotFound();
			}

			player.FirstName = player.user.FirstName;
			player.LastName = player.user.LastName;
			player.DateOfBirth = (DateTime)player.user.DateOfBirth;
			player.Gender = player.user.Gender;
			player.TeamName = player.team.Name;


            return Ok(player);
        }

        // PUT: api/players/5
        [ResponseType(typeof(void))]
        public IHttpActionResult Putplayer(long id, player player)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != player.PlayerId)
            {
                return BadRequest();
            }

            db.Entry(player).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!playerExists(id))
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

        // POST: api/players
        [ResponseType(typeof(player))]
        public IHttpActionResult Postplayer(player player)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.players.Add(player);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = player.PlayerId }, player);
        }

        // DELETE: api/players/5
        [ResponseType(typeof(player))]
        public IHttpActionResult Deleteplayer(long id)
        {
            player player = db.players.Find(id);
            if (player == null)
            {
                return NotFound();
            }

            db.players.Remove(player);
            db.SaveChanges();

            return Ok(player);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool playerExists(long id)
        {
            return db.players.Count(e => e.PlayerId == id) > 0;
        }
    }
}