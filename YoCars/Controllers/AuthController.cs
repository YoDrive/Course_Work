using Microsoft.AspNetCore.Mvc;
using YoCars.Domain.AuthDto;
using YoCars.Domain.Data;

namespace YoCars.Controllers;


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
    public async Task<ActionResult> Login(UserAuthDto dto)
    {
        return Ok();
    }

    [HttpPost("register")]
    public async Task<ActionResult> Register()
    {
        return Ok(new { message = "Регистрация успешна!" });
    }
}