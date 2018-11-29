using AutoMapper;
using CryptoLab.Domain.Domain;
using CryptoLab.Infrastructure.DTO;

namespace CryptoLab.Infrastructure.AutoMapper
{
    public static class AutoMapperConfig
    {
        public static IMapper Initialize()
        {
            var config =  new MapperConfiguration(cfg =>
            {
                cfg.CreateMap<User, UserDto>();
                cfg.CreateMap<Wallet, WalletDto>();
                cfg.CreateMap<History, HistoryDto>();
                cfg.CreateMap<Wallet, WalletDto>();
            })
            .CreateMapper();

            return config;
        }
    }
}