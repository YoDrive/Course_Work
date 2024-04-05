using System.Collections.Generic;
using System.Threading.Tasks;
using YoDrive.Application.Dtos.CarBrandDto;

namespace YoDrive.Application.Interfaces;

public interface ICarBrandRepository
{
    Task<IEnumerable<CarBrandReadDto>> GetAllCarBrands();
    Task<CarBrandReadDto> GetCarBrandById(int id);
    Task<CarBrandReadDto> CreateCarBrand(CarBrandAddDto dto);
    Task<CarBrandReadDto> UpdateCarBrand(CarBrandUpdateDto dto);
    Task<bool> DeleteCarBrand(int id);
}