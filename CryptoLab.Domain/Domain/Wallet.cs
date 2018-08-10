using System;

namespace CryptoLab.Domain.Domain
{
    public class Wallet
    {
        public Guid Id { get; protected set; }
        public string Currnecy { get; protected set; }
        public decimal AmountOfMoney { get; protected set; }
        public DateTime UpdatedAt { get; protected set; }
        public Guid UserId { get; protected set; }
        public User User { get; protected set; }
        


        public Wallet(string currency, decimal amountOfMoney, User user)
        {
            Id = Guid.NewGuid();
            SetCurrnecy(currency);
            SetAmountOfMoney(amountOfMoney);

            UpdatedAt = DateTime.Now;

            UserId = user.Id;
            User = user;
        }

        protected Wallet() {}

        public void SetCurrnecy(string currency)
        {
            Currnecy = currency.ToUpperInvariant();
        }

        public void SetAmountOfMoney(decimal amountOfMoney)
        {
            if(amountOfMoney < 0.0m)
                throw new Exception("Amount of money can not be null");

            AmountOfMoney = amountOfMoney;
        }
    }
}