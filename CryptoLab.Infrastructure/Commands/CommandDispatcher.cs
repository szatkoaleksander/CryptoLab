using System;
using System.Threading.Tasks;
using Autofac;

namespace CryptoLab.Infrastructure.Commands
{
    public class CommandDispatcher : ICommandDispatcher
    {
        private readonly IComponentContext _context;

        public CommandDispatcher(IComponentContext context)
        {
            _context = context;
        }
        
        public async Task DispatchAsync<T>(T command) where T : ICommand
        {
            if(command == null)
            {
                throw new Exception("Command cannot be null");
            }
            
            var handler = _context.Resolve<ICommandHandler<T>>();
            await handler.HandlerAsync(command);
        }
    }
}