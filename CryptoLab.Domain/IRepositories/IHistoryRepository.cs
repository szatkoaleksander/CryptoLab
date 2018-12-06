using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using CryptoLab.Domain.Domain;

namespace CryptoLab.Domain.IRepositories
{
    public interface IHistoryRepository
    {
        Task<IEnumerable<History>> GetAllAsyncBy(Guid userId, string currency, OperationType operationType);
        Task<IEnumerable<History>> GetAllAsyncBy(string currency, OperationType operationType);
        Task<IEnumerable<History>> GetAllAsyncBy(Guid userId);
        Task AddAsync(History hisotry);
        Task RemoveAsync(History hisotry); 
    }
}