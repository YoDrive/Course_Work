using YoDrive.Domain.Other;

namespace YoDrive.Domain.Data.Interfaces;

public interface IStatisticRepository
{
       Task<StatisticDto> GetStatistic();
}