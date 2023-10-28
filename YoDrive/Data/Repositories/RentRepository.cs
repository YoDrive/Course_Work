using AutoMapper;
using Microsoft.EntityFrameworkCore;
using YoDrive.Domain.Data.Interfaces;
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
        var feedbacks = await _mapper.ProjectTo<RentReadDto>(_db.Rent)
            .Include(_ => _.Feedback)
            .Include(_ => _.Car)
            .ToListAsync();
        return feedbacks;
    }

    public async Task<IEnumerable<RentReadDto>> GetCarRents(int carId)
    {
        var car = _db.Car.FirstOrDefault(_ => _.CarId == carId);
        if (car == null)
            throw new Exception($"Автомобиль с Id {carId} не найден");
        
        var carFeedbacks = _db.Rent
            .Include(_ => _.Feedback)
            .Include(_ => _.Car)
            .Where(_ => _.Car.CarId == carId);

        var response = await _mapper.ProjectTo<RentReadDto>(carFeedbacks).ToListAsync();

        return response;
    }

    public async Task<IEnumerable<RentReadDto>> GetUserRents(int userId)
    {
        var car = _db.User.FirstOrDefault(_ => _.UserId == userId);
        if (car == null)
            throw new Exception($"Пользователь с Id {userId} не найден");
        
        var carFeedbacks = _db.Rent
            .Include(_ => _.Feedback)
            .Include(_ => _.Car)
            .Where(_ => _.UserId == userId);

        var response = await _mapper.ProjectTo<RentReadDto>(carFeedbacks).ToListAsync();

        return response;
    }

    public async Task<RentReadDto> GetRent(int rentId)
    {
        var rent = await _db.Rent
            .Include(_ => _.Feedback)
            .Include(_ => _.Car)
            .FirstOrDefaultAsync(_ => _.RentId == rentId);

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

        var response = _mapper.Map<Rent>(dto);
        response.IsDeleted = false;
        
        _db.Rent.Add(response);
        await _db.SaveChangesAsync();
        return _mapper.Map<RentReadDto>(response);
    }

    public async Task<RentReadDto> UpdateRent(RentUpdateDto dto)
    {
        var rent = _db.Rent
            .FirstOrDefault(_ => _.RentId == dto.RentId);

        if (rent == null)
            throw new Exception($"Аренда с Id {dto.RentId} не найдена");

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
        var rent = _db.Rent.FirstOrDefault(_ => _.RentId == rentId);

        if (rent == null)
            throw new Exception($"Аренда с Id {rentId} не найдена");
        rent.IsDeleted = true;
        
        return await _db.SaveChangesAsync() > 0;
    }
}