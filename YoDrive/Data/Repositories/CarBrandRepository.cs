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
        var brand = _db.CarBrand.FirstOrDefaultAsync(_ => _.CarBrandId == id);

        if (brand == null)
            throw new ArgumentException();

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
        if (_db.CarBrand.FirstOrDefault(_=>_.Name.ToLower() == dto.Name.ToLower()) != null)
            throw new Exception("Марка автомобиля с таким названием уже существует");

        var response = _mapper.Map<CarBrand>(dto);
        
        _db.CarBrand.Add(response);
        _db.SaveChangesAsync();
        return _mapper.Map<CarBrandReadDto>(response);
    }

    public CarBrandReadDto UpdateCarBrand(CarBrandUpdateDto dto)
    {
        var brand = _db.CarBrand.FirstOrDefault(_ => _.CarBrandId == dto.CarBrandId);

        if (brand == null)
            throw new KeyNotFoundException();

        brand.Name = dto.Name;

        _db.CarBrand.Update(brand);
        _db.SaveChanges();

        return _mapper.Map<CarBrandReadDto>(brand);
    }

    public void DeleteCarBrand(int id)
    {
        var brand = _db.CarBrand.FirstOrDefault(_ => _.CarBrandId == id);

        if (brand == null)
            throw new KeyNotFoundException();

        _db.CarBrand.Remove(brand);
        _db.SaveChanges();
    }
}