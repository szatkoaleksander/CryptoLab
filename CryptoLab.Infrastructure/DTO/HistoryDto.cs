using System;
using CryptoLab.Domain.Domain;

namespace CryptoLab.Infrastructure.DTO
{
    public class HistoryDto
    {
        public Guid Id { get; set; }
        public OperationType OperationType { get; set; }
        public string Currency { get; set; }
        public decimal AmountOfMoney { get; set; }
        public decimal Price { get; set; }
        public decimal Sum
        {
            get
            {
                return AmountOfMoney * Price;
            }
            set
            {
                Sum = value;
            }
        }
        public DateTime ExchangeTime { get; set; } 
    }
}