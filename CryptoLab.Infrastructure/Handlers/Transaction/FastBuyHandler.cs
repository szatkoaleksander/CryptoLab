using System.Threading.Tasks;
using CryptoLab.Domain.Domain;
using CryptoLab.Infrastructure.Commands;
using CryptoLab.Infrastructure.Commands.Transaction;
using CryptoLab.Infrastructure.CryptoCompareApi;
using CryptoLab.Infrastructure.IServices;

namespace CryptoLab.Infrastructure.Handlers.Transaction
{
    public class FastBuyHandler : ICommandHandler<FastBuy>
    {
        private readonly ITransactionService _transactionService;
        private readonly IHistoryService _historyService;

        public FastBuyHandler(ITransactionService transactionService, IHistoryService historyService)
        {
            _transactionService = transactionService;
            _historyService = historyService;
        }

        public async Task HandlerAsync(FastBuy command)
        {
            await _transactionService.FastBuyTransactionAsync(command.ToCurrency, command.Amount, command.UserId);

            var price = await CryptoCompare.GetCryptoPriceInUsd(command.ToCurrency);
            await _historyService.AddAsync(OperationType.Buy, command.ToCurrency, command.Amount, price, command.UserId);
        }
    }
}