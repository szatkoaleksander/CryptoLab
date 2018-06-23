using CryptoLab.Domain.Domain;
using Microsoft.EntityFrameworkCore;

namespace CryptoLab.Infrastructure.EntityFramework
{
    public class Context : DbContext
    {
        public DbSet<User> User { get; set; }

        public Context(DbContextOptions<Context> options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
        }
    }
}