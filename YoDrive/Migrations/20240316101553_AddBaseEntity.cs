using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace YoDrive.Migrations
{
    /// <inheritdoc />
    public partial class AddBaseEntity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_car_car_class_class_id",
                table: "car");

            migrationBuilder.DropForeignKey(
                name: "FK_car_car_model_model_id",
                table: "car");

            migrationBuilder.DropForeignKey(
                name: "FK_car_filial_filial_id",
                table: "car");

            migrationBuilder.DropForeignKey(
                name: "FK_car_model_car_brand_car_brand_id",
                table: "car_model");

            migrationBuilder.DropForeignKey(
                name: "FK_feedback_rent_rent_id",
                table: "feedback");

            migrationBuilder.DropForeignKey(
                name: "FK_rent_car_car_id",
                table: "rent");

            migrationBuilder.DropForeignKey(
                name: "FK_rent_user_user_id",
                table: "rent");

            migrationBuilder.DropForeignKey(
                name: "FK_user_role_role_id",
                table: "user");

            migrationBuilder.DropPrimaryKey(
                name: "PK_user",
                table: "user");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Token",
                table: "Token");

            migrationBuilder.DropPrimaryKey(
                name: "PK_role",
                table: "role");

            migrationBuilder.DropPrimaryKey(
                name: "PK_rent",
                table: "rent");

            migrationBuilder.DropPrimaryKey(
                name: "PK_filial",
                table: "filial");

            migrationBuilder.DropPrimaryKey(
                name: "PK_feedback",
                table: "feedback");

            migrationBuilder.DropPrimaryKey(
                name: "PK_car_model",
                table: "car_model");

            migrationBuilder.DropPrimaryKey(
                name: "PK_car_class",
                table: "car_class");

            migrationBuilder.DropPrimaryKey(
                name: "PK_car_brand",
                table: "car_brand");

            migrationBuilder.DropPrimaryKey(
                name: "PK_car",
                table: "car");

            migrationBuilder.DropColumn(
                name: "user_id",
                table: "user");

            migrationBuilder.DropColumn(
                name: "role_id",
                table: "role");

            migrationBuilder.DropColumn(
                name: "rent_id",
                table: "rent");

            migrationBuilder.DropColumn(
                name: "filial_id",
                table: "filial");

            migrationBuilder.DropColumn(
                name: "feedback_id",
                table: "feedback");

            migrationBuilder.DropColumn(
                name: "feedback_date",
                table: "feedback");

            migrationBuilder.DropColumn(
                name: "car_model_id",
                table: "car_model");

            migrationBuilder.DropColumn(
                name: "car_class_id",
                table: "car_class");

            migrationBuilder.DropColumn(
                name: "car_brand_id",
                table: "car_brand");

            migrationBuilder.DropColumn(
                name: "car_id",
                table: "car");

            migrationBuilder.RenameTable(
                name: "Token",
                newName: "token");

            migrationBuilder.RenameColumn(
                name: "CreatedAt",
                table: "user",
                newName: "created_at");

            migrationBuilder.RenameIndex(
                name: "IX_user_role_id",
                table: "user",
                newName: "ix_user_role_id");

            migrationBuilder.RenameColumn(
                name: "RefreshToken",
                table: "token",
                newName: "refresh_token");

            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "token",
                newName: "user_id");

            migrationBuilder.RenameColumn(
                name: "CreatedAt",
                table: "rent",
                newName: "created_at");

            migrationBuilder.RenameIndex(
                name: "IX_rent_user_id",
                table: "rent",
                newName: "ix_rent_user_id");

            migrationBuilder.RenameIndex(
                name: "IX_rent_car_id",
                table: "rent",
                newName: "ix_rent_car_id");

            migrationBuilder.RenameIndex(
                name: "IX_feedback_rent_id",
                table: "feedback",
                newName: "ix_feedback_rent_id");

            migrationBuilder.RenameIndex(
                name: "IX_car_model_car_brand_id",
                table: "car_model",
                newName: "ix_car_model_car_brand_id");

            migrationBuilder.RenameIndex(
                name: "IX_car_model_id",
                table: "car",
                newName: "ix_car_model_id");

            migrationBuilder.RenameIndex(
                name: "IX_car_filial_id",
                table: "car",
                newName: "ix_car_filial_id");

            migrationBuilder.RenameIndex(
                name: "IX_car_class_id",
                table: "car",
                newName: "ix_car_class_id");

            migrationBuilder.AlterTable(
                name: "user",
                oldComment: "Пользователь");

            migrationBuilder.AlterTable(
                name: "role",
                oldComment: "Роль пользователя");

            migrationBuilder.AlterTable(
                name: "rent",
                oldComment: "Аренда");

            migrationBuilder.AlterTable(
                name: "filial",
                oldComment: "Филиал");

            migrationBuilder.AlterTable(
                name: "feedback",
                oldComment: "Отзыв");

            migrationBuilder.AlterTable(
                name: "car_model",
                oldComment: "Модель автомобиля");

            migrationBuilder.AlterTable(
                name: "car_class",
                oldComment: "Класс автомобиля");

            migrationBuilder.AlterTable(
                name: "car_brand",
                oldComment: "Марка автомобиля");

            migrationBuilder.AlterTable(
                name: "car",
                oldComment: "Автомобиль");

            migrationBuilder.AlterColumn<string>(
                name: "user_image",
                table: "user",
                type: "character varying(255)",
                maxLength: 255,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "character varying(255)",
                oldMaxLength: 255,
                oldNullable: true,
                oldComment: "Изображение пользователя");

            migrationBuilder.AlterColumn<string>(
                name: "surname",
                table: "user",
                type: "character varying(100)",
                maxLength: 100,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "character varying(100)",
                oldMaxLength: 100,
                oldComment: "Фамилия");

            migrationBuilder.AlterColumn<int>(
                name: "role_id",
                table: "user",
                type: "integer",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer",
                oldComment: "ID роли");

            migrationBuilder.AlterColumn<string>(
                name: "phone_number",
                table: "user",
                type: "character varying(20)",
                maxLength: 20,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "character varying(20)",
                oldMaxLength: 20,
                oldComment: "Номер телефона");

            migrationBuilder.AlterColumn<string>(
                name: "patronymic",
                table: "user",
                type: "character varying(100)",
                maxLength: 100,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "character varying(100)",
                oldMaxLength: 100,
                oldComment: "Отчество");

            migrationBuilder.AlterColumn<string>(
                name: "password",
                table: "user",
                type: "varchar(150)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "varchar(150)",
                oldComment: "Пароль");

            migrationBuilder.AlterColumn<bool>(
                name: "is_deleted",
                table: "user",
                type: "boolean",
                nullable: false,
                oldClrType: typeof(bool),
                oldType: "boolean",
                oldComment: "Флаг удаления");

            migrationBuilder.AlterColumn<string>(
                name: "first_name",
                table: "user",
                type: "character varying(100)",
                maxLength: 100,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "character varying(100)",
                oldMaxLength: 100,
                oldComment: "Имя");

            migrationBuilder.AlterColumn<string>(
                name: "email",
                table: "user",
                type: "varchar(150)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "varchar(150)",
                oldComment: "Email");

            migrationBuilder.AddColumn<int>(
                name: "id",
                table: "user",
                type: "integer",
                nullable: false,
                defaultValue: 0)
                .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

            migrationBuilder.AddColumn<DateTime>(
                name: "updated_at",
                table: "user",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AlterColumn<string>(
                name: "role_name",
                table: "role",
                type: "character varying(30)",
                maxLength: 30,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "character varying(30)",
                oldMaxLength: 30,
                oldComment: "Название роли");

            migrationBuilder.AddColumn<int>(
                name: "id",
                table: "role",
                type: "integer",
                nullable: false,
                defaultValue: 0)
                .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

            migrationBuilder.AddColumn<DateTime>(
                name: "created_at",
                table: "role",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<bool>(
                name: "is_deleted",
                table: "role",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<DateTime>(
                name: "updated_at",
                table: "role",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AlterColumn<int>(
                name: "user_id",
                table: "rent",
                type: "integer",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer",
                oldComment: "ID пользователя");

            migrationBuilder.AlterColumn<DateTime>(
                name: "start_date",
                table: "rent",
                type: "timestamp with time zone",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "timestamp with time zone",
                oldComment: "Дата начала аренды");

            migrationBuilder.AlterColumn<decimal>(
                name: "rent_cost",
                table: "rent",
                type: "money",
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "money",
                oldComment: "Стоимость аренды");

            migrationBuilder.AlterColumn<bool>(
                name: "is_deleted",
                table: "rent",
                type: "boolean",
                nullable: false,
                oldClrType: typeof(bool),
                oldType: "boolean",
                oldComment: "Флаг удаления");

            migrationBuilder.AlterColumn<DateTime>(
                name: "end_date",
                table: "rent",
                type: "timestamp with time zone",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "timestamp with time zone",
                oldComment: "Дата окончания аренды");

            migrationBuilder.AlterColumn<int>(
                name: "car_id",
                table: "rent",
                type: "integer",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer",
                oldComment: "ID автомобиля");

            migrationBuilder.AddColumn<int>(
                name: "id",
                table: "rent",
                type: "integer",
                nullable: false,
                defaultValue: 0)
                .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

            migrationBuilder.AddColumn<DateTime>(
                name: "updated_at",
                table: "rent",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AlterColumn<string>(
                name: "phone_number",
                table: "filial",
                type: "character varying(30)",
                maxLength: 30,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "character varying(30)",
                oldMaxLength: 30,
                oldComment: "Номер телефона филиала");

            migrationBuilder.AlterColumn<bool>(
                name: "is_deleted",
                table: "filial",
                type: "boolean",
                nullable: false,
                oldClrType: typeof(bool),
                oldType: "boolean",
                oldComment: "Флаг удаления");

            migrationBuilder.AlterColumn<string>(
                name: "address",
                table: "filial",
                type: "character varying(200)",
                maxLength: 200,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "character varying(200)",
                oldMaxLength: 200,
                oldComment: "Адрес филиала");

            migrationBuilder.AddColumn<int>(
                name: "id",
                table: "filial",
                type: "integer",
                nullable: false,
                defaultValue: 0)
                .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

            migrationBuilder.AddColumn<DateTime>(
                name: "created_at",
                table: "filial",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "updated_at",
                table: "filial",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AlterColumn<byte>(
                name: "stars",
                table: "feedback",
                type: "smallint",
                nullable: false,
                oldClrType: typeof(byte),
                oldType: "smallint",
                oldComment: "Количество звезд");

            migrationBuilder.AlterColumn<string>(
                name: "response",
                table: "feedback",
                type: "text",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "text",
                oldComment: "Текст отзыва");

            migrationBuilder.AlterColumn<int>(
                name: "rent_id",
                table: "feedback",
                type: "integer",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer",
                oldComment: "ID аренды");

            migrationBuilder.AlterColumn<bool>(
                name: "is_deleted",
                table: "feedback",
                type: "boolean",
                nullable: false,
                oldClrType: typeof(bool),
                oldType: "boolean",
                oldComment: "Флаг удаления");

            migrationBuilder.AddColumn<int>(
                name: "id",
                table: "feedback",
                type: "integer",
                nullable: false,
                defaultValue: 0)
                .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

            migrationBuilder.AddColumn<DateTime>(
                name: "created_at",
                table: "feedback",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "updated_at",
                table: "feedback",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AlterColumn<string>(
                name: "model_name",
                table: "car_model",
                type: "character varying(100)",
                maxLength: 100,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "character varying(100)",
                oldMaxLength: 100,
                oldComment: "Название модели автомобиля");

            migrationBuilder.AlterColumn<bool>(
                name: "is_deleted",
                table: "car_model",
                type: "boolean",
                nullable: false,
                oldClrType: typeof(bool),
                oldType: "boolean",
                oldComment: "Флаг удаления");

            migrationBuilder.AlterColumn<int>(
                name: "car_brand_id",
                table: "car_model",
                type: "integer",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer",
                oldComment: "ID бренда автомобиля");

            migrationBuilder.AddColumn<int>(
                name: "id",
                table: "car_model",
                type: "integer",
                nullable: false,
                defaultValue: 0)
                .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

            migrationBuilder.AddColumn<DateTime>(
                name: "created_at",
                table: "car_model",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "updated_at",
                table: "car_model",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AlterColumn<bool>(
                name: "is_deleted",
                table: "car_class",
                type: "boolean",
                nullable: false,
                oldClrType: typeof(bool),
                oldType: "boolean",
                oldComment: "Флаг удаления");

            migrationBuilder.AlterColumn<string>(
                name: "class_name",
                table: "car_class",
                type: "character varying(50)",
                maxLength: 50,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "character varying(50)",
                oldMaxLength: 50,
                oldComment: "Название класса автомобиля");

            migrationBuilder.AddColumn<int>(
                name: "id",
                table: "car_class",
                type: "integer",
                nullable: false,
                defaultValue: 0)
                .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

            migrationBuilder.AddColumn<DateTime>(
                name: "created_at",
                table: "car_class",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "updated_at",
                table: "car_class",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AlterColumn<string>(
                name: "name",
                table: "car_brand",
                type: "varchar(100)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "varchar(100)",
                oldComment: "Название марки автомобиля");

            migrationBuilder.AlterColumn<bool>(
                name: "is_deleted",
                table: "car_brand",
                type: "boolean",
                nullable: false,
                oldClrType: typeof(bool),
                oldType: "boolean",
                oldComment: "Флаг удаления");

            migrationBuilder.AddColumn<int>(
                name: "id",
                table: "car_brand",
                type: "integer",
                nullable: false,
                defaultValue: 0)
                .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

            migrationBuilder.AddColumn<DateTime>(
                name: "created_at",
                table: "car_brand",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "updated_at",
                table: "car_brand",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AlterColumn<int>(
                name: "year",
                table: "car",
                type: "integer",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer",
                oldComment: "Год выпуска");

            migrationBuilder.AlterColumn<int>(
                name: "model_id",
                table: "car",
                type: "integer",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer",
                oldComment: "ID модели автомобиля");

            migrationBuilder.AlterColumn<bool>(
                name: "is_deleted",
                table: "car",
                type: "boolean",
                nullable: false,
                oldClrType: typeof(bool),
                oldType: "boolean",
                oldComment: "Флаг удаления");

            migrationBuilder.AlterColumn<short>(
                name: "gear_box",
                table: "car",
                type: "smallint",
                nullable: false,
                oldClrType: typeof(short),
                oldType: "smallint",
                oldComment: "Тип коробки передач");

            migrationBuilder.AlterColumn<int>(
                name: "filial_id",
                table: "car",
                type: "integer",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer",
                oldComment: "ID филиала автомобиля");

            migrationBuilder.AlterColumn<decimal>(
                name: "cost_day",
                table: "car",
                type: "money",
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "money",
                oldComment: "Стоимость аренды в день");

            migrationBuilder.AlterColumn<int>(
                name: "class_id",
                table: "car",
                type: "integer",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer",
                oldComment: "ID класса автомобиля");

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

            migrationBuilder.AddColumn<int>(
                name: "id",
                table: "car",
                type: "integer",
                nullable: false,
                defaultValue: 0)
                .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

            migrationBuilder.AddColumn<DateTime>(
                name: "created_at",
                table: "car",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "updated_at",
                table: "car",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddPrimaryKey(
                name: "pk_user",
                table: "user",
                column: "id");

            migrationBuilder.AddPrimaryKey(
                name: "pk_token",
                table: "token",
                column: "user_id");

            migrationBuilder.AddPrimaryKey(
                name: "pk_role",
                table: "role",
                column: "id");

            migrationBuilder.AddPrimaryKey(
                name: "pk_rent",
                table: "rent",
                column: "id");

            migrationBuilder.AddPrimaryKey(
                name: "pk_filial",
                table: "filial",
                column: "id");

            migrationBuilder.AddPrimaryKey(
                name: "pk_feedback",
                table: "feedback",
                column: "id");

            migrationBuilder.AddPrimaryKey(
                name: "pk_car_model",
                table: "car_model",
                column: "id");

            migrationBuilder.AddPrimaryKey(
                name: "pk_car_class",
                table: "car_class",
                column: "id");

            migrationBuilder.AddPrimaryKey(
                name: "pk_car_brand",
                table: "car_brand",
                column: "id");

            migrationBuilder.AddPrimaryKey(
                name: "pk_car",
                table: "car",
                column: "id");

            migrationBuilder.AddForeignKey(
                name: "fk_car_car_class_class_id",
                table: "car",
                column: "class_id",
                principalTable: "car_class",
                principalColumn: "id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "fk_car_car_model_car_model_id",
                table: "car",
                column: "model_id",
                principalTable: "car_model",
                principalColumn: "id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "fk_car_filial_filial_id",
                table: "car",
                column: "filial_id",
                principalTable: "filial",
                principalColumn: "id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "fk_car_model_car_brand_car_brand_id",
                table: "car_model",
                column: "car_brand_id",
                principalTable: "car_brand",
                principalColumn: "id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "fk_feedback_rent_rent_id",
                table: "feedback",
                column: "rent_id",
                principalTable: "rent",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "fk_rent_car_car_id",
                table: "rent",
                column: "car_id",
                principalTable: "car",
                principalColumn: "id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "fk_rent_user_user_id",
                table: "rent",
                column: "user_id",
                principalTable: "user",
                principalColumn: "id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "fk_user_role_role_id",
                table: "user",
                column: "role_id",
                principalTable: "role",
                principalColumn: "id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "fk_car_car_class_class_id",
                table: "car");

            migrationBuilder.DropForeignKey(
                name: "fk_car_car_model_car_model_id",
                table: "car");

            migrationBuilder.DropForeignKey(
                name: "fk_car_filial_filial_id",
                table: "car");

            migrationBuilder.DropForeignKey(
                name: "fk_car_model_car_brand_car_brand_id",
                table: "car_model");

            migrationBuilder.DropForeignKey(
                name: "fk_feedback_rent_rent_id",
                table: "feedback");

            migrationBuilder.DropForeignKey(
                name: "fk_rent_car_car_id",
                table: "rent");

            migrationBuilder.DropForeignKey(
                name: "fk_rent_user_user_id",
                table: "rent");

            migrationBuilder.DropForeignKey(
                name: "fk_user_role_role_id",
                table: "user");

            migrationBuilder.DropPrimaryKey(
                name: "pk_user",
                table: "user");

            migrationBuilder.DropPrimaryKey(
                name: "pk_token",
                table: "token");

            migrationBuilder.DropPrimaryKey(
                name: "pk_role",
                table: "role");

            migrationBuilder.DropPrimaryKey(
                name: "pk_rent",
                table: "rent");

            migrationBuilder.DropPrimaryKey(
                name: "pk_filial",
                table: "filial");

            migrationBuilder.DropPrimaryKey(
                name: "pk_feedback",
                table: "feedback");

            migrationBuilder.DropPrimaryKey(
                name: "pk_car_model",
                table: "car_model");

            migrationBuilder.DropPrimaryKey(
                name: "pk_car_class",
                table: "car_class");

            migrationBuilder.DropPrimaryKey(
                name: "pk_car_brand",
                table: "car_brand");

            migrationBuilder.DropPrimaryKey(
                name: "pk_car",
                table: "car");

            migrationBuilder.DropColumn(
                name: "id",
                table: "user");

            migrationBuilder.DropColumn(
                name: "updated_at",
                table: "user");

            migrationBuilder.DropColumn(
                name: "id",
                table: "role");

            migrationBuilder.DropColumn(
                name: "created_at",
                table: "role");

            migrationBuilder.DropColumn(
                name: "is_deleted",
                table: "role");

            migrationBuilder.DropColumn(
                name: "updated_at",
                table: "role");

            migrationBuilder.DropColumn(
                name: "id",
                table: "rent");

            migrationBuilder.DropColumn(
                name: "updated_at",
                table: "rent");

            migrationBuilder.DropColumn(
                name: "id",
                table: "filial");

            migrationBuilder.DropColumn(
                name: "created_at",
                table: "filial");

            migrationBuilder.DropColumn(
                name: "updated_at",
                table: "filial");

            migrationBuilder.DropColumn(
                name: "id",
                table: "feedback");

            migrationBuilder.DropColumn(
                name: "created_at",
                table: "feedback");

            migrationBuilder.DropColumn(
                name: "updated_at",
                table: "feedback");

            migrationBuilder.DropColumn(
                name: "id",
                table: "car_model");

            migrationBuilder.DropColumn(
                name: "created_at",
                table: "car_model");

            migrationBuilder.DropColumn(
                name: "updated_at",
                table: "car_model");

            migrationBuilder.DropColumn(
                name: "id",
                table: "car_class");

            migrationBuilder.DropColumn(
                name: "created_at",
                table: "car_class");

            migrationBuilder.DropColumn(
                name: "updated_at",
                table: "car_class");

            migrationBuilder.DropColumn(
                name: "id",
                table: "car_brand");

            migrationBuilder.DropColumn(
                name: "created_at",
                table: "car_brand");

            migrationBuilder.DropColumn(
                name: "updated_at",
                table: "car_brand");

            migrationBuilder.DropColumn(
                name: "id",
                table: "car");

            migrationBuilder.DropColumn(
                name: "created_at",
                table: "car");

            migrationBuilder.DropColumn(
                name: "updated_at",
                table: "car");

            migrationBuilder.RenameTable(
                name: "token",
                newName: "Token");

            migrationBuilder.RenameColumn(
                name: "created_at",
                table: "user",
                newName: "CreatedAt");

            migrationBuilder.RenameIndex(
                name: "ix_user_role_id",
                table: "user",
                newName: "IX_user_role_id");

            migrationBuilder.RenameColumn(
                name: "refresh_token",
                table: "Token",
                newName: "RefreshToken");

            migrationBuilder.RenameColumn(
                name: "user_id",
                table: "Token",
                newName: "UserId");

            migrationBuilder.RenameColumn(
                name: "created_at",
                table: "rent",
                newName: "CreatedAt");

            migrationBuilder.RenameIndex(
                name: "ix_rent_user_id",
                table: "rent",
                newName: "IX_rent_user_id");

            migrationBuilder.RenameIndex(
                name: "ix_rent_car_id",
                table: "rent",
                newName: "IX_rent_car_id");

            migrationBuilder.RenameIndex(
                name: "ix_feedback_rent_id",
                table: "feedback",
                newName: "IX_feedback_rent_id");

            migrationBuilder.RenameIndex(
                name: "ix_car_model_car_brand_id",
                table: "car_model",
                newName: "IX_car_model_car_brand_id");

            migrationBuilder.RenameIndex(
                name: "ix_car_model_id",
                table: "car",
                newName: "IX_car_model_id");

            migrationBuilder.RenameIndex(
                name: "ix_car_filial_id",
                table: "car",
                newName: "IX_car_filial_id");

            migrationBuilder.RenameIndex(
                name: "ix_car_class_id",
                table: "car",
                newName: "IX_car_class_id");

            migrationBuilder.AlterTable(
                name: "user",
                comment: "Пользователь");

            migrationBuilder.AlterTable(
                name: "role",
                comment: "Роль пользователя");

            migrationBuilder.AlterTable(
                name: "rent",
                comment: "Аренда");

            migrationBuilder.AlterTable(
                name: "filial",
                comment: "Филиал");

            migrationBuilder.AlterTable(
                name: "feedback",
                comment: "Отзыв");

            migrationBuilder.AlterTable(
                name: "car_model",
                comment: "Модель автомобиля");

            migrationBuilder.AlterTable(
                name: "car_class",
                comment: "Класс автомобиля");

            migrationBuilder.AlterTable(
                name: "car_brand",
                comment: "Марка автомобиля");

            migrationBuilder.AlterTable(
                name: "car",
                comment: "Автомобиль");

            migrationBuilder.AlterColumn<string>(
                name: "user_image",
                table: "user",
                type: "character varying(255)",
                maxLength: 255,
                nullable: true,
                comment: "Изображение пользователя",
                oldClrType: typeof(string),
                oldType: "character varying(255)",
                oldMaxLength: 255,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "surname",
                table: "user",
                type: "character varying(100)",
                maxLength: 100,
                nullable: false,
                comment: "Фамилия",
                oldClrType: typeof(string),
                oldType: "character varying(100)",
                oldMaxLength: 100);

            migrationBuilder.AlterColumn<int>(
                name: "role_id",
                table: "user",
                type: "integer",
                nullable: false,
                comment: "ID роли",
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AlterColumn<string>(
                name: "phone_number",
                table: "user",
                type: "character varying(20)",
                maxLength: 20,
                nullable: false,
                comment: "Номер телефона",
                oldClrType: typeof(string),
                oldType: "character varying(20)",
                oldMaxLength: 20);

            migrationBuilder.AlterColumn<string>(
                name: "patronymic",
                table: "user",
                type: "character varying(100)",
                maxLength: 100,
                nullable: false,
                comment: "Отчество",
                oldClrType: typeof(string),
                oldType: "character varying(100)",
                oldMaxLength: 100);

            migrationBuilder.AlterColumn<string>(
                name: "password",
                table: "user",
                type: "varchar(150)",
                nullable: false,
                comment: "Пароль",
                oldClrType: typeof(string),
                oldType: "varchar(150)");

            migrationBuilder.AlterColumn<bool>(
                name: "is_deleted",
                table: "user",
                type: "boolean",
                nullable: false,
                comment: "Флаг удаления",
                oldClrType: typeof(bool),
                oldType: "boolean");

            migrationBuilder.AlterColumn<string>(
                name: "first_name",
                table: "user",
                type: "character varying(100)",
                maxLength: 100,
                nullable: false,
                comment: "Имя",
                oldClrType: typeof(string),
                oldType: "character varying(100)",
                oldMaxLength: 100);

            migrationBuilder.AlterColumn<string>(
                name: "email",
                table: "user",
                type: "varchar(150)",
                nullable: false,
                comment: "Email",
                oldClrType: typeof(string),
                oldType: "varchar(150)");

            migrationBuilder.AddColumn<int>(
                name: "user_id",
                table: "user",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                comment: "ID пользователя")
                .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

            migrationBuilder.AlterColumn<string>(
                name: "role_name",
                table: "role",
                type: "character varying(30)",
                maxLength: 30,
                nullable: false,
                comment: "Название роли",
                oldClrType: typeof(string),
                oldType: "character varying(30)",
                oldMaxLength: 30);

            migrationBuilder.AddColumn<int>(
                name: "role_id",
                table: "role",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                comment: "ID роли")
                .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

            migrationBuilder.AlterColumn<int>(
                name: "user_id",
                table: "rent",
                type: "integer",
                nullable: false,
                comment: "ID пользователя",
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AlterColumn<DateTime>(
                name: "start_date",
                table: "rent",
                type: "timestamp with time zone",
                nullable: false,
                comment: "Дата начала аренды",
                oldClrType: typeof(DateTime),
                oldType: "timestamp with time zone");

            migrationBuilder.AlterColumn<decimal>(
                name: "rent_cost",
                table: "rent",
                type: "money",
                nullable: false,
                comment: "Стоимость аренды",
                oldClrType: typeof(decimal),
                oldType: "money");

            migrationBuilder.AlterColumn<bool>(
                name: "is_deleted",
                table: "rent",
                type: "boolean",
                nullable: false,
                comment: "Флаг удаления",
                oldClrType: typeof(bool),
                oldType: "boolean");

            migrationBuilder.AlterColumn<DateTime>(
                name: "end_date",
                table: "rent",
                type: "timestamp with time zone",
                nullable: false,
                comment: "Дата окончания аренды",
                oldClrType: typeof(DateTime),
                oldType: "timestamp with time zone");

            migrationBuilder.AlterColumn<int>(
                name: "car_id",
                table: "rent",
                type: "integer",
                nullable: false,
                comment: "ID автомобиля",
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AddColumn<int>(
                name: "rent_id",
                table: "rent",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                comment: "ID аренды")
                .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

            migrationBuilder.AlterColumn<string>(
                name: "phone_number",
                table: "filial",
                type: "character varying(30)",
                maxLength: 30,
                nullable: false,
                comment: "Номер телефона филиала",
                oldClrType: typeof(string),
                oldType: "character varying(30)",
                oldMaxLength: 30);

            migrationBuilder.AlterColumn<bool>(
                name: "is_deleted",
                table: "filial",
                type: "boolean",
                nullable: false,
                comment: "Флаг удаления",
                oldClrType: typeof(bool),
                oldType: "boolean");

            migrationBuilder.AlterColumn<string>(
                name: "address",
                table: "filial",
                type: "character varying(200)",
                maxLength: 200,
                nullable: false,
                comment: "Адрес филиала",
                oldClrType: typeof(string),
                oldType: "character varying(200)",
                oldMaxLength: 200);

            migrationBuilder.AddColumn<int>(
                name: "filial_id",
                table: "filial",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                comment: "ID филиала")
                .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

            migrationBuilder.AlterColumn<byte>(
                name: "stars",
                table: "feedback",
                type: "smallint",
                nullable: false,
                comment: "Количество звезд",
                oldClrType: typeof(byte),
                oldType: "smallint");

            migrationBuilder.AlterColumn<string>(
                name: "response",
                table: "feedback",
                type: "text",
                nullable: false,
                comment: "Текст отзыва",
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AlterColumn<int>(
                name: "rent_id",
                table: "feedback",
                type: "integer",
                nullable: false,
                comment: "ID аренды",
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AlterColumn<bool>(
                name: "is_deleted",
                table: "feedback",
                type: "boolean",
                nullable: false,
                comment: "Флаг удаления",
                oldClrType: typeof(bool),
                oldType: "boolean");

            migrationBuilder.AddColumn<int>(
                name: "feedback_id",
                table: "feedback",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                comment: "ID отзыва")
                .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

            migrationBuilder.AddColumn<DateTime>(
                name: "feedback_date",
                table: "feedback",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                comment: "Дата отзыва");

            migrationBuilder.AlterColumn<string>(
                name: "model_name",
                table: "car_model",
                type: "character varying(100)",
                maxLength: 100,
                nullable: false,
                comment: "Название модели автомобиля",
                oldClrType: typeof(string),
                oldType: "character varying(100)",
                oldMaxLength: 100);

            migrationBuilder.AlterColumn<bool>(
                name: "is_deleted",
                table: "car_model",
                type: "boolean",
                nullable: false,
                comment: "Флаг удаления",
                oldClrType: typeof(bool),
                oldType: "boolean");

            migrationBuilder.AlterColumn<int>(
                name: "car_brand_id",
                table: "car_model",
                type: "integer",
                nullable: false,
                comment: "ID бренда автомобиля",
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AddColumn<int>(
                name: "car_model_id",
                table: "car_model",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                comment: "ID модели автомобиля")
                .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

            migrationBuilder.AlterColumn<bool>(
                name: "is_deleted",
                table: "car_class",
                type: "boolean",
                nullable: false,
                comment: "Флаг удаления",
                oldClrType: typeof(bool),
                oldType: "boolean");

            migrationBuilder.AlterColumn<string>(
                name: "class_name",
                table: "car_class",
                type: "character varying(50)",
                maxLength: 50,
                nullable: false,
                comment: "Название класса автомобиля",
                oldClrType: typeof(string),
                oldType: "character varying(50)",
                oldMaxLength: 50);

            migrationBuilder.AddColumn<int>(
                name: "car_class_id",
                table: "car_class",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                comment: "ID класса автомобиля")
                .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

            migrationBuilder.AlterColumn<string>(
                name: "name",
                table: "car_brand",
                type: "varchar(100)",
                nullable: false,
                comment: "Название марки автомобиля",
                oldClrType: typeof(string),
                oldType: "varchar(100)");

            migrationBuilder.AlterColumn<bool>(
                name: "is_deleted",
                table: "car_brand",
                type: "boolean",
                nullable: false,
                comment: "Флаг удаления",
                oldClrType: typeof(bool),
                oldType: "boolean");

            migrationBuilder.AddColumn<int>(
                name: "car_brand_id",
                table: "car_brand",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                comment: "ID марки автомобиля")
                .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

            migrationBuilder.AlterColumn<int>(
                name: "year",
                table: "car",
                type: "integer",
                nullable: false,
                comment: "Год выпуска",
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AlterColumn<int>(
                name: "model_id",
                table: "car",
                type: "integer",
                nullable: false,
                comment: "ID модели автомобиля",
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AlterColumn<bool>(
                name: "is_deleted",
                table: "car",
                type: "boolean",
                nullable: false,
                comment: "Флаг удаления",
                oldClrType: typeof(bool),
                oldType: "boolean");

            migrationBuilder.AlterColumn<short>(
                name: "gear_box",
                table: "car",
                type: "smallint",
                nullable: false,
                comment: "Тип коробки передач",
                oldClrType: typeof(short),
                oldType: "smallint");

            migrationBuilder.AlterColumn<int>(
                name: "filial_id",
                table: "car",
                type: "integer",
                nullable: false,
                comment: "ID филиала автомобиля",
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AlterColumn<decimal>(
                name: "cost_day",
                table: "car",
                type: "money",
                nullable: false,
                comment: "Стоимость аренды в день",
                oldClrType: typeof(decimal),
                oldType: "money");

            migrationBuilder.AlterColumn<int>(
                name: "class_id",
                table: "car",
                type: "integer",
                nullable: false,
                comment: "ID класса автомобиля",
                oldClrType: typeof(int),
                oldType: "integer");

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

            migrationBuilder.AddColumn<int>(
                name: "car_id",
                table: "car",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                comment: "ID автомобиля")
                .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

            migrationBuilder.AddPrimaryKey(
                name: "PK_user",
                table: "user",
                column: "user_id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Token",
                table: "Token",
                column: "UserId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_role",
                table: "role",
                column: "role_id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_rent",
                table: "rent",
                column: "rent_id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_filial",
                table: "filial",
                column: "filial_id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_feedback",
                table: "feedback",
                column: "feedback_id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_car_model",
                table: "car_model",
                column: "car_model_id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_car_class",
                table: "car_class",
                column: "car_class_id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_car_brand",
                table: "car_brand",
                column: "car_brand_id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_car",
                table: "car",
                column: "car_id");

            migrationBuilder.AddForeignKey(
                name: "FK_car_car_class_class_id",
                table: "car",
                column: "class_id",
                principalTable: "car_class",
                principalColumn: "car_class_id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_car_car_model_model_id",
                table: "car",
                column: "model_id",
                principalTable: "car_model",
                principalColumn: "car_model_id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_car_filial_filial_id",
                table: "car",
                column: "filial_id",
                principalTable: "filial",
                principalColumn: "filial_id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_car_model_car_brand_car_brand_id",
                table: "car_model",
                column: "car_brand_id",
                principalTable: "car_brand",
                principalColumn: "car_brand_id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_feedback_rent_rent_id",
                table: "feedback",
                column: "rent_id",
                principalTable: "rent",
                principalColumn: "rent_id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_rent_car_car_id",
                table: "rent",
                column: "car_id",
                principalTable: "car",
                principalColumn: "car_id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_rent_user_user_id",
                table: "rent",
                column: "user_id",
                principalTable: "user",
                principalColumn: "user_id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_user_role_role_id",
                table: "user",
                column: "role_id",
                principalTable: "role",
                principalColumn: "role_id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
