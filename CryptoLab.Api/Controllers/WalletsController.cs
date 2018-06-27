using System.Threading.Tasks;
using CryptoLab.Infrastructure.Commands;
using CryptoLab.Infrastructure.Commands.Wallet;
using CryptoLab.Infrastructure.IServices;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CryptoLab.Api.Controllers
{
    public class WalletsController : BaseApiController
    {
        private readonly IWalletService _walletService; 
        
        public WalletsController(IWalletService walletService, ICommandDispatcher commandDispatcher) : base(commandDispatcher)
        {
            _walletService = walletService;
        }

        [HttpPost]
        [Route("[action]")]
        [Authorize(Policy = "user")]
        public async Task<IActionResult> AddWallet([FromBody]AddWallet command)
        {
            await DispatchAsync(command);

            return Ok();
        }
    }
}