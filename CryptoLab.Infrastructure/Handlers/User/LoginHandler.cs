using System.Threading.Tasks;
using CryptoLab.Infrastructure.Commands;
using CryptoLab.Infrastructure.Commands.User;
using CryptoLab.Infrastructure.IServices;
using CryptoLab.Infrastructure.JWT;
using CryptoLab.Infrastructure.JWT.Extensions;
using Microsoft.Extensions.Caching.Memory;

namespace CryptoLab.Infrastructure.Handlers.User
{
    public class LoginHandler : ICommandHandler<Login>
    {
        private readonly IAccountService _accountService;
        private readonly IUserService _userService;
        private readonly IJwtHandler _jwtHandler;
        private readonly IMemoryCache _cache;

        public LoginHandler(IAccountService accountService, IUserService userService, IJwtHandler jwtHandler, IMemoryCache cache)
        {
            _accountService = accountService;
            _userService = userService;
            _jwtHandler = jwtHandler;
            _cache = cache;
        }

        public async Task HandlerAsync(Login command)
        {
            await _accountService.LoginAsync(command.Email, command.Password);

            var user = await _userService.FindAsync(command.Email);
            var jwt = _jwtHandler.CreateToken(user.Id, user.Role);
            _cache.SetJwt(command.TokenId, jwt);
        }
    }
}