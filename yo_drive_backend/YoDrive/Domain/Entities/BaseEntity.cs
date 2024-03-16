using System.ComponentModel.DataAnnotations;

namespace YoDrive.Domain.Models;

public abstract class BaseEntity
{
    [Key] [Required] public int Id { get; set; }
    [Required] public bool IsDeleted { get; set; } = false;
    [Required] public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    [Required] public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}