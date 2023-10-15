using System.ComponentModel.DataAnnotations;

namespace YoDrive.Domain.Models;

public class Token
{
    [Key]
    [Required]
    public int UserId { get; set; }
    public string RefreshToken { get; set; }
}