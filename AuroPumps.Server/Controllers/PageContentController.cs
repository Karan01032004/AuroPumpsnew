using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Poweradmin.Server.Data;
using Poweradmin.Server.DTOs;
using Poweradmin.Server.Models;

namespace Poweradmin.Server.Controllers
{
    [Route("api/pagecontent")]
    [ApiController]
    public class PageContentController : ControllerBase
    {
        private readonly AppDbContext _db;

        public PageContentController(AppDbContext db)
        {
            _db = db;
        }

        // ===============================
        // ✅ GET ALL PAGE CONTENT (LIST)
        // ===============================
        [HttpGet]
        [Route("getall")]
        public async Task<IActionResult> GetAll()
        {
            var data = await _db.pagecontent
                .OrderByDescending(x => x.Created_Date)
                .Select(x => new PagecontentDTO
                {
                    Id = x.Id,
                    Title = x.Title,
                    Page_Name = x.Page_Name,
                    Meta_Tags = x.Meta_Tags,
                    Description = x.Description,
                    Created_Date = x.Created_Date
                })
                .ToListAsync();

            return Ok(data);
        }
         
        // ===============================
        // ✅ GET PAGE CONTENT BY ID
        // ===============================
        [HttpGet]
        [Route("getbyid/{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var page = await _db.pagecontent
                .Where(x => x.Id == id)
                .Select(x => new PagecontentDTO
                {
                    Id = x.Id,
                    Title = x.Title,
                    Page_Name = x.Page_Name,
                    Meta_Tags = x.Meta_Tags,
                    Description = x.Description,
                    Created_Date = x.Created_Date
                })
                .FirstOrDefaultAsync();

            if (page == null)
                return NotFound("Page content not found");

            return Ok(page);
        }

        // ===============================
        // ✅ ADD PAGE CONTENT
        // ===============================
        [HttpPost]
        [Route("add")]
        public async Task<IActionResult> Add([FromBody] PagecontentDTO model)
        {
            PageContent page = new PageContent
            {
                Title = model.Title,
                Page_Name = model.Page_Name,
                Meta_Tags = model.Meta_Tags,
                Description = model.Description,
                Created_Date = DateTime.Now
            };

            _db.pagecontent.Add(page);
            await _db.SaveChangesAsync();

            return Ok(new { message = "Page content added successfully" });
        }

        // ===============================
        // ✅ UPDATE PAGE CONTENT
        // ===============================
        [HttpPut]
        [Route("update/{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] PagecontentDTO model)
        {
            var page = await _db.pagecontent.FindAsync(id);

            if (page == null)
                return NotFound("Page content not found");

            page.Title = model.Title;
            page.Page_Name = model.Page_Name;
            page.Meta_Tags = model.Meta_Tags;
            page.Description = model.Description;

            await _db.SaveChangesAsync();

            return Ok(new { message = "Page content updated successfully" });
        }
    }
}
