using YoCars.Domain.AuthDto;

namespace YoCars.Domain.Data.Interfaces;

public interface IAuthRepository
{
    public Task<UserReadDto> Authorization(UserLoginRequestDto dto);
}