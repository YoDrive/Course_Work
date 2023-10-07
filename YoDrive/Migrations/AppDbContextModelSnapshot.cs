﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;
using YoDrive.Domain.Data;

#nullable disable

namespace YoDrive.Migrations
{
    [DbContext(typeof(AppDbContext))]
    partial class AppDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.11")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("YoDrive.Domain.Models.Car", b =>
                {
                    b.Property<int>("CarId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("CarId"));

                    b.Property<string>("CarImage")
                        .HasMaxLength(255)
                        .HasColumnType("character varying(255)");

                    b.Property<int>("ClassId")
                        .HasColumnType("integer");

                    b.Property<decimal>("CostDay")
                        .HasColumnType("money");

                    b.Property<short>("Engine")
                        .HasColumnType("smallint");

                    b.Property<int>("FilialId")
                        .HasColumnType("integer");

                    b.Property<short>("GearBox")
                        .HasColumnType("smallint");

                    b.Property<int>("ModelId")
                        .HasColumnType("integer");

                    b.Property<string>("StateNumber")
                        .IsRequired()
                        .HasMaxLength(12)
                        .HasColumnType("character varying(12)");

                    b.HasKey("CarId");

                    b.HasIndex("ClassId");

                    b.HasIndex("FilialId");

                    b.HasIndex("ModelId");

                    b.ToTable("Car");
                });

