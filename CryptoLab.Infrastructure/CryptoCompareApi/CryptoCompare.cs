using System.IO;
using System.Net;
using System.Threading.Tasks;
using Newtonsoft.Json.Linq;

namespace CryptoLab.Infrastructure.CryptoCompareApi
{
    public static class CryptoCompare
    {
        public static async Task<decimal> GetCryptoPriceInUsd(string toCurrnecy)
        {
            string to = toCurrnecy;
            string url = $"https://min-api.cryptocompare.com/data/price?fsym={to}&tsyms=USD";
     
            HttpWebRequest request = (HttpWebRequest)WebRequest.Create(url);
            request.ContentType = "application/json; charset=utf-8";

            HttpWebResponse response = (HttpWebResponse)await request.GetResponseAsync();
            Stream stream = response.GetResponseStream();
            StreamReader reader = new StreamReader(stream);
           
            var data = await reader.ReadToEndAsync();

            dynamic json = JObject.Parse(data);

            return (decimal)json.USD;
        }
    }
}