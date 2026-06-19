namespace AuroPumps.Server.DTOs
{
    public class ApplicationFAQDTO
    {
        public int? id { get; set; }

        public string question { get; set; }

        public string? answer { get; set; }

        public int sort_order { get; set; }

        public bool? visible { get; set; }
    }
}
