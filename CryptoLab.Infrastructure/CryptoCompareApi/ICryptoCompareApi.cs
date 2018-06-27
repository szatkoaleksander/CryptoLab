using System.Threading.Tasks;

namespace CryptoLab.Infrastructure.CryptoCompareApi
{
    public interface ICryptoCompareApi
    {
         Task<double> GetCryptoPriceInUsd(string toCurrnecy);
    }
}