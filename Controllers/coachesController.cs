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
	public class coachesController : ControllerBase
	{
        private Capstone_ProjectEntities db = new Capstone_ProjectEntities();

        // GET: api/coaches
        public List<coach> Getcoaches()
        {
			IQueryable<coach> items = db.coaches
				.Include(x => x.user);


            List<coach> coaches = items.ToList();

            coaches.ForEach(x =>
			{
				x.FirstName = x.user.FirstName;
				x.LastName = x.user.LastName;
				x.DateOfBirth = (DateTime)x.user.DateOfBirth;
				x.Gender = x.user.Gender;
			});

			return coaches;
        }

        // GET: api/coaches/5
        [ResponseType(typeof(coach))]
        public IHttpActionResult Getcoach(long id)
        {
			coach coach = db.coaches
				.Include(x => x.user)
				.Where(x => x.CoachId == id)
				.FirstOrDefault();

			if (coach == null)
			{
				return NotFound();
			}

			coach.FirstName = coach.user.FirstName;
			coach.LastName = coach.user.LastName;
			coach.DateOfBirth = (DateTime) coach.user.DateOfBirth;
			coach.Gender = coach.user.Gender;



            return Ok(coach);
        }

        // PUT: api/coaches/5
        [ResponseType(typeof(void))]
        public IHttpActionResult Putcoach(long id, coach coach)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != coach.CoachId)
            {
                return BadRequest();
            }

            db.Entry(coach).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!coachExists(id))
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

        // POST: api/coaches
        [ResponseType(typeof(coach))]
        public IHttpActionResult Postcoach(coach coach)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.coaches.Add(coach);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = coach.CoachId }, coach);
        }

        // DELETE: api/coaches/5
        [ResponseType(typeof(coach))]
        public IHttpActionResult Deletecoach(long id)
        {
            coach coach = db.coaches.Find(id);
            if (coach == null)
            {
                return NotFound();
            }

            db.coaches.Remove(coach);
            db.SaveChanges();

            return Ok(coach);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool coachExists(long id)
        {
            return db.coaches.Count(e => e.CoachId == id) > 0;
        }
    }
}