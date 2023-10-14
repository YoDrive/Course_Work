using AutoMapper;
using YoDrive.Domain.AuthDto;
using YoDrive.Domain.Models;

namespace YoDrive.Profiles;

public class AuthProfile : Profile
{
    public AuthProfile()
    {
        CreateMap<User, UserReadDto>();
        CreateMap<UserLoginRequestDto, User>();
        CreateMap<UserReadDto, UserLoginRequestDto>();
    }
}