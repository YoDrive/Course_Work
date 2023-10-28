using System.ComponentModel.DataAnnotations;

namespace YoDrive.Domain.Dtos.ModelDto;

public class CarModelReadDto
{
    public int CarModelId { get; set; }
    public int CarBrandId { get; set; }
    public string ModelName { get; set; }
    public bool IsDeleted { get; set; }
}