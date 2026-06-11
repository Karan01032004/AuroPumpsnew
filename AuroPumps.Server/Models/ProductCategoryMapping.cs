using Poweradmin.Server.Models;
using System.ComponentModel.DataAnnotations.Schema;

namespace AuroPumps.Server.Models
{
    public class ProductCategoryMapping
    {
        public int id { get; set; }
        public int product_id { get; set; }
        public int category_id { get; set; }
        public int sortorder { get; set; }
        public DateTime created_at { get; set; }

        // Navigation properties (Agar EF Relations use kar rahe ho)
        [ForeignKey("product_id")]
        public virtual Product Product { get; set; }
    }
}
