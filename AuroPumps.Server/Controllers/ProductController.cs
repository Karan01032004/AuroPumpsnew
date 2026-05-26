using AuroPumps.Server.DTOs;
using AuroPumps.Server.Models;
using Microsoft.AspNetCore.Mvc;
using Poweradmin.Server.Data;
using Poweradmin.Server.DTOs;
using Poweradmin.Server.Models;
using System.Net;
using System.Net.Mail;

namespace Poweradmin.Server.Controllers
{
    [Route("api/product")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly AppDbContext _db; 
        public ProductController(AppDbContext db)
        {
            _db = db;
        }
        [HttpGet("list-by-category/{categoryId}")]
        public IActionResult GetProductsByCategory(int categoryId)
        {
            string searchId = categoryId.ToString();

            var products = _db.Product
                .Where(x => x.Visible == true &&
                            x.CategoryId != null &&
                            ("," + x.CategoryId + ",").Contains("," + searchId + ","))
                .OrderBy(x => x.title)
                .Select(x => new
                {
                    id = x.id,
                    name = x.title,
                        image = x.image1,
                        image2=x.image2,
                          x.CategoryId,
                    slug = x.title.Replace(" ", "-").ToLower()
                })
                .ToList();

            return Ok(products);
        }


        private string SaveFile(IFormFile file, string folder)
        {
            var uploadPath = Path.Combine(
                Directory.GetCurrentDirectory(),
                "wwwroot",
                "Webfiles",
                folder
            );

            if (!Directory.Exists(uploadPath))
                Directory.CreateDirectory(uploadPath);

            var fileName = Guid.NewGuid() + Path.GetExtension(file.FileName);
            var filePath = Path.Combine(uploadPath, fileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                file.CopyTo(stream);
            }

            return $"/Webfiles/{folder}/{fileName}";
        }
 
        [HttpGet("by-slug/{slug}")]
        public IActionResult GetBySlug(string slug)
        {
            var product = _db.Product
                .Where(x => x.title.ToLower().Replace(" ", "-") == slug)
                .Select(x => new {
                    x.id,
                    x.title,
                    image2 = x.image2 ?? "",
                    x.description,
                    productSlug = x.title.Replace(" ", "-").ToLower()
                })
                .FirstOrDefault();

            if (product == null)
                return NotFound();

            return Ok(product);
        }

        
        [HttpGet("list")]
        public IActionResult List()
        {
            var products = _db.Product
                .OrderByDescending(x => x.id)
                .Select(x => new
                {
                    id = x.id,
                    productName = x.title,
                    visible = x.Visible,
                    slug = x.title.Replace(" ", "-").ToLower()
                })
                .ToList();

            return Ok(products);
        }
 
        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var productData = _db.Product
      .Where(x => x.id == id)
      .FirstOrDefault();

            if (productData == null)
                return NotFound(new { message = "Product not found" });
            // 2. CategorySlug nikalne ke liye logic (Memory mein)
            string firstCatSlug = "";
            if (!string.IsNullOrEmpty(productData.CategoryId))
            {
                // Pehli ID nikalna safely
                var firstCatIdStr = productData.CategoryId.Split(',').FirstOrDefault();

                if (int.TryParse(firstCatIdStr, out int catId))
                {
                    // Category table se slug uthao
                    firstCatSlug = _db.ProductsCategory
                        .Where(c => c.id == catId)
                        .Select(c => c.title.ToLower().Replace(" ", "-"))
                        .FirstOrDefault() ?? "";
                }
            }
            var product = _db.Product
                .Where(x => x.id == id)
                .Select(x => new
                {
                    x.id,
                    x.title,

                    image1 = x.image1 ?? "",
                    image2 = x.image2 ?? "",
                    //x.image3,
                    catelogue = x.catelogue ?? "",
                    CategoryId = x.CategoryId ?? "",
                    // x.CategoryId,
                    x.description, 
                    Capacity = x.Capacity ?? "",
                    producthead = x.producthead ?? "",
                    productsize = x.productsize ?? "",
                    temperature = x.temperature ?? "",
                    viscosity = x.viscosity ?? "",
                    shaftsealing = x.shaftsealing ?? "",
                    MOC = x.MOC ?? "",
                    pressure = x.pressure ?? "",
                    technicalDetails = x.technicalDetails ?? "",
                    applications = x.applications ?? "",
                    SubmergenceLength = x.SubmergenceLength ?? "",
                    operating_frequency = x.operating_frequency ?? "",
                    material = x.material ?? "",
                    visible = x.Visible,
                    isFeatured = x.isFeatured,
                    isaddcontact = x.isaddcontact,

                    pageIETitle = x.PageIETitle ?? "",
                    meta = x.Meta ?? "",
                    productSlug = x.title.Replace(" ", "-").ToLower(),
                    categorySlug = firstCatSlug
                })
                .FirstOrDefault();

            if (product == null)
                return NotFound(new { message = "Product not found" });

            return Ok(product);
        }

