import { db } from './index';
import {
	users,
	plans,
	planCategories,
	planFeatures,
	payoutOptions,
	investments,
	wallets,
	platformWallets,
	withdrawals,
	referrals,
	blogPosts,
	userGroups,
	siteSettings,
	aiSettings,
	payouts
} from './schema';
import { hashPassword } from '../auth/password';
import { eq } from 'drizzle-orm';

export async function seed() {
	console.log('🌱 Starting database seed...');

	// 1. Create admin user
	const [admin] = await db
		.insert(users)
		.values({
			firstName: 'Admin',
			lastName: 'User',
			email: 'admin@investify.com',
			passwordHash: await hashPassword('admin123'),
			role: 'admin',
			emailVerifiedAt: new Date(),
			referralCode: 'ADMIN001',
			kycStatus: 'approved'
		})
		.returning();
	console.log('✅ Admin user created');

	// 2. Create test user with realistic balances
	const [user1] = await db
		.insert(users)
		.values({
			firstName: 'John',
			lastName: 'Doe',
			email: 'john@example.com',
			passwordHash: await hashPassword('password123'),
			role: 'user',
			emailVerifiedAt: new Date(),
			referralCode: 'JOHN001',
			walletBalance: '15000.00',
			tokenBalance: '5000.00',
			group: 'Ambassador',
			kycStatus: 'approved'
		})
		.returning();
	console.log('✅ Test user created');

	// 3. Create a second test user (referred by user1)
	const [user2] = await db
		.insert(users)
		.values({
			firstName: 'Jane',
			lastName: 'Smith',
			email: 'jane@example.com',
			passwordHash: await hashPassword('password123'),
			role: 'user',
			emailVerifiedAt: new Date(),
			referralCode: 'JANE001',
			referredBy: user1.id,
			walletBalance: '5000.00',
			tokenBalance: '2000.00',
			group: 'Elite Partner',
			kycStatus: 'approved'
		})
		.returning();
	console.log('✅ Second test user created');

	// 4. Create categories
	const [cat1] = await db.insert(planCategories).values({ name: 'Long Term Goals' }).returning();
	const [cat2] = await db.insert(planCategories).values({ name: 'Short Term' }).returning();
	const [cat3] = await db.insert(planCategories).values({ name: 'High Yield' }).returning();
	const [cat4] = await db.insert(planCategories).values({ name: 'Starter' }).returning();
	console.log('✅ Categories created');

	// 5. Create features
	const [feat1] = await db
		.insert(planFeatures)
		.values({
			name: '24/7 Support',
			description: 'Round-the-clock customer support'
		})
		.returning();
	const [feat2] = await db
		.insert(planFeatures)
		.values({
			name: 'Daily Payouts',
			description: 'Receive payouts every day'
		})
		.returning();
	const [feat3] = await db
		.insert(planFeatures)
		.values({
			name: 'Compounding Available',
			description: 'Automatic reinvestment option (40% after 180 days)'
		})
		.returning();
	const [feat4] = await db
		.insert(planFeatures)
		.values({
			name: 'Capital Return',
			description: '90% of principal returned at term end'
		})
		.returning();
	console.log('✅ Features created');

	// 6. Create payout options
	await db.insert(payoutOptions).values([{ name: 'Daily' }, { name: 'Weekly' }, { name: 'Monthly' }]);
	console.log('✅ Payout options created');

	// 7. Create plans according to spec
	// Spec: ROI is simple (non-compounding by default), paid on original capital
	// Capital Return: 90% of principal at term end (10% management fee)
	// Compounding: 40% after 180 days (one time)
	// Tokens: 1 per £1 invested, convert at 0.8:1
	// Referrals: Level 1: 10%, Level 2: 10% of referred investment
	const plansData = [
		{
			name: 'Starter Plan',
			category: 'Short Term',
			minAmount: '500.00',
			maxAmount: '5000.00',
			durationDays: 30,
			percentMin: '1.50',
			percentMax: '2.00',
			payoutOptions: ['Daily'],
			features: ['24/7 Support', 'Daily Payouts', 'Capital Return'],
			referralLevels: [{ level: 1, percent: 10 }],
			status: 'active',
			recommended: false
		},
		{
			name: 'Professional Plan',
			category: 'Long Term Goals',
			minAmount: '5000.00',
			maxAmount: '25000.00',
			durationDays: 90,
			percentMin: '2.50',
			percentMax: '3.50',
			payoutOptions: ['Daily', 'Weekly'],
			features: ['24/7 Support', 'Daily Payouts', 'Compounding Available', 'Capital Return'],
			referralLevels: [
				{ level: 1, percent: 10 },
				{ level: 2, percent: 10 }
			],
			status: 'active',
			recommended: true
		},
		{
			name: 'Elite Plan',
			category: 'High Yield',
			minAmount: '25000.00',
			maxAmount: '100000.00',
			durationDays: 180,
			percentMin: '3.50',
			percentMax: '5.00',
			payoutOptions: ['Daily', 'Weekly', 'Monthly'],
			features: ['24/7 Support', 'Daily Payouts', 'Compounding Available', 'Capital Return'],
			referralLevels: [
				{ level: 1, percent: 10 },
				{ level: 2, percent: 10 }
			],
			status: 'active',
			recommended: false
		},
		{
			name: 'Wealth Builder',
			category: 'Long Term Goals',
			minAmount: '10000.00',
			maxAmount: '50000.00',
			durationDays: 365,
			percentMin: '4.00',
			percentMax: '6.00',
			payoutOptions: ['Weekly', 'Monthly'],
			features: ['24/7 Support', 'Daily Payouts', 'Compounding Available', 'Capital Return'],
			referralLevels: [
				{ level: 1, percent: 10 },
				{ level: 2, percent: 10 }
			],
			status: 'active',
			recommended: false
		}
	];

	const createdPlans = [];
	for (const plan of plansData) {
		const [created] = await db.insert(plans).values(plan).returning();
		createdPlans.push(created);
	}
	console.log('✅ Plans created');

	// 8. Create investments for test user
	// Investment: £10,000 on Professional Plan (90 days, 2.5-3.5% daily)
	// Expected profit: £10,000 * 3% * 90 = £27,000 (simple interest)
	// Capital return: 90% of £10,000 = £9,000 at term end
	const [investment1] = await db
		.insert(investments)
		.values({
			userId: user1.id,
			planId: createdPlans[1].id, // Professional Plan
			amount: '10000.00',
			paymentMethod: 'crypto',
			cryptoSymbol: 'BTC',
			cryptoAmount: '0.25',
			payoutOption: 'Daily',
			status: 'active',
			profitAccrued: '2700.00',
			totalExpectedProfit: '27000.00',
			startDate: '2026-06-01',
			endDate: '2026-08-30'
		})
		.returning();
	console.log('✅ Investments created');

	// 9. Create a completed investment for user2
	const [investment2] = await db
		.insert(investments)
		.values({
			userId: user2.id,
			planId: createdPlans[0].id, // Starter Plan
			amount: '2000.00',
			paymentMethod: 'crypto',
			cryptoSymbol: 'ETH',
			cryptoAmount: '0.5',
			payoutOption: 'Daily',
			status: 'completed',
			profitAccrued: '900.00',
			totalExpectedProfit: '900.00',
			startDate: '2026-05-01',
			endDate: '2026-05-31'
		})
		.returning();
	console.log('✅ Completed investment created');

	// 10. Create payouts for completed investment
	const payoutDates = [];
	for (let i = 0; i < 30; i++) {
		const date = new Date('2026-05-01');
		date.setDate(date.getDate() + i);
		payoutDates.push(date.toISOString().split('T')[0]);
	}

	for (const payoutDate of payoutDates) {
		await db.insert(payouts).values({
			investmentId: investment2.id,
			userId: user2.id,
			date: payoutDate,
			capitalGrowth: '66.67',
			payoutAmount: '60.00',
			roiPercent: '3.00',
			status: 'paid'
		});
	}
	console.log('✅ Payouts created');

	// 11. Create user wallets
	await db.insert(wallets).values([
		{
			userId: user1.id,
			cryptocurrency: 'BTC',
			name: 'Bitcoin Wallet',
			address: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh'
		},
		{
			userId: user1.id,
			cryptocurrency: 'ETH',
			name: 'Ethereum Wallet',
			address: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb'
		},
		{
			userId: user2.id,
			cryptocurrency: 'BTC',
			name: 'Bitcoin Wallet',
			address: 'bc1quser2exampleaddress123456789'
		}
	]);
	console.log('✅ User wallets created');

	// 12. Create platform wallets
	await db.insert(platformWallets).values([
		{
			cryptocurrency: 'BTC',
			name: 'Platform Bitcoin',
			address: 'bc1qplatformaddressbtcexample123456',
			isActive: true
		},
		{
			cryptocurrency: 'ETH',
			name: 'Platform Ethereum',
			address: '0xPlatformAddressETHExample123456789',
			isActive: true
		},
		{
			cryptocurrency: 'USDT',
			name: 'Platform USDT',
			address: '0xPlatformAddressUSDTExample123456789',
			isActive: true
		}
	]);
	console.log('✅ Platform wallets created');

	// 13. Create withdrawal request
	const userWallet = await db.select().from(wallets).where(eq(wallets.userId, user1.id)).limit(1);
	await db.insert(withdrawals).values({
		userId: user1.id,
		walletId: userWallet[0].id,
		walletType: 'main',
		amount: '500.00',
		cryptoSymbol: 'BTC',
		cryptoAmount: '0.012',
		status: 'pending'
	});
	console.log('✅ Withdrawal created');

	// 14. Create referral record
	await db.insert(referrals).values({
		referrerId: user1.id,
		referredId: user2.id,
		investmentId: investment2.id,
		bonusEarned: '200.00',
		referralLevel: 1,
		status: 'active'
	});
	console.log('✅ Referral created');

	// 15. Create user groups with correct thresholds
	await db.insert(userGroups).values([
		{ name: 'Pioneer', tokenThreshold: '0.00', description: 'Entry level members (< 500 tokens)' },
		{ name: 'Ambassador', tokenThreshold: '500.00', description: 'Active investors (500 - 1,999 tokens)' },
		{ name: 'Elite Partner', tokenThreshold: '2000.00', description: 'Premium members (2,000 - 9,999 tokens)' },
		{ name: 'Regional Leader', tokenThreshold: '10000.00', description: 'Top investors (>= 10,000 tokens)' }
	]);
	console.log('✅ User groups created');

	// 16. Create blog posts
	await db.insert(blogPosts).values([
		{
			title: 'Welcome to Investify',
			slug: 'welcome-to-investify',
			content:
				'<h1>Welcome to Investify</h1><p>We are excited to have you join our investment platform. Our mission is to provide secure, transparent, and profitable investment opportunities.</p><h2>Getting Started</h2><p>Start by exploring our investment plans and choosing the one that fits your goals.</p>',
			excerpt: 'Learn about our investment platform and get started today.',
			authorId: admin.id,
			status: 'published',
			publishedAt: new Date()
		},
		{
			title: 'Understanding Our Investment Plans',
			slug: 'understanding-investment-plans',
			content:
				'<h1>Understanding Our Investment Plans</h1><p>Our platform offers various investment plans tailored to different risk appetites and financial goals.</p><h2>Simple Returns</h2><p>We use simple (non-compounding) interest rates, paid out on your original capital at specified intervals.</p><h2>Capital Return</h2><p>At the end of your investment term, 90% of your principal capital is returned to your wallet.</p>',
			excerpt: 'A comprehensive guide to our investment plans.',
			authorId: admin.id,
			status: 'published',
			publishedAt: new Date()
		}
	]);
	console.log('✅ Blog posts created');

	// 17. Create site settings
	await db.insert(siteSettings).values([
		{ key: 'site_name', value: 'Investify' },
		{ key: 'site_email', value: 'hello@investify.com' },
		{ key: 'site_phone', value: '+1 (555) 000-0000' },
		{ key: 'site_address', value: '88 Brook Street, London, W1K 5AY' },
		{ key: 'token_symbol', value: 'INV' },
		{ key: 'token_multiplier', value: '0.8' },
		{ key: 'min_withdrawal', value: '50' },
		{ key: 'max_withdrawal', value: '100000' },
		{ key: 'referral_bonus', value: '10' }
	]);
	console.log('✅ Site settings created');

	// 18. Create AI settings
	await db.insert(aiSettings).values([
		{ key: 'groq_api_key', value: '' },
		{ key: 'model', value: 'mixtral-8x7b-32768' },
		{ key: 'enabled', value: 'false' }
	]);
	console.log('✅ AI settings created');

	console.log('🎉 Seed completed successfully!');
	console.log('\n📧 Admin credentials:');
	console.log('   Email: admin@investify.com');
	console.log('   Password: admin123');
	console.log('\n📧 Test user credentials:');
	console.log('   Email: john@example.com');
	console.log('   Password: password123');
	console.log('\n💰 Financial Rules:');
	console.log('   - ROI: Simple interest (non-compounding by default)');
	console.log('   - Capital Return: 90% at term end (10% management fee)');
	console.log('   - Compounding: 40% after 180 days (one time)');
	console.log('   - Tokens: 1 per £1 invested, convert at 0.8:1');
	console.log('   - Referrals: Level 1: 10%, Level 2: 10%');
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
	seed()
		.then(() => process.exit(0))
		.catch((error) => {
			console.error('❌ Seed failed:', error);
			process.exit(1);
		});
}
