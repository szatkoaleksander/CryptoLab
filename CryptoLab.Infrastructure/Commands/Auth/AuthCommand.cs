using System;

namespace CryptoLab.Infrastructure.Commands.Auth
{
    public class AuthCommandBase : IAuthCommand
    {
        public Guid UserId { get; set; }
    }
}