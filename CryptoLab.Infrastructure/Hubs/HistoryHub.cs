using System.Threading.Tasks;
using CryptoLab.Domain.Domain;
using CryptoLab.Infrastructure.DTO;
using Microsoft.AspNetCore.SignalR;

namespace CryptoLab.Infrastructure.Hubs
{
    public class HistoryHub : Hub<IHistoryHub>
    {
        public async Task Add(History history)
            => await Clients.All.Add(history);
    }
}