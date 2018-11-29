using System.Threading.Tasks;
using CryptoLab.Infrastructure.Commands;
using CryptoLab.Infrastructure.Commands.Wallet;
using CryptoLab.Infrastructure.IServices;

namespace CryptoLab.Infrastructure.Handlers.Wallet
{
    public class AddWalletHandler : ICommandHandler<AddWallet>
    {
        private readonly IWalletService _walletService;

        public AddWalletHandler(IWalletService walletService)
        {
            _walletService = walletService;
        }

        public async Task HandlerAsync(AddWallet command)
        {
            await _walletService.AddAsync(command.Currencies, command.UserId);
        }
    }
}