const TradeService = {
    getExampleTrades: () => {
        // Example trade data
        return [
            { tradeDateTime: '2024-03-26 09:00:00', stockName: 'AAPL', listingPrice: 150, quantity: 100, type: 'Buy', pricePerUnit: 1500 },
            { tradeDateTime: '2024-03-26 09:30:00', stockName: 'GOOGL', listingPrice: 2500, quantity: 50, type: 'Sell', pricePerUnit: 2400 },
            { tradeDateTime: '2024-03-26 10:00:00', stockName: 'MSFT', listingPrice: 300, quantity: 200, type: 'Buy', pricePerUnit: 310 }
        ];
    }
};

export default TradeService;