namespace YoDrive.Application.Dtos.AuthDto;

public class UserAuth
{
    public int UserId { get; set; }
    public string Email { get; set; }
    public int RoleId { get; set; }
    public string RoleName { get; set; }
}