using AutoMapper;
using YoDrive.Domain.Dtos.FilialDto;
using YoDrive.Domain.Models;

namespace YoDrive.Profiles;

public class FilialProfile : Profile
{
    public FilialProfile()
    {
        CreateMap<Filial, FilialUpdateDto>().ReverseMap();
        CreateMap<FilialAddDto, Filial>().ReverseMap();
        CreateMap<Filial, FilialReadDto>().ReverseMap();
        CreateMap<FilialAddDto, FilialReadDto>().ReverseMap();
    }
}