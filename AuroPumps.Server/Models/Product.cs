using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Poweradmin.Server.Models
{
    [Table("Product")]
    public class Product
    {
        [Key]
        public int id { get; set; } 
        public string title { get; set; } 
        public string? image1 { get; set; }
        public string image2 { get; set; }
        //public string image3 { get; set; } 
        //public string technicalDetails { get; set; }
        public string description { get; set; }
        //public string MOC { get; set; }
        //public string applications { get; set; }

        public string? catelogue { get; set; }   // PDF path  
        public bool? Visible { get; set; }      // Display on frontend
        public int? sortorder { get; set; }

        public DateTime? addedDate { get; set; }
        public string addedIp { get; set; }

        public DateTime? modifyDate { get; set; }
        public string? modifyIp { get; set; }

        public bool? isFeatured { get; set; }
        public bool? isaddcontact { get; set; }

        public string? PageIETitle { get; set; }  // Browser Title
        public string? Meta { get; set; }         // Meta tags (multiline)
        public string? CategoryId { get; set; }
        public string? Capacity { get; set; }
        public string? producthead { get; set; }
        public string? productsize { get; set; }
        public string? temperature { get; set; }
        public string? viscosity { get; set; }
        public string? SubmergenceLength { get; set; }

        public string? operating_frequency { get; set; }
        public string? material { get; set; }
    }
}
