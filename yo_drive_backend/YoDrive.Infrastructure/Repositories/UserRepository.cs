using AutoMapper;
using Microsoft.EntityFrameworkCore;
using YoDrive.Application.AuthDto;
using YoDrive.Application.Dtos.UserDto;
using YoDrive.Application.Interfaces;
using YoDrive.Infrastructure.Data;

namespace YoDrive.Infrastructure.Repositories;

public class UserRepository : IUserRepository
{
    private readonly AppDbContext _db;
    private readonly IMapper _mapper;

    public UserRepository(AppDbContext db, IMapper mapper)
    {
        _db = db;
        _mapper = mapper;
    }

    public async Task<bool> DeleteUser(int id)
    {
        var user = await _db.User.FirstOrDefaultAsync(_ => _.Id == id)
                   ?? throw new Exception($"Пользователь с Id {id} не найден");
        user.UpdatedAt = DateTime.UtcNow;
        user.IsDeleted = true;
        
        return await _db.SaveChangesAsync() > 0;
    }

    public async Task<UserReadDto> UpdateUserInfo(UserUpdateInfoDto dto)
    {
        var user = await _db.User.FirstOrDefaultAsync(_ => _.Id == dto.UserId)
                   ?? throw new Exception($"Пользователь с Id {dto.UserId} не найден");

        user.FirstName = dto.FirstName;
        user.Surname = dto.Surname;
        user.Patronymic = dto.Patronymic;
        user.Email = dto.Email;
        user.PhoneNumber = dto.PhoneNumber;
        user.UpdatedAt = DateTime.UtcNow;

        _db.User.Update(user);
        await _db.SaveChangesAsync();

        return _mapper.Map<UserReadDto>(user);
    }

    public async Task<UserReadDto> UpdateUserPhoto(UserUpdatePhotoDto dto)
    {
        var user = await _db.User.FirstOrDefaultAsync(_ => _.Id == dto.UserId)
                   ?? throw new Exception($"Пользователь с Id {dto.UserId} не найден");
        
        var currentDirectory = Directory.GetCurrentDirectory();
        var folderPath = Path.Combine(currentDirectory, "../YoDrive.Infrastructure/yo_drive_store/Users");
        var fileName = Guid.NewGuid() + Path.GetExtension(dto.Image.FileName);
        var filePath = Path.Combine(folderPath, fileName);

        if (!Directory.Exists(folderPath))
        {
            Directory.CreateDirectory(folderPath);
        }
            
        if (dto.Image.Length > 0)
        {
            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await dto.Image.CopyToAsync(stream);
            }
        }
        user.UserImage = fileName;
        user.UpdatedAt = DateTime.UtcNow;
        
        _db.User.Update(user);
        await _db.SaveChangesAsync();

        return _mapper.Map<UserReadDto>(user);
    }

    public async Task<bool> UpdateUserPassword(UserUpdatePasswordDto dto)
    {
        //TODO: Смена пароля
        throw new NotImplementedException();
    }

    public async Task<UserReadDto> GetById(int id)
    {
        var user = await _db.User.FirstOrDefaultAsync(_ => _.Id == id)
                   ?? throw new Exception($"Пользователь с Id {id} не найден");
        
        return _mapper.Map<UserReadDto>(user);
    }
}