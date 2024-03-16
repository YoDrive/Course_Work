using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace YoDrive.Domain.Models;

public class CarClass : BaseEntity
{
    [Required]
    [MaxLength(50)]
    public string ClassName { get; set; }
    
    [InverseProperty("CarClass")]
    public virtual ICollection<Car>? Cars { get; set; }
}