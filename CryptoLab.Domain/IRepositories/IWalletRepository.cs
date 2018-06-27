using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using CryptoLab.Domain.Domain;

namespace CryptoLab.Domain.IRepositories
{
    public interface IWalletRepository
    {
        Task<IEnumerable<Wallet>> GetByUserIdAsync(Guid userId);
        Task<IEnumerable<Wallet>> GetAllAsync();
        Task AddAsync(Wallet wallet);
        Task UpdateAsync(Wallet wallet);
    }
}