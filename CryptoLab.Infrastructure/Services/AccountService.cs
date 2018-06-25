using System;
using System.Threading.Tasks;
using CryptoLab.Domain.IRepositories;
using CryptoLab.Infrastructure.IServices;
using CryptoLab.Infrastructure.JWT;

namespace CryptoLab.Infrastructure.Services
{
    public class AccountService : IAccountService
    {
        private readonly IUserRepository _userRepository;
        private readonly IEncrypter _encrypter;

        public AccountService(IUserRepository userRepository, IEncrypter encrypter)
        {
            _userRepository = userRepository;
            _encrypter = encrypter;
        }

        public async Task LoginAsync(string email, string password)
        {
            var user = await _userRepository.FindAsync(email);

            if(user == null)
            {
                throw new Exception("Invalid credentials");
            }

            var salt = _encrypter.GetSalt(password);
            var hash = _encrypter.GetHash(password, user.Salt);

            if(hash == null)
            {
                throw new Exception("Invalid credentials");
            }

            if(user.Password == hash)
            {
                return;
            }

            throw new Exception("Invalid credentials");
        }

        public async Task RemoveAccountAsync(Guid id)
        {
            var user = await _userRepository.FindAsync(id);

            await _userRepository.RemoveAsync(user);
        }
    }
}