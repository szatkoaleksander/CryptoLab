using CryptoLab.Domain.Domain;
using Microsoft.EntityFrameworkCore;

namespace CryptoLab.Infrastructure.EntityFramework
{
    public class Context : DbContext
    {
        public DbSet<User> User { get; set; }
        public DbSet<Wallet> Wallet { get; set; }
        public DbSet<History> History { get; set; }

        public Context(DbContextOptions<Context> options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<User>()
                .HasMany(x => x.Wallets)
                .WithOne(x => x.User)
                .HasForeignKey(x => x.UserId).IsRequired().OnDelete(DeleteBehavior.SetNull);

            builder.Entity<User>()
                .HasMany(x => x.Histories)
                .WithOne(x => x.User)
                .HasForeignKey(x => x.UserId).IsRequired().OnDelete(DeleteBehavior.SetNull);
        }
    }
}