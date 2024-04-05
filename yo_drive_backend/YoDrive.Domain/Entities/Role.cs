using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using YoDrive.Domain.Enums;

namespace YoDrive.Domain.Entities;

public class Role : BaseEntity
{
    [Required]
    [MaxLength(30)]
    public string RoleName { get; set; }
    
    [Required]
    public RolesEnum RoleType { get; set; }
    
    [JsonIgnore]
    [InverseProperty("Role")]
    public virtual ICollection<User>? Users { get; set; }
}