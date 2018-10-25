using System;
using System.Threading.Tasks;
using CryptoLab.Infrastructure.Commands;
using CryptoLab.Infrastructure.Commands.User;
using CryptoLab.Infrastructure.IServices;
using CryptoLab.Infrastructure.JWT.Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;

namespace CryptoLab.Api.Controllers
{
    public class UsersController : BaseApiController
    {
        private readonly IUserService _userService;
        private readonly IMemoryCache _cache;

        public UsersController(IUserService userService, IMemoryCache cache,
            ICommandDispatcher commandDispatcher) : base(commandDispatcher)
        {
            _userService = userService;
            _cache = cache;
        }
        
        [HttpGet]
        [Route("{id:guid}")]
        [Authorize(Policy = "user")]
        public async Task<IActionResult> Get(Guid id)
        {
            var user = await _userService.FindAsync(id);

            if(user == null)
            {
                return NotFound();
            }
            
            return Ok(user);
        }

        [HttpGet]
        [Route("{email}")]
        [Authorize(Policy = "user")]
        public async Task<IActionResult> Get(string email)
        {
            var user = await _userService.FindAsync(email);

            if(user == null)
            {
                return NotFound();
            }
            
            return Ok(user);
        }

        [HttpGet]
        [Route("me")]
        [Authorize(Policy = "user")]
        public async Task<IActionResult> GetMe()
        {
            var user = await _userService.FindAsync(UserId);

            if(user == null)
            {
                return NotFound();
            }
            
            return Ok(user);
        }

        [HttpPost]
        [Route("[action]")]
        [AllowAnonymous]
        public async Task<IActionResult> Register([FromBody]Register command)
        {
            await DispatchAsync(command);

            return Created($"users/{command.Email}", new object());
        }
    }
}