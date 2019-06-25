using System.Threading.Tasks;
using CryptoLab.Domain.Domain;
using CryptoLab.Infrastructure.Commands;
using CryptoLab.Infrastructure.Commands.Transaction;
using CryptoLab.Infrastructure.CryptoCompareApi;
using CryptoLab.Infrastructure.IServices;

namespace CryptoLab.Infrastructure.Handlers.Transaction
{
    public class FastSellHandler : ICommandHandler<FastSell>
    {
        private readonly ITransactionService _transactionService;
        private readonly IHistoryService _historyService;

        public FastSellHandler(ITransactionService transactionService, IHistoryService historyService)
        {
            _transactionService = transactionService;
            _historyService = historyService;
        }

        public async Task HandlerAsync(FastSell command)
        {
            await _transactionService.FastSellTransactionAsync(command.FromCurrency, command.Amount, command.UserId);

            var price = await CryptoCompare.GetCryptoPriceInUsd(command.FromCurrency);
            await _historyService.AddAsync(OperationType.Sell, command.FromCurrency, command.Amount, price, command.UserId);
        }
    }
}