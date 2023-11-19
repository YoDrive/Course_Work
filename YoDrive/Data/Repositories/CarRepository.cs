using System.Data;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using YoDrive.Domain.Data.Interfaces;
using YoDrive.Domain.Dtos.CarDto;
using YoDrive.Domain.Dtos.ModelDto;
using YoDrive.Domain.Models;
using YoDrive.Domain.Other;

namespace YoDrive.Domain.Data.Repositories;

public class CarRepository : ICarRepository
{
    private readonly IMapper _mapper;
    private readonly AppDbContext _db;

    public CarRepository(AppDbContext db, IMapper mapper)
    {
        _db = db;
        _mapper = mapper;
    }
    
    public async Task<IEnumerable<CarReadDto>> GetAllCars()
    {
        var cars = await _mapper.ProjectTo<CarReadDto>(_db.Car
            .Where(_ => !_.IsDeleted)
            .Include(_ => _.CarModel)
            .ThenInclude(_ => _.CarBrand)
            .Include(_ => _.Filial)
            .Include(_ => _.Rents)
            .ThenInclude(_ => _.Feedback)
            .Include(_ => _.CarClass))
            .ToListAsync();

        foreach (var car in cars)
        {
            if (car.Rents != null && car.Rents.Any())
            {
                car.Rating = car.Rents.Where(_ => _.Feedback != null).Average(r => r.Feedback?.Stars ?? 0);
            }
        }

        return cars;
    }

    public async Task<CarReadDto> GetCarById(int id)
    {
        var car = await _db.Car
            .Include(_ => _.CarModel)
            .ThenInclude(_ => _.CarBrand)
            .Include(_ => _.Filial)
            .Include(_ => _.CarClass)
            .Include(_ => _.Rents)
            .ThenInclude(_ => _.Feedback)
            .FirstOrDefaultAsync(_ => _.CarId == id); 

        if (car == null)
            throw new Exception($"Автомобиль с Id {id} не найден");
        
        var response = _mapper.Map<CarReadDto>(car);
        if (response.Rents != null && response.Rents.Any())
        {
            response.Rating = response.Rents.Where(_ => _.Feedback != null).Average(r => r.Feedback?.Stars ?? 0);
        }

        return response;
    }

    public async Task<CarReadDto> CreateCar(CarAddDto dto)
    {
        var entity = _db.Car
            .FirstOrDefault(_ => _.StateNumber.ToLower() == dto.StateNumber.ToLower());
        
        if (entity != null)
        {
            if (entity.IsDeleted)
            {
                entity.IsDeleted = false;
                entity.CarImage = dto.CarImage;
                entity.ClassId = dto.ClassId;
                entity.FilialId = dto.FilialId;
                entity.ModelId = dto.ModelId;
                entity.CostDay = dto.CostDay;
                entity.Year = dto.Year;
                entity.GearBox = dto.GearBox;
                entity.CarModel = _db.CarModel.FirstOrDefault(model => model.CarModelId == dto.ModelId) ??
                                  throw new Exception("Модель не найдена");
                entity.CarClass = _db.CarClass.FirstOrDefault(c => c.CarClassId == dto.ClassId) ??
                                  throw new Exception("Класс не найден");
                entity.Filial = _db.Filial.FirstOrDefault(filial => filial.FilialId == dto.FilialId) ??
                                throw new Exception("Филиал не найден");
                _db.Car.Update(entity);
                await _db.SaveChangesAsync();
                return _mapper.Map<CarReadDto>(entity);
            }

            throw new DuplicateNameException($"Автомобиль с гос. номером {dto.StateNumber} уже существует");
        }

        entity = new Car()
        {
            IsDeleted = false,
            StateNumber = dto.StateNumber,
            CarImage = dto.CarImage,
            ClassId = dto.ClassId,
            FilialId = dto.FilialId,
            Year = dto.Year,
            ModelId = dto.ModelId,
            GearBox = dto.GearBox,
            CostDay = dto.CostDay,
            CarModel = _db.CarModel.FirstOrDefault(model => model.CarModelId == dto.ModelId) ?? throw new Exception("Модель не найдена"),
            CarClass = _db.CarClass.FirstOrDefault(c => c.CarClassId == dto.ClassId) ?? throw new Exception("Класс не найден"),
            Filial = _db.Filial.FirstOrDefault(filial => filial.FilialId == dto.FilialId) ?? throw new Exception("Филиал не найден")
        };
            
        await _db.Car.AddAsync(entity);
        await _db.SaveChangesAsync();
        var response = _mapper.Map<CarReadDto>(entity);
        return response;
    }

    public async Task<CarReadDto> UpdateCar(CarUpdateDto dto)
    {
        var car = _db.Car.FirstOrDefault(_ => _.CarId == dto.CarId);

        if (car == null)
            throw new KeyNotFoundException();

        if (_db.Car.FirstOrDefault(_ => _.StateNumber.ToLower() == dto.StateNumber.ToLower() 
                                        && _.CarId != dto.CarId) != null)
        {
            throw new Exception($"Автомобиль с гос. номером '{dto.StateNumber}' уже существует");   
        }

        car.IsDeleted = false;
        car.CarImage = dto.CarImage;
        car.ClassId = dto.ClassId;
        car.FilialId = dto.FilialId;
        car.ModelId = dto.ModelId;
        car.Year = dto.Year;
        car.CarModel = _db.CarModel.FirstOrDefault(model => model.CarModelId == dto.ModelId) ??
                       throw new Exception("Модель не найдена");
        car.CarClass = _db.CarClass.FirstOrDefault(c => c.CarClassId == dto.ClassId) ??
                       throw new Exception("Класс не найден");
        car.Filial = _db.Filial.FirstOrDefault(filial => filial.FilialId == dto.FilialId) ??
                     throw new Exception("Филиал не найден");

        _db.Car.Update(car);
        await _db.SaveChangesAsync();

        return _mapper.Map<CarReadDto>(car);
    }

    public async Task<bool> DeleteCar(int id)
    {
        var car = _db.Car.FirstOrDefault(_ => _.CarId == id);

        if (car == null)
            throw new KeyNotFoundException($"Автомобиль с Id {id} не найден");

        car.IsDeleted = true;
        _db.Car.Update(car);
        
        return await _db.SaveChangesAsync() > 0;
    }

    public async Task<IEnumerable<CarReadDto>> GetCarsByFilter(Filter request)
    {
        var cars = _db.Car
            .Include(_ => _.CarModel)
            .ThenInclude(_ => _.CarBrand)
            .Include(_ => _.Filial)
            .Include(_ => _.CarClass)
            .Include(_ => _.Rents)
            .ThenInclude(_ => _.Feedback)
            .IgnoreQueryFilters()
            .Where(_ => (request.StartDate == null || _.Rents.Any(_ => _.EndDate < request.StartDate))
                        && (request.EndDate == null || _.Rents.Any(_ => _.StartDate > request.EndDate))
                        && (request.MinCostDay == null || request.MinCostDay <= _.CostDay)
                        && (request.MaxCostDay == null || request.MaxCostDay >= _.CostDay)
                        && (request.GearBox == null || request.GearBox == _.GearBox)
                        && (request.CarBrandId == null || request.CarBrandId == _.CarModel.CarBrandId)
                        && (request.ModelId == null || request.ModelId == _.ModelId)
                        && (request.FilialId == null || request.FilialId == _.FilialId)
                        && (request.ClassId == null || request.ClassId == _.ClassId));

        var response = await _mapper.ProjectTo<CarReadDto>(cars).ToListAsync();
        return response;
    }
}