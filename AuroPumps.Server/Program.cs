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
builder.Services.AddHsts(options =>
{
    options.MaxAge = TimeSpan.FromDays(365);
    options.IncludeSubDomains = false;
    options.Preload = false;
});
var app = builder.Build();
// 0. HSTS header (sirf HTTPS response par jata hai)
if (!app.Environment.IsDevelopment())
{
    app.UseHsts();
}
// 1. WWW -> non-WWW (sabse pehle)
app.Use(async (context, next) =>
{
    var host = context.Request.Host.Host;

    if (host.StartsWith("www.", StringComparison.OrdinalIgnoreCase))
    {
        var newUrl = $"https://{host.Substring(4)}{context.Request.Path}{context.Request.QueryString}";
        context.Response.Redirect(newUrl, permanent: true);
        return;
    }

    await next();
});

// 2. HTTP -> HTTPS (static files se pehle, taaki http pe bhi redirect ho)
app.UseHttpsRedirection();

// 3. Baaki pipeline
app.UseMiddleware<SeoMiddleware>();
app.UseDefaultFiles();
app.UseStaticFiles();

if (app.Environment.IsDevelopment() || app.Environment.IsProduction())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowReact");
app.UseAuthorization();
app.MapControllers();
app.MapFallbackToFile("/spa-shell.html");

app.Run();