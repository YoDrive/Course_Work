FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ["yo_drive_backend/YoDrive.API/YoDrive.API.csproj", "yo_drive_backend/YoDrive.API/"]
RUN dotnet restore "yo_drive_backend/YoDrive.API/YoDrive.API.csproj"
COPY . .
WORKDIR "/src/yo_drive_backend/YoDrive.API"
RUN dotnet build "YoDrive.API.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "YoDrive.API.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "YoDrive.API.dll"]
