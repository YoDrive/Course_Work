using AutoMapper;
using YoCars.Domain.Data.Interfaces;
using YoCars.Domain.Models;

namespace YoCars.Domain.Data.Repositories;

public class UserRepository : IUserRepository
{
    private readonly AppDbContext _db;
    private readonly IMapper _mapper;

    public UserRepository(AppDbContext db, IMapper mapper)
    {
        _db = db;
        _mapper = mapper;
    }

    public Task<User> GetById(int id)
    {
        throw new NotImplementedException();
    }
}