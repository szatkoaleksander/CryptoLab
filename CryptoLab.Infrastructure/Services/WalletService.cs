
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using CryptoLab.Domain.Domain;
using CryptoLab.Domain.IRepositories;
using CryptoLab.Infrastructure.IServices;

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

        public async Task<IEnumerable<Wallet>> GetAsync()
        {
            throw new NotImplementedException();
        }

        public async Task AddAsync(string currency, Guid userId)
        {
            var user = await _userRepository.FindAsync(userId);

            var userWallets = await _walletRepository.GetByUserId(userId);

            foreach(var i in userWallets)
            {
                if(i.Currnecy == currency)
                    throw new Exception("This wallet is exsist for this user");
            }

            double amountOfMoney = 0;
            
            if(currency == "USD")
                amountOfMoney = 50000;
            else amountOfMoney = 0;

            var wallet = new Wallet(currency, amountOfMoney, user);

            await _walletRepository.AddAsync(wallet);
        }

        public async Task UpdateAsync(string currency, double amountOfMoney, Guid userId, Guid walletId)
        {
            throw new NotImplementedException();
        }
    }
}