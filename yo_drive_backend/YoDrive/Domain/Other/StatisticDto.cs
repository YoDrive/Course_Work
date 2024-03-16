namespace YoDrive.Domain.Other;

public class StatisticDto
{
    public UsersModel UsersModel { get; set; }
    public BookingsModel BookingsModel { get; set; }
    public RevenueModel RevenueModel { get; set; }
    public MonthRevenueModel MonthRevenueModel { get; set; }
}

public class UsersModel
{
    public int Value { get; set; }
    public double Percent { get; set; }
}

public class BookingsModel
{
    public int Value { get; set; }
    public double Percent { get; set; }
}

public class RevenueModel
{
    public double Value { get; set; }
    public double Percent { get; set; }
}

public class MonthRevenueModel
{
    public List<string> Labels { get; set; }
    public List<double> Data { get; set; }
}