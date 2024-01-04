using System.Globalization;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using YoDrive.Domain.Data.Interfaces;
using YoDrive.Domain.Other;

namespace YoDrive.Domain.Data.Repositories;

public class StatisticRepository : IStatisticRepository
{
    private readonly IMapper _mapper;
    private readonly AppDbContext _db;
    public StatisticRepository(AppDbContext db, IMapper mapper)
    {
        _db = db;
        _mapper = mapper;
    }

    public async Task<StatisticDto> GetStatistic()
    {
        var today = DateTime.UtcNow.Date;
        var lastMonthStart = DateTime.UtcNow.Date.AddMonths(-1);

        var usersCount = _db.User.Count(_ => _.CreatedAt >= today);
        var bookingsCount = _db.Rent.Count(_ => _.CreatedAt >= today);

        var monthUsersCount = _db.User.Count(_ => _.CreatedAt >= lastMonthStart);
        var monthBookingsCount = _db.Rent.Count(_ => _.CreatedAt >= lastMonthStart);

        var dayRevenue = _db.Rent
            .Where(_ => _.CreatedAt >= today)
            .Sum(_ => _.RentCost); 

        var monthRevenue = _db.Rent
            .Where(_ => _.CreatedAt >= lastMonthStart)
            .Sum(_ => _.RentCost); 
        
        List<string> labels = new List<string>();
        List<double> data = new List<double>();
        
        for (int i = 0; i < 8; i++)
        {
            DateTime startOfMonthUtc = today.AddMonths(-i).Date.AddDays(1 - today.Day);
            DateTime endOfMonthUtc = startOfMonthUtc.AddMonths(1).AddSeconds(-1);

            var monthlyRevenue = _db.Rent
                .Where(r => r.StartDate >= startOfMonthUtc && r.StartDate <= endOfMonthUtc)
                .Sum(r => r.RentCost);

            labels.Insert(0, startOfMonthUtc.ToString("MMM"));
            data.Insert(0, Convert.ToDouble(monthlyRevenue));
        }

        return new StatisticDto()
        {
            UsersModel = new UsersModel()
            {
                Value = usersCount,
                Percent = monthUsersCount == 0 ? 0 : ((double)usersCount / monthUsersCount) * 100,
            },
            BookingsModel = new BookingsModel()
            {
                Value = bookingsCount,
                Percent = monthBookingsCount == 0 ? 0 : ((double)bookingsCount / monthBookingsCount) * 100,
            },
            RevenueModel = new RevenueModel()
            {
                Value = Convert.ToDouble(dayRevenue),
                Percent = Convert.ToDouble(monthRevenue == 0 ? 0 : (dayRevenue / monthRevenue) * 100),
            },
            MonthRevenueModel = new MonthRevenueModel()
            {
                Labels = labels,
                Data = data,
            }
        };
    }
}