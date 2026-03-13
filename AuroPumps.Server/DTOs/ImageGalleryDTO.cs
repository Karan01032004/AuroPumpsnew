namespace Poweradmin.Server.DTOs
{
    public class ImageGalleryDTO
    {
        public int catid { get; set; }
        public string title { get; set; }
        public string? image { get; set; }
        public bool displayonfrontend { get; set; }
        public bool watermark_on_image { get; set; }

    }
}
