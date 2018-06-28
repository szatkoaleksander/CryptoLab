using System;
using System.Threading.Tasks;
using AutoMapper;
using CryptoLab.Domain.Domain;
using CryptoLab.Domain.IRepositories;
using CryptoLab.Infrastructure.DTO;
using CryptoLab.Infrastructure.IServices;
using CryptoLab.Infrastructure.JWT;

namespace CryptoLab.Infrastructure.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly IEncrypter _encrypter;
        private readonly IMapper _mapper;

        public UserService(IUserRepository userRepository, IEncrypter encrypter, IMapper mapper)
        {
            _userRepository = userRepository;
            _encrypter = encrypter;
            _mapper = mapper;
        }

        public async Task<UserDto> FindAsync(Guid id)
        {
            var user = await _userRepository.FindAsync(id);

            return _mapper.Map<User, UserDto>(user);
        }

        public async Task<UserDto> FindAsync(string email)
        {
            var user = await _userRepository.FindAsync(email);

            return _mapper.Map<User, UserDto>(user);
        }

        public async Task RegisterAsync(string email, string username, string password)
        {
            var user = await _userRepository.FindAsync(email);
            var userUsername = await _userRepository.FindByUsernameAsync(username);

            if(user != null) 
                throw new Exception("User is exists");

            if(userUsername != null && userUsername.Username == username) 
                throw new Exception("User is exists");

            var salt = _encrypter.GetSalt(password);
            var hash = _encrypter.GetHash(password, salt);

            user = new User(email, username, hash, salt, "user");

            await _userRepository.AddAsync(user);
        }
    }
}