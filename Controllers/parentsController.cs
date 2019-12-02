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
    public class ParentsController : ControllerBase
    {
        private readonly ParentContext _context;

        public ParentsController(ParentContext context)
        {
            _context = context;
        }

        // GET: api/Parents
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Parent>>> GetParent()
        {
            return await _context.Parent.ToListAsync();
        }

        // GET: api/Parents/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Parent>> GetParent(long id)
        {
            var parent = await _context.Parent.FindAsync(id);

            if (parent == null)
            {
                return NotFound();
            }

            return parent;
        }

        // PUT: api/Parents/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutParent(long id, Parent parent)
        {
            if (id != parent.ParentId)
            {
                return BadRequest();
            }

            _context.Entry(parent).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ParentExists(id))
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

        // POST: api/Parents
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<Parent>> PostParent(Parent parent)
        {
            _context.Parent.Add(parent);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetParent", new { id = parent.ParentId }, parent);
        }

        // DELETE: api/Parents/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Parent>> DeleteParent(long id)
        {
            var parent = await _context.Parent.FindAsync(id);
            if (parent == null)
            {
                return NotFound();
            }

            _context.Parent.Remove(parent);
            await _context.SaveChangesAsync();

            return parent;
        }

        private bool ParentExists(long id)
        {
            return _context.Parent.Any(e => e.ParentId == id);
        }
    }
}
