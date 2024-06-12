using clinivia_backend.Models; // Assurez-vous que ce namespace est correct
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Déterminer l'environnement ASP.NET Core
var environment = builder.Environment.EnvironmentName;

// Charger les configurations supplémentaires si nécessaire
if (environment == "Docker")
{
    builder.Configuration.AddJsonFile("appsettings.Docker.json", optional: true, reloadOnChange: true);
}

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<ApplicationContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("connString")));

builder.Services.AddCors(options =>
{
    options.AddPolicy("CORSPolicy", builder =>
        builder.AllowAnyMethod()
               .AllowAnyHeader()
               .AllowCredentials()
               .SetIsOriginAllowed((hosts) => true));
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment() || environment == "Docker")
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("CORSPolicy");
app.UseAuthorization();
app.MapControllers();

if (environment == "Docker")
{
    PrepDb.PrepPopulation(app); // Apply migrations only in Docker environment
}

app.Run();

public static class PrepDb
{
    public static void PrepPopulation(IApplicationBuilder app)
    {
        using (var serviceScope = app.ApplicationServices.CreateScope())
        {
            SeedData(serviceScope.ServiceProvider.GetService<ApplicationContext>());
        }
    }

    private static void SeedData(ApplicationContext context)
    {
        context.Database.Migrate();
    }
}


