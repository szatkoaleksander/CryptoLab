using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CryptoLab.Domain.IRepositories;
using CryptoLab.Infrastructure.IServices;
using CryptoLab.Infrastructure.EntityFramework;
using CryptoLab.Infrastructure.Repositories;
using CryptoLab.Infrastructure.Services;
using CryptoLab.Infrastructure.AutoMapper;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using CryptoLab.Infrastructure.JWT;
using CryptoLab.Infrastructure.IoC;
using Autofac;
using Autofac.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.Security.Claims;
using Newtonsoft.Json;
using CryptoLab.Infrastructure.CryptoCompareApi;
using CryptoLab.Infrastructure.Hubs;

namespace CryptoLab.Api
{
    public class Startup
    {
        public IConfiguration Configuration { get; }
        public IContainer ApplicationContainer { get; private set; }

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IServiceProvider ConfigureServices(IServiceCollection services)
        {
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<IHistoryRepository, HistoryRepository>();
            services.AddScoped<IWalletRepository, WalletRepository>();

            services.AddScoped<IUserService, UserService>();
            services.AddScoped<IAccountService, AccountService>();
            services.AddScoped<IWalletService, WalletService>();
            services.AddScoped<ITransactionService, TransactionService>();
            services.AddScoped<IHistoryService, HistoryService>();

            services.AddSingleton<IEncrypter, Encrypter>();
            services.AddSingleton<IJwtHandler, JwtHandler>();

            services.AddSingleton(AutoMapperConfig.Initialize());


            services.AddDbContext<Context>(options =>
                options.UseInMemoryDatabase("db"));

            services.AddAuthorization(options =>
            {
                options.AddPolicy("user", policy => policy
                    .RequireAuthenticatedUser().RequireClaim(ClaimTypes.Role, "user")
                    .AddAuthenticationSchemes(JwtBearerDefaults.AuthenticationScheme)
                );

                options.AddPolicy("admin", policy => policy
                    .RequireAuthenticatedUser().RequireClaim(ClaimTypes.Role, "admin")
                    .AddAuthenticationSchemes(JwtBearerDefaults.AuthenticationScheme)
                );
            });

            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })

            .AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("000_cat_test_key_123")),

                    ValidateIssuer = true,
                    ValidIssuer = "http://localhost:5000",

                    ValidateAudience = false,
                    ValidateLifetime = true,

                    ClockSkew = TimeSpan.Zero
                };

                options.Events = new JwtBearerEvents()
                {
                    OnMessageReceived = context =>
                    {
                        if (context.Request.Path.ToString().StartsWith("/hub/"))
                        {
                            context.Token = context.Request.Query["access_token"];
                        }
                        return Task.CompletedTask;
                    },
                };
            });

            services.AddCors(options => options.AddPolicy("CorsPolicy", option =>
            {
                option
                    .AllowAnyMethod()
                    .AllowAnyHeader()
                    .AllowAnyOrigin()
                    .AllowCredentials()
                    .WithOrigins("http://localhost:3000", "https://www.cryptolab.best");

            }));

            services.AddSignalR();

            services.AddMvc()
                .AddJsonOptions(x => x.SerializerSettings.Formatting = Formatting.Indented)
                .AddJsonOptions(x => x.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore);

            var builder = new ContainerBuilder();
            builder.Populate(services);
            builder.RegisterModule<CommandModule>();

            ApplicationContainer = builder.Build();

            return new AutofacServiceProvider(ApplicationContainer);
        }

        public void Configure(IApplicationBuilder app, IHostingEnvironment env, IApplicationLifetime appLifetime)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseHsts();
            }


            app.UseCors("CorsPolicy");
            app.UseAuthentication();
            app.UseSignalR(routes =>
            {
                routes.MapHub<HistoryHub>("/hub/histories");
            });

            app.UseMvc();

            appLifetime.ApplicationStopped.Register(() => ApplicationContainer.Dispose());
        }
    }
}
