using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace YoDrive.Migrations
{
    /// <inheritdoc />
    public partial class ChangeAllTables : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Car_CarClass_ClassId",
                table: "Car");

            migrationBuilder.DropForeignKey(
                name: "FK_Car_CarModel_CarModelId",
                table: "Car");

            migrationBuilder.DropForeignKey(
                name: "FK_Car_Filial_FilialId",
                table: "Car");

            migrationBuilder.DropForeignKey(
                name: "FK_CarModel_CarBrand_CarBrandId",
                table: "CarModel");

            migrationBuilder.DropForeignKey(
                name: "FK_Feedback_Rent_RentId",
                table: "Feedback");

            migrationBuilder.DropForeignKey(
                name: "FK_Rent_Car_CarId",
                table: "Rent");

            migrationBuilder.DropForeignKey(
                name: "FK_Rent_User_UserId",
                table: "Rent");

            migrationBuilder.DropForeignKey(
                name: "FK_User_Role_RoleId",
                table: "User");

            migrationBuilder.DropPrimaryKey(
                name: "PK_User",
                table: "User");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Role",
                table: "Role");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Rent",
                table: "Rent");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Filial",
                table: "Filial");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Feedback",
                table: "Feedback");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Car",
                table: "Car");

            migrationBuilder.DropIndex(
                name: "IX_Car_CarModelId",
                table: "Car");

            migrationBuilder.DropPrimaryKey(
                name: "PK_CarModel",
                table: "CarModel");

            migrationBuilder.DropPrimaryKey(
                name: "PK_CarClass",
                table: "CarClass");

            migrationBuilder.DropPrimaryKey(
                name: "PK_CarBrand",
                table: "CarBrand");

            migrationBuilder.DropColumn(
                name: "CarModelId",
                table: "Car");

            migrationBuilder.RenameTable(
                name: "User",
                newName: "user");

            migrationBuilder.RenameTable(
                name: "Role",
                newName: "role");

            migrationBuilder.RenameTable(
                name: "Rent",
                newName: "rent");

            migrationBuilder.RenameTable(
                name: "Filial",
                newName: "filial");

            migrationBuilder.RenameTable(
                name: "Feedback",
                newName: "feedback");

            migrationBuilder.RenameTable(
                name: "Car",
                newName: "car");

            migrationBuilder.RenameTable(
                name: "CarModel",
                newName: "car_model");

            migrationBuilder.RenameTable(
                name: "CarClass",
                newName: "car_class");

            migrationBuilder.RenameTable(
                name: "CarBrand",
                newName: "car_brand");

            migrationBuilder.RenameColumn(
                name: "Surname",
                table: "user",
                newName: "surname");

            migrationBuilder.RenameColumn(
                name: "Patronymic",
                table: "user",
                newName: "patronymic");

            migrationBuilder.RenameColumn(
                name: "Password",
                table: "user",
                newName: "password");

            migrationBuilder.RenameColumn(
                name: "Email",
                table: "user",
                newName: "email");

            migrationBuilder.RenameColumn(
                name: "UserImage",
                table: "user",
                newName: "user_image");

            migrationBuilder.RenameColumn(
                name: "RoleId",
                table: "user",
                newName: "role_id");

            migrationBuilder.RenameColumn(
                name: "PhoneNumber",
                table: "user",
                newName: "phone_number");

            migrationBuilder.RenameColumn(
                name: "IsDeleted",
                table: "user",
                newName: "is_deleted");

            migrationBuilder.RenameColumn(
                name: "FirstName",
                table: "user",
                newName: "first_name");

            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "user",
                newName: "user_id");

            migrationBuilder.RenameIndex(
                name: "IX_User_RoleId",
                table: "user",
                newName: "IX_user_role_id");

            migrationBuilder.RenameColumn(
                name: "RoleName",
                table: "role",
                newName: "role_name");

            migrationBuilder.RenameColumn(
                name: "RoleId",
                table: "role",
                newName: "role_id");

            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "rent",
                newName: "user_id");

            migrationBuilder.RenameColumn(
                name: "StartDate",
                table: "rent",
                newName: "start_date");

            migrationBuilder.RenameColumn(
                name: "RentCost",
                table: "rent",
                newName: "rent_cost");

            migrationBuilder.RenameColumn(
                name: "IsDeleted",
                table: "rent",
                newName: "is_deleted");

            migrationBuilder.RenameColumn(
                name: "EndDate",
                table: "rent",
                newName: "end_date");

            migrationBuilder.RenameColumn(
                name: "CarId",
                table: "rent",
                newName: "car_id");

            migrationBuilder.RenameColumn(
                name: "RentId",
                table: "rent",
                newName: "rent_id");

            migrationBuilder.RenameIndex(
                name: "IX_Rent_UserId",
                table: "rent",
                newName: "IX_rent_user_id");

            migrationBuilder.RenameIndex(
                name: "IX_Rent_CarId",
                table: "rent",
                newName: "IX_rent_car_id");

            migrationBuilder.RenameColumn(
                name: "Address",
                table: "filial",
                newName: "address");

            migrationBuilder.RenameColumn(
                name: "PhoneNumber",
                table: "filial",
                newName: "phone_number");

            migrationBuilder.RenameColumn(
                name: "IsDeleted",
                table: "filial",
                newName: "is_deleted");

            migrationBuilder.RenameColumn(
                name: "FilialId",
                table: "filial",
                newName: "filial_id");

            migrationBuilder.RenameColumn(
                name: "Stars",
                table: "feedback",
                newName: "stars");

            migrationBuilder.RenameColumn(
                name: "Response",
                table: "feedback",
                newName: "response");

            migrationBuilder.RenameColumn(
                name: "RentId",
                table: "feedback",
                newName: "rent_id");

            migrationBuilder.RenameColumn(
                name: "IsDeleted",
                table: "feedback",
                newName: "is_deleted");

            migrationBuilder.RenameColumn(
                name: "FeedbackDate",
                table: "feedback",
                newName: "feedback_date");

            migrationBuilder.RenameColumn(
                name: "FeedbackId",
                table: "feedback",
                newName: "feedback_id");

            migrationBuilder.RenameIndex(
                name: "IX_Feedback_RentId",
                table: "feedback",
                newName: "IX_feedback_rent_id");

            migrationBuilder.RenameColumn(
                name: "Engine",
                table: "car",
                newName: "engine");

            migrationBuilder.RenameColumn(
                name: "StateNumber",
                table: "car",
                newName: "state_number");

            migrationBuilder.RenameColumn(
                name: "ModelId",
                table: "car",
                newName: "model_id");

            migrationBuilder.RenameColumn(
                name: "IsDeleted",
                table: "car",
                newName: "is_deleted");

            migrationBuilder.RenameColumn(
                name: "GearBox",
                table: "car",
                newName: "gear_box");

            migrationBuilder.RenameColumn(
                name: "FilialId",
                table: "car",
                newName: "filial_id");

            migrationBuilder.RenameColumn(
                name: "CostDay",
                table: "car",
                newName: "cost_day");

            migrationBuilder.RenameColumn(
                name: "ClassId",
                table: "car",
                newName: "class_id");

            migrationBuilder.RenameColumn(
                name: "CarImage",
                table: "car",
                newName: "car_image");

            migrationBuilder.RenameColumn(
                name: "CarId",
                table: "car",
                newName: "car_id");

            migrationBuilder.RenameIndex(
                name: "IX_Car_FilialId",
                table: "car",
                newName: "IX_car_filial_id");

            migrationBuilder.RenameIndex(
                name: "IX_Car_ClassId",
                table: "car",
                newName: "IX_car_class_id");

            migrationBuilder.RenameColumn(
                name: "ModelName",
                table: "car_model",
                newName: "model_name");

            migrationBuilder.RenameColumn(
                name: "IsDeleted",
                table: "car_model",
                newName: "is_deleted");

            migrationBuilder.RenameColumn(
                name: "CarBrandId",
                table: "car_model",
                newName: "car_brand_id");

            migrationBuilder.RenameColumn(
                name: "CarModelId",
                table: "car_model",
                newName: "car_model_id");

            migrationBuilder.RenameIndex(
                name: "IX_CarModel_CarBrandId",
                table: "car_model",
                newName: "IX_car_model_car_brand_id");

            migrationBuilder.RenameColumn(
                name: "IsDeleted",
                table: "car_class",
                newName: "is_deleted");

            migrationBuilder.RenameColumn(
                name: "ClassName",
                table: "car_class",
                newName: "class_name");

            migrationBuilder.RenameColumn(
                name: "CarClassId",
                table: "car_class",
                newName: "car_class_id");

            migrationBuilder.RenameColumn(
                name: "Name",
                table: "car_brand",
                newName: "name");

            migrationBuilder.RenameColumn(
                name: "IsDeleted",
                table: "car_brand",
                newName: "is_deleted");

            migrationBuilder.RenameColumn(
                name: "CarBrandId",
                table: "car_brand",
                newName: "car_brand_id");

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
                name: "car",
                comment: "Автомобиль");

            migrationBuilder.AlterTable(
                name: "car_model",
                comment: "Модель автомобиля");

            migrationBuilder.AlterTable(
                name: "car_class",
                comment: "Класс автомобиля");

            migrationBuilder.AlterTable(
                name: "car_brand",
                comment: "Марка автомобиля");

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

            migrationBuilder.AlterColumn<string>(
                name: "email",
                table: "user",
                type: "varchar(150)",
                nullable: false,
                comment: "Email",
                oldClrType: typeof(string),
                oldType: "varchar(150)");

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

            migrationBuilder.AlterColumn<int>(
                name: "user_id",
                table: "user",
                type: "integer",
                nullable: false,
                comment: "ID пользователя",
                oldClrType: typeof(int),
                oldType: "integer")
                .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn)
                .OldAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

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

            migrationBuilder.AlterColumn<int>(
                name: "role_id",
                table: "role",
                type: "integer",
                nullable: false,
                comment: "ID роли",
                oldClrType: typeof(int),
                oldType: "integer")
                .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn)
                .OldAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

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

            migrationBuilder.AlterColumn<int>(
                name: "rent_id",
                table: "rent",
                type: "integer",
                nullable: false,
                comment: "ID аренды",
                oldClrType: typeof(int),
                oldType: "integer")
                .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn)
                .OldAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

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

            migrationBuilder.AlterColumn<int>(
                name: "filial_id",
                table: "filial",
                type: "integer",
                nullable: false,
                comment: "ID филиала",
                oldClrType: typeof(int),
                oldType: "integer")
                .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn)
                .OldAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

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

            migrationBuilder.AlterColumn<DateTime>(
                name: "feedback_date",
                table: "feedback",
                type: "timestamp with time zone",
                nullable: false,
                comment: "Дата отзыва",
                oldClrType: typeof(DateTime),
                oldType: "timestamp with time zone");

            migrationBuilder.AlterColumn<int>(
                name: "feedback_id",
                table: "feedback",
                type: "integer",
                nullable: false,
                comment: "ID отзыва",
                oldClrType: typeof(int),
                oldType: "integer")
                .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn)
                .OldAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

            migrationBuilder.AlterColumn<short>(
                name: "engine",
                table: "car",
                type: "smallint",
                nullable: false,
                comment: "Тип двигателя",
                oldClrType: typeof(short),
                oldType: "smallint");

            migrationBuilder.AlterColumn<string>(
                name: "state_number",
                table: "car",
                type: "character varying(12)",
                maxLength: 12,
                nullable: false,
                comment: "Государственный номер автомобиля",
                oldClrType: typeof(string),
                oldType: "character varying(12)",
                oldMaxLength: 12);

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

            migrationBuilder.AlterColumn<int>(
                name: "car_id",
                table: "car",
                type: "integer",
                nullable: false,
                comment: "ID автомобиля",
                oldClrType: typeof(int),
                oldType: "integer")
                .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn)
                .OldAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

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

            migrationBuilder.AlterColumn<int>(
                name: "car_model_id",
                table: "car_model",
                type: "integer",
                nullable: false,
                comment: "ID модели автомобиля",
                oldClrType: typeof(int),
                oldType: "integer")
                .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn)
                .OldAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

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

            migrationBuilder.AlterColumn<int>(
                name: "car_class_id",
                table: "car_class",
                type: "integer",
                nullable: false,
                comment: "ID класса автомобиля",
                oldClrType: typeof(int),
                oldType: "integer")
                .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn)
                .OldAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

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

            migrationBuilder.AlterColumn<int>(
                name: "car_brand_id",
                table: "car_brand",
                type: "integer",
                nullable: false,
                comment: "ID марки автомобиля",
                oldClrType: typeof(int),
                oldType: "integer")
                .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn)
                .OldAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

            migrationBuilder.AddPrimaryKey(
                name: "PK_user",
                table: "user",
                column: "user_id");

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
                name: "PK_car",
                table: "car",
                column: "car_id");

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

            migrationBuilder.CreateIndex(
                name: "IX_car_model_id",
                table: "car",
                column: "model_id");

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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
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
                name: "PK_car",
                table: "car");

            migrationBuilder.DropIndex(
                name: "IX_car_model_id",
                table: "car");

            migrationBuilder.DropPrimaryKey(
                name: "PK_car_model",
                table: "car_model");

            migrationBuilder.DropPrimaryKey(
                name: "PK_car_class",
                table: "car_class");

            migrationBuilder.DropPrimaryKey(
                name: "PK_car_brand",
                table: "car_brand");

            migrationBuilder.RenameTable(
                name: "user",
                newName: "User");

            migrationBuilder.RenameTable(
                name: "role",
                newName: "Role");

            migrationBuilder.RenameTable(
                name: "rent",
                newName: "Rent");

            migrationBuilder.RenameTable(
                name: "filial",
                newName: "Filial");

            migrationBuilder.RenameTable(
                name: "feedback",
                newName: "Feedback");

            migrationBuilder.RenameTable(
                name: "car",
                newName: "Car");

            migrationBuilder.RenameTable(
                name: "car_model",
                newName: "CarModel");

            migrationBuilder.RenameTable(
                name: "car_class",
                newName: "CarClass");

            migrationBuilder.RenameTable(
                name: "car_brand",
                newName: "CarBrand");

            migrationBuilder.RenameColumn(
                name: "surname",
                table: "User",
                newName: "Surname");

            migrationBuilder.RenameColumn(
                name: "patronymic",
                table: "User",
                newName: "Patronymic");

            migrationBuilder.RenameColumn(
                name: "password",
                table: "User",
                newName: "Password");

            migrationBuilder.RenameColumn(
                name: "email",
                table: "User",
                newName: "Email");

            migrationBuilder.RenameColumn(
                name: "user_image",
                table: "User",
                newName: "UserImage");

            migrationBuilder.RenameColumn(
                name: "role_id",
                table: "User",
                newName: "RoleId");

            migrationBuilder.RenameColumn(
                name: "phone_number",
                table: "User",
                newName: "PhoneNumber");

            migrationBuilder.RenameColumn(
                name: "is_deleted",
                table: "User",
                newName: "IsDeleted");

            migrationBuilder.RenameColumn(
                name: "first_name",
                table: "User",
                newName: "FirstName");

            migrationBuilder.RenameColumn(
                name: "user_id",
                table: "User",
                newName: "UserId");

            migrationBuilder.RenameIndex(
                name: "IX_user_role_id",
                table: "User",
                newName: "IX_User_RoleId");

            migrationBuilder.RenameColumn(
                name: "role_name",
                table: "Role",
                newName: "RoleName");

            migrationBuilder.RenameColumn(
                name: "role_id",
                table: "Role",
                newName: "RoleId");

            migrationBuilder.RenameColumn(
                name: "user_id",
                table: "Rent",
                newName: "UserId");

            migrationBuilder.RenameColumn(
                name: "start_date",
                table: "Rent",
                newName: "StartDate");

            migrationBuilder.RenameColumn(
                name: "rent_cost",
                table: "Rent",
                newName: "RentCost");

            migrationBuilder.RenameColumn(
                name: "is_deleted",
                table: "Rent",
                newName: "IsDeleted");

            migrationBuilder.RenameColumn(
                name: "end_date",
                table: "Rent",
                newName: "EndDate");

            migrationBuilder.RenameColumn(
                name: "car_id",
                table: "Rent",
                newName: "CarId");

            migrationBuilder.RenameColumn(
                name: "rent_id",
                table: "Rent",
                newName: "RentId");

            migrationBuilder.RenameIndex(
                name: "IX_rent_user_id",
                table: "Rent",
                newName: "IX_Rent_UserId");

            migrationBuilder.RenameIndex(
                name: "IX_rent_car_id",
                table: "Rent",
                newName: "IX_Rent_CarId");

            migrationBuilder.RenameColumn(
                name: "address",
                table: "Filial",
                newName: "Address");

            migrationBuilder.RenameColumn(
                name: "phone_number",
                table: "Filial",
                newName: "PhoneNumber");

            migrationBuilder.RenameColumn(
                name: "is_deleted",
                table: "Filial",
                newName: "IsDeleted");

            migrationBuilder.RenameColumn(
                name: "filial_id",
                table: "Filial",
                newName: "FilialId");

            migrationBuilder.RenameColumn(
                name: "stars",
                table: "Feedback",
                newName: "Stars");

            migrationBuilder.RenameColumn(
                name: "response",
                table: "Feedback",
                newName: "Response");

            migrationBuilder.RenameColumn(
                name: "rent_id",
                table: "Feedback",
                newName: "RentId");

            migrationBuilder.RenameColumn(
                name: "is_deleted",
                table: "Feedback",
                newName: "IsDeleted");

            migrationBuilder.RenameColumn(
                name: "feedback_date",
                table: "Feedback",
                newName: "FeedbackDate");

            migrationBuilder.RenameColumn(
                name: "feedback_id",
                table: "Feedback",
                newName: "FeedbackId");

            migrationBuilder.RenameIndex(
                name: "IX_feedback_rent_id",
                table: "Feedback",
                newName: "IX_Feedback_RentId");

            migrationBuilder.RenameColumn(
                name: "engine",
                table: "Car",
                newName: "Engine");

            migrationBuilder.RenameColumn(
                name: "state_number",
                table: "Car",
                newName: "StateNumber");

            migrationBuilder.RenameColumn(
                name: "model_id",
                table: "Car",
                newName: "ModelId");

            migrationBuilder.RenameColumn(
                name: "is_deleted",
                table: "Car",
                newName: "IsDeleted");

            migrationBuilder.RenameColumn(
                name: "gear_box",
                table: "Car",
                newName: "GearBox");

            migrationBuilder.RenameColumn(
                name: "filial_id",
                table: "Car",
                newName: "FilialId");

            migrationBuilder.RenameColumn(
                name: "cost_day",
                table: "Car",
                newName: "CostDay");

            migrationBuilder.RenameColumn(
                name: "class_id",
                table: "Car",
                newName: "ClassId");

            migrationBuilder.RenameColumn(
                name: "car_image",
                table: "Car",
                newName: "CarImage");

            migrationBuilder.RenameColumn(
                name: "car_id",
                table: "Car",
                newName: "CarId");

            migrationBuilder.RenameIndex(
                name: "IX_car_filial_id",
                table: "Car",
                newName: "IX_Car_FilialId");

            migrationBuilder.RenameIndex(
                name: "IX_car_class_id",
                table: "Car",
                newName: "IX_Car_ClassId");

            migrationBuilder.RenameColumn(
                name: "model_name",
                table: "CarModel",
                newName: "ModelName");

            migrationBuilder.RenameColumn(
                name: "is_deleted",
                table: "CarModel",
                newName: "IsDeleted");

            migrationBuilder.RenameColumn(
                name: "car_brand_id",
                table: "CarModel",
                newName: "CarBrandId");

            migrationBuilder.RenameColumn(
                name: "car_model_id",
                table: "CarModel",
                newName: "CarModelId");

            migrationBuilder.RenameIndex(
                name: "IX_car_model_car_brand_id",
                table: "CarModel",
                newName: "IX_CarModel_CarBrandId");

            migrationBuilder.RenameColumn(
                name: "is_deleted",
                table: "CarClass",
                newName: "IsDeleted");

            migrationBuilder.RenameColumn(
                name: "class_name",
                table: "CarClass",
                newName: "ClassName");

            migrationBuilder.RenameColumn(
                name: "car_class_id",
                table: "CarClass",
                newName: "CarClassId");

            migrationBuilder.RenameColumn(
                name: "name",
                table: "CarBrand",
                newName: "Name");

            migrationBuilder.RenameColumn(
                name: "is_deleted",
                table: "CarBrand",
                newName: "IsDeleted");

            migrationBuilder.RenameColumn(
                name: "car_brand_id",
                table: "CarBrand",
                newName: "CarBrandId");

            migrationBuilder.AlterTable(
                name: "User",
                oldComment: "Пользователь");

            migrationBuilder.AlterTable(
                name: "Role",
                oldComment: "Роль пользователя");

            migrationBuilder.AlterTable(
                name: "Rent",
                oldComment: "Аренда");

            migrationBuilder.AlterTable(
                name: "Filial",
                oldComment: "Филиал");

            migrationBuilder.AlterTable(
                name: "Feedback",
                oldComment: "Отзыв");

            migrationBuilder.AlterTable(
                name: "Car",
                oldComment: "Автомобиль");

            migrationBuilder.AlterTable(
                name: "CarModel",
                oldComment: "Модель автомобиля");

            migrationBuilder.AlterTable(
                name: "CarClass",
                oldComment: "Класс автомобиля");

            migrationBuilder.AlterTable(
                name: "CarBrand",
                oldComment: "Марка автомобиля");

            migrationBuilder.AlterColumn<string>(
                name: "Surname",
                table: "User",
                type: "character varying(100)",
                maxLength: 100,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "character varying(100)",
                oldMaxLength: 100,
                oldComment: "Фамилия");

            migrationBuilder.AlterColumn<string>(
                name: "Patronymic",
                table: "User",
                type: "character varying(100)",
                maxLength: 100,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "character varying(100)",
                oldMaxLength: 100,
                oldComment: "Отчество");

            migrationBuilder.AlterColumn<string>(
                name: "Password",
                table: "User",
                type: "varchar(150)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "varchar(150)",
                oldComment: "Пароль");

            migrationBuilder.AlterColumn<string>(
                name: "Email",
                table: "User",
                type: "varchar(150)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "varchar(150)",
                oldComment: "Email");

            migrationBuilder.AlterColumn<string>(
                name: "UserImage",
                table: "User",
                type: "character varying(255)",
                maxLength: 255,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "character varying(255)",
                oldMaxLength: 255,
                oldNullable: true,
                oldComment: "Изображение пользователя");

            migrationBuilder.AlterColumn<int>(
                name: "RoleId",
                table: "User",
                type: "integer",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer",
                oldComment: "ID роли");

            migrationBuilder.AlterColumn<string>(
                name: "PhoneNumber",
                table: "User",
                type: "character varying(20)",
                maxLength: 20,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "character varying(20)",
                oldMaxLength: 20,
                oldComment: "Номер телефона");

            migrationBuilder.AlterColumn<bool>(
                name: "IsDeleted",
                table: "User",
                type: "boolean",
                nullable: false,
                oldClrType: typeof(bool),
                oldType: "boolean",
                oldComment: "Флаг удаления");

            migrationBuilder.AlterColumn<string>(
                name: "FirstName",
                table: "User",
                type: "character varying(100)",
                maxLength: 100,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "character varying(100)",
                oldMaxLength: 100,
                oldComment: "Имя");

            migrationBuilder.AlterColumn<int>(
                name: "UserId",
                table: "User",
                type: "integer",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer",
                oldComment: "ID пользователя")
                .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn)
                .OldAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

            migrationBuilder.AlterColumn<string>(
                name: "RoleName",
                table: "Role",
                type: "character varying(30)",
                maxLength: 30,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "character varying(30)",
                oldMaxLength: 30,
                oldComment: "Название роли");

            migrationBuilder.AlterColumn<int>(
                name: "RoleId",
                table: "Role",
                type: "integer",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer",
                oldComment: "ID роли")
                .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn)
                .OldAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

            migrationBuilder.AlterColumn<int>(
                name: "UserId",
                table: "Rent",
                type: "integer",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer",
                oldComment: "ID пользователя");

            migrationBuilder.AlterColumn<DateTime>(
                name: "StartDate",
                table: "Rent",
                type: "timestamp with time zone",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "timestamp with time zone",
                oldComment: "Дата начала аренды");

            migrationBuilder.AlterColumn<decimal>(
                name: "RentCost",
                table: "Rent",
                type: "money",
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "money",
                oldComment: "Стоимость аренды");

            migrationBuilder.AlterColumn<bool>(
                name: "IsDeleted",
                table: "Rent",
                type: "boolean",
                nullable: false,
                oldClrType: typeof(bool),
                oldType: "boolean",
                oldComment: "Флаг удаления");

            migrationBuilder.AlterColumn<DateTime>(
                name: "EndDate",
                table: "Rent",
                type: "timestamp with time zone",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "timestamp with time zone",
                oldComment: "Дата окончания аренды");

            migrationBuilder.AlterColumn<int>(
                name: "CarId",
                table: "Rent",
                type: "integer",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer",
                oldComment: "ID автомобиля");

            migrationBuilder.AlterColumn<int>(
                name: "RentId",
                table: "Rent",
                type: "integer",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer",
                oldComment: "ID аренды")
                .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn)
                .OldAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

            migrationBuilder.AlterColumn<string>(
                name: "Address",
                table: "Filial",
                type: "character varying(200)",
                maxLength: 200,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "character varying(200)",
                oldMaxLength: 200,
                oldComment: "Адрес филиала");

            migrationBuilder.AlterColumn<string>(
                name: "PhoneNumber",
                table: "Filial",
                type: "character varying(30)",
                maxLength: 30,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "character varying(30)",
                oldMaxLength: 30,
                oldComment: "Номер телефона филиала");

            migrationBuilder.AlterColumn<bool>(
                name: "IsDeleted",
                table: "Filial",
                type: "boolean",
                nullable: false,
                oldClrType: typeof(bool),
                oldType: "boolean",
                oldComment: "Флаг удаления");

            migrationBuilder.AlterColumn<int>(
                name: "FilialId",
                table: "Filial",
                type: "integer",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer",
                oldComment: "ID филиала")
                .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn)
                .OldAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

            migrationBuilder.AlterColumn<byte>(
                name: "Stars",
                table: "Feedback",
                type: "smallint",
                nullable: false,
                oldClrType: typeof(byte),
                oldType: "smallint",
                oldComment: "Количество звезд");

            migrationBuilder.AlterColumn<string>(
                name: "Response",
                table: "Feedback",
                type: "text",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "text",
                oldComment: "Текст отзыва");

            migrationBuilder.AlterColumn<int>(
                name: "RentId",
                table: "Feedback",
                type: "integer",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer",
                oldComment: "ID аренды");

            migrationBuilder.AlterColumn<bool>(
                name: "IsDeleted",
                table: "Feedback",
                type: "boolean",
                nullable: false,
                oldClrType: typeof(bool),
                oldType: "boolean",
                oldComment: "Флаг удаления");

            migrationBuilder.AlterColumn<DateTime>(
                name: "FeedbackDate",
                table: "Feedback",
                type: "timestamp with time zone",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "timestamp with time zone",
                oldComment: "Дата отзыва");

            migrationBuilder.AlterColumn<int>(
                name: "FeedbackId",
                table: "Feedback",
                type: "integer",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer",
                oldComment: "ID отзыва")
                .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn)
                .OldAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

            migrationBuilder.AlterColumn<short>(
                name: "Engine",
                table: "Car",
                type: "smallint",
                nullable: false,
                oldClrType: typeof(short),
                oldType: "smallint",
                oldComment: "Тип двигателя");

            migrationBuilder.AlterColumn<string>(
                name: "StateNumber",
                table: "Car",
                type: "character varying(12)",
                maxLength: 12,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "character varying(12)",
                oldMaxLength: 12,
                oldComment: "Государственный номер автомобиля");

            migrationBuilder.AlterColumn<int>(
                name: "ModelId",
                table: "Car",
                type: "integer",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer",
                oldComment: "ID модели автомобиля");

            migrationBuilder.AlterColumn<bool>(
                name: "IsDeleted",
                table: "Car",
                type: "boolean",
                nullable: false,
                oldClrType: typeof(bool),
                oldType: "boolean",
                oldComment: "Флаг удаления");

            migrationBuilder.AlterColumn<short>(
                name: "GearBox",
                table: "Car",
                type: "smallint",
                nullable: false,
                oldClrType: typeof(short),
                oldType: "smallint",
                oldComment: "Тип коробки передач");

            migrationBuilder.AlterColumn<int>(
                name: "FilialId",
                table: "Car",
                type: "integer",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer",
                oldComment: "ID филиала автомобиля");

            migrationBuilder.AlterColumn<decimal>(
                name: "CostDay",
                table: "Car",
                type: "money",
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "money",
                oldComment: "Стоимость аренды в день");

            migrationBuilder.AlterColumn<int>(
                name: "ClassId",
                table: "Car",
                type: "integer",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer",
                oldComment: "ID класса автомобиля");

            migrationBuilder.AlterColumn<int>(
                name: "CarId",
                table: "Car",
                type: "integer",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer",
                oldComment: "ID автомобиля")
                .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn)
                .OldAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

            migrationBuilder.AddColumn<int>(
                name: "CarModelId",
                table: "Car",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AlterColumn<string>(
                name: "ModelName",
                table: "CarModel",
                type: "character varying(100)",
                maxLength: 100,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "character varying(100)",
                oldMaxLength: 100,
                oldComment: "Название модели автомобиля");

            migrationBuilder.AlterColumn<bool>(
                name: "IsDeleted",
                table: "CarModel",
                type: "boolean",
                nullable: false,
                oldClrType: typeof(bool),
                oldType: "boolean",
                oldComment: "Флаг удаления");

            migrationBuilder.AlterColumn<int>(
                name: "CarBrandId",
                table: "CarModel",
                type: "integer",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer",
                oldComment: "ID бренда автомобиля");

            migrationBuilder.AlterColumn<int>(
                name: "CarModelId",
                table: "CarModel",
                type: "integer",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer",
                oldComment: "ID модели автомобиля")
                .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn)
                .OldAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

            migrationBuilder.AlterColumn<bool>(
                name: "IsDeleted",
                table: "CarClass",
                type: "boolean",
                nullable: false,
                oldClrType: typeof(bool),
                oldType: "boolean",
                oldComment: "Флаг удаления");

            migrationBuilder.AlterColumn<string>(
                name: "ClassName",
                table: "CarClass",
                type: "character varying(50)",
                maxLength: 50,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "character varying(50)",
                oldMaxLength: 50,
                oldComment: "Название класса автомобиля");

            migrationBuilder.AlterColumn<int>(
                name: "CarClassId",
                table: "CarClass",
                type: "integer",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer",
                oldComment: "ID класса автомобиля")
                .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn)
                .OldAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "CarBrand",
                type: "varchar(100)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "varchar(100)",
                oldComment: "Название марки автомобиля");

            migrationBuilder.AlterColumn<bool>(
                name: "IsDeleted",
                table: "CarBrand",
                type: "boolean",
                nullable: false,
                oldClrType: typeof(bool),
                oldType: "boolean",
                oldComment: "Флаг удаления");

            migrationBuilder.AlterColumn<int>(
                name: "CarBrandId",
                table: "CarBrand",
                type: "integer",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer",
                oldComment: "ID марки автомобиля")
                .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn)
                .OldAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

            migrationBuilder.AddPrimaryKey(
                name: "PK_User",
                table: "User",
                column: "UserId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Role",
                table: "Role",
                column: "RoleId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Rent",
                table: "Rent",
                column: "RentId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Filial",
                table: "Filial",
                column: "FilialId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Feedback",
                table: "Feedback",
                column: "FeedbackId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Car",
                table: "Car",
                column: "CarId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_CarModel",
                table: "CarModel",
                column: "CarModelId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_CarClass",
                table: "CarClass",
                column: "CarClassId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_CarBrand",
                table: "CarBrand",
                column: "CarBrandId");

            migrationBuilder.CreateIndex(
                name: "IX_Car_CarModelId",
                table: "Car",
                column: "CarModelId");

            migrationBuilder.AddForeignKey(
                name: "FK_Car_CarClass_ClassId",
                table: "Car",
                column: "ClassId",
                principalTable: "CarClass",
                principalColumn: "CarClassId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Car_CarModel_CarModelId",
                table: "Car",
                column: "CarModelId",
                principalTable: "CarModel",
                principalColumn: "CarModelId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Car_Filial_FilialId",
                table: "Car",
                column: "FilialId",
                principalTable: "Filial",
                principalColumn: "FilialId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_CarModel_CarBrand_CarBrandId",
                table: "CarModel",
                column: "CarBrandId",
                principalTable: "CarBrand",
                principalColumn: "CarBrandId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Feedback_Rent_RentId",
                table: "Feedback",
                column: "RentId",
                principalTable: "Rent",
                principalColumn: "RentId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Rent_Car_CarId",
                table: "Rent",
                column: "CarId",
                principalTable: "Car",
                principalColumn: "CarId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Rent_User_UserId",
                table: "Rent",
                column: "UserId",
                principalTable: "User",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_User_Role_RoleId",
                table: "User",
                column: "RoleId",
                principalTable: "Role",
                principalColumn: "RoleId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
