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
	public class parentsController : ControllerBase
	{
        private Capstone_ProjectEntities db = new Capstone_ProjectEntities();

        // GET: api/parents
        public List<parent> Getparents()
        {
			IQueryable<parent> items = db.parents
				.Include(x => x.user);


            List<parent> parents = items.ToList();

            parents.ForEach(x =>
			{
				x.FirstName = x.user.FirstName;
				x.LastName = x.user.LastName;
				x.DateOfBirth = (DateTime) x.user.DateOfBirth;
				x.Gender = x.user.Gender;
			});

			return parents;
        }

        // GET: api/parents/5
        [ResponseType(typeof(parent))]
        public IHttpActionResult Getparent(long id)
        {
			parent parent = db.parents
				.Include(x => x.user)
				.Where(x => x.ParentId == id)
				.FirstOrDefault();

			if (parent == null)
			{
				return NotFound();
			}

			parent.FirstName = parent.user.FirstName;
			parent.LastName = parent.user.LastName;
			parent.DateOfBirth = (DateTime) parent.user.DateOfBirth;
			parent.Gender = parent.user.Gender;



            return Ok(parent);
        }

        // PUT: api/parents/5
        [ResponseType(typeof(void))]
        public IHttpActionResult Putparent(long id, parent parent)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != parent.ParentId)
            {
                return BadRequest();
            }

            db.Entry(parent).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!parentExists(id))
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

        // POST: api/parents
        [ResponseType(typeof(parent))]
        public IHttpActionResult Postparent(parent parent)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.parents.Add(parent);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = parent.ParentId }, parent);
        }

        // DELETE: api/parents/5
        [ResponseType(typeof(parent))]
        public IHttpActionResult Deleteparent(long id)
        {
            parent parent = db.parents.Find(id);
            if (parent == null)
            {
                return NotFound();
            }

            db.parents.Remove(parent);
            db.SaveChanges();

            return Ok(parent);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool parentExists(long id)
        {
            return db.parents.Count(e => e.ParentId == id) > 0;
        }
    }
}