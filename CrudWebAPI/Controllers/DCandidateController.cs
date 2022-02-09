using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CrudWebAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace CrudWebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DCandidateController : ControllerBase
    {
        private readonly DonationDBContext _context;
        public DCandidateController(DonationDBContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<DCandidate>>> GetAllDCandidate()
        {
            return await _context.DCandidates.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<DCandidate>> GetDCandidateById(int id)
        {
            var dCandidate = await _context.DCandidates.FindAsync(id);
            if(dCandidate == null)
            {
                return NotFound();
            }
            return dCandidate;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateDCandidate(int id, DCandidate dCandidate)
        {
            dCandidate.id = id;

            _context.Entry(dCandidate).State = EntityState.Modified;
            try
            {
                await _context.SaveChangesAsync();
            }
            catch(DbUpdateConcurrencyException)
            {
                if(!DCandidateExist(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok();           
        }

        [HttpPost]
        public async Task<ActionResult<DCandidate>> AddDCandidate(DCandidate dCandidate)
        {
            _context.DCandidates.Add(dCandidate);
            await _context.SaveChangesAsync();
            return CreatedAtAction("GetAllDCandidate", new { id = dCandidate.id }, dCandidate);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<DCandidate>> DeleteDCandidate(int id)
        {
            var dCandidate = await _context.DCandidates.FindAsync(id);
            if(dCandidate == null)
            {
                return NotFound();
            }

            _context.DCandidates.Remove(dCandidate);
            await _context.SaveChangesAsync();
            return dCandidate;
        }

        private bool DCandidateExist(int id)
        {
            return _context.DCandidates.Any(e => e.id == id);
        }
    }
}
