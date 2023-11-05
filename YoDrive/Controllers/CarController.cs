using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using YoDrive.Domain.Data;
using YoDrive.Domain.Data.Repositories;
using YoDrive.Domain.Dtos.CarDto;
using YoDrive.Domain.Other;

namespace YoDrive.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CarController : ControllerBase
{
    private readonly AppDbContext _db;
    private readonly CarRepository _repository;
    private readonly IMapper _mapper;

    public CarController(AppDbContext db, IMapper mapper)
    {
        _db = db;
        _mapper = mapper;
        _repository = new CarRepository(_db, _mapper);
    }
    
    [HttpGet("GetCars")]
    public async Task<IActionResult> GetCars()
    {
        var response = await _repository.GetAllCars();
        return Ok(response);
    }

    [HttpGet("GetCar")]
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

    [HttpPost("CreateCar")]
    public async Task<IActionResult> CreateCar([FromBody] CarAddDto dto)
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

    [HttpPut("UpdateCar")]
    public async Task<IActionResult> UpdateCar([FromBody] CarUpdateDto dto)
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

    [HttpDelete("DeleteCar")]
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
}