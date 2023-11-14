using YoDrive.Domain.Dtos;

namespace YoDrive.Domain.AuthDto;

public class UserReadDto
{
    public int UserId { get; set; }
    public RoleDto Role { get; set; }
    public string FirstName { get; set; }
    public string Surname { get; set; }
    public string Patronymic { get; set; }
    public string PhoneNumber { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }
    public string UserImage { get; set; }
}