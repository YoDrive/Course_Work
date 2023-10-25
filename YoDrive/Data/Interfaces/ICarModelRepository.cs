using YoDrive.Domain.Dtos.ModelDto;

namespace YoDrive.Domain.Data.Interfaces;

public interface ICarModelRepository
{
    IEnumerable<CarModelReadDto> GetModels();
    CarModelReadDto GetModelById(int id);
    Task<CarModelReadDto> CreateModel(CarModelCreateDto dto);
    Task<CarModelReadDto> UpdateCarBrand(CarModelUpdateDto dto);
    Task<bool> DeleteCarBrand(int id);
}