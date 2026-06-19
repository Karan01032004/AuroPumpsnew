using Poweradmin.Server.Models;

namespace AuroPumps.Server.Models
{
    public class ApplicationFAQ
    {
        public int id { get; set; }

        public int Applicationid { get; set; }

        public string question { get; set; }

        public string? answer { get; set; }

        public int sort_order { get; set; }

        public bool? visible { get; set; }

        

        public virtual Application Application { get; set; }
    }
}
