using YoDrive.Domain.Data.Interfaces;
using YoDrive.Domain.Data.Repositories;

namespace YoDrive.ExtentionsAndHelpers;

public static class RepositoryExtention
{
    public static IServiceCollection AddRepositories(this IServiceCollection services)
    {
        services.AddScoped<ICarRepository, CarRepository>();
        services.AddScoped<ICarModelRepository, CarModelRepository>();
        services.AddScoped<IFeedbackRepository, FeedbackRepository>();
        services.AddScoped<ICarBrandRepository, CarBrandRepository>();
        services.AddScoped<ICarClassRepository, CarClassRepository>();
        services.AddScoped<IFilialRepository, FilialRepository>();
        services.AddScoped<IRentRepository, RentRepository>();
        services.AddScoped<IStatisticRepository, StatisticRepository>();
        services.AddScoped<IUserRepository, UserRepository>();
        services.AddScoped<IAuthRepository, AuthRepository>();

        return services;
    }
}