using System;
using System.Threading.Tasks;
using CryptoLab.Domain.Domain;

namespace CryptoLab.Domain.IRepositories
{
    public interface IUserRepository
    {
         Task<User> FindAsync(Guid id);
         Task<User> FindAsync(string email);
         Task AddAsync(User user);
         Task UpdateAsync(User user);
         Task RemoveAsync(User user); 
    }
}