﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;
using YoDrive.Infrastructure.Data;

#nullable disable

namespace YoDrive.Infrastructure.Data.Migrations
{
    [DbContext(typeof(AppDbContext))]
    [Migration("20240405185958_InitialMigration")]
    partial class InitialMigration
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.11")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("YoDrive.Domain.Entities.Car", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasColumnName("id");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("CarImage")
                        .HasMaxLength(255)
                        .HasColumnType("character varying(255)")
                        .HasColumnName("car_image");

                    b.Property<int>("ClassId")
                        .HasColumnType("integer")
                        .HasColumnName("class_id");

                    b.Property<decimal>("CostDay")
                        .HasColumnType("money")
                        .HasColumnName("cost_day");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("timestamp with time zone")
                        .HasColumnName("created_at");

                    b.Property<int>("FilialId")
                        .HasColumnType("integer")
                        .HasColumnName("filial_id");

                    b.Property<short>("GearBox")
                        .HasColumnType("smallint")
                        .HasColumnName("gear_box");

                    b.Property<bool>("IsDeleted")
                        .HasColumnType("boolean")
                        .HasColumnName("is_deleted");

                    b.Property<int>("ModelId")
                        .HasColumnType("integer")
                        .HasColumnName("model_id");

                    b.Property<DateTime>("UpdatedAt")
                        .HasColumnType("timestamp with time zone")
                        .HasColumnName("updated_at");

                    b.Property<int>("Year")
                        .HasColumnType("integer")
                        .HasColumnName("year");

                    b.HasKey("Id")
                        .HasName("pk_car");

                    b.HasIndex("ClassId")
                        .HasDatabaseName("ix_car_class_id");

                    b.HasIndex("FilialId")
                        .HasDatabaseName("ix_car_filial_id");

                    b.HasIndex("ModelId")
                        .HasDatabaseName("ix_car_model_id");

