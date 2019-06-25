using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using CryptoLab.Infrastructure.DTO;

namespace CryptoLab.Infrastructure.IServices
{
    public interface IWalletService
    {
        Task<IEnumerable<WalletDto>> GetAllAsync(Guid userId);
        Task AddAsync(IEnumerable<string> currencies, Guid userId);
    }
}