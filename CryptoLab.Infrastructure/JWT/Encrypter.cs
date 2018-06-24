using System;
using System.Security.Cryptography;

namespace CryptoLab.Infrastructure.JWT
{
    public class Encrypter : IEncrypter
    {
        private static readonly int DeriveBytestIterationsCount = 10000;
        private static readonly int SaltSize = 40;

        public string GetSalt(string value)
        {
            if(value == string.Empty)
            {
                throw new Exception("Can not create salt");
            }

            var random = new Random();
            var saltBytes = new byte[SaltSize];
            var rng = RandomNumberGenerator.Create();
            rng.GetBytes(saltBytes);

            return Convert.ToBase64String(saltBytes);
        }

        public string GetHash(string value, string salt)
        {
            if(value == "")
            {
                throw new Exception("value can not be empty");
            }
            if(salt == "")
            {
                throw new Exception("salt can not be empty");
            }

            var pbkdf2 = new Rfc2898DeriveBytes(value, GetBytes(salt), DeriveBytestIterationsCount);

            return Convert.ToBase64String(pbkdf2.GetBytes(SaltSize));
        }

        private static byte[] GetBytes(string value)
        {
            var bytes = new byte[value.Length * sizeof(char)];
            Buffer.BlockCopy(value.ToCharArray(), 0, bytes, 0, bytes.Length);

            return bytes;
        }
    }
}