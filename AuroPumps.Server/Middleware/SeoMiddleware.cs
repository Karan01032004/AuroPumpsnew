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

            var env = context.RequestServices.GetRequiredService<Microsoft.AspNetCore.Hosting.IWebHostEnvironment>();
            var wwwroot = env.WebRootPath ?? Path.Combine(env.ContentRootPath, "wwwroot");

            // Ignore API and Swagger
            if (rawPath.StartsWith("/api", StringComparison.OrdinalIgnoreCase) ||
                rawPath.StartsWith("/swagger", StringComparison.OrdinalIgnoreCase))
            {
                await _next(context);
                return;
            }

            // Normalize path
            var cleanPath = rawPath.TrimEnd('/');
            if (string.IsNullOrEmpty(cleanPath) || cleanPath.Equals("/index.html", StringComparison.OrdinalIgnoreCase))
            {
                cleanPath = "/";
            }

            // 0. Direct handlers for robots.txt, llms.txt, llms-full.txt, ai.txt, sitemap.xml
            if (cleanPath.Equals("/robots.txt", StringComparison.OrdinalIgnoreCase))
            {
                var robotsPath = Path.Combine(wwwroot, "robots.txt");
                string content = File.Exists(robotsPath)
                    ? await File.ReadAllTextAsync(robotsPath)
                    : "User-agent: Googlebot\nDisallow: \nUser-agent: *\nDisallow: \nSitemap: https://auropumps.com/sitemap.xml\n";

                context.Response.ContentType = "text/plain; charset=utf-8";
                context.Response.StatusCode = StatusCodes.Status200OK;
                await context.Response.WriteAsync(content);
                return;
            }

            if (cleanPath.Equals("/llms.txt", StringComparison.OrdinalIgnoreCase))
            {
                var file = Path.Combine(wwwroot, "llms.txt");
                if (File.Exists(file))
                {
                    context.Response.ContentType = "text/plain; charset=utf-8";
                    context.Response.StatusCode = StatusCodes.Status200OK;
                    await context.Response.SendFileAsync(file);
                    return;
                }
            }

            if (cleanPath.Equals("/llms-full.txt", StringComparison.OrdinalIgnoreCase))
            {
                var file = Path.Combine(wwwroot, "llms-full.txt");
                if (File.Exists(file))
                {
                    context.Response.ContentType = "text/plain; charset=utf-8";
                    context.Response.StatusCode = StatusCodes.Status200OK;
                    await context.Response.SendFileAsync(file);
                    return;
                }
            }

            if (cleanPath.Equals("/ai.txt", StringComparison.OrdinalIgnoreCase))
            {
                var file = Path.Combine(wwwroot, "ai.txt");
                if (File.Exists(file))
                {
                    context.Response.ContentType = "text/plain; charset=utf-8";
                    context.Response.StatusCode = StatusCodes.Status200OK;
                    await context.Response.SendFileAsync(file);
                    return;
                }
            }

            if (cleanPath.Equals("/sitemap.xml", StringComparison.OrdinalIgnoreCase))
            {
                var file = Path.Combine(wwwroot, "sitemap.xml");
                if (File.Exists(file))
                {
                    context.Response.ContentType = "application/xml; charset=utf-8";
                    context.Response.StatusCode = StatusCodes.Status200OK;
                    await context.Response.SendFileAsync(file);
                    return;
                }
            }

            // Direct serving for any physical file in wwwroot (assets, images, fonts, pdf, css, js)
            if (IsPhysicalFile(wwwroot, rawPath, out string physicalPath))
            {
                context.Response.ContentType = GetContentType(physicalPath);
                context.Response.StatusCode = StatusCodes.Status200OK;
                await context.Response.SendFileAsync(physicalPath);
                return;
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

            // 4. Dynamic Application Detail Route: /industrial-pump-applications/:categorySlugOrId
            if (cleanPath.StartsWith("/industrial-pump-applications/", StringComparison.OrdinalIgnoreCase))
            {
                var segments = cleanPath.Split('/', StringSplitOptions.RemoveEmptyEntries);
                if (segments.Length >= 2)
                {
                    var appSlugOrId = segments[segments.Length - 1].ToLowerInvariant();
                    using var scope = context.RequestServices.CreateScope();
                    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();

                    var apps = db.Application.Where(a => a.Visible == true).ToList();
                    var app = apps.FirstOrDefault(a =>
                    {
                        if (a.id.ToString() == appSlugOrId) return true;

                        var slug = Regex.Replace((a.title ?? "").Replace("&", "").ToLowerInvariant(), @"[^a-z0-9]+", "-").Trim('-');
                        return slug == appSlugOrId;
                    });

                    if (app != null)
                    {
                        var title = $"{app.title} - Industrial Pump Applications - Auro Pumps";
                        var description = !string.IsNullOrWhiteSpace(app.description)
                            ? Regex.Replace(app.description, "<.*?>", string.Empty).Trim()
                            : $"Industrial pump solutions for {app.title} by Auro Pumps.";
                        if (description.Length > 200) description = description.Substring(0, 197) + "...";

                        var canonical = $"https://auropumps.com/industrial-pump-applications/{appSlugOrId}";
                        var bodyContent = $"<h2>{WebUtility.HtmlEncode(app.title)}</h2><div>{app.description}</div>";

                        var injectedHtml = InjectSeoMetaAndBody(baseShell, title, description, "", canonical, app.title, bodyContent);

                        context.Response.ContentType = "text/html; charset=utf-8";
                        context.Response.StatusCode = StatusCodes.Status200OK;
                        await context.Response.WriteAsync(injectedHtml);
                        return;
                    }
                }
            }

            // 4.1 Dynamic Product Category Route: /products/:categorySlug
            if (cleanPath.StartsWith("/products/", StringComparison.OrdinalIgnoreCase))
            {
                var segments = cleanPath.Split('/', StringSplitOptions.RemoveEmptyEntries);
                if (segments.Length >= 2)
                {
                    var catSlug = segments[1].ToLowerInvariant();
                    string title = "Product Category - Auro Pumps";
                    string description = "Auro Pumps manufactures heavy-duty process pumps, molten salt and molten metal pumps.";

                    if (catSlug.Contains("vertical"))
                    {
                        title = "Vertical Submerged & Cantilever Pumps | Auro Pumps";
                        description = "Auro Pumps engineers heavy-duty vertical pumps designed for reliable liquid transfer from deep sumps, tanks, and pits without priming issues. Available in extended-shaft submerged (ACCV), bearing-free cantilever (ACCV-C), steam-jacketed (ACCV-J), non-metallic (APPV), sealless magnetic drive (ACVMAG), and specialized molten metal configurations.";
                    }
                    else if (catSlug.Contains("horizontal"))
                    {
                        title = "Horizontal Process & Chemical Pumps | Auro Pumps";
                        description = "Auro Pumps manufactures a versatile portfolio of horizontal centrifugal pumps engineered for continuous, heavy-duty fluid handling across chemical, pharmaceutical, and industrial process plants.";
                    }
                    else if (catSlug.Contains("metal"))
                    {
                        title = "Molten Metal Handling Equipment | Auro Pumps";
                        description = "Auro Pumps engineers specialized high-temperature equipment built to withstand the extreme thermal shock, corrosion, and erosion of metallurgical operations.";
                    }
                    else if (catSlug.Contains("salt"))
                    {
                        title = "Molten Salt Pumps & Thermal Storage Systems | Auro Pumps";
                        description = "Auro Pumps engineers ultra-high-temperature vertical pumps and integrated thermal systems designed to safely circulate nitrate and chloride molten salts in extreme thermal environments.";
                    }

                    var canonical = $"https://auropumps.com{cleanPath}";
                    var injectedHtml = InjectSeoMetaAndBody(baseShell, title, description, "", canonical, title, $"<h2>{WebUtility.HtmlEncode(title)}</h2><p>{WebUtility.HtmlEncode(description)}</p>");

                    context.Response.ContentType = "text/html; charset=utf-8";
                    context.Response.StatusCode = StatusCodes.Status200OK;
                    await context.Response.WriteAsync(injectedHtml);
                    return;
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

            var assetExts = new[] {
                ".js", ".mjs", ".css", ".png", ".jpg", ".jpeg", ".webp", ".gif", ".svg",
                ".ico", ".bmp", ".tiff", ".woff", ".woff2", ".ttf", ".eot", ".otf",
                ".pdf", ".mp4", ".webm", ".json", ".txt", ".xml", ".webmanifest", ".map"
            };
            return assetExts.Contains(ext.ToLowerInvariant());
        }

        private static bool IsPhysicalFile(string wwwroot, string path, out string fullPath)
        {
            fullPath = string.Empty;
            if (string.IsNullOrWhiteSpace(path) || path == "/" ||
                path.Equals("/index.html", StringComparison.OrdinalIgnoreCase) ||
                path.Equals("/spa-shell.html", StringComparison.OrdinalIgnoreCase))
            {
                return false;
            }

            var relativePath = path.TrimStart('/').Replace('/', Path.DirectorySeparatorChar);
            var candidate = Path.Combine(wwwroot, relativePath);

            if (File.Exists(candidate))
            {
                fullPath = candidate;
                return true;
            }
            return false;
        }

        private static string GetContentType(string filePath)
        {
            var ext = Path.GetExtension(filePath).ToLowerInvariant();
            return ext switch
            {
                ".txt" => "text/plain; charset=utf-8",
                ".xml" => "application/xml; charset=utf-8",
                ".json" => "application/json; charset=utf-8",
                ".js" or ".mjs" => "text/javascript; charset=utf-8",
                ".css" => "text/css; charset=utf-8",
                ".html" => "text/html; charset=utf-8",
                ".png" => "image/png",
                ".jpg" or ".jpeg" => "image/jpeg",
                ".gif" => "image/gif",
                ".webp" => "image/webp",
                ".svg" => "image/svg+xml",
                ".ico" => "image/x-icon",
                ".pdf" => "application/pdf",
                ".woff" => "font/woff",
                ".woff2" => "font/woff2",
                ".ttf" => "font/ttf",
                ".eot" => "application/vnd.ms-fontobject",
                _ => "application/octet-stream"
            };
        }

        private static string CleanUpTitles(string html)
        {
            if (string.IsNullOrWhiteSpace(html)) return html;

            var titleMatches = Regex.Matches(html, @"<title[^>]*>([\s\S]*?)</title>", RegexOptions.IgnoreCase);
            if (titleMatches.Count > 1)
            {
                string chosenTitle = titleMatches[0].Value;
                for (int i = titleMatches.Count - 1; i >= 0; i--)
                {
                    if (!string.IsNullOrWhiteSpace(titleMatches[i].Groups[1].Value))
                    {
                        chosenTitle = titleMatches[i].Value;
                        break;
                    }
                }

                html = Regex.Replace(html, @"<title[^>]*>[\s\S]*?</title>", "", RegexOptions.IgnoreCase);
                html = Regex.Replace(html, @"(<head[^>]*>)", $"$1\n    {chosenTitle}", RegexOptions.IgnoreCase);
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
            if (string.IsNullOrWhiteSpace(shell)) return shell;

            // Remove all existing title tags
            shell = Regex.Replace(shell, @"<title[^>]*>[\s\S]*?</title>", "", RegexOptions.IgnoreCase);

            var metaBuilder = new StringBuilder();
            metaBuilder.AppendLine($"<title>{WebUtility.HtmlEncode(title)}</title>");

            if (!string.IsNullOrWhiteSpace(description))
            {
                shell = Regex.Replace(shell, @"<meta\s+name=[""]description[""][\s\S]*?>", "", RegexOptions.IgnoreCase);
                shell = Regex.Replace(shell, @"<meta\s+property=[""]og:description[""][\s\S]*?>", "", RegexOptions.IgnoreCase);
                shell = Regex.Replace(shell, @"<meta\s+name=[""]twitter:description[""][\s\S]*?>", "", RegexOptions.IgnoreCase);

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
                shell = Regex.Replace(shell, @"<meta\s+property=[""]og:url[""][\s\S]*?>", "", RegexOptions.IgnoreCase);

                metaBuilder.AppendLine($"<link rel=\"canonical\" href=\"{WebUtility.HtmlEncode(canonical)}\" />");
                metaBuilder.AppendLine($"<meta property=\"og:url\" content=\"{WebUtility.HtmlEncode(canonical)}\" />");
            }

            shell = Regex.Replace(shell, @"<meta\s+property=[""]og:title[""][\s\S]*?>", "", RegexOptions.IgnoreCase);
            shell = Regex.Replace(shell, @"<meta\s+name=[""]twitter:title[""][\s\S]*?>", "", RegexOptions.IgnoreCase);

            metaBuilder.AppendLine($"<meta property=\"og:title\" content=\"{WebUtility.HtmlEncode(title)}\" />");
            metaBuilder.AppendLine($"<meta name=\"twitter:title\" content=\"{WebUtility.HtmlEncode(title)}\" />");

            shell = Regex.Replace(shell, @"(<head[^>]*>)", $"$1\n{metaBuilder}", RegexOptions.IgnoreCase);

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
