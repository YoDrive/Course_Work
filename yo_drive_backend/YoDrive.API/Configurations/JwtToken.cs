using System.IdentityModel.Tokens.Jwt;

namespace YoDrive.API.Configurations;

public class JwtToken
{
    public string AccessToken { get; set; }
    public string RefreshToken { get; set; }
    public JwtSecurityToken AccessTokenObject { get; set; }
}