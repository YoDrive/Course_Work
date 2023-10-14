using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using YoDrive.Domain.Data;
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
    private readonly CarBrandRepository _repository;
    private readonly IMapper _mapper;

    public CarBrandController(AppDbContext db, IMapper mapper)
    {
        _db = db;
        _mapper = mapper;
        _repository = new CarBrandRepository(_db, _mapper);
    }

    /// <summary>
    /// Получение всех марок
    /// </summary>
    /// <returns></returns>
    [HttpGet("GetBrands"), Authorize(Roles = "Admin")]
    public async Task<IActionResult> GetBrands()
    {
        try
        {
            var response = await _repository.GetAllCarBrands();

            return Ok(response);
        }
        catch (Exception e)
        {
            return BadRequest($"Произошла непредвиденная ошибка сервера\n{e.Message}");
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
            return BadRequest($"Произошла непредвиденная ошибка сервера\n{e.Message}");
        }
    }

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
}