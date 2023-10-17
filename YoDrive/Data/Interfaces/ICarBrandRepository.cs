using YoDrive.Domain.Dtos.CarBrandDto;

namespace YoDrive.Domain.Data.Interfaces;

public interface ICarBrandRepository
{
    Task<IEnumerable<CarBrandReadDto>> GetAllCarBrands();
    Task<CarBrandReadDto> GetCarBrandById(int id);
    Task<CarBrandReadDto> CreateCarBrand(CarBrandAddDto dto);
    CarBrandReadDto UpdateCarBrand(CarBrandUpdateDto dto);
    void DeleteCarBrand(int id);
}