using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Wosho.Api.Migrations
{
    /// <inheritdoc />
    public partial class RenameRegistrationColumns : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "UpdatedAt",
                table: "Users",
                newName: "updatedAt");

            migrationBuilder.RenameColumn(
                name: "Status",
                table: "Users",
                newName: "status");

            migrationBuilder.RenameColumn(
                name: "PasswordHash",
                table: "Users",
                newName: "passwordHash");

            migrationBuilder.RenameColumn(
                name: "MobileVerified",
                table: "Users",
                newName: "mobileVerified");

            migrationBuilder.RenameColumn(
                name: "MobileNumber",
                table: "Users",
                newName: "mobileNumber");

            migrationBuilder.RenameColumn(
                name: "LastName",
                table: "Users",
                newName: "lastName");

            migrationBuilder.RenameColumn(
                name: "FirstName",
                table: "Users",
                newName: "firstName");

            migrationBuilder.RenameColumn(
                name: "EmailVerified",
                table: "Users",
                newName: "emailVerified");

            migrationBuilder.RenameColumn(
                name: "CreatedAt",
                table: "Users",
                newName: "createdAt");

            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "Users",
                newName: "userId");

            migrationBuilder.RenameColumn(
                name: "Email",
                table: "Users",
                newName: "emailAddress");

            migrationBuilder.CreateIndex(
                name: "IX_Users_emailAddress",
                table: "Users",
                column: "emailAddress",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Users_mobileNumber",
                table: "Users",
                column: "mobileNumber",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Users_emailAddress",
                table: "Users");

            migrationBuilder.DropIndex(
                name: "IX_Users_mobileNumber",
                table: "Users");

            migrationBuilder.RenameColumn(
                name: "updatedAt",
                table: "Users",
                newName: "UpdatedAt");

            migrationBuilder.RenameColumn(
                name: "status",
                table: "Users",
                newName: "Status");

            migrationBuilder.RenameColumn(
                name: "passwordHash",
                table: "Users",
                newName: "PasswordHash");

            migrationBuilder.RenameColumn(
                name: "mobileVerified",
                table: "Users",
                newName: "MobileVerified");

            migrationBuilder.RenameColumn(
                name: "mobileNumber",
                table: "Users",
                newName: "MobileNumber");

            migrationBuilder.RenameColumn(
                name: "lastName",
                table: "Users",
                newName: "LastName");

            migrationBuilder.RenameColumn(
                name: "firstName",
                table: "Users",
                newName: "FirstName");

            migrationBuilder.RenameColumn(
                name: "emailVerified",
                table: "Users",
                newName: "EmailVerified");

            migrationBuilder.RenameColumn(
                name: "createdAt",
                table: "Users",
                newName: "CreatedAt");

            migrationBuilder.RenameColumn(
                name: "userId",
                table: "Users",
                newName: "UserId");

            migrationBuilder.RenameColumn(
                name: "emailAddress",
                table: "Users",
                newName: "Email");
        }
    }
}
