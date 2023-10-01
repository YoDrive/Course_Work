using Microsoft.EntityFrameworkCore;
using YoCars.Domain.Models;

namespace YoCars.Domain.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
        Database.EnsureCreated();
    }   
    
    public DbSet<CarBrand> CarBrand { get; set; }
    public DbSet<Role> Role { get; set; }
    public DbSet<User> User { get; set; }
}