        [HttpPost("send-pdf")]
        public async Task<IActionResult> SendPdf([FromBody] PdfRequestDTO dto)
        {
            var product = _db.Product.FirstOrDefault(x => x.id == dto.ProductId);

            if (product == null)
                return BadRequest("Invalid product");

            // ✅ SAVE TO DB
            var request = new ProductPdfRequest
            {
                ProductId = dto.ProductId,
                Name = dto.Name,
                Email = dto.Email,
                Phone = dto.Phone,
                CompanyName = dto.CompanyName,
                Message = dto.Message
            };

            _db.ProductPdfRequests.Add(request);
            //await _db.SaveChangesAsync();
            try
            {
                await _db.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                // Yahan mouse le jao 'ex' par aur InnerException check karo
                var msg = ex.InnerException?.Message ?? ex.Message;
                return BadRequest(msg);
            }
            // ✅ SEND EMAIL
            var pdfPath = Path.Combine(
                Directory.GetCurrentDirectory(),
                "wwwroot",
                product.catelogue.TrimStart('/')
            );

            if (!System.IO.File.Exists(pdfPath))
                return BadRequest("PDF not found");

            var bytes = await System.IO.File.ReadAllBytesAsync(pdfPath);

            using (var smtp = new SmtpClient("smtp.gmail.com", 587))
            {
                smtp.Credentials = new NetworkCredential("sales.palej@auropumps.com", "mdig soep resa oebr");
                smtp.EnableSsl = true;

                var mail = new MailMessage();
                mail.From = new MailAddress("sales.palej@auropumps.com");
                mail.To.Add(dto.Email);
                mail.Subject = "Product PDF";
                mail.IsBodyHtml = true;
                mail.Body = $@"
<html>
<head>
    <style>
        body {{
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }}
        .container {{
            max-width: 600px;
            margin: auto;
            background: #ffffff;
            padding: 20px;
            border-radius: 8px;
        }}
        .header {{
            background: #2c7a7b;
            color: #ffffff;
            padding: 15px;
            text-align: center;
            border-radius: 8px 8px 0 0;
        }}
        .content {{
            padding: 20px;
            color: #333;
        }}
        .footer {{
            font-size: 12px;
            color: #777;
            text-align: center;
            padding-top: 20px;
        }}
        .btn {{
            display: inline-block;
            padding: 10px 20px;
            background-color: #2c7a7b;
            color: #ffffff !important;
            text-decoration: none;
            border-radius: 5px;
            margin-top: 10px;
        }}
    </style>
</head>
<body>
    <div class='container'>
        
        <div class='header'>
            <h2>Auro Pumps</h2>
        </div>

        <div class='content'>
            <p>Dear <strong>{dto.Name}</strong>,</p>

            <p>Thank you for your interest in our product.</p>

            <p>Please find the requested product catalogue attached to this email.</p>

            <p>If you have any questions or need further assistance, feel free to contact us.</p>

            <p>Best Regards,<br/>
            <strong>Auro Pumps Team</strong></p>
        </div>

        <div class='footer'>
            © {DateTime.Now.Year} Auro Pumps Pvt. Ltd. All rights reserved.
        </div>

    </div>
</body>
</html>
";

                //mail.Body = $"Hello {dto.Name},\n\nPlease find attached PDF.";

                mail.Attachments.Add(new Attachment(new MemoryStream(bytes), "Product.pdf"));

                await smtp.SendMailAsync(mail);
            }

            return Ok(new { message = "Email sent successfully" });
        }
        [HttpGet("pdf-inquiry")]
        public IActionResult GetPdfInquiry()
        {
            var data = _db.ProductPdfRequests
                .OrderByDescending(x => x.Id)
                .Select(x => new
                {
                    id = x.Id,
                    name = x.Name,
                    email = x.Email,
                    phone = x.Phone,
                    companyName = x.CompanyName,
                    message = x.Message,
                    addedDate = x.CreatedAt,
                    productId = x.ProductId,
                    productName = _db.Product
                        .Where(p => p.id == x.ProductId)
                        .Select(p => p.title)
                        .FirstOrDefault()
                })
                .ToList();

            return Ok(data);
        }

        [HttpGet("pdf-inquiry/{id}")]
        public IActionResult GetPdfInquiryById(int id)
        {
            var data = _db.ProductPdfRequests
                .Where(x => x.Id == id)
                .Select(x => new
                {
                    id = x.Id,
                    name = x.Name,
                    email = x.Email,
                    phone = x.Phone,
                    companyName = x.CompanyName,
                    message = x.Message,
                    addedDate = x.CreatedAt,
                    productId = x.ProductId,
                    productName = _db.Product
                        .Where(p => p.id == x.ProductId)
                        .Select(p => p.title)
                        .FirstOrDefault()
                })
                .FirstOrDefault();

            if (data == null)
                return NotFound();

            return Ok(data);
        }

