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
        var feedbacks = await _mapper.ProjectTo<FeedbackReadDto>(_db.Feedback).ToListAsync();

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
        var feedback = _db.Feedback.Where(_ => _.FeedbackId == id);

        if (feedback == null)
            throw new ArgumentException();

        return _mapper.Map<FeedbackReadDto>(feedback);
    }

    /// <summary>
    /// Создание отзыва
    /// </summary>
    /// <param name="dto"></param>
    /// <returns></returns>
    public async Task<FeedbackReadDto> CreateFeedback(FeedbackCreateDto dto)
    {
        var response = _mapper.Map<Feedback>(dto);

        _db.Feedback.Add(response);
        _db.SaveChangesAsync();
        return _mapper.Map<FeedbackReadDto>(response);
    }
    
    /// <summary>
    /// Обновление отзыва
    /// </summary>
    /// <param name="dto"></param>
    /// <returns></returns>
    /// <exception cref="KeyNotFoundException"></exception>
    public FeedbackReadDto UpdateFeedback(FeedbackUpdateDto dto)
    {
        var feedback = _db.Feedback.FirstOrDefault(_ => _.FeedbackId == dto.FeedbackId);

        if (feedback == null)
            throw new KeyNotFoundException();

        feedback.Response = dto.Response;
        feedback.Stars = dto.Stars;

        _db.Feedback.Update(feedback);
        _db.SaveChanges();

        return _mapper.Map<FeedbackReadDto>(feedback);
    }

    /// <summary>
    /// Удаление отзыва
    /// </summary>
    /// <param name="id"></param>
    /// <exception cref="KeyNotFoundException"></exception>
    public void DeleteFeedback(int id)
    {
        var feedback = _db.Feedback.FirstOrDefault(_ => _.FeedbackId == id);

        if (feedback == null)
            throw new KeyNotFoundException();

        _db.Feedback.Remove(feedback);
        _db.SaveChanges();
    }
}