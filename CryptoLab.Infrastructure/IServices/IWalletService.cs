using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using CryptoLab.Domain.Domain;

namespace CryptoLab.Infrastructure.IServices
{
    public interface IWalletService
    {
          Task<IEnumerable<Wallet>> GetAsync();
          Task AddAsync(string currency, Guid userId);
          Task UpdateAsync(string currency, double amountOfMoney, Guid userId, Guid walletId);

    }
}