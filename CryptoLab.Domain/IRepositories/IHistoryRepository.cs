using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using CryptoLab.Domain.Domain;

namespace CryptoLab.Domain.IRepositories
{
    public interface IHistoryRepository
    {
        Task<History> GetAsync(Guid userId);
        Task<IEnumerable<History>> GetAllAsync();
        Task AddAsync(History hisotry);
        Task RemoveAsync(History hisotry); 
    }
}