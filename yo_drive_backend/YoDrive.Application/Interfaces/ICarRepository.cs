using System.Collections.Generic;
using System.Threading.Tasks;
using YoDrive.Application.Dtos.CarDto;

namespace YoDrive.Application.Interfaces;

public interface ICarRepository
{
    Task<IEnumerable<CarReadDto>> GetAllCars();
    Task<CarReadDto> GetCarById(int id);
    Task<CarReadDto> CreateCar(CarAddDto dto);
    Task<CarReadDto> UpdateCar(CarUpdateDto dto);
    Task<bool> DeleteCar(int id);
    Task<IEnumerable<CarReadDto>> GetCarsByFilter(Filter filters);
    Task<List<CarMinDto>> GetAutopark();
    Task<CarResponsePage> GetCarsByPage(CarRequestDto request);
}