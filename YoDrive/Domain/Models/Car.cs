using System.Collections;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using YoDrive.Domain.Enums;

namespace YoDrive.Domain.Models;

public class Car
{
    [Key]
    [Required]
    public int CarId { get; set; }
    [ForeignKey(nameof(CarModel))]
    public int ModelId { get; set; }
    [Required]
    public CarModel CarModel { get; set; }
    [ForeignKey(nameof(CarClass))]
    public int ClassId { get; set; }
    [Required]
    public CarClass CarClass { get; set; }
    [ForeignKey(nameof(Filial))]
    public int FilialId { get; set; }
    [Required]
    public Filial Filial { get; set; }
    [Required]
    [MaxLength(12)]
    public string StateNumber { get; set; }
    [Required]
    [Column(TypeName="smallint")]
    public GearBox GearBox { get; set; }
    [Required]
    [Column(TypeName="smallint")]
    public Engine Engine { get; set; }
    [Required]
    [Column(TypeName="money")]
    public decimal CostDay { get; set; }
    [MaxLength(255)]
    public string? CarImage { get; set; }

    [InverseProperty("Car")]
    public ICollection<Rent>? Rents { get; set; }
}