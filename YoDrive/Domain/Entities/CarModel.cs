using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace YoDrive.Domain.Models;

public class CarModel
{
    [Key]
    [Required]
    public int CarModelId { get; set; }
    [ForeignKey(nameof(CarBrandId))]
    public int CarBrandId { get; set; }
    [Required]
    public CarBrand CarBrand { get; set; }
    [Required]
    [MaxLength(100)]
    public string ModelName { get; set; }
    [Required]
    public bool IsDeleted { get; set; }
    
    [InverseProperty("CarModel")]
    public virtual ICollection<Car> Cars { get; set; }
}