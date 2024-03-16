namespace YoDrive.Domain.Dtos.UserDto;

public class UserUpdatePhotoDto
{
    public int UserId { get; set; }
    public IFormFile Image { get; set; }
}