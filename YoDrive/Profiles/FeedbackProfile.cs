using AutoMapper;
using YoDrive.Domain.Dtos.FeedbackDto;
using YoDrive.Domain.Models;

namespace YoDrive.Profiles;

public class FeedbackProfile : Profile
{
    public FeedbackProfile()
    {
        CreateMap<Feedback, FeedbackUpdateDto>().ReverseMap();
        CreateMap<FeedbackCreateDto, Feedback>().ReverseMap();
        CreateMap<Feedback, FeedbackReadDto>().ReverseMap();
        CreateMap<FeedbackCreateDto, FeedbackReadDto>().ReverseMap();
    }
}