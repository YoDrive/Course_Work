using System.Threading.Tasks;
using YoDrive.Application.AuthDto;
using YoDrive.Application.Dtos.UserDto;

namespace YoDrive.Application.Interfaces;

public interface IUserRepository
{
    public Task<UserReadDto> GetById(int id);
    public Task<bool> DeleteUser(int id);
    public Task<UserReadDto> UpdateUserInfo(UserUpdateInfoDto dto);
    public Task<UserReadDto> UpdateUserPhoto(UserUpdatePhotoDto dto);
    public Task<bool> UpdateUserPassword(UserUpdatePasswordDto dto);
}