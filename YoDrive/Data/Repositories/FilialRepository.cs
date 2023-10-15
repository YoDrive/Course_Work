using AutoMapper;
using Microsoft.EntityFrameworkCore;
using YoDrive.Domain.Data.Interfaces;
using YoDrive.Domain.Dtos.FilialDto;
using YoDrive.Domain.Models;

namespace YoDrive.Domain.Data.Repositories;

public class FilialRepository : IFilialRepository
{
    private readonly IMapper _mapper;
    private readonly AppDbContext _db;

    public FilialRepository(AppDbContext db, IMapper mapper)
    {
        _mapper = mapper;
        _db = db;
    }

    public async Task<IEnumerable<FilialReadDto>> GetAllFilials()
    {
        var filials = await _mapper.ProjectTo<FilialReadDto>(_db.Filial).ToListAsync();

        return filials;
    }

    public async Task<FilialReadDto> GetFilialById(int id)
    {
        var filial = await _db.Filial.FirstOrDefaultAsync(_ => _.FilialId == id);

        if (filial == null)
            throw new KeyNotFoundException($"Филиал с id {id} не найден");

        return _mapper.Map<FilialReadDto>(filial);
    }

    public async Task<FilialReadDto> CreateFilial(FilialCreateDto dto)
    {
        var f = _db.Filial.FirstOrDefault(_ => _.Address.ToLower() == dto.Address.ToLower());
        if (f != null)
            throw new Exception($"Филиал с адресом {f.Address} уже существует");
        
        var filial = _mapper.Map<Filial>(dto);
        
        if (filial == null)
            throw new ArgumentException();

        _db.Filial.Add(filial);
        _db.SaveChanges();

        return _mapper.Map<FilialReadDto>(filial);
    }

    public async Task<FilialReadDto> UpdateFilial(FilialUpdateDto dto)
    {
        var filial = _db.Filial.FirstOrDefault(_ => _.FilialId == dto.FilialId);

        filial.Address = dto.Address;
        filial.PhoneNumber = dto.PhoneNumber;

        _db.Filial.Update(filial);
        _db.SaveChanges();
        
        return _mapper.Map<FilialReadDto>(filial);
    }

    public void DeleteFilial(int id)
    {
        var filial = _db.Filial.FirstOrDefault(_ => _.FilialId == id);

        if (filial == null)
            throw new KeyNotFoundException();

        _db.Filial.Remove(filial);
        _db.SaveChanges();
    }
}