using System.ComponentModel.DataAnnotations;

namespace YoDrive.Domain.Dtos.ModelDto;

public class CarModelCreateDto
{
    [Required] public int CarBrandId { get; set; }
    [Required] public string ModelName { get; set; }
}