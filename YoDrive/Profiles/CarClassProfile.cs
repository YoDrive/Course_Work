using AutoMapper;
using YoDrive.Domain.Dtos.CarClassDto;
using YoDrive.Domain.Models;

namespace YoDrive.Profiles;

public class CarClassProfile : Profile
{
    public CarClassProfile()
    {
        CreateMap<CarClass, ClassUpdateDto>().ReverseMap();
        CreateMap<ClassAddDto, CarClass>().ReverseMap();
        CreateMap<CarClass, ClassReadDto>().ReverseMap();
        CreateMap<ClassAddDto, ClassReadDto>().ReverseMap();
    }
}