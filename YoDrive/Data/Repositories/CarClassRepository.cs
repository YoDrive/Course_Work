using System.Data;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using YoDrive.Domain.Data.Interfaces;
using YoDrive.Domain.Dtos.CarBrandDto;
using YoDrive.Domain.Dtos.CarClassDto;
using YoDrive.Domain.Models;

namespace YoDrive.Domain.Data.Repositories;

public class CarClassRepository : ICarClassRepository 
{
    private readonly IMapper _mapper;
    private readonly AppDbContext _db;

    public CarClassRepository(AppDbContext db, IMapper mapper)
    {
        _db = db;
        _mapper = mapper;
    }

    public async Task<IEnumerable<ClassReadDto>> GetClasses()
    {
        var classes = await _mapper.ProjectTo<ClassReadDto>(_db.CarClass).ToListAsync();

        return classes;
    }

    public async Task<ClassReadDto> GetClassById(int id)
    {
        var carClass = await _db.CarClass.FirstOrDefaultAsync(_ => _.Id == id);

        if (carClass == null)
            throw new ArgumentException($"Тип кузова автомобиля с Id {id} не найден");

        return _mapper.Map<ClassReadDto>(carClass);
    }

    public async Task<ClassReadDto> CreateClass(ClassAddDto dto)
    {
        var entity = _db.CarClass.FirstOrDefault(_ => _.ClassName.ToLower() == dto.ClassName.ToLower());
        
        if (entity != null)
        {
            if (entity.IsDeleted)
            {
                entity.CreatedAt = DateTime.UtcNow;
                entity.UpdatedAt = DateTime.UtcNow;
                entity.IsDeleted = false;
                entity.ClassName = dto.ClassName;
                _db.CarClass.Update(entity);
                await _db.SaveChangesAsync();
                return _mapper.Map<ClassReadDto>(entity);
            }

            throw new DuplicateNameException($"Тип кузова с названием {dto.ClassName} уже существует");
        }
        
        var response = _mapper.Map<CarClass>(dto);
        response.IsDeleted = false;
        
        _db.CarClass.Add(response);
        await _db.SaveChangesAsync();
        return _mapper.Map<ClassReadDto>(response);
    }

    public async Task<ClassReadDto> UpdateClass(ClassUpdateDto dto)
    {
        var brand = _db.CarClass.FirstOrDefault(_ => _.Id == dto.CarClassId);

        if (brand == null)
            throw new KeyNotFoundException();

        if (_db.CarClass.FirstOrDefault(_ => _.ClassName.ToLower() == dto.ClassName.ToLower()
                                             && _.Id != dto.CarClassId) != null)
        {
            throw new Exception($"Тип кузова с названием '{dto.CarClassId}' уже существует");   
        }
        
        brand.IsDeleted = false;
        brand.UpdatedAt = DateTime.UtcNow;
        brand.ClassName = dto.ClassName;

        _db.CarClass.Update(brand);
        await _db.SaveChangesAsync();

        return _mapper.Map<ClassReadDto>(brand);
    }

    public async Task<bool> DeleteClass(int id)
    {
        var carClass = _db.CarClass.FirstOrDefault(_ => _.Id == id);

        if (carClass == null)
            throw new KeyNotFoundException($"Тип кузова с Id {id} не найдена");

        var count = _db.CarClass.Where(_ => _.Id == id).ToList().Count();
        if (count > 0)
            throw new Exception($"Невозможно удалить {carClass.ClassName}, имеются активные связи с автомобилями, в количестве: {count}");

        carClass.IsDeleted = true;
        carClass.UpdatedAt = DateTime.UtcNow;;
        _db.CarClass.Update(carClass);
        
        return await _db.SaveChangesAsync() > 0;
    }
}