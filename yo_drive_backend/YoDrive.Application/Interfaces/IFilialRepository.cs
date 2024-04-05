using System.Collections.Generic;
using System.Threading.Tasks;
using YoDrive.Application.Dtos.FilialDto;

namespace YoDrive.Application.Interfaces;

public interface IFilialRepository
{
    Task<IEnumerable<FilialReadDto>> GetAllFilials();
    Task<FilialReadDto> GetFilialById(int id);
    Task<FilialReadDto> CreateFilial(FilialAddDto dto);
    Task<FilialReadDto> UpdateFilial(FilialUpdateDto dto);
    Task<bool> DeleteFilial(int id);
}