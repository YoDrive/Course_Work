using YoDrive.Domain.Models;

namespace YoDrive.Domain.Dtos.CarClassDto;

public class ClassReadDto
{
    public int CarClassId { get; set; }
    public string ClassName { get; set; }
    public bool IsDeleted { get; set; }
}