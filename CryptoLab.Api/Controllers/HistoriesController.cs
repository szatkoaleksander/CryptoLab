using System;
using System.Threading.Tasks;
using CryptoLab.Domain.Domain;
using CryptoLab.Infrastructure.Commands;
using CryptoLab.Infrastructure.Commands.Auth;
using CryptoLab.Infrastructure.Hubs;
using CryptoLab.Infrastructure.IServices;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

namespace CryptoLab.Api.Controllers
{
    public class HistoriesController : BaseApiController
    {
        private readonly IHistoryService _historyService;

        public HistoriesController(IHistoryService historyService, ICommandDispatcher commandDispatcher) : base(commandDispatcher)
        {
            _historyService = historyService;
        }

        [HttpGet]
        [Route("{currency}/{operationType}")]
        [Authorize(Policy = "user")]
        public async Task<IActionResult> GetAllHistories(string currency, OperationType operationType)
        {
            var histories = await _historyService.GetAllAsyncBy(currency, operationType);
            
            return Ok(histories);
        }

        [HttpGet]
        [Route("[action]")]
        [Authorize(Policy = "user")]
        public async Task<IActionResult> UserHistories()
        {
            var histories = await _historyService.GetAllAsyncBy(UserId);

            if(histories == null)
            {
                return NotFound();
            }
            
            return Ok(histories);
        }
    }
}