using System;
using System.Threading.Tasks;
using CryptoLab.Infrastructure.Commands;
using CryptoLab.Infrastructure.Commands.Auth;
using CryptoLab.Infrastructure.Commands.Wallet;
using CryptoLab.Infrastructure.IServices;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace CryptoLab.Api.Controllers
{
    public class WalletsController : BaseApiController
    {
        private readonly IWalletService _walletService; 
        
        public WalletsController(IWalletService walletService, ICommandDispatcher commandDispatcher) : base(commandDispatcher)
        {
            _walletService = walletService;
        }

        [HttpGet]
        [Authorize(Policy = "user")]
        public async Task<IActionResult> GetWallets()
        {
            await DispatchAsync(new AuthCommand());

            var wallets = await _walletService.GetAllAsync(UserId);

            if(wallets == null)
            {
                return NotFound();
            }
            
            return Ok(wallets);
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