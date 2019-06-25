using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using CryptoLab.Domain.Domain;
using CryptoLab.Domain.IRepositories;
using CryptoLab.Infrastructure.IServices;
using System.Linq;
using CryptoLab.Infrastructure.CryptoCompareApi;
using AutoMapper;
using CryptoLab.Infrastructure.DTO;

namespace CryptoLab.Infrastructure.Services
{
    public class WalletService : IWalletService
    {
        private readonly IWalletRepository _walletRepository;
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;

        public WalletService(IWalletRepository walletRepository, IUserRepository userRepository, IMapper mapper)
        {
            _walletRepository = walletRepository;
            _userRepository = userRepository;
            _mapper = mapper;
        }

        public async Task<IEnumerable<WalletDto>> GetAllAsync(Guid userId)
        {
            var userWallets = await _walletRepository.GetByUserIdAsync(userId);

            return _mapper.Map<IEnumerable<Wallet>, IEnumerable<WalletDto>>(userWallets);
        }

        public async Task AddAsync(IEnumerable<string> currencies, Guid userId)
        {
            var user = await _userRepository.FindAsync(userId);
            var userWallets = await _walletRepository.GetByUserIdAsync(userId);
            
            decimal amountOfMoney = 0.0m;

            foreach(var currency in currencies)
            {
                var walletIsExist = userWallets.Select(x => x.Currency == currency).FirstOrDefault();
                
                if(walletIsExist == true)
                    throw new Exception("This wallet is exist for this user");

                if(currency == "USD")
                    amountOfMoney = 50000;
                else amountOfMoney = 0;

                var wallet = new Wallet(currency, amountOfMoney, user);
                await _walletRepository.AddAsync(wallet);
            }
        }
    }
}