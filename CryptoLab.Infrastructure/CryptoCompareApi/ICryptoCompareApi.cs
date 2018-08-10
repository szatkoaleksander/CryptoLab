using System.Threading.Tasks;

namespace CryptoLab.Infrastructure.CryptoCompareApi
{
    public interface ICryptoCompareApi
    {
         Task<decimal> GetCryptoPriceInUsd(string toCurrnecy);
    }
}