using Microsoft.AspNetCore.Mvc;
using Poweradmin.Server.Data;
using Poweradmin.Server.DTOs;
using Poweradmin.Server.Models;


namespace Poweradmin.Server.Controllers
{
    [Route("api/category")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly AppDbContext _db;

        public CategoryController(AppDbContext db)
        {
            _db = db;
        } 
        [HttpPost("add")]
        public IActionResult AddCategory(CategoryDTO dto)
        {
            if (string.IsNullOrWhiteSpace(dto.title))
            {
                return BadRequest(new { message = "Category title is required" });
            }

            var category = new Category
            {
                title = dto.title,
                isvisible = dto.isvisible,
                shortorder = 0,
                created_at = DateTime.Now
            };

            _db.Category.Add(category);
            _db.SaveChanges();

            return Ok(new
            {
                message = "Category added successfully",
                categoryId = category.id
            });
        }

        [HttpGet("list")]
        public IActionResult GetCategories()
        {
            var categories = _db.Category
                .OrderByDescending(x => x.id)
                .Select(x => new
                {
                    id = x.id,
                    categoryName = x.title,
                    visible = x.isvisible,
                     slug = x.title.ToLower().Replace(" ", "-")
                })
                .ToList();

            return Ok(categories);
        }
         
        [HttpDelete("delete/{id}")]
        public IActionResult DeleteCategory(int id)
        {
            var category = _db.Category.FirstOrDefault(x => x.id == id);
            if (category == null)
                return NotFound(new { message = "Category not found" });

            _db.Category.Remove(category);
            _db.SaveChanges();

            return Ok(new { message = "Category deleted successfully" });
        }
   
        [HttpGet("{id}")]
        public IActionResult GetCategoryById(int id)
        {
            var category = _db.Category.FirstOrDefault(x => x.id == id);

            if (category == null)
                return NotFound(new { message = "Category not found" });

            return Ok(new
            {
                id = category.id,
                title = category.title,
                isvisible = category.isvisible
            });
        } 
        [HttpPut("update/{id}")]
        public IActionResult UpdateCategory(int id, CategoryDTO dto)
        {
            var category = _db.Category.FirstOrDefault(x => x.id == id);

            if (category == null)
                return NotFound(new { message = "Category not found" });

            if (string.IsNullOrWhiteSpace(dto.title))
                return BadRequest(new { message = "Category title is required" });

            category.title = dto.title;
            category.isvisible = dto.isvisible;

            _db.SaveChanges();

            return Ok(new { message = "Category updated successfully" });
        } 
    }
}
