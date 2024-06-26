using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace YoDrive.Domain.Entities;

public class Rent : BaseEntity
{
    [ForeignKey(nameof(UserId))]
    public int UserId { get; set; }
    [Required]
    public User User { get; set; }
    [ForeignKey(nameof(CarId))]
    public int CarId { get; set; }
    [Required]
    public Car Car { get; set; }
    [Required]
    public DateTime StartDate {get; set; }
    [Required]
    public DateTime EndDate {get; set; }
    [Required]
    [Column(TypeName="money")]
    public decimal RentCost { get; set; }
    public Feedback? Feedback { get; set; }
}