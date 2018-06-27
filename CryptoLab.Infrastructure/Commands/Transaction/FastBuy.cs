using System;
using CryptoLab.Infrastructure.Commands.Auth;

namespace CryptoLab.Infrastructure.Commands.Transaction
{
    public class FastBuy : AuthCommand
    {
        private string toCurrency;

        public string ToCurrency 
        { 
            get
            {
                return toCurrency;
            }
            set
            {
                toCurrency = value.ToUpperInvariant();
            }
        }
        public double Amount { get; set; }
    }
}