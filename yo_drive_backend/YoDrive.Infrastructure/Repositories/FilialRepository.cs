using System.Data;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using YoDrive.Application.Dtos.FilialDto;
using YoDrive.Application.Interfaces;
using YoDrive.Domain.Entities;
using YoDrive.Infrastructure.Data;

namespace YoDrive.Infrastructure.Repositories;

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
        var filial = await _db.Filial.FirstOrDefaultAsync(_ => _.Id == id);

        if (filial == null)
            throw new Exception($"Филиал с id {id} не найден");

        return _mapper.Map<FilialReadDto>(filial);
    }

    public async Task<FilialReadDto> CreateFilial(FilialAddDto dto)
    {
        var entity = _db.Filial.FirstOrDefault(_ => _.Address.ToLower() == dto.Address.ToLower());
        
        if (entity != null)
        {
            if (entity.IsDeleted)
            {
                entity.UpdatedAt = DateTime.UtcNow;
                entity.CreatedAt = DateTime.UtcNow;
                entity.IsDeleted = false;
                entity.Address = dto.Address;
                _db.Filial.Update(entity);
                await _db.SaveChangesAsync();
                return _mapper.Map<FilialReadDto>(entity);
            }

            throw new DuplicateNameException($"Филиал с адресом {entity.Address} уже существует");
        }
        
        var filial = _mapper.Map<Filial>(dto);
        filial.IsDeleted = false;
    
        _db.Filial.Add(filial);
        await _db.SaveChangesAsync();

        return _mapper.Map<FilialReadDto>(filial);
    }

    public async Task<FilialReadDto> UpdateFilial(FilialUpdateDto dto)
    {
        var filial = _db.Filial.FirstOrDefault(_ => _.Id == dto.FilialId);

        if (filial == null)
            throw new KeyNotFoundException();
        
        if (_db.Filial.FirstOrDefault(_ => _.Address.ToLower() == dto.Address.ToLower()
                                           && _.Id != dto.FilialId) != null)
        {
            throw new Exception($"Филиал с адресом '{dto.Address}' уже существует");   
        }
        
        filial.Address = dto.Address;
        filial.PhoneNumber = dto.PhoneNumber;
        filial.UpdatedAt = DateTime.UtcNow;

        _db.Filial.Update(filial);
        await _db.SaveChangesAsync();
        
        return _mapper.Map<FilialReadDto>(filial);
    }

    public async Task<bool> DeleteFilial(int id)
    {
        var filial = _db.Filial.FirstOrDefault(_ => _.Id == id);

        if (filial == null)
            throw new KeyNotFoundException($"Филиал с Id {id} не найден");

        var count = _db.Car.Where(_ => _.FilialId == id).ToList().Count();
        if (count > 0)
            throw new Exception($"Невозможно удалить {filial.Address}, имеются активные связи с автомобилями, в количестве: {count}");

        filial.UpdatedAt = DateTime.UtcNow;
        filial.IsDeleted = true;
        _db.Filial.Update(filial);
        
        return await _db.SaveChangesAsync() > 0;
    }
}