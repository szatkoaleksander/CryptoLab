using System;

namespace CryptoLab.Domain.Domain
{
    public class User
    {
        public Guid Id { get; protected set; }
        public string Email { get; protected set; }
        public string Username { get; protected set; }
        public string Password { get; protected set; }
        public string Salt { get; protected set; }
        public string Role { get; protected set; }
        public DateTime CreatedAt { get; protected set; }
        public DateTime UpdatedAt { get; protected set; }

        public User(string email, string username, string password, string salt, string role)
        {
            Id = Guid.NewGuid();
            
            SetEmail(email);
            SetUsername(username);
            SetPassword(password, salt);
            Role = role;

            CreatedAt = DateTime.UtcNow;
        }

        protected User() {}

        public void SetEmail(string email)
        {
            if(string.IsNullOrWhiteSpace(email))
            {
                throw new Exception("Email is invalid");
            }

            Email = email.ToLowerInvariant();
            UpdatedAt = DateTime.UtcNow;
        }

        public void SetUsername(string username)
        {
            if(string.IsNullOrWhiteSpace(username))
            {
                throw new Exception("Username is invalid");
            }

            Username = username;
            UpdatedAt = DateTime.UtcNow;
        }

        public void SetPassword(string password, string salt)
        {
            if(string.IsNullOrEmpty(password))
            {
                throw new Exception("Password can not be empty");
            }

            if(string.IsNullOrEmpty(salt))
            {
                throw new Exception("Salt can not be empty");
            }

            if(password.Length < 8)
            {
                throw new Exception("Password is to short");
            }

            if(password.Length > 5000)
            {
                throw new Exception("Password is to long");
            }

            Password = password;
            Salt = salt;
            UpdatedAt = DateTime.UtcNow;
        }
    }
}