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
using YoDrive.Domain.Enums;
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

    public AuthController(AppDbContext db, IMapper mapper, IConfiguration configuration, IAuthRepository repository)
    {
        _db = db;
        _mapper = mapper;
        _repository = repository;
        _configuration = configuration;
    }
    
    
    [HttpPost("logout")]
    public async Task<IActionResult> Logout()
    {
        var userId = GetUserIdFromContext();

        var user = await _db.User.FindAsync(userId);
        if (user == null)
        {
            return BadRequest("User not found.");
        }

        var tokenData = await _db.Token.FirstOrDefaultAsync(t => t.UserId == userId);
        if (tokenData != null)
        {
            tokenData.RefreshToken = string.Empty;
            _db.Token.Update(tokenData);
            await _db.SaveChangesAsync();
            return Ok("Logout successful.");
        }

        return NotFound("Token not found for the user.");
    }

    private int GetUserIdFromContext()
    {
        var userIdClaim = HttpContext.User.FindFirst("Id");

        if (userIdClaim != null && int.TryParse(userIdClaim.Value, out int userId))
        {
            return userId;
        }

        return -1;
    }
    
    [HttpPost("login")]
    public async Task<ActionResult<UserAuthDto>> Login(UserLoginRequestDto request)
    {
        var dbUser = await _db.User
            .Include(_ => _.Role)
            .Where(_ => !_.IsDeleted)
            .FirstOrDefaultAsync(_ => _.Email == request.Email);
        
        if (dbUser == null)
        {
            return BadRequest("User not found.");
        }

        if (!BCrypt.Net.BCrypt.Verify(request.Password, dbUser.Password))
        {
            return BadRequest("Wrong password.");
        }

        var token = CreateToken(dbUser);
        await SaveToken(dbUser.Id, token.RefreshToken);
        var allClaims = HttpContext.User.Claims.Select(c => $"{c.Type}: {c.Value}");
        Console.WriteLine("All Claims: " + string.Join(", ", allClaims));

        
        var response = new UserAuthDto()
        {
            RefreshToken = token.RefreshToken,
            AccessToken = token.AccessToken,
        };

        return Ok(response);
    }

    [HttpPost("register")]
    public async Task<ActionResult<UserAuthDto>> Register(UserRegisterRequestDto request)
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
            RoleId = (int)RolesEnum.Client,
            PhoneNumber = request.PhoneNumber,
            Role = _db.Role.FirstOrDefault(_ => _.Id == (int)RolesEnum.Client),
            CreatedAt = DateTime.UtcNow
        };
        
        user = newUser;
        
        var token = CreateToken(user);
        await SaveToken(user.Id, token.RefreshToken);
        
        _db.Add(newUser);
        _db.SaveChanges();
        var response = new UserAuthDto()
        {
            RefreshToken = token.RefreshToken,
            AccessToken = token.AccessToken,
        };

        return Ok(response);
    }

    private JwtToken CreateToken(User user)
    {
        var claims = new List<Claim>
        {
            new Claim("Id", user.Id.ToString()),
            new Claim("Email", user.Email),
            new Claim("Roles", user.Role.RoleName),
            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString())
        };

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(
            _configuration.GetSection("JwtToken:Secret").Value!));

        var cred = new SigningCredentials(key, SecurityAlgorithms.HmacSha512);

        var token = new JwtSecurityToken(
            claims: claims,
            expires: DateTime.UtcNow.AddDays(1),
            signingCredentials: cred
        );
        Console.WriteLine("Access Token Content: " + token);
        
        var refreshToken = new JwtSecurityToken(
            claims: claims,
            expires: DateTime.UtcNow.AddDays(3),
            signingCredentials: cred
        );

        var jwtAccess = new JwtSecurityTokenHandler().WriteToken(token);
        var jwtRefresh = new JwtSecurityTokenHandler().WriteToken(refreshToken);

        return new JwtToken()
        {
            AccessToken = jwtAccess,
            RefreshToken = jwtRefresh,
            AccessTokenObject = token
        };
    }

    private async Task<Token> SaveToken(int userId, string refreshToken)
    {
        var tokenData = await _db.Token.FirstOrDefaultAsync(_ => _.UserId == userId);
        if (tokenData != null)
        {
            tokenData.RefreshToken = refreshToken;
            _db.Token.Update(tokenData);
        }
        else
        {
            tokenData = new Token
            {
                UserId = userId,
                RefreshToken = refreshToken
            };
            _db.Token.Add(tokenData);
        }

        await _db.SaveChangesAsync();
        return tokenData;
    }
}