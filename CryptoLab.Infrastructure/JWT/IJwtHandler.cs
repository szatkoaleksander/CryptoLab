using System;
using CryptoLab.Infrastructure.DTO;

namespace CryptoLab.Infrastructure.JWT
{
    public interface IJwtHandler
    {
         JwtDto CreateToken(Guid userId, string role);
    }
}