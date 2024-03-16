using AutoMapper;
using Microsoft.EntityFrameworkCore;
using YoDrive.Domain.Data.Interfaces;
using YoDrive.Domain.Dtos.CarBrandDto;
using YoDrive.Domain.Dtos.FeedbackDto;
using YoDrive.Domain.Models;

namespace YoDrive.Domain.Data.Repositories;

public class FeedbackRepository : IFeedbackRepository
{
    private readonly IMapper _mapper;
    private readonly AppDbContext _db;
    public FeedbackRepository(AppDbContext db, IMapper mapper)
    {
        _db = db;
        _mapper = mapper;
    }

    /// <summary>
    /// Получение всех отзывов
    /// </summary>
    /// <returns></returns>
    public async Task<IEnumerable<FeedbackReadDto>> GetAllFeedbacks()
    {
        var feedbacks = await _mapper.ProjectTo<FeedbackReadDto>(_db.Feedback.Include(_ => _.Rent)).ToListAsync();

        return feedbacks;
    }

    /// <summary>
    /// Получение всех отзывов о машине
    /// </summary>
    /// <param name="idCar">ID машины</param>
    /// <returns></returns>
    /// <exception cref="NotImplementedException"></exception>
    public async Task<IEnumerable<FeedbackReadDto>> GetAllCarFeedback(int idCar)
    {
        var car = _db.Car.FirstOrDefault(_ => _.Id == idCar);
        if (car == null)
            throw new Exception($"Автомобиль с Id {idCar} не найден");
        
        var carFeedbacks = _db.Feedback
            .Include(_ => _.Rent)
            .Where(_ => _.Rent.CarId == idCar);

        var response = await _mapper.ProjectTo<FeedbackReadDto>(carFeedbacks).ToListAsync();

        return response;
    }

    /// <summary>
    /// Получение всех отзывов человека
    /// </summary>
    /// <param name="idUser"></param>
    /// <returns></returns>
    /// <exception cref="NotImplementedException"></exception>
    public async Task<IEnumerable<FeedbackReadDto>> GetAllUserFeedbacks(int idUser)
    {
        var carfeedbacks = _db.Feedback
            .Include(_ => _.Rent)
            .Where(_ => _.Rent.UserId == idUser);

        var response = await _mapper.ProjectTo<FeedbackReadDto>(carfeedbacks).ToListAsync();

        return response;
    }

    /// <summary>
    /// Получение отзыва по id
    /// </summary>
    /// <param name="id"></param>
    /// <returns></returns>
    /// <exception cref="ArgumentException"></exception>
    public async Task<FeedbackReadDto> GetFeedbackById(int id)
    {
        var feedback = await _db.Feedback
            .Include(_ => _.Rent)
            .FirstOrDefaultAsync(_ => _.Id == id);

        if (feedback == null)
            throw new Exception($"Отзыв с Id {id} не найден");

        return _mapper.Map<FeedbackReadDto>(feedback);
    }

    /// <summary>
    /// Создание отзыва
    /// </summary>
    /// <param name="dto"></param>
    /// <returns></returns>
    public async Task<FeedbackReadDto> CreateFeedback(FeedbackAddDto dto)
    {
        var response = _mapper.Map<Feedback>(dto);
        response.IsDeleted = false;

        _db.Feedback.Add(response);
        await _db.SaveChangesAsync();
        return _mapper.Map<FeedbackReadDto>(response);
    }

    /// <summary>
    /// Обновление отзыва
    /// </summary>
    /// <param name="dto"></param>
    /// <returns></returns>
    /// <exception cref="KeyNotFoundException"></exception>
    public async Task<FeedbackReadDto> UpdateFeedback(FeedbackUpdateDto dto)
    {
        var feedback = _db.Feedback
            .Include(_ => _.Rent)
            .FirstOrDefault(_ => _.Id == dto.FeedbackId);

        if (feedback == null)
            throw new Exception($"Отзыв с Id {dto.FeedbackId} не найден");
        
        feedback.IsDeleted = false;
        feedback.Response = dto.Response;
        feedback.Stars = dto.Stars;
        feedback.UpdatedAt = DateTime.UtcNow;

        _db.Feedback.Update(feedback);
        await _db.SaveChangesAsync();

        return _mapper.Map<FeedbackReadDto>(feedback);
    }


    /// <summary>
    /// Удаление отзыва
    /// </summary>
    /// <param name="id"></param>
    /// <exception cref="KeyNotFoundException"></exception>
    public async Task<bool> DeleteFeedback(int id)
    {
        var feedback = _db.Feedback.FirstOrDefault(_ => _.Id == id);

        if (feedback == null)
            throw new Exception($"Отзыв с Id {id} не найден");
        
        feedback.UpdatedAt = DateTime.UtcNow;
        feedback.IsDeleted = true;
        
        return await _db.SaveChangesAsync() > 0;
    }
}