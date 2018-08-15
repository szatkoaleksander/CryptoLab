using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CryptoLab.Domain.Domain;
using CryptoLab.Domain.IRepositories;
using CryptoLab.Infrastructure.EntityFramework;
using Microsoft.EntityFrameworkCore;

namespace CryptoLab.Infrastructure.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly Context _context;

        public UserRepository(Context context)
        {
            _context = context;
        }
        
        public async Task<User> FindAsync(Guid id)
           => await _context.User.Include(x => x.Wallets).SingleOrDefaultAsync(x => x.Id == id);

        public async Task<User> FindAsync(string email)
           => await _context.User.Include(x => x.Wallets).SingleOrDefaultAsync(x => x.Email == email);

        public async Task<User> FindByUsernameAsync(string username)
            => await _context.User.Include(x => x.Wallets).SingleOrDefaultAsync(x => x.Username == username);

           
        public async Task<IEnumerable<User>> GetAllAsync()
            => await _context.User.ToListAsync();

        public async Task AddAsync(User user)
        {
            await _context.User.AddAsync(user);
            await _context.SaveChangesAsync();
        }
        public async Task UpdateAsync(User user)
        {
            _context.User.Update(user);
            await _context.SaveChangesAsync();
        }

        public async Task RemoveAsync(User user)
        {
            _context.User.Remove(user);
            await _context.SaveChangesAsync();
        }
    }
}