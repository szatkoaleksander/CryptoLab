using System.Threading.Tasks;

namespace CryptoLab.Infrastructure.Commands
{
    public interface ICommandDispatcher
    {
         Task DispatchAsync<T>(T command) where T : ICommand;
    }
}