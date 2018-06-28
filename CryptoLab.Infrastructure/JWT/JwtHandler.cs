using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using CryptoLab.Infrastructure.DTO;
using CryptoLab.Infrastructure.JWT.Extensions;

namespace CryptoLab.Infrastructure.JWT
{
    public class JwtHandler : IJwtHandler
    {
        public JwtHandler()
        {
        }
        
        public JwtDto CreateToken(Guid userId, string role)
        {
            var now = DateTime.UtcNow;

            var claims = new Claim[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, userId.ToString()),
                new Claim(JwtRegisteredClaimNames.UniqueName, userId.ToString()),
                new Claim(ClaimTypes.Role, role),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(JwtRegisteredClaimNames.Iat, now.ToTimestamp().ToString(), ClaimValueTypes.Integer64)
            };

            var expires = now.AddMinutes(60);
            var signiagCredentials = new SigningCredentials(
                new SymmetricSecurityKey(Encoding.UTF8.GetBytes("000_cat_test_key_123")), SecurityAlgorithms.HmacSha256);
            
            var jwt = new JwtSecurityToken
            (
                issuer: "http://localhost:5000",
                claims: claims,
                notBefore: now,
                expires: expires,
                signingCredentials: signiagCredentials 
            );

            var token = new JwtSecurityTokenHandler().WriteToken(jwt);

            return new JwtDto
            {
                Token = token,
                Expires = expires.ToTimestamp()
            };
        }
    }
}