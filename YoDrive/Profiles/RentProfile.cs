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
            .ForMember(_ => _.Car, _ => _.MapFrom(s => s.Car))
            .ForMember(_ => _.User, _ => _.MapFrom(s => s.User))
            .ForMember(_ => _.Feedback, _ => _.MapFrom(s => s.Feedback))
            .ReverseMap();
        CreateMap<RentAddDto, RentReadDto>().ReverseMap();
    }
}