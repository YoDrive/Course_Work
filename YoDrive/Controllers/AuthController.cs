using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using YoDrive.Configurations;
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

        var token = CreateToken(dbUser);
        SaveToken(dbUser.UserId, token.RefreshToken);

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
            RoleId = 2,
            PhoneNumber = request.PhoneNumber,
            Role = _db.Role.FirstOrDefault(_ => _.RoleId == 2)
        };
        
        user = newUser;
        
        var token = CreateToken(user);
        SaveToken(user.UserId, token.RefreshToken);
        
        _db.Add(newUser);
        _db.SaveChanges();

        return Ok(token);
    }

    private JwtToken CreateToken(User user)
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
        
        var refreshToken = new JwtSecurityToken(
            claims: claims,
            expires: DateTime.Now.AddDays(30),
            signingCredentials: cred
        );

        var jwtAccess = new JwtSecurityTokenHandler().WriteToken(token);
        var jwtRefresh = new JwtSecurityTokenHandler().WriteToken(refreshToken);

        return new JwtToken()
        {
            AccessToken = "Bearer " + jwtAccess,
            RefreshToken = jwtRefresh
        };
    }

    private async Task<Token> SaveToken(int userId, string refreshToken)
    {
        var tokenData = await _db.Token.FirstOrDefaultAsync(_ => _.UserId == userId);
        if (tokenData != null)
        {
            tokenData.RefreshToken = refreshToken;
            _db.Update(tokenData);
            _db.SaveChanges();
            return tokenData;
        }

        tokenData.UserId = userId;
        tokenData.RefreshToken = refreshToken;
        
        _db.Add(tokenData);
        _db.SaveChanges();
        return tokenData;
    }
}