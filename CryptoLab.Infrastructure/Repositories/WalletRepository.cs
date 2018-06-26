using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using CryptoLab.Domain.Domain;
using CryptoLab.Domain.IRepositories;
using CryptoLab.Infrastructure.EntityFramework;
using Microsoft.EntityFrameworkCore;

namespace CryptoLab.Infrastructure.Repositories
{
    public class WalletRepository : IWalletRepository
    {
        private readonly Context _context;

        public WalletRepository(Context context)
        {
            _context = context;
        }
        public async Task<IEnumerable<Wallet>> GetAsync()
           => await _context.Wallet.ToListAsync();

        public async Task AddAsync(Wallet wallet)
        {
            await _context.Wallet.AddAsync(wallet);
            await _context.SaveChangesAsync();
        }
        public async Task UpdateAsync(Wallet wallet)
        {
            _context.Wallet.Update(wallet);
            await _context.SaveChangesAsync();
        }
    }
}