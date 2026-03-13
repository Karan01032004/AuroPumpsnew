namespace Poweradmin.Server.Models
{
    public class PageContent
    {
        public int Id { get; set; }
        public string Title { get; set; } = null!;
        public string Page_Name { get; set; } = null!;
        public string? Meta_Tags { get; set; }
        public string? Description { get; set; }
        public DateTime Created_Date { get; set; }
    }
}
