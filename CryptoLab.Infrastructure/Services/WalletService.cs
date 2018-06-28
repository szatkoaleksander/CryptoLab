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
        private readonly ICryptoCompareApi _cryptoCompareApi;

        public WalletService(IWalletRepository walletRepository, IUserRepository userRepository, ICryptoCompareApi cryptoCompareApi)
        {
            _walletRepository = walletRepository;
            _userRepository = userRepository;
            _cryptoCompareApi = cryptoCompareApi;
        }

        public async Task<Dictionary<string, double>> RankingAsync()
        {
            Dictionary<string, double> ranking = new Dictionary<string, double>();

            var users = await _userRepository.GetAllAsync();

            foreach(var i in users)
            {
                var userWallets = await _walletRepository.GetByUserIdAsync(i.Id);

                if(userWallets == null)
                    continue;

                var sumofMoney = userWallets.Where(x => x.Currnecy == "USD").FirstOrDefault().AmountOfMoney;

                foreach(var j in userWallets)
                {
                    if(j.Currnecy != "USD")
                    {
                        var walletMoneyInUsd = await _cryptoCompareApi.GetCryptoPriceInUsd(j.Currnecy);
                        sumofMoney += j.AmountOfMoney * walletMoneyInUsd;
                    }
                }

                ranking.Add(i.Username, sumofMoney);
            }

            return ranking;
        }

        public async Task AddAsync(string currency, Guid userId)
        {
            var user = await _userRepository.FindAsync(userId);
            var userWallets = await _walletRepository.GetByUserIdAsync(userId);

            var walletIsExist = userWallets.Select(x => x.Currnecy == currency).FirstOrDefault();

            if(walletIsExist == true)
                throw new Exception("This wallet is exist for this user");

            double amountOfMoney = 0;
            
            if(currency == "USD")
                amountOfMoney = 50000;
            else amountOfMoney = 0;

            var wallet = new Wallet(currency, amountOfMoney, user);

            await _walletRepository.AddAsync(wallet);
        }
    }
}