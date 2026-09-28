using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Wosho.Api.Data;
using Wosho.Api.Models;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<WoshoDbContext>(options =>
    options.UseNpgsql(
        builder.Configuration.GetConnectionString("DefaultConnection")));

// Add services to the container.
builder.Services.AddControllers();


//Register Services
builder.Services.AddScoped<IPasswordHasher<User>, PasswordHasher<User>>();

// Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


//  CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("WoshoCors", policy =>
    {
        policy.WithOrigins("http://localhost:8081")
              .AllowAnyMethod()
              .AllowAnyHeader()
              .AllowCredentials();
    });
});


var app = builder.Build();


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors("WoshoCors");

app.UseAuthorization();

app.MapControllers();

app.Run();