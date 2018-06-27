using System;
using System.Threading.Tasks;
using CryptoLab.Domain.IRepositories;
using CryptoLab.Infrastructure.CryptoCompareApi;
using CryptoLab.Infrastructure.IServices;

namespace CryptoLab.Infrastructure.Services
{
    public class TransactionService : ITransactionService
    {
        private readonly IUserRepository _userRepository;
        private readonly IWalletRepository _walletRepository;
        private readonly ICryptoCompareApi _cryptoCompareApi;

        public TransactionService(IUserRepository userRepository, IWalletRepository walletRepository,  ICryptoCompareApi cryptoCompareApi)
        {
            _userRepository = userRepository;
            _walletRepository = walletRepository;
            _cryptoCompareApi = cryptoCompareApi;
        }
        
        public async Task FastBuyTransactionAsync(string toCurrnecy, double amount, Guid userId)
        {
            var user = await _userRepository.FindAsync(userId); 
            var wallet = await _walletRepository.GetByUserId(userId); 

            double price = await _cryptoCompareApi.GetCryptoPriceInUsd(toCurrnecy);

            foreach(var i in wallet)
            {
                if(i.Currnecy == "USD")
                {
                    i.SetAmountOfMoney(i.AmountOfMoney - amount);
                }

                if(i.Currnecy == toCurrnecy)
                {
                    i.SetAmountOfMoney((i.AmountOfMoney + amount) / price);
                }

                await _walletRepository.UpdateAsync(i); 
            }
        }

        public Task FastSellTransaction(string fromCurrnecy, double amount, Guid userId)
        {
            throw new NotImplementedException();
        }
    }
}