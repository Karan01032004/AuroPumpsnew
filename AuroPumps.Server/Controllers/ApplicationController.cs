using AuroPumps.Server.DTOs;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Poweradmin.Server.Data;
using Poweradmin.Server.Models;

namespace AuroPumps.Server.Controllers
{
    [Route("api/application")]
    [ApiController]
    public class ApplicationController : ControllerBase
    {
        private readonly AppDbContext _db;
        private readonly IWebHostEnvironment _env;

        public ApplicationController(AppDbContext db, IWebHostEnvironment env)
        {
            _db = db;
            _env = env;
        }

        // 🔥 FILE SAVE HELPER
        private string SaveFile(IFormFile file, string folder)
        {
            var uploads = Path.Combine(_env.WebRootPath, "Webfiles", folder);
            if (!Directory.Exists(uploads))
                Directory.CreateDirectory(uploads);

            var fileName = Guid.NewGuid() + Path.GetExtension(file.FileName);
            var filePath = Path.Combine(uploads, fileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                file.CopyTo(stream);
            }

            return $"/Webfiles/{folder}/{fileName}";
        }

        // ✅ ADD
        [HttpPost("add")]
        public IActionResult Add(
            [FromForm] ApplicationDTO dto,
            IFormFile? image1,
            IFormFile? image2,
            IFormFile? image3,
            IFormFile? image4,
            IFormFile? image5,
            IFormFile? image6,
            IFormFile? image7,
            IFormFile? image8
        )
        {
            try
            {
                var app = new Application
                {
                    title = dto.title,
                    description = dto.description,
                    product_ids = dto.product_ids,
                    Visible = dto.Visible,

                    image1 = image1 != null ? SaveFile(image1, "applications") : null,
                    image2 = image2 != null ? SaveFile(image2, "applications") : null,
                    image3 = image3 != null ? SaveFile(image3, "applications") : null,
                    image4 = image4 != null ? SaveFile(image4, "applications") : null,
                    image5 = image5 != null ? SaveFile(image5, "applications") : null,
                    image6 = image6 != null ? SaveFile(image6, "applications") : null,
                    image7 = image7 != null ? SaveFile(image7, "applications") : null,
                    image8 = image8 != null ? SaveFile(image8, "applications") : null
                };

                _db.Application.Add(app);
                _db.SaveChanges();

                return Ok(new { message = "Application added successfully" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }

        // ✅ LIST
        [HttpGet("list")]
        public IActionResult List()
        {
            var data = _db.Application
                .OrderByDescending(x => x.id)
                .Select(x => new
                {
                    x.id,
                    x.title,
                    x.description,
                    x.product_ids,
                    x.Visible,
                    x.image1,
                    x.image2,
                    x.image3,
                    x.image4,
                    x.image5,
                    x.image6,
                    x.image7,
                    x.image8
                })
                .ToList();

            return Ok(data);
        }

        // ✅ GET BY ID
        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var app = _db.Application
                .Where(x => x.id == id)
                .Select(x => new
                {
                    x.id,
                    x.title,
                    x.description,
                    x.product_ids,
                    x.Visible,
                    x.image1,
                    x.image2,
                    x.image3,
                    x.image4,
                    x.image5,
                    x.image6,
                    x.image7,
                    x.image8
                })
                .FirstOrDefault();

            if (app == null)
                return NotFound(new { message = "Application not found" });

            return Ok(app);
        }

        // ✅ UPDATE
        [HttpPut("update/{id}")]
        public IActionResult Update(
            int id,
            [FromForm] ApplicationDTO dto,
            IFormFile? image1,
            IFormFile? image2,
            IFormFile? image3,
            IFormFile? image4,
            IFormFile? image5,
            IFormFile? image6,
            IFormFile? image7,
            IFormFile? image8
        )
        {
            try
            {
                var app = _db.Application.FirstOrDefault(x => x.id == id);

                if (app == null)
                    return NotFound(new { message = "Application not found" });

                app.title = dto.title;
                app.description = dto.description;
                app.product_ids = dto.product_ids;
                app.Visible = dto.Visible;

                // 🔥 only update if new image uploaded
                if (image1 != null) app.image1 = SaveFile(image1, "applications");
                if (image2 != null) app.image2 = SaveFile(image2, "applications");
                if (image3 != null) app.image3 = SaveFile(image3, "applications");
                if (image4 != null) app.image4 = SaveFile(image4, "applications");
                if (image5 != null) app.image5 = SaveFile(image5, "applications");
                if (image6 != null) app.image6 = SaveFile(image6, "applications");
                if (image7 != null) app.image7 = SaveFile(image7, "applications");
                if (image8 != null) app.image8 = SaveFile(image8, "applications");

                _db.SaveChanges();

                return Ok(new { message = "Application updated successfully" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }
        [HttpDelete("delete/{id}")]
        public IActionResult Delete(int id)
        {
            var app = _db.Application.FirstOrDefault(x => x.id == id);

            if (app == null)
                return NotFound(new { message = "Application not found" });

            _db.Application.Remove(app);
            _db.SaveChanges();

            return Ok(new { message = "Deleted successfully" });
        }
    }
}
