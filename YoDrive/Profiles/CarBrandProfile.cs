using AutoMapper;
using YoDrive.Domain.Dtos.CarBrandDto;
using YoDrive.Domain.Dtos.ModelDto;
using YoDrive.Domain.Models;

namespace YoDrive.Profiles;

public class CarBrandProfile : Profile
{
    public CarBrandProfile()
    {
        CreateMap<CarBrand, CarBrandUpdateDto>().ReverseMap();
        CreateMap<CarBrandAddDto, CarBrand>().ReverseMap();
        CreateMap<CarBrand, CarBrandReadDto>().ReverseMap();
        CreateMap<CarBrandAddDto, CarBrandReadDto>().ReverseMap();
    }
}