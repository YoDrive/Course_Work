using AutoMapper;
using YoCars.Domain.AuthDto;
using YoCars.Domain.Models;

namespace YoCars.Profiles;

public class AuthProfile : Profile
{
    public AuthProfile()
    {
        CreateMap<User, UserReadDto>();
        CreateMap<UserLoginRequestDto, User>();
        CreateMap<UserReadDto, UserLoginRequestDto>();
    }
}