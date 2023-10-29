using AutoMapper;
using YoDrive.Domain.Dtos.RentDto;
using YoDrive.Domain.Models;

namespace YoDrive.Profiles;

public class RentProfile : Profile
{
    public RentProfile()
    {
        CreateMap<Rent, RentUpdateDto>().ReverseMap();
        CreateMap<RentAddDto, Rent>().ReverseMap();
        CreateMap<Rent, RentReadDto>()
            .ForMember(dest => dest.User, opt => opt.MapFrom(src => src.User))
            .ForMember(dest => dest.Car, opt => opt.MapFrom(src => src.Car))
            .ForMember(dest => dest.UserId, opt => opt.MapFrom(src => src.UserId))
            .ForMember(dest => dest.CarId, opt => opt.MapFrom(src => src.CarId))
            .ForMember(dest => dest.StartDate, opt => opt.MapFrom(src => src.StartDate))
            .ForMember(dest => dest.EndDate, opt => opt.MapFrom(src => src.EndDate))
            .ForMember(dest => dest.RentCost, opt => opt.MapFrom(src => src.RentCost))
            .ForMember(dest => dest.IsDeleted, opt => opt.MapFrom(src => src.IsDeleted))
            .ForMember(dest => dest.Feedback, opt => opt.MapFrom(src => src.Feedback))
            .ReverseMap();
        CreateMap<RentAddDto, RentReadDto>().ReverseMap();
    }
}