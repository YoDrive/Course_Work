using System.ComponentModel.DataAnnotations;

namespace YoCars.Domain.Models;

public class Role
{
    [Key]
    [Required]
    public int RoleId { get; set; }
    [Required]
    [MaxLength(30)]
    public string RoleName { get; set; }
}