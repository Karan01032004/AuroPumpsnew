using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Poweradmin.Server.Data;
using Poweradmin.Server.DTOs;
using Poweradmin.Server.Models;
using System.Net;
using System.Net.Mail;

namespace Poweradmin.Server.Controllers
{
    [Route("api/inquiry")]
    [ApiController]
    public class InquiryController : ControllerBase
    {
        private readonly AppDbContext _db;

        public InquiryController(AppDbContext db)
        {
            _db = db;
        }

        [HttpPost("submit")]
        public async Task<IActionResult> SubmitInquiry([FromBody] InquiryDTO dto)
        {
            if (dto == null)
            {
                return BadRequest("Invalid Data");
            }

            try
            {
                Inquiry inquiry = new Inquiry
                {
                    Name = dto.Name,
                    CompanyName = dto.CompanyName,
                    Email = dto.Email,
                    Phone = dto.Phone,
                    Message = dto.Message,
                    AddedDate = DateTime.Now
                };

                _db.inquiry.Add(inquiry);
                await _db.SaveChangesAsync();

                // Send Email
                SendInquiryEmail(dto);

                return Ok(new
                {
                    success = true,
                    message = "Inquiry submitted successfully"
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        private void SendInquiryEmail(InquiryDTO dto)
        {
            try
            {
                string fromEmail = "sales.palej@auropumps.com";
                string password = "mdig soep resa oebr";
                string toEmail = "sales.palej@auropumps.com";

                MailMessage mail = new MailMessage();
                mail.From = new MailAddress(fromEmail);
                mail.To.Add(toEmail);
                mail.Subject = "New Inquiry Received";
                mail.IsBodyHtml = true;

                mail.Body = $@"
<html>
<head>
    <style>
        body {{
            font-family: Arial, sans-serif;
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
            background: #1e3a8a;
            color: #ffffff;
            padding: 15px;
            text-align: center;
            border-radius: 8px 8px 0 0;
        }}
        .content {{
            padding: 20px;
            color: #333;
        }}
        .field {{
            margin-bottom: 10px;
        }}
        .label {{
            font-weight: bold;
            color: #555;
        }}
        .message-box {{
            margin-top: 15px;
            padding: 15px; 
            border-radius: 6px;
        }}
        .footer {{
            font-size: 12px;
            color: #888;
            text-align: center;
            margin-top: 20px;
        }}
    </style>
</head>

<body>
    <div class='container'>

        <div class='header'>
            <h2>📩 New Inquiry</h2>
        </div>

        <div class='content'>

            <div class='field'>
                <span class='label'>Name:</span> {dto.Name}
            </div>

            <div class='field'>
                <span class='label'>Company:</span> {dto.CompanyName}
            </div>

            <div class='field'>
                <span class='label'>Email:</span> {dto.Email}
            </div>

            <div class='field'>
                <span class='label'>Phone:</span> {dto.Phone}
            </div>

            <div class='message-box'>
                <span class='label'>Message:</span><br/>
                {dto.Message}
            </div>

        </div>

        <div class='footer'>
            Received on {DateTime.Now:dd MMM yyyy hh:mm tt}
        </div>

    </div>
</body>
</html>
";

                //                mail.Body = $@"
                //New Inquiry Received

                //Name: {dto.Name}
                //Company: {dto.CompanyName}
                //Email: {dto.Email}
                //Phone: {dto.Phone}

                //Message:
                //{dto.Message}
                //";

                SmtpClient smtp = new SmtpClient("smtp.gmail.com", 587);
                smtp.Credentials = new NetworkCredential(fromEmail, password);
                smtp.EnableSsl = true;

                smtp.Send(mail);
            }
            catch
            {
                // Email fail ho jaye to bhi form save ho chuka hai
            }
        }

        #region Poweradmin
        // ===============================
        // ✅ GET ALL inquiry (Admin List)
        // ===============================
        [HttpGet]
        [Route("getall")]
        public async Task<IActionResult> GetAllinquiry()
        {
            var data = await _db.inquiry
                .OrderByDescending(x => x.ID)
                .Select(x => new InquiryDTO
                {
                    ID = x.ID,
                    Name = x.Name,
                    CompanyName = x.CompanyName,
                    City = x.City,
                    Email = x.Email,
                    Phone = x.Phone,
                    Message = x.Message,
                    AddedDate = x.AddedDate
                })
                .ToListAsync();

            return Ok(data);
        }

        // ===============================
        // ✅ GET INQUIRY BY ID
        // ===============================
        [HttpGet]
        [Route("getbyid/{id}")]
        public async Task<IActionResult> GetInquiryById(int id)
        {
            var inquiry = await _db.inquiry
                .Where(x => x.ID == id)
                .Select(x => new InquiryDTO
                {
                    ID = x.ID,
                    Name = x.Name,
                    CompanyName = x.CompanyName,
                    City = x.City,
                    Email = x.Email,
                    Phone = x.Phone,
                    Message = x.Message,
                    AddedDate = x.AddedDate
                })
                .FirstOrDefaultAsync();

            if (inquiry == null)
                return NotFound("Inquiry not found");

            return Ok(inquiry);
        }
 
        [HttpPost]
        [Route("add")]
        public async Task<IActionResult> AddInquiry([FromBody] InquiryDTO model)
        {
            Inquiry inquiry = new Inquiry
            {
                Name = model.Name,
                CompanyName = model.CompanyName,
                City = model.City,
                Email = model.Email,
                Phone = model.Phone,
                Message = model.Message,
                AddedDate = DateTime.Now
            };

            _db.inquiry.Add(inquiry);
            await _db.SaveChangesAsync();

            return Ok(new { message = "Inquiry added successfully" });
        }

        // ===============================
        // ✅ DELETE INQUIRY (Admin)
        // ===============================
        [HttpDelete]
        [Route("delete/{id}")]
        public async Task<IActionResult> DeleteInquiry(int id)
        {
            var inquiry = await _db.inquiry.FindAsync(id);
            if (inquiry == null)
                return NotFound("Inquiry not found");

            _db.inquiry.Remove(inquiry);
            await _db.SaveChangesAsync();

            return Ok(new { message = "Inquiry deleted successfully" });
        }
        #endregion
    }
}

