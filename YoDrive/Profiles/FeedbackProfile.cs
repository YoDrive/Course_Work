using AutoMapper;
using YoDrive.Domain.Dtos.FeedbackDto;
using YoDrive.Domain.Models;

namespace YoDrive.Profiles;

public class FeedbackProfile : Profile
{
    public FeedbackProfile()
    {
        CreateMap<Feedback, FeedbackUpdateDto>().ReverseMap();
        CreateMap<FeedbackAddDto, Feedback>().ReverseMap();
        CreateMap<Feedback, FeedbackReadDto>()
            .ForMember(_ => _.Rent, _ => _.MapFrom(s => s.Rent))
            .ReverseMap();
        CreateMap<FeedbackAddDto, FeedbackReadDto>().ReverseMap();
    }
}