using System.Threading.Tasks;
using CryptoLab.Infrastructure.Commands;
using CryptoLab.Infrastructure.Commands.Transaction;
using CryptoLab.Infrastructure.IServices;

namespace CryptoLab.Infrastructure.Handlers.Transaction
{
    public class FastSellHandler : ICommandHandler<FastSell>
    {
        private readonly ITransactionService _transactionService;

        public FastSellHandler(ITransactionService transactionService)
        {
            _transactionService = transactionService;
        }

        public async Task HandlerAsync(FastSell command)
        {
            await _transactionService.FastSellTransactionAsync(command.FromCurrency, command.Amount, command.UserId);
        }
    }
}