using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace YoDrive.Domain.Models;

public class Role
{
    [Key]
    [Required]
    public int RoleId { get; set; }
    [Required]
    [MaxLength(30)]
    public string RoleName { get; set; }
    
    [JsonIgnore]
    [InverseProperty("Role")]
    public virtual ICollection<User>? Users { get; set; }
}