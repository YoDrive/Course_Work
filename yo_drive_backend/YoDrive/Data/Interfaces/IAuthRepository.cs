using YoDrive.Domain.AuthDto;

namespace YoDrive.Domain.Data.Interfaces;

public interface IAuthRepository
{
    public Task<UserReadDto> Authorization(UserLoginRequestDto dto);
}