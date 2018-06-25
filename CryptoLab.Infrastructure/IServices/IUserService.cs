using System;
using System.Threading.Tasks;
using CryptoLab.Domain.Domain;

namespace CryptoLab.Infrastructure.IServices
{
    public interface IUserService
    {
        Task<User> FindAsync(Guid id);
        Task<User> FindAsync(string email);
        Task RegisterAsync(string email, string username, string password);
    }
}