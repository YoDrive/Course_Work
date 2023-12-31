using YoDrive.Domain.Dtos.FilialDto;

namespace YoDrive.Domain.Data.Interfaces;

public interface IFilialRepository
{
    Task<IEnumerable<FilialReadDto>> GetAllFilials();
    Task<FilialReadDto> GetFilialById(int id);
    Task<FilialReadDto> CreateFilial(FilialAddDto dto);
    Task<FilialReadDto> UpdateFilial(FilialUpdateDto dto);
    Task<bool> DeleteFilial(int id);
}