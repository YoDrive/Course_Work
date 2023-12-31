using YoDrive.Domain.Dtos.FeedbackDto;

namespace YoDrive.Domain.Data.Interfaces;

public interface IFeedbackRepository
{
    Task<IEnumerable<FeedbackReadDto>> GetAllFeedbacks();
    Task<IEnumerable<FeedbackReadDto>> GetAllCarFeedback(int idCar);
    Task<IEnumerable<FeedbackReadDto>> GetAllUserFeedbacks(int idUser);
    Task<FeedbackReadDto> GetFeedbackById(int id);
    Task<FeedbackReadDto> CreateFeedback(FeedbackAddDto dto);
    Task<FeedbackReadDto> UpdateFeedback(FeedbackUpdateDto dto);
    Task<bool> DeleteFeedback(int id);
}