        [HttpDelete("pdf-inquiry-delete/{id}")]
        public IActionResult DeletePdfInquiry(int id)
        {
            var data = _db.ProductPdfRequests.FirstOrDefault(x => x.Id == id);

            if (data == null)
                return NotFound();

            _db.ProductPdfRequests.Remove(data);
            _db.SaveChanges();

            return Ok(new { message = "Deleted successfully" });
        }
        [HttpPost("add")]
        public IActionResult Add(
            [FromForm] ProductDTO dto,
            IFormFile? image1,
            IFormFile image2,
            //IFormFile image3,
            IFormFile? catalogue
        )

        {
            try
            {
                string image1Path = image1 != null ? SaveFile(image1, "products") : null;
                string image2Path = image2 != null ? SaveFile(image2, "products") : null;
                //string image3Path = image3 != null ? SaveFile(image3, "products") : null;
                string cataloguePath = catalogue != null ? SaveFile(catalogue, "catalogue") : null;

                //int maxOrder = _db.Product
                //    .Select(x => (int?)x.sortorder)
                //    .DefaultIfEmpty(0)
                //    .Max() ?? 0;
                int maxOrder = _db.Product.Max(x => (int?)x.sortorder) ?? 0;
                var product = new Product
                {
                    title = dto.title,

                    image1 = image1Path,
                    image2 = image2Path,
                    //image3 = image3Path,
                    catelogue = cataloguePath,


                    description = dto.description,


                    Visible = dto.Visible,
                    isFeatured = dto.isFeatured,
                    isaddcontact = dto.isaddcontact,

                    PageIETitle = dto.PageIETitle,
                    Meta = dto.Meta,
                    CategoryId = dto.CategoryId,
                    Capacity = dto.Capacity,
                    producthead = dto.producthead,
                    productsize = dto.productsize,
                    temperature = dto.temperature,
                    MOC = dto.MOC,
                    technicalDetails = dto.technicalDetails,
                    pressure = dto.pressure,
                    applications = dto.applications,
                    viscosity = dto.viscosity,
                    shaftsealing = dto.shaftsealing,
                    SubmergenceLength = dto.SubmergenceLength,
                    operating_frequency = dto.operating_frequency,
                    material = dto.material,
                    sortorder = maxOrder + 1,
                    addedDate = DateTime.Now,
                    addedIp = HttpContext.Connection.RemoteIpAddress?.ToString()
                };

                _db.Product.Add(product);
                _db.SaveChanges();

                return Ok(new { message = "Product added successfully" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }


        [HttpPut("edit/{id}")]
        public IActionResult Update(
            int id,
            [FromForm] ProductDTO dto,
            IFormFile? image1,
            IFormFile? image2,
            //IFormFile? image3,
            IFormFile? catalogue
        )
        {
            try
            {
                var product = _db.Product.FirstOrDefault(x => x.id == id);
                if (product == null) return NotFound(new { message = "Product not found" });

                // Update Text Fields
                product.title = dto.title;
                product.description = dto.description; 
                product.Capacity = dto.Capacity;
                product.producthead = dto.producthead;
                product.productsize = dto.productsize;
                product.temperature = dto.temperature;
                product.viscosity = dto.viscosity;
                product.shaftsealing = dto.shaftsealing;
                product.MOC = dto.MOC;
                product.technicalDetails = dto.technicalDetails;
                product.pressure = dto.pressure;
                product.applications = dto.applications;
                product.SubmergenceLength = dto.SubmergenceLength;
                product.operating_frequency = dto.operating_frequency;
                product.material = dto.material;
                product.Visible = dto.Visible;
                product.isFeatured = dto.isFeatured;
                product.isaddcontact = dto.isaddcontact;
                product.PageIETitle = dto.PageIETitle;

                product.Meta = dto.Meta;
                product.CategoryId = dto.CategoryId;
                // Metadata for Audit
                product.modifyDate = DateTime.Now;
                product.modifyIp = HttpContext.Connection.RemoteIpAddress?.ToString();

                // Image Handling: Agar nayi file upload hui hai tabhi update karo
                if (image1 != null) product.image1 = SaveFile(image1, "products");
                if (image2 != null) product.image2 = SaveFile(image2, "products");
                //if (image3 != null) product.image3 = SaveFile(image3, "products");
                if (catalogue != null) product.catelogue = SaveFile(catalogue, "catalogue");

                _db.Product.Update(product);
                _db.SaveChanges();

                return Ok(new { message = "Product updated successfully" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }

        [HttpDelete("delete/{id}")]
        public IActionResult Delete(int id)
        {
            var product = _db.Product.FirstOrDefault(x => x.id == id);
            if (product == null)
                return NotFound(new { message = "Product not found" });

            _db.Product.Remove(product);
            _db.SaveChanges();

            return Ok(new { message = "Product deleted successfully" });
        }
    

    }
}
