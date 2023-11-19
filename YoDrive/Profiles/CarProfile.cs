using AutoMapper;
using YoDrive.Domain.Dtos.CarDto;
using YoDrive.Domain.Models;

namespace YoDrive.Profiles;

public class CarProfile : Profile
{
    public CarProfile()
    {
        CreateMap<Car, CarUpdateDto>().ReverseMap();
        CreateMap<CarAddDto, Car>()
            .ForMember(dest => dest.ClassId, opt => opt.MapFrom(src => src.ClassId))
            .ForMember(dest => dest.FilialId, opt => opt.MapFrom(src => src.FilialId))
            .ReverseMap();
        CreateMap<Car, CarReadDto>()
            .ForMember(dest => dest.CarModel, opt => opt.MapFrom(src => src.CarModel))
            .ForMember(dest => dest.CarClass, opt => opt.MapFrom(src => src.CarClass))
            .ForMember(dest => dest.Filial, opt => opt.MapFrom(src => src.Filial))
            .ForMember(dest => dest.Rents, opt => opt.MapFrom(src => src.Rents))
            .ForMember(dest => dest.CarId, opt => opt.MapFrom(src => src.CarId))
            .ForMember(dest => dest.Year, opt => opt.MapFrom(src => src.Year))
            .ForMember(dest => dest.FeedbackCount, opt => opt.MapFrom(src => src.Rents.Where(_ => _.Feedback != null && _.Feedback.IsDeleted == false).Count()))
            .ReverseMap();
        CreateMap<CarAddDto, CarReadDto>().ReverseMap();
    }
}