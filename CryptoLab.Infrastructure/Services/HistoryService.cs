using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using CryptoLab.Domain.Domain;
using CryptoLab.Domain.IRepositories;
using CryptoLab.Infrastructure.DTO;
using CryptoLab.Infrastructure.Hubs;
using CryptoLab.Infrastructure.IServices;
using CryptoLab.Infrastructure.CryptoCompareApi;
using Microsoft.AspNetCore.SignalR;

namespace CryptoLab.Infrastructure.Services
{
    public class HistoryService : IHistoryService
    {
        private readonly IHistoryRepository _historyRepository;
        private readonly IUserRepository _userRepository;
        private readonly IHubContext<HistoryHub> _context;
        private readonly IMapper _mapper;

        public HistoryService(IHistoryRepository historyRepository, IUserRepository userRepositor, 
            IHubContext<HistoryHub> context, IMapper mapper)
        {
            _historyRepository = historyRepository;
            _userRepository = userRepositor;
            _context = context;
            _mapper = mapper;
        }

        public async Task<IEnumerable<HistoryDto>> GetAsyncBy(Guid userId, string currency, OperationType operationType)
        {
            var userHistories = await _historyRepository.GetAllAsyncBy(userId, currency, operationType);

            return _mapper.Map<IEnumerable<History>, IEnumerable<HistoryDto>>(userHistories);
        }

        public async Task<IEnumerable<HistoryDto>> GetAllAsyncBy(string currency, OperationType operationType)
        {
            var userHistories = await _historyRepository.GetAllAsyncBy(currency, operationType);

            return _mapper.Map<IEnumerable<History>, IEnumerable<HistoryDto>>(userHistories);
        }

        public async Task<IEnumerable<HistoryDto>> GetAllAsyncBy(Guid userId)
        {
            var userHistories = await _historyRepository.GetAllAsyncBy(userId);

            return _mapper.Map<IEnumerable<History>, IEnumerable<HistoryDto>>(userHistories);
        }

        public async Task AddAsync(OperationType operationType, string currency, decimal amountOfMoney, decimal price, Guid userId)
        {
            var user = await _userRepository.FindAsync(userId);

            if(user == null)
                throw new Exception("User is not exist");            
            
            var history = new History(operationType, currency, amountOfMoney, price, user);
            await _historyRepository.AddAsync(history); 

            await _context.Clients.All.SendAsync("Add", _mapper.Map<History, HistoryDto>(history));
        }
    }
}