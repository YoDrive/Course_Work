using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using YoDrive.Domain.Data;
using YoDrive.Domain.Data.Repositories;
using YoDrive.Domain.Dtos.FeedbackDto;

namespace YoDrive.Controllers;

/// <summary>
/// Отзыв
/// </summary>
[ApiController]
[Route("api/[controller]")]
public class FeedbackController : ControllerBase
{
    private readonly AppDbContext _db;
    private readonly FeedbackRepository _repository;
    private readonly IMapper _mapper;
    
    public FeedbackController(AppDbContext db, IMapper mapper)
    {
        _db = db;
        _mapper = mapper;
        _repository = new FeedbackRepository(_db, _mapper);
    }

    [HttpGet("GetAllFeedbacks")]
    public async Task<IActionResult> GetAllFeedbacks()
    {
        try
        {
            var response = await _repository.GetAllFeedbacks();
            return Ok(response);
        }
        catch (Exception e)
        {
            return BadRequest($"Произошла непредвиденная ошибка сервера\n{e.Message}");
        }
    }

    [HttpGet("GetCarFeedbacks")]
    public async Task<IActionResult> GetCarFeedbacks(int idCar)
    {
        try
        {
            var response = await _repository.GetAllCarFeedback(idCar);
            return Ok(response);
        }
        catch (Exception e)
        {
            return BadRequest($"Произошла непредвиденная ошибка сервера\n{e.Message}");
        }
    }

    [HttpGet("GetUserFeedback")]
    public async Task<IActionResult> GetUserFeedback(int idUser)
    {
        try
        {
            var response = await _repository.GetAllUserFeedbacks(idUser);
            return Ok(response);
        }
        catch (Exception e)
        {
            return BadRequest($"Произошла непредвиденная ошибка сервера\n{e.Message}");
        }
    }

    [HttpGet("GetFeedbackById")]
    public async Task<IActionResult> GetFeedbackById(int id)
    {
        try
        {
            var response = await _repository.GetFeedbackById(id);
            return Ok(response);
        }
        catch (Exception e)
        {
            return BadRequest($"Произошла непредвиденная ошибка сервера\n{e.Message}");
        }
    }

    [HttpPost("CreateFeedback")]
    public async Task<IActionResult> CreateFeedback(FeedbackCreateDto dto)
    {
        try
        {
            var response = await _repository.CreateFeedback(dto);
            return CreatedAtRoute(nameof(response), new {Id = response.FeedbackId}, response);
        }
        catch (Exception e)
        {
            return BadRequest($"Произошла непредвиденная ошибка сервера\n{e.Message}");
        }
    }

    [HttpPut("UpdateFeedback")]
    public async Task<IActionResult> UpdateFeedback(FeedbackUpdateDto dto)
    {
        try
        {
            var response = _repository.UpdateFeedback(dto);
            return Ok(response);
        }
        catch (Exception e)
        {
            return BadRequest($"Произошла непредвиденная ошибка сервера\n{e.Message}");
        }
    }

    [HttpDelete("DeleteFeedback")]
    public async Task<IActionResult> DeleteFeedback(int id)
    {
        try
        {
            _repository.DeleteFeedback(id);
            return Ok();
        }
        catch (Exception e)
        {
            return BadRequest($"Произошла непредвиденная ошибка сервера\n{e.Message}");
        }
    }
}