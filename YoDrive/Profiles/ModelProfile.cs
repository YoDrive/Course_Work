using AutoMapper;
using YoDrive.Domain.Dtos.ModelDto;
using YoDrive.Domain.Models;

namespace YoDrive.Profiles;

public class ModelProfile : Profile
{
    public ModelProfile()
    {
        CreateMap<CarModelReadDto, CarModel>().ReverseMap();
        CreateMap<CarModel, CarModelCreateDto>();
        CreateMap<CarModelUpdateDto, CarModel>();
        CreateMap<CarModelCreateDto, CarModel>();
        CreateMap<CarModel, CarModelReadDto>()
            .ForMember(dest => dest.CarBrand, opt => opt.MapFrom(src => src.CarBrand));
    }
}