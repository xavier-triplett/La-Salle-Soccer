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
    public class QuestionnairesController : ControllerBase
    {
        private readonly DBContext _context;

        public QuestionnairesController(DBContext context)
        {								
            _context = context;
        }

		// GET: api/Questionnaires
		[HttpGet]
		public ActionResult<IEnumerable<Questionnaire>> GetQuestionnaire()
		{
			List<Questionnaire> items = _context.Questionnaire
				.Include(x => x.Player)
				.ToList();
			items.ForEach(x =>
			{
				x.FullName = x.Player.FirstName + " " + x.Player.LastName;
			});
			return items;
		}

		// GET: api/Questionnaires/5
		[HttpGet("{id}")]
        public ActionResult<Questionnaire> GetQuestionnaire(long id)
        {
			Questionnaire item = _context.Questionnaire
				.Include(x => x.Player)
				.Where(x => x.QuestionnaireId == id)
				.FirstOrDefault();

            if (item == null)
            {
                return NotFound();
            }

			item.FullName = item.Player.FirstName + " " + item.Player.LastName;

            return item;
        }

        // PUT: api/Questionnaires/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutQuestionnaire(long id, Questionnaire questionnaire)
        {
            if (id != questionnaire.QuestionnaireId)
            {
                return BadRequest();
            }

            _context.Entry(questionnaire).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!QuestionnaireExists(id))
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

        // POST: api/Questionnaires
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<Questionnaire>> PostQuestionnaire(Questionnaire questionnaire)
        {
            _context.Questionnaire.Add(questionnaire);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetQuestionnaire", new { id = questionnaire.QuestionnaireId }, questionnaire);
        }

        // DELETE: api/Questionnaires/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Questionnaire>> DeleteQuestionnaire(long id)
        {
            var questionnaire = await _context.Questionnaire.FindAsync(id);
            if (questionnaire == null)
            {
                return NotFound();
            }

            _context.Questionnaire.Remove(questionnaire);
            await _context.SaveChangesAsync();

            return questionnaire;
        }

        private bool QuestionnaireExists(long id)
        {
            return _context.Questionnaire.Any(e => e.QuestionnaireId == id);
        }
    }
}
