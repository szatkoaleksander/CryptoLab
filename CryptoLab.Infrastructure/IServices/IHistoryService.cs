using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using CryptoLab.Domain.Domain;
using CryptoLab.Infrastructure.DTO;

namespace CryptoLab.Infrastructure.IServices
{
    public interface IHistoryService
    {
        Task<IEnumerable<HistoryDto>> GetAsyncBy(Guid userId, string currency, OperationType operationType);
        Task<IEnumerable<HistoryDto>> GetAllAsyncBy(string currency, OperationType operationType);
        Task<IEnumerable<HistoryDto>> GetAllAsyncBy(Guid userId);
        Task AddAsync(OperationType operationType, string currency, decimal amountOfMoney, decimal price, Guid userId);
    }
}