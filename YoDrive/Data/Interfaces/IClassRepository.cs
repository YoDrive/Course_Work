using YoDrive.Domain.Dtos.CarClassDto;

namespace YoDrive.Domain.Data.Interfaces;

public interface ICarClassRepository
{
    Task<IEnumerable<ClassReadDto>> GetClasses();
    Task<ClassReadDto> GetClassById(int id);
    Task<ClassReadDto> CreateClass(ClassAddDto dto);
    Task<ClassReadDto> UpdateClass(ClassUpdateDto dto);
    Task<bool> DeleteClass(int id);
}