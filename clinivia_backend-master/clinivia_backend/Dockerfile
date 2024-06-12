#1-/
# Utiliser l'image de base .NET 8.0 pour exécuter l'application
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 8080




#2-/
# Utiliser l'image de base .NET SDK pour construire l'application
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copier uniquement les fichiers csproj et restaurer les dépendances
COPY ["clinivia_backend.csproj", "./"]
RUN dotnet restore

# Copier le reste des fichiers du projet
COPY . .

# Construire le projet
RUN dotnet build "clinivia_backend.csproj" -c Release -o /app/build





#3-/
# Publier le projet
FROM build AS publish
RUN dotnet publish "clinivia_backend.csproj" -c Release -o /app/publish


#4-/
# Créer l'image finale pour exécuter l'application
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "clinivia_backend.dll"]
