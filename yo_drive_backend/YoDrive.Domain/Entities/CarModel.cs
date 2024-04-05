using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace YoDrive.Domain.Entities;

public class CarModel : BaseEntity
{
    [ForeignKey(nameof(CarBrandId))]
    public int CarBrandId { get; set; }
    [Required]
    public CarBrand CarBrand { get; set; }
    [Required]
    [MaxLength(100)]
    public string ModelName { get; set; }
    
    [InverseProperty("CarModel")]
    public virtual ICollection<Car> Cars { get; set; }
}