using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Poweradmin.Server.Data;
using Poweradmin.Server.Models;

namespace AuroPumps.Server.Middleware
{
    public class SeoMiddleware
    {
        private readonly RequestDelegate _next;

        // Legacy URL 301 Redirect Mapping
        private static readonly Dictionary<string, string> RedirectMap = new(StringComparer.OrdinalIgnoreCase)
        {
            { "/molten-lead-pumps", "/metal-pumps-manufacturer-india" },
            { "/molten-salt-loop", "/about-molten-salt-pump-manufacturer" },
            { "/molten-salt-pumps", "/metal-pumps-manufacturer-india" },
            { "/molten-zinc-pumps", "/metal-pumps-manufacturer-india" },
            { "/molten-metal-pumps", "/metal-pumps-manufacturer-india" },
            { "/cantilever-pumps", "/metal-pumps-manufacturer-india" },
            { "/magnetic-drive-pumps", "/metal-pumps-manufacturer-india" },
            { "/vertical-submerged-pumps", "/metal-pumps-manufacturer-india" }
        };

        public SeoMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            var rawPath = context.Request.Path.Value ?? "/";

            // Ignore API, Swagger, and static assets (.js, .css, .png, .jpg, .webp, .svg, .ico, .woff, .pdf)
            if (rawPath.StartsWith("/api", StringComparison.OrdinalIgnoreCase) ||
                rawPath.StartsWith("/swagger", StringComparison.OrdinalIgnoreCase) ||
                IsStaticAsset(rawPath))
            {
                await _next(context);
                return;
            }

            var env = context.RequestServices.GetRequiredService<Microsoft.AspNetCore.Hosting.IWebHostEnvironment>();
            var wwwroot = env.WebRootPath ?? Path.Combine(env.ContentRootPath, "wwwroot");

            // Normalize path
            var cleanPath = rawPath.TrimEnd('/');
            if (string.IsNullOrEmpty(cleanPath) || cleanPath.Equals("/index.html", StringComparison.OrdinalIgnoreCase))
            {
                cleanPath = "/";
            }

            // 0. Check Legacy 301 Redirects
            if (RedirectMap.TryGetValue(cleanPath, out var targetUrl))
            {
                context.Response.StatusCode = StatusCodes.Status301MovedPermanently;
                context.Response.Headers["Location"] = targetUrl;
                return;
            }

            // Load spa-shell.html for fallbacks/injections
            var spaShellPath = Path.Combine(wwwroot, "spa-shell.html");
            if (!File.Exists(spaShellPath))
            {
                spaShellPath = Path.Combine(wwwroot, "index.html");
            }
            string baseShell = File.Exists(spaShellPath)
                ? await File.ReadAllTextAsync(spaShellPath)
                : "<!doctype html><html><head></head><body><div id=\"root\"></div></body></html>";

            // 1. Homepage ("/") Handling
            if (cleanPath == "/")
            {
                var homeHtmlPath = Path.Combine(wwwroot, "index.html");
                if (File.Exists(homeHtmlPath))
                {
                    var homeHtml = await File.ReadAllTextAsync(homeHtmlPath);

                    // Ensure clean single title, description, canonical
                    homeHtml = InjectSeoMetaAndBody(
                        homeHtml,
                        "Molten Salt Pump & Molten Metal Pump Manufacturers India",
                        "Auro Pumps manufactures molten salt pumps, molten zinc & lead pumps, vertical submerged, cantilever & magnetic drive pumps since 1984 from Gujarat, India.",
                        "molten salt pumps manufacturers, molten zinc pump manufacturers, molten lead pump manufacturers",
                        "https://auropumps.com/",
                        "",
                        ""
                    );

                    context.Response.ContentType = "text/html; charset=utf-8";
                    context.Response.StatusCode = StatusCodes.Status200OK;
                    await context.Response.WriteAsync(homeHtml);
                    return;
                }
            }

            // 2. Static Prerendered Page Check
            var staticHtmlPath = Path.Combine(wwwroot, cleanPath.TrimStart('/').Replace('/', Path.DirectorySeparatorChar), "index.html");
            if (File.Exists(staticHtmlPath))
            {
                var staticHtml = await File.ReadAllTextAsync(staticHtmlPath);

                if (cleanPath.Equals("/metal-pumps-manufacturer-india", StringComparison.OrdinalIgnoreCase))
                {
                    staticHtml = InjectProductCatalogGrid(staticHtml, context);
                }
                else if (cleanPath.Equals("/industrial-pump-applications", StringComparison.OrdinalIgnoreCase))
                {
                    staticHtml = InjectApplicationCatalogGrid(staticHtml, context);
                }

                staticHtml = CleanUpTitles(staticHtml);
                context.Response.ContentType = "text/html; charset=utf-8";
                context.Response.StatusCode = StatusCodes.Status200OK;
                await context.Response.WriteAsync(staticHtml);
                return;
            }

