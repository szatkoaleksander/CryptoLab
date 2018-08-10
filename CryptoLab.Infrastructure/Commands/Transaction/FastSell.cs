using CryptoLab.Infrastructure.Commands.Auth;

namespace CryptoLab.Infrastructure.Commands.Transaction
{
    public class FastSell : AuthCommand
    {
        private string fromCurrency;

        public string FromCurrency 
        { 
            get
            {
                return fromCurrency;
            }
            set
            {
                fromCurrency = value.ToUpperInvariant();
            }
        }
        public decimal Amount { get; set; }
    }
}