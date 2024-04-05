using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using YoDrive.Application.Dtos.CarDto;
using YoDrive.Application.Interfaces;
using YoDrive.Infrastructure.Data;

namespace YoDrive.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CarController : ControllerBase
{
    private readonly AppDbContext _db;
    private readonly ICarRepository _repository;
    private readonly IMapper _mapper;

    public CarController(AppDbContext db, IMapper mapper, ICarRepository repository)
    {
        _db = db;
        _mapper = mapper;
        _repository = repository;
    }
    
    [HttpGet("GetCars")]
    public async Task<IActionResult> GetCars()
    {
        var response = await _repository.GetAllCars();
        return Ok(response);
    }

    [HttpGet("GetCar/{id}")]
    public async Task<IActionResult> GetCar(int id)
    {
        try
        {
            var response = await _repository.GetCarById(id);
            return Ok(response);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpGet("GetAutopark")]
    public async Task<IActionResult> GetOurAutopark()
    {
        try
        {
            var response = await _repository.GetAutopark();
            return Ok(response);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [Authorize]
    [HttpPost("CreateCar")]
    public async Task<IActionResult> CreateCar([FromForm] CarAddDto dto)
    {
        try
        {
            var response = await _repository.CreateCar(dto);
            return Created(nameof(CreateCar), response);
        }
        catch (Exception e)
        {
            return Conflict(e.Message);
        }
    }

    [Authorize]
    [HttpPut("UpdateCar")]
    public async Task<IActionResult> UpdateCar([FromForm] CarUpdateDto dto)
    {
        try
        {
            var response = await _repository.UpdateCar(dto);
            return Ok(response);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [Authorize]
    [HttpDelete("[action]/{id}")]
    public async Task<IActionResult> DeleteCar(int id)
    {
        try
        {
            var response = await _repository.DeleteCar(id);
            return Ok(response);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpPost("GetCarsByFilter")]
    public async Task<IActionResult> GetCarsByFilter(Filter request)
    {
        try
        {
            var response = await _repository.GetCarsByFilter(request);
            return Ok(response);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpPost("GetCarsByPage")]
    public async Task<IActionResult> GetCarsByPage(CarRequestDto request)
    {
        try
        {
            var response = await _repository.GetCarsByPage(request);
            return Ok(response);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
}