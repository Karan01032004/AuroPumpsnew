using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Poweradmin.Server.Models
{
    [Table("ProductsCategory")]
    public class ProductsCategory
    {
        [Key]
        public int id { get; set; }

        [Required]
        [StringLength(255)]
        public string title { get; set; }

        public bool isvisible { get; set; } = true; 
        public DateTime created_at { get; set; } = DateTime.Now;
    }
}
