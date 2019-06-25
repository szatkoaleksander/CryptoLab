using System.Threading.Tasks;
using CryptoLab.Domain.Domain;

namespace CryptoLab.Infrastructure.Hubs
{
    public interface IHistoryHub
    {
        Task Add(History history);
    }
}