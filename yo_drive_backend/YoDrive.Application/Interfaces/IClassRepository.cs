using System.Collections.Generic;
using System.Threading.Tasks;
using YoDrive.Application.Dtos.CarClassDto;

namespace YoDrive.Application.Interfaces;

public interface ICarClassRepository
{
    Task<IEnumerable<ClassReadDto>> GetClasses();
    Task<ClassReadDto> GetClassById(int id);
    Task<ClassReadDto> CreateClass(ClassAddDto dto);
    Task<ClassReadDto> UpdateClass(ClassUpdateDto dto);
    Task<bool> DeleteClass(int id);
}