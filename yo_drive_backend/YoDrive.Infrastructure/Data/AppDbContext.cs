using Microsoft.EntityFrameworkCore;
using YoDrive.Domain.Entities;
using YoDrive.Domain.Enums;

namespace YoDrive.Infrastructure.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) 
        : base(options)
    {
        
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


    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<CarBrand>()
            .HasMany(e => e.CarModels)
            .WithOne(cm => cm.CarBrand)
            .HasForeignKey(cm => cm.CarBrandId)
            .HasPrincipalKey(e => e.Id)
            .OnDelete(DeleteBehavior.Restrict);
        
        modelBuilder.Entity<CarModel>()
            .HasOne(e => e.CarBrand)
            .WithMany(cb => cb.CarModels)
            .HasForeignKey(e => e.CarBrandId)
            .HasPrincipalKey(cb => cb.Id)
            .OnDelete(DeleteBehavior.Cascade);
        
        modelBuilder.Entity<Role>()
            .HasMany(e => e.Users)
            .WithOne(u => u.Role)
            .HasForeignKey(u => u.RoleId)
            .HasPrincipalKey(e => e.Id);
        
        modelBuilder.Entity<Car>()
            .HasOne(e => e.CarModel)
                .WithMany(cm => cm.Cars)
                .HasForeignKey(e => e.ModelId)
                .HasPrincipalKey(cm => cm.Id)
                .OnDelete(DeleteBehavior.Restrict);
        modelBuilder.Entity<Car>()
            .HasOne(e => e.CarClass)
            .WithMany(cc => cc.Cars)
            .HasForeignKey(e => e.ClassId)
            .HasPrincipalKey(cc => cc.Id)
            .OnDelete(DeleteBehavior.Restrict);
        modelBuilder.Entity<Car>()
            .HasOne(e => e.Filial)
            .WithMany(f => f.Cars)
            .HasForeignKey(e => e.FilialId)
            .HasPrincipalKey(f => f.Id)
            .OnDelete(DeleteBehavior.Restrict);
        
        modelBuilder.Entity<CarClass>()
            .HasMany(e => e.Cars)
            .WithOne(c => c.CarClass)
            .HasForeignKey(c => c.ClassId)
            .HasPrincipalKey(e => e.Id)
            .OnDelete(DeleteBehavior.Restrict);
        
        modelBuilder.Entity<Feedback>()
            .HasOne(e => e.Rent)
            .WithOne(r => r.Feedback)
            .HasForeignKey<Feedback>(e => e.RentId)
            .HasPrincipalKey<Rent>(r => r.Id)
            .OnDelete(DeleteBehavior.Cascade);
        
        modelBuilder.Entity<Filial>()
            .HasMany(e => e.Cars)
            .WithOne(c => c.Filial)
            .HasForeignKey(c => c.FilialId)
            .HasPrincipalKey(e => e.Id)
            .OnDelete(DeleteBehavior.Restrict);
        
        modelBuilder.Entity<User>()
            .HasOne(e => e.Role)
            .WithMany(r => r.Users)
            .HasForeignKey(e => e.RoleId)
            .HasPrincipalKey(r => r.Id)
            .OnDelete(DeleteBehavior.Restrict);
        
        modelBuilder.Entity<Rent>()
            .HasOne(e => e.User)
                .WithMany(u => u.Rents)
                .HasForeignKey(e => e.UserId)
                .HasPrincipalKey(u => u.Id)
                .OnDelete(DeleteBehavior.Restrict);
        modelBuilder.Entity<Rent>()
            .HasOne(e => e.Car)
            .WithMany(c => c.Rents)
            .HasForeignKey(e => e.CarId)
            .HasPrincipalKey(c => c.Id)
            .OnDelete(DeleteBehavior.Restrict);


        var initialDate = new DateTime(2024, 04, 05, 0, 0, 0, 0, DateTimeKind.Utc);
        
        modelBuilder.Entity<Role>().HasData(new List<Role>()
        {
            new() { Id = 1, IsDeleted = false, CreatedAt = initialDate, UpdatedAt = initialDate, RoleName = "Admin", RoleType = RolesEnum.Admin },
            new() { Id = 2, IsDeleted = false, CreatedAt = initialDate, UpdatedAt = initialDate, RoleName = "Client", RoleType = RolesEnum.Client }
        });
    }
}