using System;
using System.Threading.Tasks;
using CryptoLab.Infrastructure.Commands;
using CryptoLab.Infrastructure.Commands.User;
using CryptoLab.Infrastructure.JWT.Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;

namespace CryptoLab.Api.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly IMemoryCache _cache;
        
        public AccountController(IMemoryCache cache, ICommandDispatcher commandDispatcher) : base(commandDispatcher)
        {
            _cache = cache;
        }

        [HttpPost]
        [Route("[action]")]
        [AllowAnonymous]
        public async Task<IActionResult> Login([FromBody]Login command)
        {
            command.TokenId = Guid.NewGuid();
            await DispatchAsync(command);

            var jwt = _cache.GetJwt(command.TokenId);

            return Json(jwt);
        }
    }
}