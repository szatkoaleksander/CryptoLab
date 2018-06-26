using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using CryptoLab.Domain.Domain;

namespace CryptoLab.Domain.IRepositories
{
    public interface IWalletRepository
    {
        Task<IEnumerable<Wallet>> GetByUserId(Guid userId);
        Task<IEnumerable<Wallet>> GetAsync();
        Task AddAsync(Wallet wallet);
        Task UpdateAsync(Wallet wallet);
    }
}