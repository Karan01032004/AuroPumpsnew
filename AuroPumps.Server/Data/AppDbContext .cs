using Microsoft.EntityFrameworkCore;
using Poweradmin.Server.Models;

namespace Poweradmin.Server.Data
{
    public class AppDbContext: DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options) { }

        public DbSet<Admin> Admin { get; set; }
        public DbSet<Category> Category { get; set; }
        public DbSet<ImageGallery> ImageGallery { get; set; }

        public DbSet<Product> Product { get; set; }
        public DbSet<Inquiry> inquiry { get; set; }
        public DbSet<PageContent> pagecontent { get; set; }
        public DbSet<ProductsCategory> ProductsCategory { get; set; }
        public DbSet<Application> Application { get; set; }
    }
}
