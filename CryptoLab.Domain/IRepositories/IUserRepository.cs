using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using CryptoLab.Domain.Domain;

namespace CryptoLab.Domain.IRepositories
{
    public interface IUserRepository
    {
         Task<User> FindAsync(Guid id);
         Task<User> FindAsync(string email);
         Task<User> FindByUsernameAsync(string username);
         Task<IEnumerable<User>> GetAllAsync();
         Task AddAsync(User user);
         Task UpdateAsync(User user);
         Task RemoveAsync(User user); 
    }
}