using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace YoDrive.Domain.Models;

public class Feedback
{
    [Key]
    [Required]
    public int FeedbackId { get; set; }
    [ForeignKey(nameof(RentId))]
    public int RentId { get; set; }
    [Required]
    public Rent Rent { get; set; }
    [ForeignKey(nameof(CarId))] 
    public int CarId { get; set; }
    [Required]
    public Car Car { get; set; }
    [Required]
    public string Response { get; set; }
    [Required]
    public Byte Stars { get; set; }
    [Required]
    public DateTime FeedbackDate { get; set; }
}