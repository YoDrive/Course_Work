using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using YoDrive.Application.Interfaces;
using YoDrive.Infrastructure.Data;

namespace YoDrive.API.Controllers;

[ApiController]
[Route("api/[Controller]")]
public class StatisticController : ControllerBase
{
    private readonly AppDbContext _db;
    private readonly IStatisticRepository _repository;
    private readonly IMapper _mapper;

    public StatisticController(AppDbContext db, IMapper mapper, IStatisticRepository repository)
    {
        _db = db;
        _mapper = mapper;
        _repository = repository;
    }
    
    [Authorize]
    [HttpGet("GetStatistic")]
    public async Task<IActionResult> GetStatistic()
    {
        try
        {
            var response = await _repository.GetStatistic();

            return Ok(response);
        }
        catch (Exception e)
        {
            return BadRequest($"{e.Message}");
        }
    }
}