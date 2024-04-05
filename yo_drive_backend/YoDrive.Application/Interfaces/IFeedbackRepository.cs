using System.Collections.Generic;
using System.Threading.Tasks;
using YoDrive.Application.Dtos.FeedbackDto;

namespace YoDrive.Application.Interfaces;

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