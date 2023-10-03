using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace YoDrive.Domain.Models;

public class Car
{
    [Key]
    [Required]
    public int CarId { get; set; }
    [ForeignKey(nameof(CarModelId))]
    public int CarModelId { get; set; }
    [Required]
    public CarModel CarModel { get; set; }
    [ForeignKey(nameof())]
    
}