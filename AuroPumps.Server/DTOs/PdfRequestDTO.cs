namespace AuroPumps.Server.DTOs
{
    public class PdfRequestDTO
    {
        public int ProductId { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string CompanyName { get; set; }
        public string Message { get; set; }
    }
}
