using YoDrive.Domain.Models;

namespace YoDrive.Domain.Dtos;

public class RoleDto
{
    public int RoleId { get; set; }
    public string RoleName { get; set; }
    public ICollection<User>? Users { get; set; }
}