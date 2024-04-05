using System.Threading.Tasks;
using YoDrive.Application.Dtos.CarDto;

namespace YoDrive.Application.Interfaces;

public interface IStatisticRepository
{
       Task<StatisticDto> GetStatistic();
}