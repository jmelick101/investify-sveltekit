import { writable } from 'svelte/store';

// System settings store - will be populated from database
export const SYSTEM = writable({
    tokenSymbol: 'PRTP',
    siteName: 'Investify',
    company: 'Investify Wealth Management',
    email: 'info@investify.com',
    phone: '+1 (888) 555-0123',
    address: '123 Main St',
    city: 'New York',
    state: 'New York',
    zipCode: '12345',
    country: 'USA',
    tokenMultiplier: 0.8,
    supportedDocuments: [
        {
            name: 'Passport',
            value: 'passport',
        },
        {
            name: "Driver's License",
            value: 'drivers_license',
        },
        {
            name: 'National ID',
            value: 'national_id',
        },
    ],
});

export const SUPPORT_CRYPTOS = writable([
    {
        name: 'Bitcoin',
        symbol: 'BTC',
        icon: 'bitcoin',
    },
    {
        name: 'Ethereum',
        symbol: 'ETH',
        icon: 'ethereum',
    },
    {
        name: 'Tether',
        symbol: 'USDT',
        icon: 'tether',
    },
    {
        name: 'Binance Coin',
        symbol: 'BNB',
        icon: 'binance',
    },
]);
