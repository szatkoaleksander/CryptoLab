using System.Threading.Tasks;

namespace CryptoLab.Infrastructure.Commands
{
    public interface ICommandHandler<T> where T : ICommand
    {
         Task HandlerAsync(T command);
    }
}