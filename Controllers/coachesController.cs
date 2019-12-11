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
    public class CoachesController : ControllerBase
    {
        private readonly CoachContext _context;

        public CoachesController(CoachContext context)
        {
            _context = context;
        }

        // GET: api/Coaches
        [HttpGet]
        public ActionResult<IEnumerable<Coach>> GetCoach()
        {
			List<Coach> items = _context.Coach
				.Include(x => x.User)
				.ToList();
			items.ForEach(x =>
			{
				x.FirstName = x.User.FirstName;
				x.LastName = x.User.LastName;
				x.FullName = x.User.FirstName + " " + x.User.LastName;
				x.DateOfBirth = x.User.DateOfBirth.Value;
				x.Gender = x.User.Gender;
			});
			return items;
		}

        // GET: api/Coaches/5
        [HttpGet("{id}")]
        public ActionResult<Coach> GetCoach(long id)
        {
			Coach item = _context.Coach
				.Include(x => x.User)
				.Where(x => x.CoachId == id)
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

        // PUT: api/Coaches/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCoach(long id, Coach coach)
        {
            if (id != coach.CoachId)
            {
                return BadRequest();
            }

            _context.Entry(coach).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CoachExists(id))
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

        // POST: api/Coaches
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<Coach>> PostCoach(Coach coach)
        {
            _context.Coach.Add(coach);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCoach", new { id = coach.CoachId }, coach);
        }

        // DELETE: api/Coaches/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Coach>> DeleteCoach(long id)
        {
            var coach = await _context.Coach.FindAsync(id);
            if (coach == null)
            {
                return NotFound();
            }

            _context.Coach.Remove(coach);
            await _context.SaveChangesAsync();

            return coach;
        }

        private bool CoachExists(long id)
        {
            return _context.Coach.Any(e => e.CoachId == id);
        }
    }
}
