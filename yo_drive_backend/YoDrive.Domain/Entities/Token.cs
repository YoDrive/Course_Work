using System.ComponentModel.DataAnnotations;

namespace YoDrive.Domain.Entities;

public class Token
{
    [Key]
    [Required]
    public int UserId { get; set; }
    public string RefreshToken { get; set; }
}