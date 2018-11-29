using System;
using System.Collections.Generic;

namespace CryptoLab.Infrastructure.DTO
{
    public class UserDto
    {
        public Guid Id { get; set; }
        public string Email { get; set; }
        public string Username { get; set; }
        public string Role { get; set; }
        public ICollection<WalletDto> Wallets { get; set; }
        public ICollection<HistoryDto> Histories { get; set; }
    }
}