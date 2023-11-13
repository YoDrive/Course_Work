using YoDrive.Domain.Dtos;

namespace YoDrive.Domain.AuthDto;

public class UserAuthDto
{
    public string AccessToken { get; set; }
    public string RefreshToken { get; set; }
    public UserAuth User { get; set; }
}