            // 3. Dynamic Product Detail Route: /metal-pumps-manufacturer-india/:productSlug OR /metal-pumps-manufacturer-india/:categorySlug/:productSlug
            if (cleanPath.StartsWith("/metal-pumps-manufacturer-india/", StringComparison.OrdinalIgnoreCase))
            {
                var segments = cleanPath.Split('/', StringSplitOptions.RemoveEmptyEntries);
                if (segments.Length >= 2)
                {
                    var productSlug = segments[segments.Length - 1].ToLowerInvariant();
                    using var scope = context.RequestServices.CreateScope();
                    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();

                    var products = db.Product.Where(p => p.Visible == true).ToList();
                    var product = products.FirstOrDefault(p =>
                    {
                        var slug = Regex.Replace((p.title ?? "").Replace("&", "").ToLowerInvariant(), @"[^a-z0-9]+", "-").Trim('-');
                        return slug == productSlug;
                    });

                    if (product != null)
                    {
                        var title = !string.IsNullOrWhiteSpace(product.PageIETitle) ? product.PageIETitle : $"{product.title} - Auro Pumps";
                        var description = !string.IsNullOrWhiteSpace(product.description)
                            ? Regex.Replace(product.description, "<.*?>", string.Empty).Trim()
                            : $"{product.title} manufactured by Auro Pumps, India.";
                        if (description.Length > 200) description = description.Substring(0, 197) + "...";

                        var canonical = $"https://auropumps.com{cleanPath}";
                        var bodyContent = $"<h2>{WebUtility.HtmlEncode(product.title)}</h2><div>{product.description}</div>";

                        var injectedHtml = InjectSeoMetaAndBody(baseShell, title, description, "", canonical, product.title, bodyContent);

                        context.Response.ContentType = "text/html; charset=utf-8";
                        context.Response.StatusCode = StatusCodes.Status200OK;
                        await context.Response.WriteAsync(injectedHtml);
                        return;
                    }
                }
            }

            // 4. Dynamic Application Detail Route: /industrial-pump-applications/:categoryId
            if (cleanPath.StartsWith("/industrial-pump-applications/", StringComparison.OrdinalIgnoreCase))
            {
                var segments = cleanPath.Split('/', StringSplitOptions.RemoveEmptyEntries);
                if (segments.Length >= 2 && int.TryParse(segments[1], out int appId))
                {
                    using var scope = context.RequestServices.CreateScope();
                    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();

                    var app = db.Application.FirstOrDefault(a => a.id == appId && a.Visible == true);
                    if (app != null)
                    {
                        var title = $"{app.title} - Industrial Pump Applications - Auro Pumps";
                        var description = !string.IsNullOrWhiteSpace(app.description)
                            ? Regex.Replace(app.description, "<.*?>", string.Empty).Trim()
                            : $"Industrial pump solutions for {app.title} by Auro Pumps.";
                        if (description.Length > 200) description = description.Substring(0, 197) + "...";

                        var canonical = $"https://auropumps.com/industrial-pump-applications/{appId}";
                        var bodyContent = $"<h2>{WebUtility.HtmlEncode(app.title)}</h2><div>{app.description}</div>";

                        var injectedHtml = InjectSeoMetaAndBody(baseShell, title, description, "", canonical, app.title, bodyContent);

                        context.Response.ContentType = "text/html; charset=utf-8";
                        context.Response.StatusCode = StatusCodes.Status200OK;
                        await context.Response.WriteAsync(injectedHtml);
                        return;
                    }
                }
            }

            // 5. Admin / Auth SPA Fallback Routes
            if (cleanPath.Equals("/signin", StringComparison.OrdinalIgnoreCase) ||
                cleanPath.Equals("/forgot-password", StringComparison.OrdinalIgnoreCase) ||
                cleanPath.Equals("/verify-otp", StringComparison.OrdinalIgnoreCase) ||
                cleanPath.StartsWith("/poweradmin", StringComparison.OrdinalIgnoreCase))
            {
                context.Response.ContentType = "text/html; charset=utf-8";
                context.Response.StatusCode = StatusCodes.Status200OK;
                await context.Response.WriteAsync(CleanUpTitles(baseShell));
                return;
            }

            // 6. Unknown public routes: 404 with Not Found metadata
            var notFoundHtml = InjectSeoMetaAndBody(baseShell, "404 Page Not Found - Auro Pumps", "The requested page was not found.", "", $"https://auropumps.com{cleanPath}", "404 - Page Not Found", "<p>The requested URL was not found on this server.</p>");
            context.Response.ContentType = "text/html; charset=utf-8";
            context.Response.StatusCode = StatusCodes.Status404NotFound;
            await context.Response.WriteAsync(notFoundHtml);
        }

