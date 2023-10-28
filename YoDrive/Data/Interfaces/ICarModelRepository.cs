using YoDrive.Domain.Dtos.ModelDto;

namespace YoDrive.Domain.Data.Interfaces;

public interface ICarModelRepository
{
    Task<IEnumerable<CarModelReadDto>> GetModels();
    Task<CarModelReadDto> GetModelById(int id);
    Task<CarModelReadDto> CreateModel(CarModelCreateDto dto);
    Task<CarModelReadDto> UpdateModel(CarModelUpdateDto dto);
    Task<bool> DeleteModel(int id);
}