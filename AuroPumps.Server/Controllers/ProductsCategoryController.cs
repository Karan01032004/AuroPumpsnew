using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Poweradmin.Server.Data;
using Poweradmin.Server.DTOs;
using Poweradmin.Server.Models;

namespace Poweradmin.Server.Controllers
{
    [Route("api/ProductsCategory")]
    [ApiController]
    public class ProductsCategoryController : ControllerBase
    {
        private readonly AppDbContext _db;
        public ProductsCategoryController(AppDbContext db) 
        { 
            _db = db; 
        }

        [HttpGet("category-list")]
        public IActionResult GettCategories()
        {
            var categories = _db.ProductsCategory
                .Where(x => x.isvisible) // sirf visible
                .OrderBy(x => x.id)
                .Select(x => new
                {
                    id = x.id,
                    title = x.title
                })
                .ToList();

            return Ok(categories);
        }

        #region Poweradmin
        [HttpPost("add")]
        public IActionResult AddCategory(ProductsCategoryDTO dto)
        {
            if (string.IsNullOrWhiteSpace(dto.title))
            {
                return BadRequest(new { message = "title is required" });
            }
            var category = new ProductsCategory
            {
                title = dto.title,
                isvisible = dto.isvisible,
                created_at = DateTime.Now
            };
            _db.ProductsCategory.Add(category);
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
            var categories = _db.ProductsCategory
                .OrderByDescending(x => x.id)
                .Select(x => new
                {
                    id = x.id,
                    categoryName = x.title,
                    visible = x.isvisible
                })
                .ToList();

            return Ok(categories);
        }
        [HttpDelete("delete/{id}")]
        public IActionResult DeleteCategory(int id)
        {
            var category = _db.ProductsCategory.FirstOrDefault(x => x.id == id);
            if (category == null)
                return NotFound(new { message = "Category not found" });

            _db.ProductsCategory.Remove(category);
            _db.SaveChanges();

            return Ok(new { message = "Category deleted successfully" });
        }
        [HttpGet("{id}")]
        public IActionResult GetCategoryById(int id)
        {
            var category = _db.ProductsCategory.FirstOrDefault(x => x.id == id);

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
            var category = _db.ProductsCategory.FirstOrDefault(x => x.id == id);

            if (category == null)
                return NotFound(new { message = "Category not found" });

            if (string.IsNullOrWhiteSpace(dto.title))
                return BadRequest(new { message = "Category title is required" });

            category.title = dto.title;
            category.isvisible = dto.isvisible;

            _db.SaveChanges();

            return Ok(new { message = "Category updated successfully" });
        }
        #endregion


    }
}
