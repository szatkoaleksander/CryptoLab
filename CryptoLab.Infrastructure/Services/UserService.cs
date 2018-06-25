using System;
using System.Threading.Tasks;
using CryptoLab.Domain.Domain;
using CryptoLab.Domain.IRepositories;
using CryptoLab.Infrastructure.IServices;
using CryptoLab.Infrastructure.JWT;

namespace CryptoLab.Infrastructure.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly IEncrypter _encrypter;

        public UserService(IUserRepository userRepository, IEncrypter encrypter)
        {
            _userRepository = userRepository;
            _encrypter = encrypter;
        }

        public async Task<User> FindAsync(Guid id)
        {
            var user = await _userRepository.FindAsync(id);

            return user;
        }

        public async Task<User> FindAsync(string email)
        {
            var user = await _userRepository.FindAsync(email);

            return user;
        }

        public async Task RegisterAsync(string email, string username, string password)
        {
            var user = await _userRepository.FindAsync(email);
            if(user != null) 
                throw new Exception("User is exists");

            var salt = _encrypter.GetSalt(password);
            var hash = _encrypter.GetHash(password, salt);

            user = new User(email, username, hash, salt, "user");

            await _userRepository.AddAsync(user);
        }
    }
}