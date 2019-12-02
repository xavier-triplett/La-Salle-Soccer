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
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Final.Controllers
{
	[ApiController]
	[Route("api/[controller]")]
	public class addressesController : ControllerBase
	{
        private Capstone_ProjectEntities db = new Capstone_ProjectEntities();

        // GET: api/addresses
        public List<> Getaddresses()
        {
            return db.addresses.ToList();
        }

        // GET: api/addresses/5
        [ResponseType(typeof(address))]
        public IHttpActionResult Getaddress(long id)
        {
            address address = db.addresses.Find(id);
            if (address == null)
            {
                return NotFound();
            }

            return Ok(address);
        }

        // PUT: api/addresses/5
        [ResponseType(typeof(void))]
        public IHttpActionResult Putaddress(long id, address address)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != address.AddressId)
            {
                return BadRequest();
            }

            db.Entry(address).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!addressExists(id))
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

        // POST: api/addresses
        [ResponseType(typeof(address))]
        public IHttpActionResult Postaddress(address address)
        {
			if (!ModelState.IsValid)
			{
				return BadRequest(ModelState);
			}

			bool addressExists = false;
			List<address> addresses = db.addresses.ToList();
			addresses.ForEach(x =>
			{
				if ((x.AddressLine1 == address.AddressLine1 || x.AddressLine1 == null && x.AddressLine1 == null) &&
					(x.AddressLine2 == address.AddressLine2 || x.AddressLine2 == null && x.AddressLine2 == null) &&
					(x.City == address.City || x.City == null && x.City == null) &&
					(x.State == address.State || x.State == null && x.State == null) &&
					(x.Zip == address.Zip || x.Zip == null && x.Zip == null))
				{
					addressExists = true;
					address = x;
				}
			});
			
			if (addressExists)
			{
				return Ok(address);
			} else
			{
				db.addresses.Add(address);
				db.SaveChanges();

				return CreatedAtRoute("DefaultApi", new { id = address.AddressId }, address);
			}
        }

        // DELETE: api/addresses/5
        [ResponseType(typeof(address))]
        public IHttpActionResult Deleteaddress(long id)
        {
            address address = db.addresses.Find(id);
            if (address == null)
            {
                return NotFound();
            }

            db.addresses.Remove(address);
            db.SaveChanges();

            return Ok(address);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool addressExists(long id)
        {
            return db.addresses.Count(e => e.AddressId == id) > 0;
        }
    }
}