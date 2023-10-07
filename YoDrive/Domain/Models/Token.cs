namespace YoDrive.Domain.Models;

public class Token
{
    public int UserId { get; set; }
    public string RefreshToken { get; set; }
}