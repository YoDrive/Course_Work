using AutoMapper;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using YoDrive.Domain.Data;
using YoDrive.Domain.Data.Repositories;
using YoDrive.Domain.Dtos.CarBrandDto;
using YoDrive.Domain.Dtos.ModelDto;

namespace YoDrive.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CarModelController : ControllerBase
{
    private readonly AppDbContext _db;
    private readonly CarModelRepository _repository;
    private readonly IMapper _mapper;

    public CarModelController(AppDbContext db, IMapper mapper)
    {
        _db = db;
        _mapper = mapper;
        _repository = new CarModelRepository(_db, _mapper);
    }

    [HttpGet("GetAllModels")]
    public IActionResult GetModels()
    {
        var response = _repository.GetModels();
        return Ok(response);
    }

    [HttpGet("GetModel")]
    public IActionResult GetModel(int id)
    {
        try
        {
            var response = _repository.GetModelById(id);
            return Ok(response);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpPost("CreateModel")]
    public IActionResult CreateModel([FromBody] CarModelCreateDto dto)
    {
        try
        {
            var response = _repository.CreateModel(dto);
            return Created(nameof(CreateModel), response);
        }
        catch (Exception e)
        {
            return Conflict(e.Message);
        }
    }

    [HttpPut("UpdateModel")]
    public IActionResult UpdateModel([FromBody] CarModelUpdateDto dto)
    {
        try
        {
            var response = _repository.UpdateModel(dto);
            return Ok(response);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpDelete("DeleteModel")]
    public IActionResult DeleteModel(int id)
    {
        try
        {
            var response = _repository.DeleteModel(id);
            return Ok(response);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
}