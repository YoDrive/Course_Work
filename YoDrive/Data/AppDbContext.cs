using Microsoft.EntityFrameworkCore;
using YoDrive.Domain.Models;

namespace YoDrive.Domain.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
        // Database.EnsureDeleted();
        // Database.EnsureCreated();
    }   
    
    public DbSet<CarBrand> CarBrand { get; set; }
    public DbSet<Role> Role { get; set; }
    public DbSet<Car> Car { get; set; }
    public DbSet<CarClass> CarClass { get; set; }
    public DbSet<CarModel> CarModel { get; set; }
    public DbSet<Feedback> Feedback { get; set; }
    public DbSet<Filial> Filial { get; set; }
    public DbSet<User> User { get; set; }
    public DbSet<Token> Token { get; set; }
    public DbSet<Rent> Rent { get; set; }
}