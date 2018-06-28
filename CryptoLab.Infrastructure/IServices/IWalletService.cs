using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using CryptoLab.Domain.Domain;

namespace CryptoLab.Infrastructure.IServices
{
    public interface IWalletService
    {
          Task<Dictionary<string, double>> RankingAsync();
          Task AddAsync(string currency, Guid userId);
    }
}