using System;

namespace CryptoLab.Infrastructure.DTO
{
    public class WalletDto
    {
        public Guid Id { get; set; }
        public string Currency { get; set; }
        public double AmountOfMoney { get; set; }
    }
}