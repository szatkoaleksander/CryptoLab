using System;

namespace CryptoLab.Infrastructure.Commands.Auth
{
    public interface IAuthCommand : ICommand
    {
        Guid UserId { get; set; }
    }
}