        private static bool IsStaticAsset(string path)
        {
            var ext = Path.GetExtension(path);
            if (string.IsNullOrEmpty(ext)) return false;

            var assetExts = new[] { ".js", ".css", ".png", ".jpg", ".jpeg", ".webp", ".svg", ".ico", ".woff", ".woff2", ".ttf", ".eot", ".pdf", ".mp4", ".json" };
            return assetExts.Contains(ext.ToLowerInvariant());
        }

        private static string CleanUpTitles(string html)
        {
            var matches = Regex.Matches(html, @"<title[^>]*>([\s\S]*?)</title>", RegexOptions.IgnoreCase);
            if (matches.Count > 1)
            {
                var firstTitle = matches[0].Value;
                html = Regex.Replace(html, @"<title[^>]*>[\s\S]*?</title>", "", RegexOptions.IgnoreCase);
                html = html.Replace("<head>", $"<head>{firstTitle}", StringComparison.OrdinalIgnoreCase);
            }
            return html;
        }

        private static string InjectProductCatalogGrid(string html, HttpContext context)
        {
            try
            {
                using var scope = context.RequestServices.CreateScope();
                var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();

                var categories = db.ProductsCategory.Where(c => c.isvisible).OrderBy(c => c.shortorder).ToList();
                var gridBuilder = new StringBuilder();
                gridBuilder.AppendLine("<section id=\"seo-product-grid\" style=\"padding: 20px;\">");

                foreach (var cat in categories)
                {
                    var catSlug = Regex.Replace((cat.title ?? "").Replace("&", "").ToLowerInvariant(), @"[^a-z0-9]+", "-").Trim('-');
                    gridBuilder.AppendLine($"<article id=\"{catSlug}\" style=\"margin-bottom: 30px;\">");
                    gridBuilder.AppendLine($"<h3 style=\"font-size: 24px;\">{WebUtility.HtmlEncode(cat.title)}</h3>");

                    var mappings = db.ProductCategoryMappings
                        .Where(m => m.category_id == cat.id && m.Product.Visible == true)
                        .OrderBy(m => m.sortorder)
                        .Select(m => m.Product)
                        .ToList();

                    gridBuilder.AppendLine("<div style=\"display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 15px;\">");
                    foreach (var prod in mappings)
                    {
                        var prodSlug = Regex.Replace((prod.title ?? "").Replace("&", "").ToLowerInvariant(), @"[^a-z0-9]+", "-").Trim('-');
                        var prodUrl = $"/metal-pumps-manufacturer-india/{catSlug}/{prodSlug}";
                        gridBuilder.AppendLine($"<div style=\"border: 1px solid #ccc; padding: 15px; border-radius: 8px;\">");
                        gridBuilder.AppendLine($"<a href=\"{prodUrl}\" style=\"font-weight: bold; font-size: 16px; text-decoration: none;\">{WebUtility.HtmlEncode(prod.title)}</a>");
                        if (!string.IsNullOrWhiteSpace(prod.description))
                        {
                            var snippet = Regex.Replace(prod.description, "<.*?>", string.Empty).Trim();
                            if (snippet.Length > 100) snippet = snippet.Substring(0, 97) + "...";
                            gridBuilder.AppendLine($"<p style=\"font-size: 13px; color: #555;\">{WebUtility.HtmlEncode(snippet)}</p>");
                        }
                        gridBuilder.AppendLine("</div>");
                    }
                    gridBuilder.AppendLine("</div></article>");
                }
                gridBuilder.AppendLine("</section>");

                if (html.Contains("<div id=\"root\"></div>"))
                {
                    html = html.Replace("<div id=\"root\"></div>", $"<div id=\"root\">{gridBuilder}</div>");
                }
                else if (html.Contains("</main>"))
                {
                    html = html.Replace("</main>", $"{gridBuilder}</main>");
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"[SeoMiddleware Error] InjectProductCatalogGrid: {ex.Message}");
            }
            return html;
        }

