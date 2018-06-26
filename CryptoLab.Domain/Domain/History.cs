using System;

namespace CryptoLab.Domain.Domain
{
    public class History
    {
        public Guid Id { get; protected set; }
        public bool BuySell { get; protected set; }
        public string Currnecy { get; protected set; }
        public double AmountOfMoney { get; protected set; }
        public decimal Price { get; protected set; }
        public DateTime ExchangeTime { get; protected set; } 
        public Guid UserId { get; protected set; }
        public User User { get; protected set; }

        public History(bool buySell, string currnecy, double amountOfMoney, decimal price, User user)
        {
            Id = Guid.NewGuid();
            BuySell = buySell;
            Currnecy = currnecy;
            AmountOfMoney = amountOfMoney;
            Price = price;

            ExchangeTime = DateTime.UtcNow;

            User = user;
            UserId = user.Id;
        }

        protected History() {}
    }
}