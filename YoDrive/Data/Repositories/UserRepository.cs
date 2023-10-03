using AutoMapper;
using YoDrive.Domain.Data.Interfaces;
using YoDrive.Domain.Models;

namespace YoDrive.Domain.Data.Repositories;

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