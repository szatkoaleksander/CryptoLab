using System;
using System.Threading.Tasks;

namespace CryptoLab.Infrastructure.IServices
{
    public interface ITransactionService
    {
         Task FastBuyTransactionAsync(string toCurrnecy, decimal amount, Guid userId);
         Task FastSellTransactionAsync(string fromCurrnecy, decimal amount, Guid userId);
    }
}