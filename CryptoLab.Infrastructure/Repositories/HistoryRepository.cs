using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using CryptoLab.Domain.Domain;
using CryptoLab.Domain.IRepositories;
using CryptoLab.Infrastructure.EntityFramework;
using Microsoft.EntityFrameworkCore;

namespace CryptoLab.Infrastructure.Repositories
{
    public class HistoryRepository : IHistoryRepository
    {
        private readonly Context _context;

        public HistoryRepository(Context context)
        {
            _context = context;
        }

        public async Task<History> GetAsync(Guid userId)
            => await _context.History.SingleOrDefaultAsync(x => x.UserId == userId);
        
        public async Task<IEnumerable<History>> GetAllAsync()
           => await _context.History.ToListAsync();

        public async Task AddAsync(History history)
        {
            await _context.History.AddAsync(history);
            await _context.SaveChangesAsync();
        }

        public async Task RemoveAsync(History history)
        {
            _context.History.Remove(history);
            await _context.SaveChangesAsync();
        }
    }
}