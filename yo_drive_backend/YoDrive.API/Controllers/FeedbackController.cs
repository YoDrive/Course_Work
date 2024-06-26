using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using YoDrive.Application.Dtos.FeedbackDto;
using YoDrive.Application.Interfaces;
using YoDrive.Infrastructure.Data;

namespace YoDrive.API.Controllers;

/// <summary>
/// Отзыв
/// </summary>
[ApiController]
[Route("api/[controller]")]
public class FeedbackController : ControllerBase
{
    private readonly AppDbContext _db;
    private readonly IFeedbackRepository _repository;
    private readonly IMapper _mapper;
    
    public FeedbackController(AppDbContext db, IMapper mapper, IFeedbackRepository repository)
    {
        _db = db;
        _mapper = mapper;
        _repository = repository;
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

    [HttpGet("GetCarFeedbacks/{idCar}")]
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

    [Authorize]

    [HttpPost("CreateFeedback")]

    public async Task<IActionResult> CreateFeedback(FeedbackAddDto dto)
    {
        try
        {
            var response = await _repository.CreateFeedback(dto);
            return CreatedAtRoute(nameof(CreateFeedback), new { Id = response.FeedbackId }, response);
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
            var response = await _repository.UpdateFeedback(dto);
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
            await _repository.DeleteFeedback(id);
            return Ok();
        }
        catch (Exception e)
        {
            return BadRequest($"Произошла непредвиденная ошибка сервера\n{e.Message}");
        }
    }
}