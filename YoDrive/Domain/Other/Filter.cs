using System.ComponentModel.DataAnnotations.Schema;
using YoDrive.Domain.Enums;

namespace YoDrive.Domain.Other;

public class Filter
{
    public DateTime? StartDate { get; set; }
    public DateTime? EndDate { get; set; }
    public decimal? MinCostDay { get; set; }
    public decimal? MaxCostDay { get; set; }
    public int[]? FilialId { get; set; }
    public int[]? ClassId { get; set; }
    public int[]? CarBrandId { get; set; }
    public int[]? ModelId { get; set; }
    public GearBox? GearBox { get; set; } 
}