using AutoMapper;
using YoDrive.Application.AuthDto;
using YoDrive.Application.Dtos;
using YoDrive.Application.Dtos.AuthDto;
using YoDrive.Application.Dtos.CarBrandDto;
using YoDrive.Application.Dtos.CarClassDto;
using YoDrive.Application.Dtos.CarDto;
using YoDrive.Application.Dtos.FeedbackDto;
using YoDrive.Application.Dtos.FilialDto;
using YoDrive.Application.Dtos.ModelDto;
using YoDrive.Application.Dtos.RentDto;
using YoDrive.Application.Dtos.UserDto;
using YoDrive.Domain.Entities;
using YoDrive.Infrastructure.ExtentionsAndHelpers;

namespace YoDrive.Infrastructure.Data.Profiles;

public class MapProfile : Profile
{
    public MapProfile()
    {
        #region Auth

        CreateMap<User, UserReadDto>()
            .ForMember(dest => dest.UserId, opt => opt.MapFrom(src => src.Id));
        CreateMap<UserLoginRequestDto, User>();
        CreateMap<UserReadDto, UserLoginRequestDto>();
        
        #endregion

        #region CarBrand

        CreateMap<CarBrand, CarBrandUpdateDto>()
            .ForMember(dest => dest.CarBrandId, opt => opt.MapFrom(src => src.Id))
            .ReverseMap();
        CreateMap<CarBrandAddDto, CarBrand>().ReverseMap();
        CreateMap<CarBrand, CarBrandReadDto>()
            .ForMember(dest => dest.CarBrandId, opt => opt.MapFrom(src => src.Id))
            .ReverseMap();
        CreateMap<CarBrandAddDto, CarBrandReadDto>().ReverseMap();

        #endregion

        #region CarClass

        CreateMap<CarClass, ClassUpdateDto>()
            .ForMember(dest => dest.CarClassId, opt => opt.MapFrom(src => src.Id))
            .ReverseMap();
        CreateMap<ClassAddDto, CarClass>().ReverseMap();
        CreateMap<CarClass, ClassReadDto>()
            .ForMember(dest => dest.CarClassId, opt => opt.MapFrom(src => src.Id))
            .ReverseMap();
        CreateMap<ClassAddDto, ClassReadDto>().ReverseMap();

        #endregion

        #region Car

        CreateMap<Car, CarUpdateDto>()
            .ForMember(dest => dest.CarId, opt => opt.MapFrom(src => src.Id))
            .ReverseMap();
        CreateMap<CarAddDto, Car>()
            .ReverseMap();
        CreateMap<Car, CarReadDto>()
            .ForMember(dest => dest.CarId, opt => opt.MapFrom(src => src.Id))
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

        CreateMap<Feedback, FeedbackUpdateDto>()
            .ForMember(dest => dest.FeedbackId, opt => opt.MapFrom(src => src.Id))
            .ReverseMap();
        CreateMap<FeedbackAddDto, Feedback>().ReverseMap();
        CreateMap<Feedback, FeedbackReadDto>()
            .ForMember(dest => dest.FeedbackId, opt => opt.MapFrom(src => src.Id))
            .ForMember(_ => _.UserName, n => n.MapFrom(_ => $"{_.Rent.User.FirstName} {_.Rent.User.Surname[0]}."))
            .ForMember(_ => _.FeedbackDate, n => n.MapFrom(_ => _.CreatedAt))
            .ReverseMap();
        CreateMap<FeedbackAddDto, FeedbackReadDto>()
            .ReverseMap();

        #endregion

        #region Filial

        CreateMap<Filial, FilialUpdateDto>()
            .ForMember(dest => dest.FilialId, opt => opt.MapFrom(src => src.Id))
            .ReverseMap();
        CreateMap<FilialAddDto, Filial>().ReverseMap();
        CreateMap<Filial, FilialReadDto>()
            .ForMember(dest => dest.FilialId, opt => opt.MapFrom(src => src.Id))
            .ReverseMap();
        CreateMap<FilialAddDto, FilialReadDto>().ReverseMap();

        #endregion

        #region CarModel

        CreateMap<CarModelReadDto, CarModel>()
            .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.CarModelId))
            .ReverseMap();
        CreateMap<CarModel, CarModelAddDto>();
        CreateMap<CarModelUpdateDto, CarModel>()
            .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.CarModelId));
        CreateMap<CarModelAddDto, CarModel>();
        CreateMap<CarModel, CarModelReadDto>()
            .ForMember(dest => dest.CarModelId, opt => opt.MapFrom(src => src.Id));

        #endregion

        #region Rent

        CreateMap<Rent, RentUpdateDto>()
            .ForMember(dest => dest.RentId, opt => opt.MapFrom(src => src.Id))
            .ReverseMap();
        CreateMap<RentAddDto, Rent>().ReverseMap();
        CreateMap<Rent, RentReadDto>()
            .ForMember(dest => dest.RentId, opt => opt.MapFrom(src => src.Id))
            .ReverseMap();
        CreateMap<RentAddDto, RentReadDto>().ReverseMap();

        #endregion

        #region User

        CreateMap<User, UserReadDto>()
            .ForMember(dest => dest.UserId, opt => opt.MapFrom(src => src.Id))
            .ForMember(dest => dest.FirstName, opt => opt.MapFrom(src => src.FirstName))
            .ForMember(dest => dest.Surname, opt => opt.MapFrom(src => src.Surname))
            .ForMember(dest => dest.Patronymic, opt => opt.MapFrom(src => src.Patronymic))
            .ForMember(dest => dest.PhoneNumber, opt => opt.MapFrom(src => src.PhoneNumber))
            .ForMember(dest => dest.Email, opt => opt.MapFrom(src => src.Email))
            .ForMember(dest => dest.UserImage, opt => opt.MapFrom(src => src.UserImage))
            .ForMember(dest => dest.Image, opt => opt.MapFrom(src => ImageHelper.GetImage(src.UserImage, "Users")))
            .ReverseMap();

        CreateMap<User, UserUpdateInfoDto>()
            .ForMember(dest => dest.UserId, opt => opt.MapFrom(src => src.Id))
            .ReverseMap();
        
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