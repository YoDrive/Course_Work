using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace YoDrive.Domain.Models;

public class CarBrand
{
    [Key]
    [Required]
    public int CarBrandId { get; set; }
    [Required] 
    [Column(TypeName = "varchar(100)")]
    public string Name { get; set; }
    
    [InverseProperty("CarBrand")]
    public ICollection<CarModel>? CarModels { get; set; }
}