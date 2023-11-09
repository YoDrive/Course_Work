using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace YoDrive.Migrations
{
    /// <inheritdoc />
    public partial class Initial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "car_brand",
                columns: table => new
                {
                    car_brand_id = table.Column<int>(type: "integer", nullable: false, comment: "ID марки автомобиля")
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    name = table.Column<string>(type: "varchar(100)", nullable: false, comment: "Название марки автомобиля"),
                    is_deleted = table.Column<bool>(type: "boolean", nullable: false, comment: "Флаг удаления")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_car_brand", x => x.car_brand_id);
                },
                comment: "Марка автомобиля");

            migrationBuilder.CreateTable(
                name: "car_class",
                columns: table => new
                {
                    car_class_id = table.Column<int>(type: "integer", nullable: false, comment: "ID класса автомобиля")
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    class_name = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false, comment: "Название класса автомобиля"),
                    is_deleted = table.Column<bool>(type: "boolean", nullable: false, comment: "Флаг удаления")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_car_class", x => x.car_class_id);
                },
                comment: "Класс автомобиля");

            migrationBuilder.CreateTable(
                name: "filial",
                columns: table => new
                {
                    filial_id = table.Column<int>(type: "integer", nullable: false, comment: "ID филиала")
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    address = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false, comment: "Адрес филиала"),
                    phone_number = table.Column<string>(type: "character varying(30)", maxLength: 30, nullable: false, comment: "Номер телефона филиала"),
                    is_deleted = table.Column<bool>(type: "boolean", nullable: false, comment: "Флаг удаления")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_filial", x => x.filial_id);
                },
                comment: "Филиал");

            migrationBuilder.CreateTable(
                name: "role",
                columns: table => new
                {
                    role_id = table.Column<int>(type: "integer", nullable: false, comment: "ID роли")
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    role_name = table.Column<string>(type: "character varying(30)", maxLength: 30, nullable: false, comment: "Название роли")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_role", x => x.role_id);
                },
                comment: "Роль пользователя");

            migrationBuilder.CreateTable(
                name: "Token",
                columns: table => new
                {
                    UserId = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    RefreshToken = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Token", x => x.UserId);
                });

            migrationBuilder.CreateTable(
                name: "car_model",
                columns: table => new
                {
                    car_model_id = table.Column<int>(type: "integer", nullable: false, comment: "ID модели автомобиля")
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    car_brand_id = table.Column<int>(type: "integer", nullable: false, comment: "ID бренда автомобиля"),
                    model_name = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false, comment: "Название модели автомобиля"),
                    is_deleted = table.Column<bool>(type: "boolean", nullable: false, comment: "Флаг удаления")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_car_model", x => x.car_model_id);
                    table.ForeignKey(
                        name: "FK_car_model_car_brand_car_brand_id",
                        column: x => x.car_brand_id,
                        principalTable: "car_brand",
                        principalColumn: "car_brand_id",
                        onDelete: ReferentialAction.Restrict);
                },
                comment: "Модель автомобиля");

            migrationBuilder.CreateTable(
                name: "user",
                columns: table => new
                {
                    user_id = table.Column<int>(type: "integer", nullable: false, comment: "ID пользователя")
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    role_id = table.Column<int>(type: "integer", nullable: false, comment: "ID роли"),
                    first_name = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false, comment: "Имя"),
                    surname = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false, comment: "Фамилия"),
                    patronymic = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false, comment: "Отчество"),
                    phone_number = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: false, comment: "Номер телефона"),
                    email = table.Column<string>(type: "varchar(150)", nullable: false, comment: "Email"),
                    password = table.Column<string>(type: "varchar(150)", nullable: false, comment: "Пароль"),
                    user_image = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: true, comment: "Изображение пользователя"),
                    is_deleted = table.Column<bool>(type: "boolean", nullable: false, comment: "Флаг удаления")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_user", x => x.user_id);
                    table.ForeignKey(
                        name: "FK_user_role_role_id",
                        column: x => x.role_id,
                        principalTable: "role",
                        principalColumn: "role_id",
                        onDelete: ReferentialAction.Restrict);
                },
                comment: "Пользователь");

            migrationBuilder.CreateTable(
                name: "car",
                columns: table => new
                {
                    car_id = table.Column<int>(type: "integer", nullable: false, comment: "ID автомобиля")
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    model_id = table.Column<int>(type: "integer", nullable: false, comment: "ID модели автомобиля"),
                    class_id = table.Column<int>(type: "integer", nullable: false, comment: "ID класса автомобиля"),
                    filial_id = table.Column<int>(type: "integer", nullable: false, comment: "ID филиала автомобиля"),
                    year = table.Column<int>(type: "integer", nullable: false, comment: "Год выпуска"),
                    state_number = table.Column<string>(type: "character varying(12)", maxLength: 12, nullable: false, comment: "Государственный номер автомобиля"),
                    gear_box = table.Column<short>(type: "smallint", nullable: false, comment: "Тип коробки передач"),
                    cost_day = table.Column<decimal>(type: "money", nullable: false, comment: "Стоимость аренды в день"),
                    car_image = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: true, comment: "Фото автомобиля"),
                    is_deleted = table.Column<bool>(type: "boolean", nullable: false, comment: "Флаг удаления")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_car", x => x.car_id);
                    table.ForeignKey(
                        name: "FK_car_car_class_class_id",
                        column: x => x.class_id,
                        principalTable: "car_class",
                        principalColumn: "car_class_id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_car_car_model_model_id",
                        column: x => x.model_id,
                        principalTable: "car_model",
                        principalColumn: "car_model_id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_car_filial_filial_id",
                        column: x => x.filial_id,
                        principalTable: "filial",
                        principalColumn: "filial_id",
                        onDelete: ReferentialAction.Restrict);
                },
                comment: "Автомобиль");

            migrationBuilder.CreateTable(
                name: "rent",
                columns: table => new
                {
                    rent_id = table.Column<int>(type: "integer", nullable: false, comment: "ID аренды")
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    user_id = table.Column<int>(type: "integer", nullable: false, comment: "ID пользователя"),
                    car_id = table.Column<int>(type: "integer", nullable: false, comment: "ID автомобиля"),
                    start_date = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, comment: "Дата начала аренды"),
                    end_date = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, comment: "Дата окончания аренды"),
                    rent_cost = table.Column<decimal>(type: "money", nullable: false, comment: "Стоимость аренды"),
                    is_deleted = table.Column<bool>(type: "boolean", nullable: false, comment: "Флаг удаления")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_rent", x => x.rent_id);
                    table.ForeignKey(
                        name: "FK_rent_car_car_id",
                        column: x => x.car_id,
                        principalTable: "car",
                        principalColumn: "car_id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_rent_user_user_id",
                        column: x => x.user_id,
                        principalTable: "user",
                        principalColumn: "user_id",
                        onDelete: ReferentialAction.Restrict);
                },
                comment: "Аренда");

            migrationBuilder.CreateTable(
                name: "feedback",
                columns: table => new
                {
                    feedback_id = table.Column<int>(type: "integer", nullable: false, comment: "ID отзыва")
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    rent_id = table.Column<int>(type: "integer", nullable: false, comment: "ID аренды"),
                    response = table.Column<string>(type: "text", nullable: false, comment: "Текст отзыва"),
                    stars = table.Column<byte>(type: "smallint", nullable: false, comment: "Количество звезд"),
                    feedback_date = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, comment: "Дата отзыва"),
                    is_deleted = table.Column<bool>(type: "boolean", nullable: false, comment: "Флаг удаления")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_feedback", x => x.feedback_id);
                    table.ForeignKey(
                        name: "FK_feedback_rent_rent_id",
                        column: x => x.rent_id,
                        principalTable: "rent",
                        principalColumn: "rent_id",
                        onDelete: ReferentialAction.Cascade);
                },
                comment: "Отзыв");

            migrationBuilder.CreateIndex(
                name: "IX_car_class_id",
                table: "car",
                column: "class_id");

            migrationBuilder.CreateIndex(
                name: "IX_car_filial_id",
                table: "car",
                column: "filial_id");

            migrationBuilder.CreateIndex(
                name: "IX_car_model_id",
                table: "car",
                column: "model_id");

            migrationBuilder.CreateIndex(
                name: "IX_car_model_car_brand_id",
                table: "car_model",
                column: "car_brand_id");

            migrationBuilder.CreateIndex(
                name: "IX_feedback_rent_id",
                table: "feedback",
                column: "rent_id",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_rent_car_id",
                table: "rent",
                column: "car_id");

            migrationBuilder.CreateIndex(
                name: "IX_rent_user_id",
                table: "rent",
                column: "user_id");

            migrationBuilder.CreateIndex(
                name: "IX_user_role_id",
                table: "user",
                column: "role_id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "feedback");

            migrationBuilder.DropTable(
                name: "Token");

            migrationBuilder.DropTable(
                name: "rent");

            migrationBuilder.DropTable(
                name: "car");

            migrationBuilder.DropTable(
                name: "user");

            migrationBuilder.DropTable(
                name: "car_class");

            migrationBuilder.DropTable(
                name: "car_model");

            migrationBuilder.DropTable(
                name: "filial");

            migrationBuilder.DropTable(
                name: "role");

            migrationBuilder.DropTable(
                name: "car_brand");
        }
    }
}
