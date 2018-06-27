using System.Threading.Tasks;
using CryptoLab.Infrastructure.Commands;
using CryptoLab.Infrastructure.Commands.Transaction;
using CryptoLab.Infrastructure.IServices;

namespace CryptoLab.Infrastructure.Handlers.Transaction
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