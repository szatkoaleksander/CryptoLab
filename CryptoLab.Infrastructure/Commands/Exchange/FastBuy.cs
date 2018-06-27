using System;
using CryptoLab.Infrastructure.Commands.Auth;

namespace CryptoLab.Infrastructure.Commands.Exchange
{
    public class FastBuy : AuthCommand
    {
        public string ToCurrency { get; set; }
        public double Amount { get; set; }
    }
}