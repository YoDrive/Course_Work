using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace YoDrive.Domain.Models;

public class User : BaseEntity
{
    [ForeignKey(nameof(RoleId))]
    public int RoleId { get; set; }
    [Required]
    public Role Role { get; set; }
    [Required] 
    [MaxLength(100)]
    public string FirstName { get; set; }
    [Required] 
    [MaxLength(100)]
    public string Surname { get; set; }
    [Required]
    [MaxLength(100)]
    public string Patronymic { get; set; }
    [Required]
    [MaxLength(20)]
    public string PhoneNumber { get; set; }
    [Required]
    [Column(TypeName = "varchar(150)")]
    public string Email { get; set; }
    [Required]
    [Column(TypeName = "varchar(150)")]
    public string Password { get; set; }
    [MaxLength(255)]
    public string? UserImage { get; set; }
    
    [InverseProperty("User")]
    public virtual ICollection<Rent>? Rents { get; set; }
}