using System.Collections.Generic;
using CryptoLab.Infrastructure.Commands.Auth;

namespace CryptoLab.Infrastructure.Commands.Wallet
{
    public class AddWallet : AuthCommand
    {
        public IEnumerable<string> Currencies { get; set; }
    }
}