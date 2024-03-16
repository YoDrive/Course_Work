using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using YoDrive.Domain.Data;
using YoDrive.Domain.Data.Interfaces;
using YoDrive.Domain.Data.Repositories;
using YoDrive.Domain.Dtos.CarBrandDto;
using YoDrive.Domain.Models;

namespace YoDrive.Controllers;

/// <summary>
/// Марка автомобиля
/// </summary>
[ApiController]
[Route("api/[controller]")]
public class CarBrandController : ControllerBase
{
    private readonly AppDbContext _db;
    private readonly ICarBrandRepository _repository;
    private readonly IMapper _mapper;

    public CarBrandController(AppDbContext db, IMapper mapper, ICarBrandRepository repository)
    {
        _db = db;
        _mapper = mapper;
        _repository = repository;
    }

    /// <summary>
    /// Получение всех марок
    /// </summary>
    /// <returns></returns>
    [HttpGet("GetBrands")]
    public async Task<IActionResult> GetBrands()
    {
        try
        {
            var response = await _repository.GetAllCarBrands();

            return Ok(response);
        }
        catch (Exception e)
        {
            return BadRequest($"{e.Message}");
        }
    }

    /// <summary>
    /// Получение марки по id
    /// </summary>
    /// <param name="id"></param>
    /// <returns></returns>
    [HttpGet("GetBrandById")]
    public async Task<IActionResult> GetBrandById(int id)
    {
        try
        {
            var response = await _repository.GetCarBrandById(id);

            return Ok(_mapper.Map<CarBrand>(response));
        }
        catch (ArgumentException e)
        {
            return BadRequest("Марка автомобиля с таким id не найден");
        }
        catch (Exception e)
        {
            return BadRequest($"{e.Message}");
        }
    }

    [Authorize]
    [HttpPost("CreateBrand")]
    public async Task<IActionResult> CreateBrand([FromBody] CarBrandAddDto request)
    {
        try
        {
            var response = await _repository.CreateCarBrand(request);
            return Created(nameof(CreateBrand), response);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
    
    [Authorize]
    [HttpPut("UpdateBrand")]
    public async Task<IActionResult> UpdateBrand(CarBrandUpdateDto dto)
    {
        try
        {
            var response = await _repository.UpdateCarBrand(dto);
            return Ok(response);
        }
        catch (Exception e)
        {
            return BadRequest($"{e.Message}");
        }
    }

    [Authorize]
    [HttpDelete("DeleteBrand")]
    public async Task<IActionResult> DeleteBrand(int id)
    {
        try
        {
            await _repository.DeleteCarBrand(id);
            return Ok();
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
}