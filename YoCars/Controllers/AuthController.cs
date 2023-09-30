using Microsoft.AspNetCore.Mvc;
using YoCars.Domain.Data;

namespace YoCars.Controllers;

public class User
{
    public string Email { get; set; }
    public string Password { get; set; }
}

[ApiController]
[Route("api/[Controller]")]
public class AuthController : ControllerBase
{
    private readonly AppDbContext _db;

    public AuthController(AppDbContext db)
    {
        _db = db;
    }

    [HttpPost("login")]
    public async Task<ActionResult> Login(User user)
    {
        return Ok(new {message = "Авторизация успешна!"});
    }

    [HttpPost("register")]
    public async Task<ActionResult> Register(User user)
    {
        return Ok(new { message = "Регистрация успешна!" });
    }
}