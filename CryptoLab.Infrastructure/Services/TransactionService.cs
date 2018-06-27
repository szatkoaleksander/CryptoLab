using System;
using System.Threading.Tasks;
using CryptoLab.Domain.IRepositories;
using CryptoLab.Infrastructure.CryptoCompareApi;
using CryptoLab.Infrastructure.IServices;
using System.Linq;

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

            var price = await _cryptoCompareApi.GetCryptoPriceInUsd(toCurrnecy);

            var fromWallet = wallet.Where(x => x.Currnecy == "USD" && (x.AmountOfMoney - (amount * price)) >= 0).SingleOrDefault();
            var toWallet = wallet.Where(x => x.Currnecy == toCurrnecy).SingleOrDefault();

            if(fromWallet == null || toWallet == null)
                throw new Exception("Wallet is not exists");

            fromWallet.SetAmountOfMoney(fromWallet.AmountOfMoney - (amount * price));
            toWallet.SetAmountOfMoney(toWallet.AmountOfMoney + amount);

            await _walletRepository.UpdateAsync(fromWallet); 
            await _walletRepository.UpdateAsync(toWallet);
        }

        public async Task FastSellTransactionAsync(string fromCurrnecy, double amount, Guid userId)
        {
            var user = await _userRepository.FindAsync(userId); 
            var wallet = await _walletRepository.GetByUserId(userId); 

            var price = await _cryptoCompareApi.GetCryptoPriceInUsd(fromCurrnecy);

            var fromWallet = wallet.Where(x => x.Currnecy == fromCurrnecy && (x.AmountOfMoney - amount) >= 0).SingleOrDefault();
            var toWallet = wallet.Where(x => x.Currnecy == "USD").SingleOrDefault();

            if(fromWallet == null || toWallet == null)
                throw new Exception("Wallet is not exists");

            fromWallet.SetAmountOfMoney(fromWallet.AmountOfMoney - amount);
            toWallet.SetAmountOfMoney(toWallet.AmountOfMoney + amount * price);

            await _walletRepository.UpdateAsync(fromWallet); 
            await _walletRepository.UpdateAsync(toWallet);
        }
    }
}