namespace CryptoLab.Api.Controllers
{
    using System;
    using System.Threading.Tasks;
    using global::CryptoLab.Infrastructure.Commands;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;

    namespace CryptoLab.Api.Controllers
    {
        public class HomeController : BaseApiController
        {
            public HomeController(ICommandDispatcher commandDispatcher) : base(commandDispatcher)
            {

            }

            [HttpGet]
            // [Route("/")]
            [AllowAnonymous]
            public IActionResult HelloWorld()
            {
                return Ok("CryptoLab API");
            }
        }
    }
}