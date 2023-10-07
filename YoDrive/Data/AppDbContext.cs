using Microsoft.EntityFrameworkCore;
using YoDrive.Domain.Models;

namespace YoDrive.Domain.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
        // Database.EnsureDeleted();
        Database.EnsureCreated();
    }   
    
    public DbSet<CarBrand> CarBrand { get; set; }
    public DbSet<Role> Role { get; set; }
    public DbSet<User> User { get; set; }
}