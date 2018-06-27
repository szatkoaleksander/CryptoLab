using System;
using System.Threading.Tasks;

namespace CryptoLab.Infrastructure.IServices
{
    public interface ITransactionService
    {
         Task FastBuyTransactionAsync(string toCurrnecy, double amount, Guid userId);
         Task FastSellTransaction(string fromCurrnecy, double amount, Guid userId);
    }
}