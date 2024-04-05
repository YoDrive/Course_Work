namespace YoDrive.Application.Dtos.UserDto;

public class UserUpdateInfoDto
{
    public int UserId { get; set; }
    public string FirstName { get; set; }
    public string Surname { get; set; }
    public string Patronymic { get; set; }
    public string PhoneNumber { get; set; }
    public string Email { get; set; }
}