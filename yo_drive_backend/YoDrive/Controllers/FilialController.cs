using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using YoDrive.Domain.Data;
using YoDrive.Domain.Data.Interfaces;
using YoDrive.Domain.Data.Repositories;
using YoDrive.Domain.Dtos.FilialDto;
using YoDrive.Domain.Models;
using KeyNotFoundException = System.Collections.Generic.KeyNotFoundException;

namespace YoDrive.Controllers;

/// <summary>
/// Филиал
/// </summary>
[ApiController]
[Route("api/[controller]")]
public class FilialController : ControllerBase
{
    private readonly AppDbContext _db;
    private readonly IFilialRepository _repository;
    private readonly IMapper _mapper;

    public FilialController(AppDbContext db, IMapper mapper, IFilialRepository repository)
    {
        _db = db;
        _mapper = mapper;
        _repository = repository;
    }

    [HttpGet("GetFilials")]
    public async Task<IActionResult> GetFilials()
    {
        try
        {
            var response = await _repository.GetAllFilials();

            return Ok(response);
        }
        catch (Exception e)
        {
            return BadRequest($"Произошла непредвиденная ошибка сервера\n{e.Message}");
        }
    }
    
    [HttpGet("GetFilialById")]
    public async Task<IActionResult> GetFilialById(int id)
    {
        try
        {
            var response = await _repository.GetFilialById(id);

            return Ok(response);
        }
        catch (KeyNotFoundException e)
        {
            return BadRequest(e.Message);
        }
        catch (Exception e)
        {
            return BadRequest($"Произошла непредвиденная ошибка сервера\n{e.Message}");
        }
    }
    
    [Authorize]
    [HttpPost("CreateFilial")]
    public async Task<IActionResult> CreateFilial(FilialAddDto dto)
    {
        try
        {
            var response = await _repository.CreateFilial(dto);
            return Created(nameof(CreateFilial), response);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
    
    [Authorize]
    [HttpPut("UpdateFilial")]
    public async Task<IActionResult> UpdateFilial(FilialUpdateDto dto)
    {
        try
        {
            var response = await _repository.UpdateFilial(dto);
            return Ok(response);
        }
        catch (Exception e)
        {
            return BadRequest($"Произошла непредвиденная ошибка сервера\n{e.Message}");
        }
    }
    
    [Authorize]
    [HttpDelete("DeleteFilial")]
    public async Task<IActionResult> DeleteFilial(int id)
    {
        try
        {
            await _repository.DeleteFilial(id);
            return Ok();
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
}