using AutoMapper;
using YoDrive.Domain.Data.Interfaces;
using YoDrive.Domain.Dtos.ModelDto;

namespace YoDrive.Domain.Data.Repositories;

public class CarModelRepository : ICarModelRepository
{
    private readonly IMapper _mapper;
    private readonly AppDbContext _db;

    public CarModelRepository(AppDbContext db, IMapper mapper)
    {
        _db = db;
        _mapper = mapper;
    }

    public IEnumerable<CarModelReadDto> GetModels()
    {
        throw new NotImplementedException();
    }

    public CarModelReadDto GetModelById(int id)
    {
        throw new NotImplementedException();
    }

    public Task<CarModelReadDto> CreateModel(CarModelCreateDto dto)
    {
        throw new NotImplementedException();
    }

    public Task<CarModelReadDto> UpdateCarBrand(CarModelUpdateDto dto)
    {
        throw new NotImplementedException();
    }

    public Task<bool> DeleteCarBrand(int id)
    {
        throw new NotImplementedException();
    }
}