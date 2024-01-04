using AutoMapper;
using YoDrive.Domain.AuthDto;
using YoDrive.Domain.Dtos;
using YoDrive.Domain.Dtos.CarBrandDto;
using YoDrive.Domain.Dtos.CarClassDto;
using YoDrive.Domain.Dtos.CarDto;
using YoDrive.Domain.Dtos.FeedbackDto;
using YoDrive.Domain.Dtos.FilialDto;
using YoDrive.Domain.Dtos.ModelDto;
using YoDrive.Domain.Dtos.RentDto;
using YoDrive.Domain.Dtos.UserDto;
using YoDrive.Domain.Models;
using YoDrive.Helpers;

namespace YoDrive.Profiles;

public class MapProfile : Profile
{
    public MapProfile()
    {
        #region Auth

        CreateMap<User, UserReadDto>();
        CreateMap<UserLoginRequestDto, User>();
        CreateMap<UserReadDto, UserLoginRequestDto>();
        
        #endregion

        #region CarBrand

        CreateMap<CarBrand, CarBrandUpdateDto>().ReverseMap();
        CreateMap<CarBrandAddDto, CarBrand>().ReverseMap();
        CreateMap<CarBrand, CarBrandReadDto>().ReverseMap();
        CreateMap<CarBrandAddDto, CarBrandReadDto>().ReverseMap();

        #endregion

        #region CarClass

        CreateMap<CarClass, ClassUpdateDto>().ReverseMap();
        CreateMap<ClassAddDto, CarClass>().ReverseMap();
        CreateMap<CarClass, ClassReadDto>().ReverseMap();
        CreateMap<ClassAddDto, ClassReadDto>().ReverseMap();

        #endregion

        #region Car

        CreateMap<Car, CarUpdateDto>().ReverseMap();
        CreateMap<CarAddDto, Car>()
            .ReverseMap();
        CreateMap<Car, CarReadDto>()
            .ForMember(dest => dest.Image, opt => opt.MapFrom(src => ImageHelper.GetImage(src.CarImage, "Cars")))
            .ForMember(dest => dest.Rating, opt => opt.MapFrom(src => CalculateRating(src.Rents)))
            .ForMember(dest => dest.FeedbackCount, opt => opt.MapFrom(src => src.Rents.Where(_ => _.Feedback != null && _.Feedback.IsDeleted == false).Count()))
            .ReverseMap();
        CreateMap<CarAddDto, CarReadDto>().ReverseMap();
        CreateMap<Car, CarMinDto>()
            .ForMember(dest => dest.Image, opt => opt.MapFrom(src => ImageHelper.GetImage(src.CarImage, "Cars")))
            .ForMember(dest => dest.Name, opt => opt.MapFrom(src => $"{src.CarModel.CarBrand.Name} {src.CarModel.ModelName}"));

        #endregion

        #region Feedback

        CreateMap<Feedback, FeedbackUpdateDto>().ReverseMap();
        CreateMap<FeedbackAddDto, Feedback>().ReverseMap();
        CreateMap<Feedback, FeedbackReadDto>()
            .ForMember(_ => _.UserName, n => n.MapFrom(_ => $"{_.Rent.User.FirstName} {_.Rent.User.Surname[0]}."))
            .ReverseMap();
        CreateMap<FeedbackAddDto, FeedbackReadDto>().ReverseMap();

        #endregion

        #region Filial

        CreateMap<Filial, FilialUpdateDto>().ReverseMap();
        CreateMap<FilialAddDto, Filial>().ReverseMap();
        CreateMap<Filial, FilialReadDto>().ReverseMap();
        CreateMap<FilialAddDto, FilialReadDto>().ReverseMap();

        #endregion

        #region CarModel

        CreateMap<CarModelReadDto, CarModel>().ReverseMap();
        CreateMap<CarModel, CarModelAddDto>();
        CreateMap<CarModelUpdateDto, CarModel>();
        CreateMap<CarModelAddDto, CarModel>();
        CreateMap<CarModel, CarModelReadDto>()
            .ForMember(dest => dest.CarBrand, opt => opt.MapFrom(src => src.CarBrand));

        #endregion

        #region Rent

        CreateMap<Rent, RentUpdateDto>().ReverseMap();
        CreateMap<RentAddDto, Rent>().ReverseMap();
        CreateMap<Rent, RentReadDto>().ReverseMap();
        CreateMap<RentAddDto, RentReadDto>().ReverseMap();

        #endregion

        #region User

        CreateMap<User, UserReadDto>()
            .ForMember(dest => dest.FirstName, opt => opt.MapFrom(src => src.FirstName))
            .ForMember(dest => dest.Surname, opt => opt.MapFrom(src => src.Surname))
            .ForMember(dest => dest.Patronymic, opt => opt.MapFrom(src => src.Patronymic))
            .ForMember(dest => dest.PhoneNumber, opt => opt.MapFrom(src => src.PhoneNumber))
            .ForMember(dest => dest.Email, opt => opt.MapFrom(src => src.Email))
            .ForMember(dest => dest.UserImage, opt => opt.MapFrom(src => src.UserImage))
            .ForMember(dest => dest.Image, opt => opt.MapFrom(src => ImageHelper.GetImage(src.UserImage, "Users")))
            .ReverseMap();

        CreateMap<User, UserUpdateInfoDto>().ReverseMap();
        
        CreateMap<User, UserAuthDto>()
            .ReverseMap();
        
        CreateMap<User, UserRentDto>()
            .ForMember(dest => dest.FirstName, opt => opt.MapFrom(src => src.FirstName))
            .ForMember(dest => dest.Surname, opt => opt.MapFrom(src => src.Surname))
            .ForMember(dest => dest.Patronymic, opt => opt.MapFrom(src => src.Patronymic))
            .ForMember(dest => dest.PhoneNumber, opt => opt.MapFrom(src => src.PhoneNumber))
            .ForMember(dest => dest.Email, opt => opt.MapFrom(src => src.Email))
            .ReverseMap();
        
        CreateMap<Role, RoleDto>();

        #endregion
    }
    
    private static double CalculateRating(ICollection<Rent>? rents)
    {
        if (rents == null || rents.Count == 0)
            return 0;

        double totalStars = 0;
        int feedbackCount = 0;

        foreach (var rent in rents)
        {
            if (rent.Feedback != null)
            {
                feedbackCount++;
                totalStars += rent.Feedback.Stars;
            }
        }

        if (feedbackCount == 0) return 0;
        
        return totalStars / feedbackCount;
    }
}