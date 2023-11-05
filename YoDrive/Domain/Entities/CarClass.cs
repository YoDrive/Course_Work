using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace YoDrive.Domain.Models;

public class CarClass
{
    [Key]
    [Required]
    public int CarClassId { get; set; }
    [Required]
    [MaxLength(50)]
    public string ClassName { get; set; }
    [Required]
    public bool IsDeleted { get; set; }
    
    [InverseProperty("CarClass")]
    public virtual ICollection<Car>? Cars { get; set; }
}