                    b.ToTable("car", (string)null);
                });

            modelBuilder.Entity("YoDrive.Domain.Entities.CarBrand", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasColumnName("id");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("timestamp with time zone")
                        .HasColumnName("created_at");

                    b.Property<bool>("IsDeleted")
                        .HasColumnType("boolean")
                        .HasColumnName("is_deleted");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("varchar(100)")
                        .HasColumnName("name");

                    b.Property<DateTime>("UpdatedAt")
                        .HasColumnType("timestamp with time zone")
                        .HasColumnName("updated_at");

                    b.HasKey("Id")
                        .HasName("pk_car_brand");

                    b.ToTable("car_brand", (string)null);
                });

            modelBuilder.Entity("YoDrive.Domain.Entities.CarClass", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasColumnName("id");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("ClassName")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("character varying(50)")
                        .HasColumnName("class_name");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("timestamp with time zone")
                        .HasColumnName("created_at");

                    b.Property<bool>("IsDeleted")
                        .HasColumnType("boolean")
                        .HasColumnName("is_deleted");

                    b.Property<DateTime>("UpdatedAt")
                        .HasColumnType("timestamp with time zone")
                        .HasColumnName("updated_at");

                    b.HasKey("Id")
                        .HasName("pk_car_class");

                    b.ToTable("car_class", (string)null);
                });

            modelBuilder.Entity("YoDrive.Domain.Entities.CarModel", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasColumnName("id");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<int>("CarBrandId")
                        .HasColumnType("integer")
                        .HasColumnName("car_brand_id");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("timestamp with time zone")
                        .HasColumnName("created_at");

                    b.Property<bool>("IsDeleted")
                        .HasColumnType("boolean")
                        .HasColumnName("is_deleted");

                    b.Property<string>("ModelName")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("character varying(100)")
                        .HasColumnName("model_name");

                    b.Property<DateTime>("UpdatedAt")
                        .HasColumnType("timestamp with time zone")
                        .HasColumnName("updated_at");

                    b.HasKey("Id")
                        .HasName("pk_car_model");

                    b.HasIndex("CarBrandId")
                        .HasDatabaseName("ix_car_model_car_brand_id");

                    b.ToTable("car_model", (string)null);
                });

            modelBuilder.Entity("YoDrive.Domain.Entities.Feedback", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasColumnName("id");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("timestamp with time zone")
                        .HasColumnName("created_at");

                    b.Property<bool>("IsDeleted")
                        .HasColumnType("boolean")
                        .HasColumnName("is_deleted");

                    b.Property<int>("RentId")
                        .HasColumnType("integer")
                        .HasColumnName("rent_id");

                    b.Property<string>("Response")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("response");

                    b.Property<byte>("Stars")
                        .HasColumnType("smallint")
                        .HasColumnName("stars");

                    b.Property<DateTime>("UpdatedAt")
                        .HasColumnType("timestamp with time zone")
                        .HasColumnName("updated_at");

                    b.HasKey("Id")
                        .HasName("pk_feedback");

                    b.HasIndex("RentId")
                        .IsUnique()
                        .HasDatabaseName("ix_feedback_rent_id");

                    b.ToTable("feedback", (string)null);
                });

            modelBuilder.Entity("YoDrive.Domain.Entities.Filial", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasColumnName("id");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("Address")
                        .IsRequired()
                        .HasMaxLength(200)
                        .HasColumnType("character varying(200)")
                        .HasColumnName("address");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("timestamp with time zone")
                        .HasColumnName("created_at");

                    b.Property<bool>("IsDeleted")
                        .HasColumnType("boolean")
                        .HasColumnName("is_deleted");

                    b.Property<string>("PhoneNumber")
                        .IsRequired()
                        .HasMaxLength(30)
                        .HasColumnType("character varying(30)")
                        .HasColumnName("phone_number");

                    b.Property<DateTime>("UpdatedAt")
                        .HasColumnType("timestamp with time zone")
                        .HasColumnName("updated_at");

                    b.HasKey("Id")
                        .HasName("pk_filial");

                    b.ToTable("filial", (string)null);
                });

            modelBuilder.Entity("YoDrive.Domain.Entities.Rent", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasColumnName("id");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<int>("CarId")
                        .HasColumnType("integer")
                        .HasColumnName("car_id");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("timestamp with time zone")
                        .HasColumnName("created_at");

                    b.Property<DateTime>("EndDate")
                        .HasColumnType("timestamp with time zone")
                        .HasColumnName("end_date");

                    b.Property<bool>("IsDeleted")
                        .HasColumnType("boolean")
                        .HasColumnName("is_deleted");

                    b.Property<decimal>("RentCost")
                        .HasColumnType("money")
                        .HasColumnName("rent_cost");

                    b.Property<DateTime>("StartDate")
                        .HasColumnType("timestamp with time zone")
                        .HasColumnName("start_date");

                    b.Property<DateTime>("UpdatedAt")
                        .HasColumnType("timestamp with time zone")
                        .HasColumnName("updated_at");

                    b.Property<int>("UserId")
                        .HasColumnType("integer")
                        .HasColumnName("user_id");

                    b.HasKey("Id")
                        .HasName("pk_rent");

                    b.HasIndex("CarId")
                        .HasDatabaseName("ix_rent_car_id");

                    b.HasIndex("UserId")
                        .HasDatabaseName("ix_rent_user_id");

                    b.ToTable("rent", (string)null);
                });

            modelBuilder.Entity("YoDrive.Domain.Entities.Role", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasColumnName("id");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("timestamp with time zone")
                        .HasColumnName("created_at");

                    b.Property<bool>("IsDeleted")
                        .HasColumnType("boolean")
                        .HasColumnName("is_deleted");

                    b.Property<string>("RoleName")
                        .IsRequired()
                        .HasMaxLength(30)
                        .HasColumnType("character varying(30)")
                        .HasColumnName("role_name");

                    b.Property<int>("RoleType")
                        .HasColumnType("integer")
                        .HasColumnName("role_type");

                    b.Property<DateTime>("UpdatedAt")
                        .HasColumnType("timestamp with time zone")
                        .HasColumnName("updated_at");

                    b.HasKey("Id")
                        .HasName("pk_role");

                    b.ToTable("role", (string)null);

                    b.HasData(
                        new
                        {
                            Id = 1,
                            CreatedAt = new DateTime(2024, 4, 5, 0, 0, 0, 0, DateTimeKind.Utc),
                            IsDeleted = false,
                            RoleName = "Admin",
                            RoleType = 1,
                            UpdatedAt = new DateTime(2024, 4, 5, 0, 0, 0, 0, DateTimeKind.Utc)
                        },
                        new
                        {
                            Id = 2,
                            CreatedAt = new DateTime(2024, 4, 5, 0, 0, 0, 0, DateTimeKind.Utc),
                            IsDeleted = false,
                            RoleName = "Client",
                            RoleType = 2,
                            UpdatedAt = new DateTime(2024, 4, 5, 0, 0, 0, 0, DateTimeKind.Utc)
                        });
                });

            modelBuilder.Entity("YoDrive.Domain.Entities.Token", b =>
                {
                    b.Property<int>("UserId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasColumnName("user_id");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("UserId"));

                    b.Property<string>("RefreshToken")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("refresh_token");

                    b.HasKey("UserId")
                        .HasName("pk_token");

                    b.ToTable("token", (string)null);
                });

            modelBuilder.Entity("YoDrive.Domain.Entities.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasColumnName("id");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("timestamp with time zone")
                        .HasColumnName("created_at");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("varchar(150)")
                        .HasColumnName("email");

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("character varying(100)")
                        .HasColumnName("first_name");

                    b.Property<bool>("IsDeleted")
                        .HasColumnType("boolean")
                        .HasColumnName("is_deleted");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("varchar(150)")
                        .HasColumnName("password");

                    b.Property<string>("Patronymic")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("character varying(100)")
                        .HasColumnName("patronymic");

                    b.Property<string>("PhoneNumber")
                        .IsRequired()
                        .HasMaxLength(20)
                        .HasColumnType("character varying(20)")
                        .HasColumnName("phone_number");

                    b.Property<int>("RoleId")
                        .HasColumnType("integer")
                        .HasColumnName("role_id");

                    b.Property<string>("Surname")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("character varying(100)")
                        .HasColumnName("surname");

                    b.Property<DateTime>("UpdatedAt")
                        .HasColumnType("timestamp with time zone")
                        .HasColumnName("updated_at");

                    b.Property<string>("UserImage")
                        .HasMaxLength(255)
                        .HasColumnType("character varying(255)")
                        .HasColumnName("user_image");

                    b.HasKey("Id")
                        .HasName("pk_user");

                    b.HasIndex("RoleId")
                        .HasDatabaseName("ix_user_role_id");

                    b.ToTable("user", (string)null);
                });

            modelBuilder.Entity("YoDrive.Domain.Entities.Car", b =>
                {
                    b.HasOne("YoDrive.Domain.Entities.CarClass", "CarClass")
                        .WithMany("Cars")
                        .HasForeignKey("ClassId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired()
                        .HasConstraintName("fk_car_car_class_class_id");

                    b.HasOne("YoDrive.Domain.Entities.Filial", "Filial")
                        .WithMany("Cars")
                        .HasForeignKey("FilialId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired()
                        .HasConstraintName("fk_car_filial_filial_id");

                    b.HasOne("YoDrive.Domain.Entities.CarModel", "CarModel")
                        .WithMany("Cars")
                        .HasForeignKey("ModelId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired()
                        .HasConstraintName("fk_car_car_model_car_model_id");

                    b.Navigation("CarClass");

                    b.Navigation("CarModel");

                    b.Navigation("Filial");
                });

            modelBuilder.Entity("YoDrive.Domain.Entities.CarModel", b =>
                {
                    b.HasOne("YoDrive.Domain.Entities.CarBrand", "CarBrand")
                        .WithMany("CarModels")
                        .HasForeignKey("CarBrandId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired()
                        .HasConstraintName("fk_car_model_car_brand_car_brand_id");

                    b.Navigation("CarBrand");
                });

            modelBuilder.Entity("YoDrive.Domain.Entities.Feedback", b =>
                {
                    b.HasOne("YoDrive.Domain.Entities.Rent", "Rent")
                        .WithOne("Feedback")
                        .HasForeignKey("YoDrive.Domain.Entities.Feedback", "RentId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired()
                        .HasConstraintName("fk_feedback_rent_rent_id");

                    b.Navigation("Rent");
                });

            modelBuilder.Entity("YoDrive.Domain.Entities.Rent", b =>
                {
                    b.HasOne("YoDrive.Domain.Entities.Car", "Car")
                        .WithMany("Rents")
                        .HasForeignKey("CarId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired()
                        .HasConstraintName("fk_rent_car_car_id");

                    b.HasOne("YoDrive.Domain.Entities.User", "User")
                        .WithMany("Rents")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired()
                        .HasConstraintName("fk_rent_user_user_id");

                    b.Navigation("Car");

                    b.Navigation("User");
                });

            modelBuilder.Entity("YoDrive.Domain.Entities.User", b =>
                {
                    b.HasOne("YoDrive.Domain.Entities.Role", "Role")
                        .WithMany("Users")
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired()
                        .HasConstraintName("fk_user_role_role_id");

                    b.Navigation("Role");
                });

            modelBuilder.Entity("YoDrive.Domain.Entities.Car", b =>
                {
                    b.Navigation("Rents");
                });

            modelBuilder.Entity("YoDrive.Domain.Entities.CarBrand", b =>
                {
                    b.Navigation("CarModels");
                });

            modelBuilder.Entity("YoDrive.Domain.Entities.CarClass", b =>
                {
                    b.Navigation("Cars");
                });

            modelBuilder.Entity("YoDrive.Domain.Entities.CarModel", b =>
                {
                    b.Navigation("Cars");
                });

            modelBuilder.Entity("YoDrive.Domain.Entities.Filial", b =>
                {
                    b.Navigation("Cars");
                });

            modelBuilder.Entity("YoDrive.Domain.Entities.Rent", b =>
                {
                    b.Navigation("Feedback");
                });

            modelBuilder.Entity("YoDrive.Domain.Entities.Role", b =>
                {
                    b.Navigation("Users");
                });

            modelBuilder.Entity("YoDrive.Domain.Entities.User", b =>
                {
                    b.Navigation("Rents");
                });
#pragma warning restore 612, 618
        }
    }
}