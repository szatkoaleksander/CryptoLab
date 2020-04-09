using System;
using System.Threading.Tasks;
using CryptoLab.Infrastructure.DTO;

namespace CryptoLab.Infrastructure.IServices
{
    public interface IUserService
    {
        Task<UserDto> FindAsync(Guid id);
        Task<UserDto> FindAsync(string email);
        Task RegisterAsync(string email, string username, string password, string confirmPassword);
    }
}