using System.Data;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using YoDrive.Domain.Data.Interfaces;
using YoDrive.Domain.Dtos.CarDto;
using YoDrive.Domain.Dtos.ModelDto;
using YoDrive.Domain.Models;
using YoDrive.Domain.Other;
using YoDrive.Helpers;

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
            if (car.Rents != null && car.Rents.Any(r => r.Feedback != null))
            {
                car.Rating = car.Rents.Where(r => r.Feedback != null).Average(r => r.Feedback.Stars);
            }
            else
            {
                car.Rating = 0;
            }
        }

        return cars;
    }

    public async Task<List<CarMinDto>> GetAutopark()
    {
        var cars = await _mapper.ProjectTo<CarMinDto>(_db.Car.Where(_ => _.CarImage != null && _.IsDeleted == false)).ToListAsync();
        foreach (var car in cars)
        {
            car.Image = ImageHelper.GetImage(car.CarImage);
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

        var image = ImageHelper.GetImage(car.CarImage);
        var response = _mapper.Map<CarReadDto>(car);
        response.Image = image;
        if (response.Rents != null && response.Rents.Any())
        {
            response.Rating = response.Rents.Where(_ => _.Feedback != null).Average(r => r.Feedback?.Stars ?? 0);
        }

        return response;
    }

    public async Task<CarReadDto> CreateCar(CarAddDto dto)
    {
        var entity = new Car()
        {
            IsDeleted = false,
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
            throw new KeyNotFoundException($"Автомобиль с Id {dto.CarId} не найден");

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

    public async Task<CarResponsePage> GetCarsByPage(CarRequestDto request)
    {
        var cars = _db.Car
            .Include(_ => _.CarModel)
            .ThenInclude(_ => _.CarBrand)
            .Include(_ => _.Filial)
            .Include(_ => _.CarClass)
            .Include(_ => _.Rents)
            .ThenInclude(_ => _.Feedback)
            .IgnoreQueryFilters()
            .Where(_ => (request.Filter.StartDate == null || _.Rents.Any(_ => _.EndDate < request.Filter.StartDate))
                        && (request.Filter.EndDate == null || _.Rents.Any(_ => _.StartDate > request.Filter.EndDate))
                        && (request.Filter.MinCostDay == null || request.Filter.MinCostDay <= _.CostDay)
                        && (request.Filter.MaxCostDay == null || request.Filter.MaxCostDay >= _.CostDay)
                        && (request.Filter.GearBox == null || request.Filter.GearBox == _.GearBox)
                        && (request.Filter.CarBrandId == null || request.Filter.CarBrandId == _.CarModel.CarBrandId)
                        && (request.Filter.ModelId == null || request.Filter.ModelId == _.ModelId)
                        && (request.Filter.FilialId == null || request.Filter.FilialId == _.FilialId)
                        && (request.Filter.ClassId == null || request.Filter.ClassId == _.ClassId))
            .ProjectTo<CarReadDto>(_mapper.ConfigurationProvider)
            .AsEnumerable();

        if (request.Sort != null)
        {
            switch (request.Sort.Dir)
            {
                case "asc":
                    switch (request.Sort.Field)
                    {
                        case "Rating":
                            cars = cars.OrderBy(_ => _.Rating);
                            break;
                        case "CostDay":
                            cars = cars.OrderBy(_ => _.CostDay);
                            break;
                    }
                    break;
                
                case "desc":
                    switch (request.Sort.Field)
                    {
                        case "Rating":
                            cars = cars.OrderByDescending(_ => _.Rating);
                            break;
                        case "CostDay":
                            cars = cars.OrderByDescending(_ => _.CostDay);
                            break;
                    }
                    break;
            }
        }
        
        var count = cars.Count();
        
        //TODO: Как то вынести в mapper и почему то не передается картинка
        foreach (var car in cars)
        {
            // if (car.Rents != null && car.Rents.Any(r => r.Feedback != null && r.Feedback.Stars != null))
            // {
            //     car.Rating = car.Rents.Average(r => (double)r.Feedback.Stars);
            // }
            // else
            // {
            //     car.Rating = 0;
            // }
        }
        
        var response = cars.Skip((request.Page.PageNumber - 1 ?? 0) * request.Page.PageSize)
            .Take(request.Page.PageSize).ToList();

        var result = new CarResponsePage()
        {
            Count = count,
            Items = response
        };
        
        return result;
    }
}