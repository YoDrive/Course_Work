using System.Data;
using AutoMapper;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using YoDrive.Domain.Data.Interfaces;
using YoDrive.Domain.Dtos.CarBrandDto;
using YoDrive.Domain.Models;

namespace YoDrive.Domain.Data.Repositories;

public class CarBrandRepository : ICarBrandRepository
{
    private readonly IMapper _mapper;
    private readonly AppDbContext _db;

    public CarBrandRepository(AppDbContext db, IMapper mapper)
    {
        _db = db;
        _mapper = mapper;
    }

    /// <summary>
    /// Получение всех марок автомобилей
    /// </summary>
    /// <returns></returns>
    public async Task<IEnumerable<CarBrandReadDto>> GetAllCarBrands()
    {
        var brands = await _mapper.ProjectTo<CarBrandReadDto>(_db.CarBrand).ToListAsync();

        return brands;
    }

    /// <summary>
    /// Получение марки автомобиля по id
    /// </summary>
    /// <param name="id"></param>
    /// <returns></returns>
    /// <exception cref="ArgumentException"></exception>
    public async Task<CarBrandReadDto> GetCarBrandById(int id)
    {
        var brand = await _db.CarBrand.FirstOrDefaultAsync(_ => _.CarBrandId == id);

        if (brand == null)
            throw new ArgumentException($"Марка автомобиля с Id {id} не найдена");

        return _mapper.Map<CarBrandReadDto>(brand);
    }

    /// <summary>
    /// Создание бренда авто
    /// </summary>
    /// <param name="dto"></param>
    /// <returns></returns>
    /// <exception cref="Exception"></exception>
    public async Task<CarBrandReadDto> CreateCarBrand(CarBrandAddDto dto)
    {
        var entity = _db.CarBrand.FirstOrDefault(_ => _.Name.ToLower() == dto.Name.ToLower());
        
        if (entity != null)
        {
            if (entity.IsDeleted)
            {
                entity.IsDeleted = false;
                entity.Name = dto.Name;
                _db.CarBrand.Update(entity);
                await _db.SaveChangesAsync();
                return _mapper.Map<CarBrandReadDto>(entity);
            }

            throw new DuplicateNameException($"Марка автомобиля с названием {dto.Name} уже существует");
        }
        
        var response = _mapper.Map<CarBrand>(dto);
        response.IsDeleted = false;
        
        _db.CarBrand.Add(response);
        await _db.SaveChangesAsync();
        return _mapper.Map<CarBrandReadDto>(response);
    }

    public async Task<CarBrandReadDto> UpdateCarBrand(CarBrandUpdateDto dto)
    {
        var brand = _db.CarBrand.FirstOrDefault(_ => _.CarBrandId == dto.CarBrandId);

        if (brand == null)
            throw new KeyNotFoundException();

        if (_db.CarBrand.FirstOrDefault(_ => _.Name.ToLower() == dto.Name.ToLower()
                                             && _.CarBrandId != dto.CarBrandId) != null)
        {
            throw new Exception($"Марка автомобиля с названием '{dto.Name}' уже существует");   
        }

        brand.IsDeleted = false;
        brand.Name = dto.Name;

        _db.CarBrand.Update(brand);
        await _db.SaveChangesAsync();

        return _mapper.Map<CarBrandReadDto>(brand);
    }

    public async Task<bool> DeleteCarBrand(int id)
    {
        var brand = _db.CarBrand.FirstOrDefault(_ => _.CarBrandId == id);

        if (brand == null)
            throw new KeyNotFoundException($"Марка автомобиля с Id {id} не найдена");

        var count = _db.CarModel.Where(_ => _.CarBrandId == id).ToList().Count();
        if (count > 0)
            throw new Exception($"Невозможно удалить {brand.Name}, имеются активные связи с моделями, в количестве: {count}");

        brand.IsDeleted = true;
        _db.CarBrand.Update(brand);
        
        return await _db.SaveChangesAsync() > 0;
    }
}