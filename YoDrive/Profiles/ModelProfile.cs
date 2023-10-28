using AutoMapper;
using YoDrive.Domain.Dtos.ModelDto;
using YoDrive.Domain.Models;

namespace YoDrive.Profiles;

public class ModelProfile : Profile
{
    public ModelProfile()
    {
        CreateMap<CarModelReadDto, CarModel>().ReverseMap();
        CreateMap<CarModel, CarModelReadDto>().ReverseMap();
        CreateMap<CarModelCreateDto, CarModelReadDto>().ReverseMap();
        CreateMap<CarModelUpdateDto, CarModel>();
    }
}