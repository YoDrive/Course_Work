using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using YoDrive.Domain.Data;
using YoDrive.Domain.Data.Interfaces;
using YoDrive.Domain.Data.Repositories;

namespace YoDrive.Controllers;

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