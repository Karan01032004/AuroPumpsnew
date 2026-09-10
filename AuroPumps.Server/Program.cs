using Microsoft.EntityFrameworkCore;
using Poweradmin.Server.Data;
using AuroPumps.Server.Middleware;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddCors(options => {
    options.AddPolicy("AllowReact", policy => {
        policy.WithOrigins("https://localhost:7051", "https://dotcompreview.com", "https://yourwebsitepreview.com", "http://localhost:7148")
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseMySql(
        connectionString,
        ServerVersion.AutoDetect(connectionString)
    )
);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// 3. AB BUILD KAREIN
var app = builder.Build();

// 4. Configure the HTTP request pipeline
app.UseMiddleware<SeoMiddleware>();
app.UseDefaultFiles();
app.UseStaticFiles();

if (app.Environment.IsDevelopment() || app.Environment.IsProduction())
{
    app.UseSwagger();
    app.UseSwaggerUI();
} 
app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();
app.MapFallbackToFile("/spa-shell.html");

app.Run();