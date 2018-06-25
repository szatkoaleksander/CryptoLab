using System;
using System.Threading.Tasks;

namespace CryptoLab.Infrastructure.IServices
{
    public interface IAccountService
    {
        Task LoginAsync(string email, string password);
        Task RemoveAccountAsync(Guid id);
    }
}