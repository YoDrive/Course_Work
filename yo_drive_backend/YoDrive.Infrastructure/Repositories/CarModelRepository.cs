using System.Data;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using YoDrive.Application.Dtos.ModelDto;
using YoDrive.Application.Interfaces;
using YoDrive.Domain.Entities;
using YoDrive.Infrastructure.Data;

namespace YoDrive.Infrastructure.Repositories;

public class CarModelRepository : ICarModelRepository
{
    private readonly IMapper _mapper;
    private readonly AppDbContext _db;

    public CarModelRepository(AppDbContext db, IMapper mapper)
    {
        _db = db;
        _mapper = mapper;
    }

    /// <summary>
    /// Получение всем моделей автомобилей
    /// </summary>
    /// <returns></returns>
    public async Task<IEnumerable<CarModelReadDto>> GetModels()
    {
        var models = await _mapper.ProjectTo<CarModelReadDto>(_db.CarModel.Include(_ => _.CarBrand)).ToListAsync();
        
        return models;
    }

    /// <summary>
    /// Получение модели автомобиля по Id
    /// </summary>
    /// <param name="id"></param>
    /// <returns></returns>
    /// <exception cref="Exception"></exception>
    public async Task<CarModelReadDto> GetModelById(int id)
    {
        var model = await _db.CarModel
            .Include(_ => _.CarBrand)
            .FirstOrDefaultAsync(_ => _.Id == id);
        
        if (model == null)
            throw new Exception($"Модель с Id {id} не найдена");
        
        return _mapper.Map<CarModelReadDto>(model);
    }

    /// <summary>
    /// Создание модели автомобиля
    /// </summary>
    /// <param name="dto"></param>
    /// <returns></returns>
    /// <exception cref="Exception"></exception>
    public async Task<CarModelReadDto> CreateModel(CarModelAddDto dto)
    {
        var entity = _db.CarModel
            .FirstOrDefault(_ => _.ModelName.ToLower() == dto.ModelName.ToLower() && _.CarBrandId == dto.CarBrandId);
        
        if (entity != null)
        {
            if (entity.IsDeleted)
            {
                entity.CreatedAt = DateTime.UtcNow;
                entity.UpdatedAt = DateTime.UtcNow;
                entity.IsDeleted = false;
                entity.ModelName = dto.ModelName;
                _db.CarModel.Update(entity);
                await _db.SaveChangesAsync();
                return _mapper.Map<CarModelReadDto>(entity);
            }

            throw new DuplicateNameException($"Модель автомобиля с названием {dto.ModelName} уже существует");
        }
        
        var response = _mapper.Map<CarModel>(dto);
        response.IsDeleted = false;
        
        _db.CarModel.Add(response);
        await _db.SaveChangesAsync();
        return _mapper.Map<CarModelReadDto>(response);
    }

    /// <summary>
    /// Изменение модели автомобиля
    /// </summary>
    /// <param name="dto"></param>
    /// <returns></returns>
    /// <exception cref="NotImplementedException"></exception>
    public async Task<CarModelReadDto> UpdateModel(CarModelUpdateDto dto)
    {
        var model = _db.CarModel
            .Include(_ => _.CarBrand)
            .FirstOrDefault(_ => _.Id == dto.CarModelId);

        if (model == null)
            throw new KeyNotFoundException();

        if (_db.CarModel.FirstOrDefault(_ => _.CarBrandId == dto.CarBrandId
                                             && _.ModelName.ToLower() == dto.ModelName.ToLower()
                                             && _.Id != dto.CarModelId) != null) 
        {
            throw new Exception($"Модель автомобиля с названием '{dto.ModelName}' уже существует");   
        }


        model.IsDeleted = false;
        model.UpdatedAt = DateTime.UtcNow;
        model.ModelName = dto.ModelName;

        _db.CarModel.Update(model);
        await _db.SaveChangesAsync();

        return _mapper.Map<CarModelReadDto>(model);
    }

    /// <summary>
    /// Удаление модели автомобиля
    /// </summary>
    /// <param name="id"></param>
    /// <returns></returns>
    /// <exception cref="NotImplementedException"></exception>
    public async Task<bool> DeleteModel(int id)
    {
        var model = _db.CarModel.FirstOrDefault(_ => _.Id == id);

        if (model == null)
            throw new KeyNotFoundException($"Модель автомобиля с Id {id} не найдена");

        var count = _db.Car.Where(_ => _.ModelId == id).ToList().Count();
        if (count > 0)
            throw new Exception($"Невозможно удалить {model.ModelName}, имеются активные связи с автомобилями, в количестве: {count}");

        model.IsDeleted = true;
        model.UpdatedAt = DateTime.UtcNow;
        _db.CarModel.Update(model);
        
        return await _db.SaveChangesAsync() > 0;
    }
}