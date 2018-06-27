using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using CryptoLab.Domain.Domain;

namespace CryptoLab.Infrastructure.IServices
{
    public interface IWalletService
    {
          Task<IEnumerable<Wallet>> RankingAsync();
          Task AddAsync(string currency, Guid userId);
    }
}