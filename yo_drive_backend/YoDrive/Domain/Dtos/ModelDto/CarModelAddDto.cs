using System.ComponentModel.DataAnnotations;

namespace YoDrive.Domain.Dtos.ModelDto;

public class CarModelAddDto
{
    [Required] public int CarBrandId { get; set; }
    [Required] public string ModelName { get; set; }
}