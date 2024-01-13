using YoDrive.Domain.Dtos.CarDto;
using YoDrive.Domain.Other;

namespace YoDrive.Domain.Data.Interfaces;

public interface ICarRepository
{
    Task<IEnumerable<CarReadDto>> GetAllCars();
    Task<CarReadDto> GetCarById(int id);
    Task<CarReadDto> CreateCar(CarAddDto dto);
    Task<CarReadDto> UpdateCar(CarUpdateDto dto);
    Task<bool> DeleteCar(int id);
    Task<IEnumerable<CarReadDto>> GetCarsByFilter(Filter filters);
}