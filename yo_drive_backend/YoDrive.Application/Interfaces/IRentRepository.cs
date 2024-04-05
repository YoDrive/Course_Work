using System.Collections.Generic;
using System.Threading.Tasks;
using YoDrive.Application.Dtos.RentDto;

namespace YoDrive.Application.Interfaces;

public interface IRentRepository
{
    Task<IEnumerable<RentReadDto>> GetRents();
    Task<IEnumerable<RentReadDto>> GetCarRents(int carId);
    Task<IEnumerable<RentReadDto>> GetUserRents(int userId);
    Task<RentReadDto> GetRent(int rentId);
    Task<RentReadDto> CreateRent(RentAddDto dto);
    Task<RentReadDto> UpdateRent(RentUpdateDto dto);
    Task<bool> DeleteRent(int rentId);
}