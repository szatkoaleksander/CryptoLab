using System.Threading.Tasks;
using CryptoLab.Domain.Domain;
using CryptoLab.Domain.IRepositories;
using CryptoLab.Infrastructure.JWT;
using CryptoLab.Infrastructure.Services;
using Moq;
using Xunit;
using System.Linq;

namespace CryptoLab.Test.Services
{
    public class UserServiceTests
    {
        [Fact]
        public async Task WhenCallingRegisterAsync_UserShouldBeCreated()
        {
            var userRepositoryMock = new Mock<IUserRepository>();
            var encrypterMock = new Mock<IEncrypter>();
            encrypterMock.Setup(x => x.GetSalt(It.IsAny<string>())).Returns("hash_hash_hash");
            encrypterMock.Setup(x => x.GetHash(It.IsAny<string>(),It.IsAny<string>())).Returns("salt_salt_salt"); 

            var userService = new UserService(userRepositoryMock.Object, encrypterMock.Object);
            await userService.RegisterAsync("test@test.com", "username1234", "hash");

            userRepositoryMock.Verify(x => x.AddAsync(It.IsAny<User>()), Times.Once);
        }
    }
}