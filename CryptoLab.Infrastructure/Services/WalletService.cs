using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using CryptoLab.Domain.Domain;
using CryptoLab.Domain.IRepositories;
using CryptoLab.Infrastructure.IServices;
using System.Linq;
using CryptoLab.Infrastructure.CryptoCompareApi;

namespace CryptoLab.Infrastructure.Services
{
    public class WalletService : IWalletService
    {
        private readonly IWalletRepository _walletRepository;
        private readonly IUserRepository _userRepository;

        public WalletService(IWalletRepository walletRepository, IUserRepository userRepository)
        {
            _walletRepository = walletRepository;
            _userRepository = userRepository;
        }

        public Task<Dictionary<string, decimal>> RankingAsync()
        {
            throw new NotImplementedException();
        }

        public async Task AddAsync(string currency, Guid userId)
        {
            var user = await _userRepository.FindAsync(userId);
            var userWallets = await _walletRepository.GetByUserIdAsync(userId);

            var walletIsExist = userWallets.Select(x => x.Currency == currency).FirstOrDefault();

            if(walletIsExist == true)
                throw new Exception("This wallet is exist for this user");

            decimal amountOfMoney = 0.0m;
            
            if(currency == "USD")
                amountOfMoney = 50000;
            else amountOfMoney = 0;

            var wallet = new Wallet(currency, amountOfMoney, user);

            await _walletRepository.AddAsync(wallet);
        }
    }
}