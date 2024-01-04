using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace YoDrive.Migrations
{
    /// <inheritdoc />
    public partial class AddColumnCreatedAt : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedAt",
                table: "user",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: DateTime.UtcNow);

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedAt",
                table: "rent",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: DateTime.UtcNow);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CreatedAt",
                table: "user");

            migrationBuilder.DropColumn(
                name: "CreatedAt",
                table: "rent");
        }
    }
}
