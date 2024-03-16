using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace YoDrive.Domain.Models;

public class Feedback : BaseEntity
{
    [ForeignKey(nameof(RentId))]
    public int RentId { get; set; }
    [Required]
    public Rent Rent { get; set; }
    [Required]
    public string Response { get; set; }
    [Required]
    public Byte Stars { get; set; }
}