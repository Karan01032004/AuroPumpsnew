namespace Poweradmin.Server.DTOs
{
    public class InquiryDTO
    {
        public int ID { get; set; }
        public string? Name { get; set; }
        public string? CompanyName { get; set; }
        public string? City { get; set; }
        public string? Email { get; set; }
        public string? Phone { get; set; }
        public string? Message { get; set; }
        public DateTime? AddedDate { get; set; }
    }
}
