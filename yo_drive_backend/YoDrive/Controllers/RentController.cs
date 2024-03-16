using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using YoDrive.Domain.Data;
using YoDrive.Domain.Data.Interfaces;
using YoDrive.Domain.Data.Repositories;
using YoDrive.Domain.Dtos.RentDto;

namespace YoDrive.Controllers;

[ApiController]
[Route("api/[Controller]")]
public class RentController : ControllerBase
{
    private readonly AppDbContext _db;
    private readonly IRentRepository _repository;
    private readonly IMapper _mapper;

    public RentController(AppDbContext db, IMapper mapper, IRentRepository repository)
    {
        _db = db;
        _mapper = mapper;
        _repository = repository;
    }
    
    [HttpGet("GetRents")]
    public async Task<IActionResult> GetRents()
    {
        var response = await _repository.GetRents();
        return Ok(response);
    }

    [HttpGet("GetCarRents")]
    public async Task<IActionResult> GetCarRents(int carId)
    {
        try
        {
            var response = await _repository.GetCarRents(carId);
            return Ok(response);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [Authorize]
    [HttpGet("GetUserRents/{userId}")]
    public async Task<IActionResult> GetUserRents(int userId)
    {
        try
        {
            var response = await _repository.GetUserRents(userId);
            return Ok(response);
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }
    }

    [HttpGet("GetRent")]
    public async Task<IActionResult> GetRent(int rentId)
    {
        try
        {
            var response = await _repository.GetRent(rentId);
            return Ok(response);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [Authorize]
    [HttpPost("CreateRent")]
    public async Task<IActionResult> CreateRent([FromBody] RentAddDto dto)
    {
        try
        {
            var response = await _repository.CreateRent(dto);
            return Created(nameof(CreateRent), response);
        }
        catch (Exception e)
        {
            return Conflict(e.Message);
        }
    }

    [Authorize]
    [HttpPut("UpdateRent")]
    public async Task<IActionResult> UpdateRent([FromBody] RentUpdateDto dto)
    {
        try
        {
            var response = await _repository.UpdateRent(dto);
            return Ok(response);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [Authorize]
    [HttpDelete("DeleteRent")]
    public async Task<IActionResult> DeleteRent(int rentId)
    {
        try
        {
            var response = await _repository.DeleteRent(rentId);
            return Ok(response);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
}