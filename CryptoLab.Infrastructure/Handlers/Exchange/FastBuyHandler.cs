using System.Threading.Tasks;
using CryptoLab.Infrastructure.Commands;
using CryptoLab.Infrastructure.Commands.Exchange;
using CryptoLab.Infrastructure.IServices;

namespace CryptoLab.Infrastructure.Handlers.Exchange
{
    public class FastBuyHandler : ICommandHandler<FastBuy>
    {
        private readonly ITransactionService _transactionService;

        public FastBuyHandler(ITransactionService transactionService)
        {
            _transactionService = transactionService;
        }

        public async Task HandlerAsync(FastBuy command)
        {
            await _transactionService.FastBuyTransactionAsync(command.ToCurrency, command.Amount, command.UserId);
        }
    }
}