using System.Threading.Tasks;
using YoDrive.Application.AuthDto;
using YoDrive.Application.Dtos.AuthDto;

namespace YoDrive.Application.Interfaces;

public interface IAuthRepository
{
    public Task<UserReadDto> Authorization(UserLoginRequestDto dto);
}