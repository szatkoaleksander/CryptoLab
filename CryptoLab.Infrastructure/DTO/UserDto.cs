using System;
using System.Collections.Generic;

namespace CryptoLab.Infrastructure.DTO
{
    public class UserDto
    {
        public Guid Id { get; protected set; }
        public string Email { get; protected set; }
        public string Username { get; protected set; }
        public string Role { get; protected set; }
        public ICollection<WalletDto> Wallets { get; protected set; }
    }
}