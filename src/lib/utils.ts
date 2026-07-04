import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export function copy(text: string, message?: string): void {
	if (typeof navigator !== 'undefined' && navigator.clipboard) {
		navigator.clipboard.writeText(text);
	}
}

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
	return new Intl.NumberFormat('en-GB', {
		style: 'currency',
		currency: 'GBP',
		maximumFractionDigits: 0
	}).format(amount);
}

export function formatNumber(num: number): string {
	return new Intl.NumberFormat('en-GB').format(num);
}

export function formatDateExt(dt: string): string {
	const date = new Date(dt);
	return date.toLocaleDateString('en-GB', {
		year: 'numeric',
		month: 'short',
		day: 'numeric',
		hour: 'numeric',
		minute: 'numeric',
		hour12: false
	});
}

export function formatDateDay(dt: string): string {
	const date = new Date(dt);
	return date.toLocaleString('default', {
		year: 'numeric',
		month: 'short',
		day: 'numeric'
	});
}

export function timeAgo(date: string | Date | null): string {
	if (!date) return '';
	return dayjs(date).fromNow();
}

export function linkTransform(link: string): string {
	let videoId = link.split('v=')[1];
	if (!videoId) {
		videoId = link.split('youtu.be/')[1];
	}
	if (videoId) {
		return `https://www.youtube.com/embed/${videoId}`;
	}

	const vimeoRegex = /(?:vimeo\.com\/)(\d+)/;
	const vimeoMatch = link.match(vimeoRegex);
	if (vimeoMatch) {
		return `https://player.vimeo.com/video/${vimeoMatch[1]}`;
	}

	return link;
}

let exchangeRateCache: { rate: number; timestamp: number } | null = null;
const EXCHANGE_RATE_CACHE_DURATION = 3600000;

export async function convertGBPToUSD(gbpAmount: number): Promise<number | null> {
	try {
		const now = Date.now();
		if (exchangeRateCache && now - exchangeRateCache.timestamp < EXCHANGE_RATE_CACHE_DURATION) {
			return gbpAmount * exchangeRateCache.rate;
		}
		const response = await fetch('https://api.exchangerate-api.com/v4/latest/GBP');
		if (!response.ok) throw new Error('Failed to fetch exchange rate');
		const data = await response.json();
		const rate = data.rates?.USD;
		if (!rate) throw new Error('USD exchange rate not available');
		exchangeRateCache = { rate, timestamp: now };
		return gbpAmount * rate;
	} catch (error) {
		console.error('Error converting GBP to USD:', error);
		return null;
	}
}

const cryptoPriceCache: Record<string, { price: number; timestamp: number }> = {};
const CACHE_DURATION = 60000;

export async function convertUSDToCrypto(
	usdAmount: number,
	cryptoSymbol: string
): Promise<{ amount: number; symbol: string; formattedAmount: string } | null> {
	try {
		const cryptoIdMap: Record<string, { id: string; symbol: string }> = {
			bitcoin: { id: 'bitcoin', symbol: 'BTC' },
			btc: { id: 'bitcoin', symbol: 'BTC' },
			ethereum: { id: 'ethereum', symbol: 'ETH' },
			eth: { id: 'ethereum', symbol: 'ETH' },
			usdt: { id: 'tether', symbol: 'USDT' },
			tether: { id: 'tether', symbol: 'USDT' },
			bnb: { id: 'binancecoin', symbol: 'BNB' },
			binancecoin: { id: 'binancecoin', symbol: 'BNB' }
		};
		const normalizedSymbol = cryptoSymbol.toLowerCase();
		const cryptoInfo = cryptoIdMap[normalizedSymbol];
		if (!cryptoInfo) return null;

		const cacheKey = cryptoInfo.id;
		const now = Date.now();
		if (cryptoPriceCache[cacheKey] && now - cryptoPriceCache[cacheKey].timestamp < CACHE_DURATION) {
			const cryptoAmount = usdAmount / cryptoPriceCache[cacheKey].price;
			return { amount: cryptoAmount, symbol: cryptoInfo.symbol, formattedAmount: cryptoAmount.toFixed(8) };
		}

		const response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${cryptoInfo.id}&vs_currencies=usd`);
		if (!response.ok) throw new Error('Failed to fetch crypto price');
		const data = await response.json();
		const priceInUSD = data[cryptoInfo.id]?.usd;
		if (!priceInUSD) throw new Error('Price data not available');

		cryptoPriceCache[cacheKey] = { price: priceInUSD, timestamp: now };
		const cryptoAmount = usdAmount / priceInUSD;
		return { amount: cryptoAmount, symbol: cryptoInfo.symbol, formattedAmount: cryptoAmount.toFixed(8) };
	} catch (error) {
		console.error('Error converting USD to crypto:', error);
		return null;
	}
}

export async function convertGBPToCrypto(
	gbpAmount: number,
	cryptoSymbol: string
): Promise<{ amount: number; symbol: string; formattedAmount: string; usdAmount: number } | null> {
	try {
		const usdAmount = await convertGBPToUSD(gbpAmount);
		if (usdAmount === null) return null;
		const cryptoResult = await convertUSDToCrypto(usdAmount, cryptoSymbol);
		if (cryptoResult === null) return null;
		return { ...cryptoResult, usdAmount };
	} catch (error) {
		console.error('Error converting GBP to crypto:', error);
		return null;
	}
}

export type WithoutChild<T> = T extends { child?: unknown } ? Omit<T, 'child'> : T;
export type WithoutChildren<T> = T extends { children?: unknown } ? Omit<T, 'children'> : T;
export type WithoutChildrenOrChild<T> = WithoutChildren<WithoutChild<T>>;
export type WithElementRef<T, U extends HTMLElement = HTMLElement> = T & { ref?: U | null };
