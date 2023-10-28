using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace YoDrive.Migrations
{
    /// <inheritdoc />
    public partial class AddCommentToCarImg : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "car_image",
                table: "car",
                type: "character varying(255)",
                maxLength: 255,
                nullable: true,
                comment: "Фото автомобиля",
                oldClrType: typeof(string),
                oldType: "character varying(255)",
                oldMaxLength: 255,
                oldNullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "car_image",
                table: "car",
                type: "character varying(255)",
                maxLength: 255,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "character varying(255)",
                oldMaxLength: 255,
                oldNullable: true,
                oldComment: "Фото автомобиля");
        }
    }
}
