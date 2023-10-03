using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using YoDrive.Domain.AuthDto;
using YoDrive.Domain.Data;
using YoDrive.Domain.Data.Interfaces;
using YoDrive.Domain.Data.Repositories;
using YoDrive.Domain.Models;

namespace YoDrive.Controllers;


[ApiController]
[Route("api/[Controller]")]
public class AuthController : ControllerBase
{
    private readonly AppDbContext _db;
    private readonly IMapper _mapper;
    private IAuthRepository _repository;
    public static User user = new User();

    public AuthController(AppDbContext db, IMapper mapper)
    {
        _db = db;
        _mapper = mapper;
        _repository = new AuthRepository(_db, _mapper);
    }

    [HttpPost("login")]
    public async Task<ActionResult<UserReadDto>> Login(UserLoginRequestDto request)
    {
        var dbUser = _db.User.FirstOrDefault(_ => _.Email == request.Email);
        
        if (dbUser == null)
        {
            return BadRequest("User not found.");
        }

        if (!BCrypt.Net.BCrypt.Verify(request.Password, dbUser.Password))
        {
            return BadRequest("Wrong password.");
        }

        string token = CreateToken(dbUser);

        return Ok(token);

        // try
        // {
        //     var user = await _repository.Authorization(dto);
        //     
        //     if (user == null)
        //         return Unauthorized("Неверный логин или пароль");
        //     
        //     return Ok(user);
        // }
        // catch (Exception e)
        // {
        //     return Unauthorized("Произошла непредвиденная ошибка сервера");
        // }
    }

    [HttpPost("register")]
    public ActionResult<UserReadDto> Register(UserRegisterRequestDto request)
    {
        if (_db.User.FirstOrDefault(_ => _.Email == request.Email) != null)
        {
            return BadRequest("The user's email address already exists.");
        }
        
        string passwordHash
            = BCrypt.Net.BCrypt.HashPassword(request.Password);
        user.Email = request.Email;
        user.Password = passwordHash;
        user.FirstName = request.FirstName;
        user.Surname = request.Surname;
        user.Patronymic = request.Patronymic;
        user.RoleId = 2;
        user.PhoneNumber = request.PhoneNumber;
        user.Role = _db.Role.FirstOrDefault(_ => _.RoleId == 2);

        _db.Add(user);
        _db.SaveChanges();

        return Ok(user);
    }

    private string CreateToken(User user)
    {
        List<Claim> claims = new List<Claim>
        {
            new Claim(ClaimTypes.Name, user.Email),
            new Claim(ClaimTypes.Role, "Admin"),
            new Claim(ClaimTypes.Role, "Client"), 
        };

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("3A 5F 7C 1B 8E 2D E4 5F A0 9C 78 0A E7 F1 D2 7A 8B 50 36 4E 9E A9 62 6C 92 45 41 36 1A B0 F4 71 12 C9 83 1E B6 B5 1F 0A 29 7F 33 79 E3 14 6F 96 F9 58 2A F8 7B F2 D5 C5 48 3D 65 C3"));

        var cred = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

        var token = new JwtSecurityToken(
            claims: claims,
            expires: DateTime.Now.AddDays(1),
            signingCredentials: cred
        );

        var jwt = new JwtSecurityTokenHandler().WriteToken(token);

        return jwt;
    }
}