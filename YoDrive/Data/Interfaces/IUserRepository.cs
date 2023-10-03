using YoDrive.Domain.Models;

namespace YoDrive.Domain.Data.Interfaces;

public interface IUserRepository
{
    public Task<User> GetById(int id);
}