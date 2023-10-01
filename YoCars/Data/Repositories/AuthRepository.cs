using AutoMapper;
using Microsoft.EntityFrameworkCore;
using YoCars.Domain.AuthDto;
using YoCars.Domain.Data.Interfaces;

namespace YoCars.Domain.Data.Repositories;

public class AuthRepository : IAuthRepository
{
    private readonly AppDbContext _db;
    private readonly IMapper _mapper;

    public AuthRepository(AppDbContext db, IMapper mapper)
    {
        _db = db;
        _mapper = mapper;
    }


    public async Task<UserReadDto> Authorization(UserLoginRequestDto dto)
    {
        var user = await _db.User.FirstOrDefaultAsync(_=>_.Email == dto.Email && _.Password == dto.Password);

        return _mapper.Map<UserReadDto>(user);
    }
}