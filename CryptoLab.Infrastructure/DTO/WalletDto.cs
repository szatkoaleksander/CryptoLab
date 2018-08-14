using System;

namespace CryptoLab.Infrastructure.DTO
{
    public class WalletDto
    {
        public Guid Id { get; protected set; }
        public string Currency { get; protected set; }
        public double AmountOfMoney { get; protected set; }
        public Guid UserId { get; protected set; }
    }
}