            modelBuilder.Entity("YoDrive.Domain.Models.CarBrand", b =>
                {
                    b.Property<int>("CarBrandId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("CarBrandId"));

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("varchar(100)");

                    b.HasKey("CarBrandId");

                    b.ToTable("CarBrand");
                });

            modelBuilder.Entity("YoDrive.Domain.Models.CarClass", b =>
                {
                    b.Property<int>("CarClassId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("CarClassId"));

                    b.Property<string>("ClassName")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("character varying(50)");

                    b.HasKey("CarClassId");

                    b.ToTable("CarClass");
                });

            modelBuilder.Entity("YoDrive.Domain.Models.CarModel", b =>
                {
                    b.Property<int>("CarModelId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("CarModelId"));

                    b.Property<int>("CarBrandId")
                        .HasColumnType("integer");

                    b.Property<string>("ModelName")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("character varying(100)");

                    b.HasKey("CarModelId");

                    b.HasIndex("CarBrandId");

                    b.ToTable("CarModel");
                });

            modelBuilder.Entity("YoDrive.Domain.Models.Feedback", b =>
                {
                    b.Property<int>("FeedbackId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("FeedbackId"));

                    b.Property<DateTime>("FeedbackDate")
                        .HasColumnType("timestamp with time zone");

                    b.Property<int>("RentId")
                        .HasColumnType("integer");

                    b.Property<string>("Response")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<byte>("Stars")
                        .HasColumnType("smallint");

                    b.HasKey("FeedbackId");

                    b.HasIndex("RentId")
                        .IsUnique();

                    b.ToTable("Feedback");
                });

            modelBuilder.Entity("YoDrive.Domain.Models.Filial", b =>
                {
                    b.Property<int>("FilialId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("FilialId"));

                    b.Property<string>("Address")
                        .IsRequired()
                        .HasMaxLength(200)
                        .HasColumnType("character varying(200)");

                    b.Property<string>("PhoneNumber")
                        .IsRequired()
                        .HasMaxLength(30)
                        .HasColumnType("character varying(30)");

                    b.HasKey("FilialId");

                    b.ToTable("Filial");
                });

            modelBuilder.Entity("YoDrive.Domain.Models.Rent", b =>
                {
                    b.Property<int>("RentId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("RentId"));

                    b.Property<int>("CarId")
                        .HasColumnType("integer");

                    b.Property<DateTime>("EndDate")
                        .HasColumnType("timestamp with time zone");

                    b.Property<decimal>("RentCost")
                        .HasColumnType("money");

                    b.Property<DateTime>("StartDate")
                        .HasColumnType("timestamp with time zone");

                    b.Property<int>("UserId")
                        .HasColumnType("integer");

                    b.HasKey("RentId");

                    b.HasIndex("CarId");

                    b.HasIndex("UserId");

                    b.ToTable("Rent");
                });

            modelBuilder.Entity("YoDrive.Domain.Models.Role", b =>
                {
                    b.Property<int>("RoleId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("RoleId"));

                    b.Property<string>("RoleName")
                        .IsRequired()
                        .HasMaxLength(30)
                        .HasColumnType("character varying(30)");

                    b.HasKey("RoleId");

                    b.ToTable("Role");
                });

            modelBuilder.Entity("YoDrive.Domain.Models.User", b =>
                {
                    b.Property<int>("UserId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("UserId"));

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("varchar(150)");

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("character varying(100)");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("varchar(150)");

                    b.Property<string>("Patronymic")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("character varying(100)");

                    b.Property<string>("PhoneNumber")
                        .IsRequired()
                        .HasMaxLength(20)
                        .HasColumnType("character varying(20)");

                    b.Property<int>("RoleId")
                        .HasColumnType("integer");

                    b.Property<string>("Surname")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("character varying(100)");

                    b.Property<string>("UserImage")
                        .HasMaxLength(255)
                        .HasColumnType("character varying(255)");

                    b.HasKey("UserId");

                    b.HasIndex("RoleId");

                    b.ToTable("User");
                });

            modelBuilder.Entity("YoDrive.Domain.Models.Car", b =>
                {
                    b.HasOne("YoDrive.Domain.Models.CarClass", "CarClass")
                        .WithMany("Cars")
                        .HasForeignKey("ClassId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("YoDrive.Domain.Models.Filial", "Filial")
                        .WithMany("Cars")
                        .HasForeignKey("FilialId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("YoDrive.Domain.Models.CarModel", "CarModel")
                        .WithMany()
                        .HasForeignKey("ModelId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("CarClass");

                    b.Navigation("CarModel");

                    b.Navigation("Filial");
                });

            modelBuilder.Entity("YoDrive.Domain.Models.CarModel", b =>
                {
                    b.HasOne("YoDrive.Domain.Models.CarBrand", "CarBrand")
                        .WithMany("CarModels")
                        .HasForeignKey("CarBrandId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("CarBrand");
                });

            modelBuilder.Entity("YoDrive.Domain.Models.Feedback", b =>
                {
                    b.HasOne("YoDrive.Domain.Models.Rent", "Rent")
                        .WithOne("Feedback")
                        .HasForeignKey("YoDrive.Domain.Models.Feedback", "RentId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Rent");
                });

            modelBuilder.Entity("YoDrive.Domain.Models.Rent", b =>
                {
                    b.HasOne("YoDrive.Domain.Models.Car", "Car")
                        .WithMany("Rents")
                        .HasForeignKey("CarId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("YoDrive.Domain.Models.User", "User")
                        .WithMany("Rents")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Car");

                    b.Navigation("User");
                });

            modelBuilder.Entity("YoDrive.Domain.Models.User", b =>
                {
                    b.HasOne("YoDrive.Domain.Models.Role", "Role")
                        .WithMany("Users")
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Role");
                });

            modelBuilder.Entity("YoDrive.Domain.Models.Car", b =>
                {
                    b.Navigation("Rents");
                });

            modelBuilder.Entity("YoDrive.Domain.Models.CarBrand", b =>
                {
                    b.Navigation("CarModels");
                });

            modelBuilder.Entity("YoDrive.Domain.Models.CarClass", b =>
                {
                    b.Navigation("Cars");
                });

            modelBuilder.Entity("YoDrive.Domain.Models.Filial", b =>
                {
                    b.Navigation("Cars");
                });

            modelBuilder.Entity("YoDrive.Domain.Models.Rent", b =>
                {
                    b.Navigation("Feedback");
                });

            modelBuilder.Entity("YoDrive.Domain.Models.Role", b =>
                {
                    b.Navigation("Users");
                });

            modelBuilder.Entity("YoDrive.Domain.Models.User", b =>
                {
                    b.Navigation("Rents");
                });
#pragma warning restore 612, 618
        }
    }
}
