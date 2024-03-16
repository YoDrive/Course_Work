using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace YoDrive.Domain.Models;

public class Filial : BaseEntity
{
    [Required]
    [MaxLength(200)]
    public string Address { get; set; }
    [Required]
    [MaxLength(30)]
    public string PhoneNumber { get; set; }
    
    [InverseProperty("Filial")]
    public virtual ICollection<Car>? Cars { get; set; }
}