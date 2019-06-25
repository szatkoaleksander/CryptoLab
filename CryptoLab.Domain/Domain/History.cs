using System;

namespace CryptoLab.Domain.Domain
{
    public class History
    {
        public Guid Id { get; protected set; }
        public OperationType OperationType { get; protected set; }
        public string Currency { get; protected set; }
        public decimal AmountOfMoney { get; protected set; }
        public decimal Price { get; protected set; }
        public DateTime ExchangeTime { get; protected set; } 
        public Guid UserId { get; protected set; }
        public User User { get; protected set; }

        public History(OperationType operationType, string currency, decimal amountOfMoney, decimal price, User user)
        {
            Id = Guid.NewGuid();
            OperationType = operationType;
            Currency = currency;
            AmountOfMoney = amountOfMoney;
            Price = price;

            ExchangeTime = DateTime.UtcNow;

            User = user;
            UserId = user.Id;
        }

        protected History() {}
    }
}