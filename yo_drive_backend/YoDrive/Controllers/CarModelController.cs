using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using YoDrive.Domain.Data;
using YoDrive.Domain.Data.Interfaces;
using YoDrive.Domain.Data.Repositories;
using YoDrive.Domain.Dtos.CarBrandDto;
using YoDrive.Domain.Dtos.ModelDto;

namespace YoDrive.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CarModelController : ControllerBase
{
    private readonly AppDbContext _db;
    private readonly ICarModelRepository _repository;
    private readonly IMapper _mapper;

    public CarModelController(AppDbContext db, IMapper mapper, ICarModelRepository repository)
    {
        _db = db;
        _mapper = mapper;
        _repository = repository;
    }

    [HttpGet("GetAllModels")]
    public async Task<IActionResult> GetModels()
    {
        var response = await _repository.GetModels();
        return Ok(response);
    }

    [HttpGet("GetModel")]
    public async Task<IActionResult> GetModel(int id)
    {
        try
        {
            var response = await _repository.GetModelById(id);
            return Ok(response);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [Authorize]
    [HttpPost("CreateModel")]
    public async Task<IActionResult> CreateModel([FromBody] CarModelAddDto dto)
    {
        try
        {
            var response = await _repository.CreateModel(dto);
            return Created(nameof(CreateModel), response);
        }
        catch (Exception e)
        {
            return Conflict(e.Message);
        }
    }

    [Authorize]
    [HttpPut("UpdateModel")]
    public async Task<IActionResult> UpdateModel([FromBody] CarModelUpdateDto dto)
    {
        try
        {
            var response = await _repository.UpdateModel(dto);
            return Ok(response);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [Authorize]
    [HttpDelete("DeleteModel")]
    public async Task<IActionResult> DeleteModel(int id)
    {
        try
        {
            var response = await _repository.DeleteModel(id);
            return Ok(response);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
}