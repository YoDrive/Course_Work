using System.ComponentModel.DataAnnotations;

namespace YoDrive.Application.Dtos.ModelDto;

public class CarModelUpdateDto
{
    [Required] public int CarModelId { get; set; }
    [Required] public int CarBrandId { get; set; }
    [Required] public string ModelName { get; set; }
}