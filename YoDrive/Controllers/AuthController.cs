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
    private readonly IConfiguration _configuration;

    public AuthController(AppDbContext db, IMapper mapper, IConfiguration configuration)
    {
        _db = db;
        _mapper = mapper;
        _repository = new AuthRepository(_db, _mapper);
        _configuration = configuration;
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

        string token = "Bearer " + CreateToken(dbUser);

        return Ok(token);
    }

    [HttpPost("register")]
    public ActionResult<UserReadDto> Register(UserRegisterRequestDto request)
    {
        var users = _db.User.ToList();
        if (users.FirstOrDefault(_ => _.Email == request.Email) != null || users.FirstOrDefault(_ => _.PhoneNumber == request.PhoneNumber) != null)
        {
            return BadRequest("The user's email address or phone number already exists.");
        }
        
        string passwordHash
            = BCrypt.Net.BCrypt.HashPassword(request.Password);
        
        var newUser = new User
        {
            Email = request.Email,
            Password = passwordHash,
            FirstName = request.FirstName,
            Surname = request.Surname,
            Patronymic = request.Patronymic,
            RoleId = 1,
            PhoneNumber = request.PhoneNumber,
            Role = _db.Role.FirstOrDefault(_ => _.RoleId == 1)
        };
        
        user = newUser;

        _db.Add(newUser);
        _db.SaveChanges();

        return Ok(newUser);
    }

    private string CreateToken(User user)
    {
        List<Claim> claims = new List<Claim>
        {
            new Claim(ClaimTypes.Name, user.Email),
            new Claim(ClaimTypes.Role, "Admin"),
            new Claim(ClaimTypes.Role, "Client"), 
        };

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(
            _configuration.GetSection("JwtToken:Secret").Value!));

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