using System;
using CryptoLab.Domain.Domain;

namespace CryptoLab.Infrastructure.DTO
{
    public class HistoryDto
    {
        public Guid Id { get; protected set; }
        public OperationType OperationType { get; protected set; }
        public string Currency { get; protected set; }
        public decimal AmountOfMoney { get; protected set; }
        public decimal Price { get; protected set; }
        public DateTime ExchangeTime { get; protected set; } 
    }
}