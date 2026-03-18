using System.ComponentModel.DataAnnotations;

namespace Poweradmin.Server.DTOs
{
    public class ProductDTO
    {
         
        public string? title { get; set; }

        public bool? Visible { get; set; }
        public bool? isFeatured { get; set; }
        public bool? isaddcontact { get; set; }

        public string? PageIETitle { get; set; }
        public string? Meta { get; set; }

        public string? technicalDetails { get; set; }
        public string? description { get; set; }
        public string? MOC { get; set; }
        public string? applications { get; set; }
        public string? Capacity { get; set; }
        public string? producthead { get; set; }
        public string? productsize { get; set; }
        public string? temperature { get; set; }
        public string? viscosity { get; set; }
        public string? SubmergenceLength { get; set; }
        public string? operating_frequency { get; set; }
        public string? material { get; set; }
        public string? CategoryId { get; set; }
    }
}
