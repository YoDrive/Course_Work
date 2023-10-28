using AutoMapper;
using YoDrive.Domain.Dtos.FilialDto;
using YoDrive.Domain.Models;

namespace YoDrive.Profiles;

public class FilialProfileDto : Profile
{
    public FilialProfileDto()
    {
        CreateMap<Filial, FilialUpdateDto>().ReverseMap();
        CreateMap<FilialCreateDto, Filial>().ReverseMap();
        CreateMap<Filial, FilialReadDto>().ReverseMap();
        CreateMap<FilialCreateDto, FilialReadDto>().ReverseMap();
    }
}