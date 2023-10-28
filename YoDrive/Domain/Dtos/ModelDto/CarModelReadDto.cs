using System.ComponentModel.DataAnnotations;
using YoDrive.Domain.Dtos.CarBrandDto;
using YoDrive.Domain.Models;

namespace YoDrive.Domain.Dtos.ModelDto;

public class CarModelReadDto
{
    public int CarModelId { get; set; }
    public int CarBrandId { get; set; }
    public CarBrandReadDto CarBrand { get; set; }
    public string ModelName { get; set; }
    public bool IsDeleted { get; set; }
}