using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace YoDrive.Migrations
{
    /// <inheritdoc />
    public partial class RemoveStateNumber : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "state_number",
                table: "car");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "state_number",
                table: "car",
                type: "character varying(12)",
                maxLength: 12,
                nullable: false,
                defaultValue: "",
                comment: "Государственный номер автомобиля");
        }
    }
}
