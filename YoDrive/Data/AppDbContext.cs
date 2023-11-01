using Microsoft.EntityFrameworkCore;
using YoDrive.Domain.Models;

namespace YoDrive.Domain.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
        //Database.EnsureDeleted();
        Database.EnsureCreated();
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
        modelBuilder.Entity<CarModel>(entity =>
        {
            entity.ToTable("car_model"); 
            entity.HasComment("Модель автомобиля"); 
            entity.HasKey(e => e.CarModelId); 

            entity.Property(e => e.CarModelId)
                .HasColumnName("car_model_id")
                .HasComment("ID модели автомобиля"); 

            entity.Property(e => e.CarBrandId)
                .HasColumnName("car_brand_id")
                .HasComment("ID бренда автомобиля");

            entity.Property(e => e.ModelName)
                .HasColumnName("model_name")
                .HasMaxLength(100)
                .HasComment("Название модели автомобиля");

            entity.Property(e => e.IsDeleted)
                .HasColumnName("is_deleted")
                .HasComment("Флаг удаления");

            entity.HasOne(e => e.CarBrand)
                .WithMany(cb => cb.CarModels)
                .HasForeignKey(e => e.CarBrandId)
                .HasPrincipalKey(cb => cb.CarBrandId)
                .OnDelete(DeleteBehavior.Cascade);
        });

        modelBuilder.Entity<CarBrand>(entity =>
        {
            entity.ToTable("car_brand");
            entity.HasComment("Марка автомобиля");

            entity.HasKey(e => e.CarBrandId);
            entity.Property(e => e.CarBrandId)
                .HasColumnName("car_brand_id")
                .HasComment("ID марки автомобиля");

            entity.Property(e => e.Name)
                .IsRequired()
                .HasColumnName("name")
                .HasColumnType("varchar(100)")
                .HasComment("Название марки автомобиля");

            entity.Property(e => e.IsDeleted)
                .IsRequired()
                .HasColumnName("is_deleted")
                .HasComment("Флаг удаления");

            entity.HasMany(e => e.CarModels)
                .WithOne(cm => cm.CarBrand)
                .HasForeignKey(cm => cm.CarBrandId)
                .HasPrincipalKey(e => e.CarBrandId)
                .OnDelete(DeleteBehavior.Restrict);
        });
        
        modelBuilder.Entity<Role>(entity =>
        {
            entity.ToTable("role");
            entity.HasComment("Роль пользователя");

            entity.HasKey(e => e.RoleId);
            entity.Property(e => e.RoleId)
                .HasColumnName("role_id")
                .HasComment("ID роли");

            entity.Property(e => e.RoleName)
                .IsRequired()
                .HasMaxLength(30)
                .HasColumnName("role_name")
                .HasComment("Название роли");

            entity.HasMany(e => e.Users)
                .WithOne(u => u.Role)
                .HasForeignKey(u => u.RoleId)
                .HasPrincipalKey(e => e.RoleId);
        });
        
        modelBuilder.Entity<Car>(entity =>
        {
            entity.ToTable("car");
            entity.HasComment("Автомобиль");

            entity.HasKey(e => e.CarId);
            entity.Property(e => e.CarId)
                .HasColumnName("car_id")
                .HasComment("ID автомобиля");

            entity.Property(e => e.ModelId)
                .HasColumnName("model_id")
                .HasComment("ID модели автомобиля");

            entity.Property(e => e.ClassId)
                .HasColumnName("class_id")
                .HasComment("ID класса автомобиля");

            entity.Property(e => e.FilialId)
                .HasColumnName("filial_id")
                .HasComment("ID филиала автомобиля");

            entity.Property(e => e.StateNumber)
                .IsRequired()
                .HasMaxLength(12)
                .HasColumnName("state_number")
                .HasComment("Государственный номер автомобиля");

            entity.Property(e => e.GearBox)
                .IsRequired()
                .HasColumnName("gear_box")
                .HasColumnType("smallint")
                .HasComment("Тип коробки передач");

            entity.Property(e => e.CostDay)
                .IsRequired()
                .HasColumnType("money")
                .HasColumnName("cost_day")
                .HasComment("Стоимость аренды в день");

            entity.Property(e => e.CarImage)
                .HasMaxLength(255)
                .HasColumnName("car_image")
                .HasComment("Фото автомобиля");

            entity.Property(e => e.IsDeleted)
                .IsRequired()
                .HasColumnName("is_deleted")
                .HasComment("Флаг удаления");

            entity.HasOne(e => e.CarModel)
                .WithMany(cm => cm.Cars)
                .HasForeignKey(e => e.ModelId)
                .HasPrincipalKey(cm => cm.CarModelId)
                .OnDelete(DeleteBehavior.Restrict);

            entity.HasOne(e => e.CarClass)
                .WithMany(cc => cc.Cars)
                .HasForeignKey(e => e.ClassId)
                .HasPrincipalKey(cc => cc.CarClassId)
                .OnDelete(DeleteBehavior.Restrict);

            entity.HasOne(e => e.Filial)
                .WithMany(f => f.Cars)
                .HasForeignKey(e => e.FilialId)
                .HasPrincipalKey(f => f.FilialId)
                .OnDelete(DeleteBehavior.Restrict);
        });
        
        modelBuilder.Entity<CarClass>(entity =>
        {
            entity.ToTable("car_class");
            entity.HasComment("Класс автомобиля");

            entity.HasKey(e => e.CarClassId);
            entity.Property(e => e.CarClassId)
                .HasColumnName("car_class_id")
                .HasComment("ID класса автомобиля");

            entity.Property(e => e.ClassName)
                .IsRequired()
                .HasMaxLength(50)
                .HasColumnName("class_name")
                .HasComment("Название класса автомобиля");

            entity.Property(e => e.IsDeleted)
                .IsRequired()
                .HasColumnName("is_deleted")
                .HasComment("Флаг удаления");

            entity.HasMany(e => e.Cars)
                .WithOne(c => c.CarClass)
                .HasForeignKey(c => c.ClassId)
                .HasPrincipalKey(e => e.CarClassId)
                .OnDelete(DeleteBehavior.Restrict);
        });
        
        modelBuilder.Entity<Feedback>(entity =>
        {
            entity.ToTable("feedback");
            entity.HasComment("Отзыв");

            entity.HasKey(e => e.FeedbackId);
            entity.Property(e => e.FeedbackId)
                .HasColumnName("feedback_id")
                .HasComment("ID отзыва");

            entity.Property(e => e.RentId)
                .HasColumnName("rent_id")
                .HasComment("ID аренды");

            entity.Property(e => e.Response)
                .IsRequired()
                .HasColumnName("response")
                .HasComment("Текст отзыва");

            entity.Property(e => e.Stars)
                .IsRequired()
                .HasColumnName("stars")
                .HasComment("Количество звезд");

            entity.Property(e => e.FeedbackDate)
                .IsRequired()
                .HasColumnName("feedback_date")
                .HasComment("Дата отзыва");

            entity.Property(e => e.IsDeleted)
                .IsRequired()
                .HasColumnName("is_deleted")
                .HasComment("Флаг удаления");

            entity.HasOne(e => e.Rent)
                .WithOne(r => r.Feedback)
                .HasForeignKey<Feedback>(e => e.RentId)
                .HasPrincipalKey<Rent>(r => r.RentId)
                .OnDelete(DeleteBehavior.Cascade);
        });
        
        modelBuilder.Entity<Filial>(entity =>
        {
            entity.ToTable("filial");
            entity.HasComment("Филиал");

            entity.HasKey(e => e.FilialId);
            entity.Property(e => e.FilialId)
                .HasColumnName("filial_id")
                .HasComment("ID филиала");

            entity.Property(e => e.Address)
                .IsRequired()
                .HasMaxLength(200)
                .HasColumnName("address")
                .HasComment("Адрес филиала");

            entity.Property(e => e.PhoneNumber)
                .IsRequired()
                .HasMaxLength(30)
                .HasColumnName("phone_number")
                .HasComment("Номер телефона филиала");

            entity.Property(e => e.IsDeleted)
                .IsRequired()
                .HasColumnName("is_deleted")
                .HasComment("Флаг удаления");

            entity.HasMany(e => e.Cars)
                .WithOne(c => c.Filial)
                .HasForeignKey(c => c.FilialId)
                .HasPrincipalKey(e => e.FilialId)
                .OnDelete(DeleteBehavior.Restrict);
        });
        
        modelBuilder.Entity<User>(entity =>
        {
            entity.ToTable("user");
            entity.HasComment("Пользователь");

            entity.HasKey(e => e.UserId);
            entity.Property(e => e.UserId)
                .HasColumnName("user_id")
                .HasComment("ID пользователя");

            entity.Property(e => e.RoleId)
                .HasColumnName("role_id")
                .HasComment("ID роли");

            entity.Property(e => e.FirstName)
                .IsRequired()
                .HasMaxLength(100)
                .HasColumnName("first_name")
                .HasComment("Имя");

            entity.Property(e => e.Surname)
                .IsRequired()
                .HasMaxLength(100)
                .HasColumnName("surname")
                .HasComment("Фамилия");

            entity.Property(e => e.Patronymic)
                .IsRequired()
                .HasMaxLength(100)
                .HasColumnName("patronymic")
                .HasComment("Отчество");

            entity.Property(e => e.PhoneNumber)
                .IsRequired()
                .HasMaxLength(20)
                .HasColumnName("phone_number")
                .HasComment("Номер телефона");

            entity.Property(e => e.Email)
                .IsRequired()
                .HasColumnType("varchar(150)")
                .HasColumnName("email")
                .HasComment("Email");

            entity.Property(e => e.Password)
                .IsRequired()
                .HasColumnType("varchar(150)")
                .HasColumnName("password")
                .HasComment("Пароль");

            entity.Property(e => e.UserImage)
                .HasMaxLength(255)
                .HasColumnName("user_image")
                .HasComment("Изображение пользователя");

            entity.Property(e => e.IsDeleted)
                .IsRequired()
                .HasColumnName("is_deleted")
                .HasComment("Флаг удаления");

            entity.HasOne(e => e.Role)
                .WithMany(r => r.Users)
                .HasForeignKey(e => e.RoleId)
                .HasPrincipalKey(r => r.RoleId)
                .OnDelete(DeleteBehavior.Restrict);
        });
        
        modelBuilder.Entity<Rent>(entity =>
        {
            entity.ToTable("rent");
            entity.HasComment("Аренда");

            entity.HasKey(e => e.RentId);
            entity.Property(e => e.RentId)
                .HasColumnName("rent_id")
                .HasComment("ID аренды");

            entity.Property(e => e.UserId)
                .HasColumnName("user_id")
                .HasComment("ID пользователя");

            entity.Property(e => e.CarId)
                .HasColumnName("car_id")
                .HasComment("ID автомобиля");

            entity.Property(e => e.StartDate)
                .IsRequired()
                .HasColumnName("start_date")
                .HasComment("Дата начала аренды");

            entity.Property(e => e.EndDate)
                .IsRequired()
                .HasColumnName("end_date")
                .HasComment("Дата окончания аренды");

            entity.Property(e => e.RentCost)
                .HasColumnType("money")
                .HasColumnName("rent_cost")
                .HasComment("Стоимость аренды");

            entity.Property(e => e.IsDeleted)
                .IsRequired()
                .HasColumnName("is_deleted")
                .HasComment("Флаг удаления");

            entity.HasOne(e => e.User)
                .WithMany(u => u.Rents)
                .HasForeignKey(e => e.UserId)
                .HasPrincipalKey(u => u.UserId)
                .OnDelete(DeleteBehavior.Restrict);

            entity.HasOne(e => e.Car)
                .WithMany(c => c.Rents)
                .HasForeignKey(e => e.CarId)
                .HasPrincipalKey(c => c.CarId)
                .OnDelete(DeleteBehavior.Restrict);
        });
    }
}