using System;

namespace CryptoLab.Infrastructure.Commands.Auth
{
    public class AuthCommand : IAuthCommand
    {
        public Guid UserId { get; set; }
    }
}