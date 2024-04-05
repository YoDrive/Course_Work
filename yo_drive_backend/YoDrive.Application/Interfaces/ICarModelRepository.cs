using System.Collections.Generic;
using System.Threading.Tasks;
using YoDrive.Application.Dtos.ModelDto;

namespace YoDrive.Application.Interfaces;

public interface ICarModelRepository
{
    Task<IEnumerable<CarModelReadDto>> GetModels();
    Task<CarModelReadDto> GetModelById(int id);
    Task<CarModelReadDto> CreateModel(CarModelAddDto dto);
    Task<CarModelReadDto> UpdateModel(CarModelUpdateDto dto);
    Task<bool> DeleteModel(int id);
}