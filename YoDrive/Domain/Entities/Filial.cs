using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace YoDrive.Domain.Models;

public class Filial
{
    [Key]
    [Required]
    public int FilialId { get; set; }
    [Required]
    [MaxLength(200)]
    public string Address { get; set; }
    [Required]
    [MaxLength(30)]
    public string PhoneNumber { get; set; }
    [Required]
    public bool IsDeleted { get; set; }
    
    [InverseProperty("Filial")]
    public virtual ICollection<Car>? Cars { get; set; }
}