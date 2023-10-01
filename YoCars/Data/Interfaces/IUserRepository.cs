using YoCars.Domain.Models;

namespace YoCars.Domain.Data.Interfaces;

public interface IUserRepository
{
    public Task<User> GetById(int id);
}