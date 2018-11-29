using System.Threading.Tasks;
using CryptoLab.Infrastructure.Commands;
using CryptoLab.Infrastructure.Commands.Auth;

namespace CryptoLab.Infrastructure.Handlers.User
{
    public class AuthHandler : ICommandHandler<AuthCommand>
    {
        public AuthHandler()
        {
        }

        public async Task HandlerAsync(AuthCommand command)
        {
            await Task.CompletedTask;
        }
    }
}