namespace AuroPumps.Server.Models
{
    public class ProductPdfRequest
    {
        public int Id { get; set; }
        public int ProductId { get; set; }

        public string Name { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string CompanyName { get; set; }
        public string Message { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.Now;
    }
}
