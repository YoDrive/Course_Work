using AutoMapper;
using Microsoft.EntityFrameworkCore;
using YoDrive.Domain.Data.Interfaces;
using YoDrive.Domain.Dtos.CarDto;
using YoDrive.Domain.Dtos.RentDto;
using YoDrive.Domain.Models;

namespace YoDrive.Domain.Data.Repositories;

public class RentRepository : IRentRepository
{
    private readonly IMapper _mapper;
    private readonly AppDbContext _db;
    public RentRepository(AppDbContext db, IMapper mapper)
    {
        _db = db;
        _mapper = mapper;
    }

    public async Task<IEnumerable<RentReadDto>> GetRents()
    {
        var feedbacks = await _mapper.ProjectTo<RentReadDto>(_db.Rent
            .Include(_ => _.Car)
            .Include(_ => _.Feedback))
            .ToListAsync();
        return feedbacks;
    }

    public async Task<IEnumerable<RentReadDto>> GetCarRents(int carId)
    {
        var car = _db.Car.FirstOrDefault(_ => _.Id == carId);
        if (car == null)
            throw new Exception($"Автомобиль с Id {carId} не найден");
        
        var carFeedbacks = _db.Rent
            .Include(_ => _.Feedback)
            .Include(_ => _.Car)
            .Where(_ => _.Car.Id == carId);

        var response = await _mapper.ProjectTo<RentReadDto>(carFeedbacks).ToListAsync();

        return response;
    }

    public async Task<IEnumerable<RentReadDto>> GetUserRents(int userId)
    {
        var user = _db.User.FirstOrDefault(_ => _.Id == userId);
        if (user == null)
            throw new Exception($"Пользователь с Id {userId} не найден");
        
        var rents = _db.Rent
            .Include(_ => _.Feedback)
            .Include(_ => _.Car)
            .Where(_ => _.UserId == userId);

        var response = await _mapper.ProjectTo<RentReadDto>(rents).ToListAsync();
        
        foreach (var rent in response)
        {
            var car = _mapper.Map<CarReadDto>(rent.Car);
            if (car.Rents != null && car.Rents.Any(r => r.Feedback != null))
            {
                rent.Car.Rating = car.Rents.Where(r => r.Feedback != null).Average(r => r.Feedback.Stars);
            }
            else
            {
                rent.Car.Rating = 0;
            }
        }

        return response;
    }

    public async Task<RentReadDto> GetRent(int rentId)
    {
        var rent = await _db.Rent
            .Include(_ => _.Feedback)
            .Include(_ => _.Car)
            .FirstOrDefaultAsync(_ => _.Id == rentId);

        if (rent == null)
            throw new ArgumentException($"Аренда с Id {rent} не найден");

        return _mapper.Map<RentReadDto>(rent);
    }

    public async Task<RentReadDto> CreateRent(RentAddDto dto)
    {
        if (_db.Rent.Any(_ => _.CarId == dto.CarId 
                              && _.StartDate < dto.EndDate 
                              && _.EndDate > dto.StartDate))
            throw new Exception($"Невозможно забронировать автомобиль");

        if (dto.StartDate < DateTime.Today)
            throw new Exception($"Невозможно забронировать автомобиль");

        var response = new Rent()
        {
            UserId = dto.UserId,
            User = _db.User
                .FirstOrDefault(model => model.Id == dto.UserId) ?? throw new Exception("Пользователь не найден"),
            CarId = dto.CarId,
            Car = _db.Car
                .Include(_ => _.CarModel)
                .Include(_ => _.CarClass)
                .Include(_ => _.Filial)
                .FirstOrDefault(model => model.Id == dto.CarId) ?? throw new Exception("Автомобиль не найден"),
            StartDate = dto.StartDate,
            EndDate = dto.EndDate,
            RentCost = dto.RentCost,
            IsDeleted = false,
            CreatedAt = DateTime.UtcNow
        };
        
        await _db.Rent.AddAsync(response);
        await _db.SaveChangesAsync();
        return _mapper.Map<RentReadDto>(response);
    }

    public async Task<RentReadDto> UpdateRent(RentUpdateDto dto)
    {
        var rent = _db.Rent
            .FirstOrDefault(_ => _.Id == dto.RentId);

        if (rent == null)
            throw new Exception($"Аренда с Id {dto.RentId} не найдена");

        rent.UpdatedAt = DateTime.UtcNow;
        rent.IsDeleted = false;
        rent.StartDate = dto.StartDate;
        rent.EndDate = dto.EndDate;
        rent.RentCost = dto.RentCost;

        _db.Rent.Update(rent);
        await _db.SaveChangesAsync();

        return _mapper.Map<RentReadDto>(rent);
    }

    public async Task<bool> DeleteRent(int rentId)
    {
        var rent = _db.Rent.FirstOrDefault(_ => _.Id == rentId);

        if (rent == null)
            throw new Exception($"Аренда с Id {rentId} не найдена");
        
        rent.UpdatedAt = DateTime.UtcNow;
        rent.IsDeleted = true;
        
        return await _db.SaveChangesAsync() > 0;
    }
}