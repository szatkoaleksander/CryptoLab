using System.Threading.Tasks;
using CryptoLab.Infrastructure.Commands;
using CryptoLab.Infrastructure.Commands.User;
using CryptoLab.Infrastructure.IServices;

namespace CryptoLab.Infrastructure.Handlers.User
{
    public class RegisterHandler : ICommandHandler<Register>
    {
        private readonly IUserService _userService;

        public RegisterHandler(IUserService userService)
        {
            _userService = userService;
        }

        public async Task HandlerAsync(Register command)
        {
            await _userService.RegisterAsync(command.Email, command.Username, command.Password, command.ConfirmPassword);
        }
    }
}