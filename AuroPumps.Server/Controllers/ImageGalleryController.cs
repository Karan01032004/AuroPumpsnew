using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Poweradmin.Server.Data;
using Poweradmin.Server.DTOs;
using Poweradmin.Server.Models;

namespace Poweradmin.Server.Controllers
{
    [Route("api/imagegallery")]
    [ApiController]
    public class ImageGalleryController : ControllerBase
    {
        private readonly AppDbContext _db;

        public ImageGalleryController(AppDbContext db)
        {
            _db = db;
        }

        // ✅ GET CATEGORY DROPDOWN
        [HttpGet("categories")]
        public IActionResult GetCategories()
        {
            var categories = _db.Category
                .Where(x => x.isvisible)
                .Select(x => new
                {
                    id = x.id,
                    title = x.title
                })
                .ToList();

            return Ok(categories);
        }

        // ✅ LIST GALLERY

        [HttpGet("list")]
        public IActionResult GetGalleryList()
        {
            var list = (from g in _db.ImageGallery
                        join c in _db.Category on g.catid equals c.id
                        orderby g.id descending
                        select new
                        {
                            g.id,
                            g.title,
                            g.image,
                            g.displayonfrontend,
                            g.watermark_on_image,
                            category = c.title
                        }).ToList();

            return Ok(list);
        }

        // ✅ GET BY ID
        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var item = _db.ImageGallery.FirstOrDefault(x => x.id == id);

            if (item == null)
                return NotFound(new { message = "Image not found" });

            return Ok(item);
        }

        [HttpPost("add")]
        public IActionResult Add([FromForm] ImageGalleryDTO dto, IFormFile imageFile)
        {
            if (imageFile == null)
                return BadRequest(new { message = "Image is required" });

            var fileName = Guid.NewGuid() + Path.GetExtension(imageFile.FileName);
            var path = Path.Combine("./wwwroot/Webfiles/gallery", fileName);

            using (var stream = new FileStream(path, FileMode.Create))
            {
                imageFile.CopyTo(stream);
            }

            int maxOrder = _db.ImageGallery.Max(x => (int?)x.shortorder) ?? 0;

            var gallery = new ImageGallery
            {
                title = dto.title,
                catid = dto.catid,
                image =   fileName,
                displayonfrontend = dto.displayonfrontend,
                watermark_on_image = dto.watermark_on_image,
                shortorder = maxOrder + 1
            }; 
            _db.ImageGallery.Add(gallery);
            _db.SaveChanges();

            return Ok(new { message = "Image added successfully" });
        }
        // ✅ UPDATE IMAGE (Multipart/Form-Data support ke saath)
        [HttpPut("update/{id}")]
        public IActionResult Update(int id, [FromForm] ImageGalleryDTO dto, IFormFile imageFile)
        {
            var gallery = _db.ImageGallery.FirstOrDefault(x => x.id == id);
            if (gallery == null)
                return NotFound(new { message = "Image not found" });

            // Agar nayi file upload ki hai toh purani replace karo
            if (imageFile != null)
            {
                var fileName = Guid.NewGuid() + Path.GetExtension(imageFile.FileName);
                var path = Path.Combine("./wwwroot/Webfiles/gallery", fileName);

                using (var stream = new FileStream(path, FileMode.Create))
                {
                    imageFile.CopyTo(stream);
                }
                gallery.image = fileName; // Naya filename save karo
            } 
            gallery.title = dto.title;
            gallery.catid = dto.catid;
            gallery.displayonfrontend = dto.displayonfrontend;
            gallery.watermark_on_image = dto.watermark_on_image;

            _db.SaveChanges();
            return Ok(new { message = "Image updated successfully" });
        }

        // ✅ UPDATE IMAGE
        //[HttpPut("update/{id}")]
        //public IActionResult Update(int id, ImageGalleryDTO dto)
        //{
        //    var gallery = _db.ImageGallery.FirstOrDefault(x => x.id == id);
        //    if (gallery == null)
        //        return NotFound(new { message = "Image not found" });

        //    gallery.title = dto.title;
        //    gallery.catid = dto.catid;
        //    gallery.image = dto.image;
        //    gallery.displayonfrontend = dto.displayonfrontend;
        //    gallery.watermark_on_image = dto.watermark_on_image;

        //    _db.SaveChanges();

        //    return Ok(new { message = "Image updated successfully" });
        //}

        // ✅ DELETE IMAGE
        [HttpDelete("delete/{id}")]
        public IActionResult Delete(int id)
        {
            var gallery = _db.ImageGallery.FirstOrDefault(x => x.id == id);
            if (gallery == null)
                return NotFound(new { message = "Image not found" });

            _db.ImageGallery.Remove(gallery);
            _db.SaveChanges();

            return Ok(new { message = "Image deleted successfully" });
        }
    }
}
