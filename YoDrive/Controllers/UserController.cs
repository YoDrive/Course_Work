using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using YoDrive.Domain.Data;
using YoDrive.Domain.Data.Interfaces;
using YoDrive.Domain.Data.Repositories;
using YoDrive.Domain.Dtos.UserDto;

namespace YoDrive.Controllers;

[ApiController]
[Route("api/[Controller]")]
public class UserController : ControllerBase
{
    private readonly AppDbContext _db;
    private readonly IUserRepository _repository;
    private readonly IMapper _mapper;

    public UserController(AppDbContext db, IMapper mapper)
    {
        _db = db;
        _mapper = mapper;
        _repository = new UserRepository(_db, _mapper);
    }

    [Authorize]
    [HttpPut("UpdateUserPhoto/{id}")]
    public async Task<IActionResult> UpdateUserPhoto(int id, [FromForm] IFormFile file)
    {
        try
        {
            var response = await _repository.UpdateUserPhoto(id, file);
            return Ok(response);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
    
    [Authorize]
    [HttpGet("GetUserInfo/{id}")]
    public async Task<IActionResult> GetUserInfo(int id)
    {
        try
        {
            var response = await _repository.GetById(id);
            return Ok(response);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [Authorize]
    [HttpPut("UpdateUserInfo")]
    public async Task<IActionResult> UpdateUserInfo(UserUpdateInfoDto dto)
    {
        try
        {
            var response = await _repository.UpdateUserInfo(dto);
            return Ok(response);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [Authorize]
    [HttpDelete("DeleteUser/{id}")]
    public async Task<IActionResult> DeleteUser(int id)
    {
        try
        {
            var respose = await _repository.DeleteUser(id);
            return Ok(respose);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
}