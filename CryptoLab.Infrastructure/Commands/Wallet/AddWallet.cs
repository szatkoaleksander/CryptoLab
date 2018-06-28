using CryptoLab.Infrastructure.Commands.Auth;

namespace CryptoLab.Infrastructure.Commands.Wallet
{
    public class AddWallet : AuthCommand
    {
        public string Currency { get; set; }
    }
}