using AutoMapper;
using YoDrive.Domain.Dtos.CarDto;
using YoDrive.Domain.Models;

namespace YoDrive.Profiles;

public class CarProfile : Profile
{
    public CarProfile()
    {
        CreateMap<Car, CarUpdateDto>().ReverseMap();
        CreateMap<CarAddDto, Car>().ReverseMap();
        CreateMap<Car, CarReadDto>()
            .ForMember(_ => _.CarClass, _ => _.MapFrom(s => s.CarClass))
            .ForMember(_ => _.Filial, _ => _.MapFrom(s => s.Filial))
            .ForMember(_ => _.CarModel, _ => _.MapFrom(s => s.CarModel))
            .ForMember(_ => _.Rents, _ => _.MapFrom(s => s.Rents))
            .ReverseMap();
        CreateMap<CarAddDto, CarReadDto>().ReverseMap();
    }
}