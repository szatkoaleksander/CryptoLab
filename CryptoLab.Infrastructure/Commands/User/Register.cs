namespace CryptoLab.Infrastructure.Commands.User
{
    public class Register : ICommand
    {
        public string Email { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
    }
}