        private static string InjectApplicationCatalogGrid(string html, HttpContext context)
        {
            try
            {
                using var scope = context.RequestServices.CreateScope();
                var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();

                var apps = db.Application.Where(a => a.Visible == true).ToList();
                var gridBuilder = new StringBuilder();
                gridBuilder.AppendLine("<section id=\"seo-application-grid\" style=\"padding: 20px;\">");
                gridBuilder.AppendLine("<h2 style=\"font-size: 28px;\">Industrial Pump Applications Catalog</h2>");
                gridBuilder.AppendLine("<div style=\"display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 15px;\">");

                foreach (var app in apps)
                {
                    var appUrl = $"/industrial-pump-applications/{app.id}";
                    gridBuilder.AppendLine($"<div style=\"border: 1px solid #ccc; padding: 15px; border-radius: 8px;\">");
                    gridBuilder.AppendLine($"<a href=\"{appUrl}\" style=\"font-weight: bold; font-size: 18px;\">{WebUtility.HtmlEncode(app.title)}</a>");
                    if (!string.IsNullOrWhiteSpace(app.description))
                    {
                        var snippet = Regex.Replace(app.description, "<.*?>", string.Empty).Trim();
                        if (snippet.Length > 120) snippet = snippet.Substring(0, 117) + "...";
                        gridBuilder.AppendLine($"<p style=\"font-size: 13px; color: #555;\">{WebUtility.HtmlEncode(snippet)}</p>");
                    }
                    gridBuilder.AppendLine("</div>");
                }
                gridBuilder.AppendLine("</div></section>");

                if (html.Contains("<div id=\"root\"></div>"))
                {
                    html = html.Replace("<div id=\"root\"></div>", $"<div id=\"root\">{gridBuilder}</div>");
                }
                else if (html.Contains("</main>"))
                {
                    html = html.Replace("</main>", $"{gridBuilder}</main>");
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"[SeoMiddleware Error] InjectApplicationCatalogGrid: {ex.Message}");
            }
            return html;
        }

        private static string InjectSeoMetaAndBody(string shell, string title, string description, string keywords, string canonical, string heading, string bodyHtml)
        {
            // Remove existing titles
            shell = Regex.Replace(shell, @"<title[^>]*>[\s\S]*?</title>", "", RegexOptions.IgnoreCase);

            var metaBuilder = new StringBuilder();
            metaBuilder.AppendLine($"<title>{WebUtility.HtmlEncode(title)}</title>");

            if (!string.IsNullOrWhiteSpace(description))
            {
                // Remove any existing description
                shell = Regex.Replace(shell, @"<meta\s+name=[""]description[""][\s\S]*?>", "", RegexOptions.IgnoreCase);
                metaBuilder.AppendLine($"<meta name=\"description\" content=\"{WebUtility.HtmlEncode(description)}\" />");
                metaBuilder.AppendLine($"<meta property=\"og:description\" content=\"{WebUtility.HtmlEncode(description)}\" />");
                metaBuilder.AppendLine($"<meta name=\"twitter:description\" content=\"{WebUtility.HtmlEncode(description)}\" />");
            }
            if (!string.IsNullOrWhiteSpace(keywords))
            {
                shell = Regex.Replace(shell, @"<meta\s+name=[""]keywords[""][\s\S]*?>", "", RegexOptions.IgnoreCase);
                metaBuilder.AppendLine($"<meta name=\"keywords\" content=\"{WebUtility.HtmlEncode(keywords)}\" />");
            }
            if (!string.IsNullOrWhiteSpace(canonical))
            {
                shell = Regex.Replace(shell, @"<link\s+rel=[""]canonical[""][\s\S]*?>", "", RegexOptions.IgnoreCase);
                metaBuilder.AppendLine($"<link rel=\"canonical\" href=\"{WebUtility.HtmlEncode(canonical)}\" />");
                metaBuilder.AppendLine($"<meta property=\"og:url\" content=\"{WebUtility.HtmlEncode(canonical)}\" />");
            }
            metaBuilder.AppendLine($"<meta property=\"og:title\" content=\"{WebUtility.HtmlEncode(title)}\" />");
            metaBuilder.AppendLine($"<meta name=\"twitter:title\" content=\"{WebUtility.HtmlEncode(title)}\" />");

            shell = shell.Replace("<head>", $"<head>{metaBuilder}", StringComparison.OrdinalIgnoreCase);

            if (!string.IsNullOrWhiteSpace(heading) || !string.IsNullOrWhiteSpace(bodyHtml))
            {
                var cleanBodyText = !string.IsNullOrWhiteSpace(bodyHtml) ? bodyHtml : "<p>Auro Pumps industrial pumping solutions.</p>";
                var seoHtmlContent = $"<main id=\"seo-content\" style=\"padding:20px;\"><h1>{WebUtility.HtmlEncode(heading)}</h1><div>{cleanBodyText}</div></main>";

                if (shell.Contains("<div id=\"root\"></div>"))
                {
                    shell = shell.Replace("<div id=\"root\"></div>", $"<div id=\"root\">{seoHtmlContent}</div>");
                }
            }

            return CleanUpTitles(shell);
        }
    }
}
