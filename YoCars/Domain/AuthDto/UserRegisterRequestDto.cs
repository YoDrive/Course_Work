namespace YoCars.Domain.AuthDto;

public class UserRegisterRequestDto
{
    public string FirstName { get; set; }
    public string Surname { get; set; }
    public string Patronymic { get; set; }
    public string PhoneNumber { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }
}