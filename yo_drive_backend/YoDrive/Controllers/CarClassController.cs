using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using YoDrive.Domain.Data;
using YoDrive.Domain.Data.Interfaces;
using YoDrive.Domain.Data.Repositories;
using YoDrive.Domain.Dtos.CarClassDto;
using YoDrive.Domain.Models;

namespace YoDrive.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CarClassController : ControllerBase
{
    private readonly AppDbContext _db;
    private readonly ICarClassRepository _repository;
    private readonly IMapper _mapper;

    public CarClassController(AppDbContext db, IMapper mapper, ICarClassRepository repository)
    {
        _db = db;
        _mapper = mapper;
        _repository = repository;
    }

    /// <summary>
    /// Получение всех видов кузовов
    /// </summary>
    /// <returns></returns>
    [HttpGet("GetClasses")]
    public async Task<IActionResult> GetClasses()
    {
        try
        {
            var response = await _repository.GetClasses();

            return Ok(response);
        }
        catch (Exception e)
        {
            return BadRequest($"{e.Message}");
        }
    }

    /// <summary>
    /// Получение кузова по id
    /// </summary>
    /// <param name="id"></param>
    /// <returns></returns>
    [HttpGet("GetClassById/{id}")]
    public async Task<IActionResult> GetClassById(int id)
    {
        try
        {
            var response = await _repository.GetClassById(id);

            return Ok(_mapper.Map<CarBrand>(response));
        }
        catch (ArgumentException e)
        {
            return BadRequest("Класс автомобиля с таким id не найден");
        }
        catch (Exception e)
        {
            return BadRequest($"{e.Message}");
        }
    }

    [Authorize]
    [HttpPost("CreateClass")]
    public async Task<IActionResult> CreateClass([FromBody] ClassAddDto request)
    {
        try
        {
            var response = await _repository.CreateClass(request);
            return Created(nameof(CreateClass), response);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
    
    [Authorize]
    [HttpPut("UpdateClass")]
    public async Task<IActionResult> UpdateClass(ClassUpdateDto dto)
    {
        try
        {
            var response = await _repository.UpdateClass(dto);
            return Ok(response);
        }
        catch (Exception e)
        {
            return BadRequest($"{e.Message}");
        }
    }

    [Authorize]
    [HttpDelete("DeleteClass/{id}")]
    public async Task<IActionResult> DeleteClass(int id)
    {
        try
        {
            await _repository.DeleteClass(id);
            return Ok();
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
}