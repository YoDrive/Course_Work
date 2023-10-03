using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace YoDrive.Domain.Models;

public class Role
{
    [Key]
    [Required]
    public int RoleId { get; set; }
    [Required]
    [MaxLength(30)]
    public string RoleName { get; set; }
    
    [InverseProperty("Role")]
    public ICollection<User>? Users { get; set; }
}