using YoDrive.Domain.AuthDto;
using YoDrive.Domain.Dtos.UserDto;

namespace YoDrive.Domain.Data.Interfaces;

public interface IUserRepository
{
    public Task<UserReadDto> GetById(int id);
    public Task<bool> DeleteUser(int id);
    public Task<UserReadDto> UpdateUserInfo(UserUpdateInfoDto dto);
    public Task<UserReadDto> UpdateUserPhoto(UserUpdatePhotoDto dto);
    public Task<bool> UpdateUserPassword(UserUpdatePasswordDto dto);
}