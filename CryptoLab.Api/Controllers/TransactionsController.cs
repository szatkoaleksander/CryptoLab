using System.Threading.Tasks;
using CryptoLab.Infrastructure.Commands;
using CryptoLab.Infrastructure.Commands.Transaction;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CryptoLab.Api.Controllers
{
    public class TransactionsController : BaseApiController
    {
        public TransactionsController(ICommandDispatcher commandDispatcher) : base(commandDispatcher)
        {
        }

        [HttpPost]
        [Route("[action]")]
        [Authorize(Policy = "user")]
        public async Task<IActionResult> FastBuy([FromBody]FastBuy command)
        {
            await DispatchAsync(command);

            return Ok();
        }

        [HttpPost]
        [Route("[action]")]
        [Authorize(Policy = "user")]
        public async Task<IActionResult> FastSell([FromBody]FastSell command)
        {
            await DispatchAsync(command);

            return Ok();
        }
    }
}