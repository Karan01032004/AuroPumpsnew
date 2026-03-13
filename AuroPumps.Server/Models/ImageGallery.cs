using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Poweradmin.Server.Models
{
    [Table("imagesgallery")]
    public class ImageGallery
    {
        [Key]
        public int id { get; set; }

        public bool displayonfrontend { get; set; } = true;

        [Required]
        public int catid { get; set; }

        [Required]
        [StringLength(255)]
        public string title { get; set; }

        [Required]
        [StringLength(500)]
        public string image { get; set; }

        public bool watermark_on_image { get; set; } = false;

        public int shortorder { get; set; } = 0;

        public DateTime created_at { get; set; } = DateTime.Now;
    }
}
