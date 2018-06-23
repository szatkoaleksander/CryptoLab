using System;
using System.Threading.Tasks;
using CryptoLab.Domain.Domain;
using CryptoLab.Domain.IRepositories;
using CryptoLab.Infrastructure.IServices;

namespace CryptoLab.Infrastructure.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;

        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
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

        public async Task LoginAsync(string email, string password)
        {
            var user = await _userRepository.FindAsync(email);

        }

        public async Task RegisterAsync(string email, string username, string password)
        {
            var user = await _userRepository.FindAsync(email);

            if(user != null) 
                throw new Exception("User is exists");
        }

        public async Task RemoveAccountAsync(Guid id)
        {
            var user = await _userRepository.FindAsync(id);

            await _userRepository.RemoveAsync(user);
        }
    }
}