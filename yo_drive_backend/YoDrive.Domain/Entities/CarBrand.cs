using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace YoDrive.Domain.Entities;

public class CarBrand : BaseEntity
{
    [Required] 
    [Column(TypeName = "varchar(100)")]
    public string Name { get; set; }
    
    [InverseProperty("CarBrand")]
    public virtual ICollection<CarModel>? CarModels { get; set; }
}