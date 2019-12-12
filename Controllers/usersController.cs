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
    public class UsersController : ControllerBase
    {
        private readonly DBContext _context;

        public UsersController(DBContext context)
        {
            _context = context;
        }

		[HttpGet("[action]/{userId}")]
		public Boolean IsPlayer(long userId)
		{
			Player player = _context.Player
				.Where(x => x.UserId == userId)
				.FirstOrDefault();

			if (player == null)
			{
				return false;
			}

			return true;
		}

		// GET: api/Users
		[HttpGet]
		public ActionResult<IEnumerable<User>> GetUser()
		{

			List<User> items = _context.User.ToList();
			items.ForEach(x =>
			{
				x.FullName = x.FirstName + " " + x.LastName;
			});
			return items;
		}

		// GET: api/Users/5
		[HttpGet("{id}")]
		public ActionResult<User> GetUser(long id)
		{

			User item = _context.User
				.Where(x => x.UserId == id)
				.FirstOrDefault();

			if (item == null)
			{
				return NotFound();
			}

			item.FullName = item.FirstName + " " + item.LastName;
			return item;
		}

		// PUT: api/Users/5
		// To protect from overposting attacks, please enable the specific properties you want to bind to, for
		// more details see https://aka.ms/RazorPagesCRUD.
		[HttpPut("{id}")]
        public async Task<IActionResult> PutUser(long id, User user)
        {
            if (id != user.UserId)
            {
                return BadRequest();
            }

            _context.Entry(user).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
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

        // POST: api/Users
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<User>> PostUser(User user)
        {
            _context.User.Add(user);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetUser", new { id = user.UserId }, user);
        }

        // DELETE: api/Users/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<User>> DeleteUser(long id)
        {
            var user = await _context.User.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            _context.User.Remove(user);
            await _context.SaveChangesAsync();

            return user;
        }

        private bool UserExists(long id)
        {
            return _context.User.Any(e => e.UserId == id);
        }

		[HttpGet("[action]/{username}/{password}")]
		public ActionResult<User> TryLogin(String username, String password)
		{
			User item = _context.User.Where(x => x.Username == username && x.Password == password).FirstOrDefault();
			if (item == null)
			{
				item = _context.User.Where(x => x.Username == username).FirstOrDefault();
				if (item == null)
				{
					return item;
				}
				item.Password = null;
				return item;
			}
			return item;
		}
	}
}
