import { relations } from 'drizzle-orm';
import {
	pgTable,
	uuid,
	varchar,
	timestamp,
	decimal,
	text,
	boolean,
	serial,
	integer,
	date,
	jsonb,
	index
} from 'drizzle-orm/pg-core';

// Users table
export const users = pgTable('users', {
	id: uuid('id').defaultRandom().primaryKey(),
	firstName: varchar('first_name', { length: 255 }),
	lastName: varchar('last_name', { length: 255 }),
	companyName: varchar('company_name', { length: 255 }),
	email: varchar('email', { length: 255 }).notNull().unique(),
	phone: varchar('phone', { length: 255 }),
	address: varchar('address', { length: 255 }),
	city: varchar('city', { length: 255 }),
	state: varchar('state', { length: 255 }),
	zipCode: varchar('zip_code', { length: 20 }),
	country: varchar('country', { length: 255 }),
	avatarPath: varchar('avatar_path', { length: 255 }),
	role: varchar('role', { length: 50 }).notNull().default('user'),
	emailVerifiedAt: timestamp('email_verified_at'),
	passwordHash: varchar('password_hash', { length: 255 }).notNull(),
	walletBalance: decimal('wallet_balance', { precision: 18, scale: 2 }).notNull().default('0'),
	tokenBalance: decimal('token_balance', { precision: 18, scale: 2 }).notNull().default('0'),
	group: varchar('group', { length: 100 }),
	referralCode: varchar('referral_code', { length: 50 }).unique(),
	referredBy: uuid('referred_by').references((): any => users.id, { onDelete: 'set null' }),
	kycStatus: varchar('kyc_status', { length: 20 }).notNull().default('pending'),
	twoFactorSecret: text('two_factor_secret'),
	twoFactorRecoveryCodes: text('two_factor_recovery_codes'),
	twoFactorConfirmedAt: timestamp('two_factor_confirmed_at'),
	createdAt: timestamp('created_at').notNull().defaultNow(),
	updatedAt: timestamp('updated_at').notNull().defaultNow()
});

// Sessions table (Lucia Auth)
export const sessions = pgTable(
	'sessions',
	{
		id: varchar('id', { length: 255 }).primaryKey(),
		userId: uuid('user_id')
			.notNull()
			.references(() => users.id, { onDelete: 'cascade' }),
		expiresAt: timestamp('expires_at', { withTimezone: true }).notNull(),
		ipAddress: varchar('ip_address', { length: 45 }),
		userAgent: text('user_agent')
	},
	(table) => ({
		userIdIdx: index('sessions_user_id_idx').on(table.userId)
	})
);

// Password reset tokens
export const passwordResetTokens = pgTable('password_reset_tokens', {
	id: serial('id').primaryKey(),
	userId: uuid('user_id')
		.notNull()
		.references(() => users.id, { onDelete: 'cascade' }),
	tokenHash: varchar('token_hash', { length: 255 }).notNull(),
	expiresAt: timestamp('expires_at').notNull(),
	createdAt: timestamp('created_at').notNull().defaultNow()
});

// Email verification tokens
export const emailVerificationTokens = pgTable('email_verification_tokens', {
	id: serial('id').primaryKey(),
	userId: uuid('user_id')
		.notNull()
		.references(() => users.id, { onDelete: 'cascade' }),
	tokenHash: varchar('token_hash', { length: 255 }).notNull(),
	expiresAt: timestamp('expires_at').notNull(),
	createdAt: timestamp('created_at').notNull().defaultNow()
});

// Plans
export const plans = pgTable('plans', {
	id: uuid('id').defaultRandom().primaryKey(),
	name: varchar('name', { length: 255 }).notNull(),
	category: varchar('category', { length: 100 }).notNull(),
	minAmount: decimal('min_amount', { precision: 18, scale: 2 }).notNull(),
	maxAmount: decimal('max_amount', { precision: 18, scale: 2 }).notNull(),
	durationDays: integer('duration_days').notNull(),
	percentMin: decimal('percent_min', { precision: 5, scale: 2 }).notNull(),
	percentMax: decimal('percent_max', { precision: 5, scale: 2 }).notNull(),
	payoutOptions: jsonb('payout_options').notNull(),
	features: jsonb('features'),
	referralLevels: jsonb('referral_levels'),
	status: varchar('status', { length: 20 }).notNull().default('active'),
	recommended: boolean('recommended').notNull().default(false),
	createdAt: timestamp('created_at').notNull().defaultNow(),
	updatedAt: timestamp('updated_at').notNull().defaultNow()
});

// Plan categories
export const planCategories = pgTable('plan_categories', {
	id: uuid('id').defaultRandom().primaryKey(),
	name: varchar('name', { length: 100 }).notNull().unique(),
	createdAt: timestamp('created_at').notNull().defaultNow()
});

// Plan features
export const planFeatures = pgTable('plan_features', {
	id: uuid('id').defaultRandom().primaryKey(),
	name: varchar('name', { length: 255 }).notNull(),
	description: text('description'),
	createdAt: timestamp('created_at').notNull().defaultNow()
});

// Payout options
export const payoutOptions = pgTable('payout_options', {
	id: uuid('id').defaultRandom().primaryKey(),
	name: varchar('name', { length: 50 }).notNull().unique(),
	createdAt: timestamp('created_at').notNull().defaultNow()
});

// Holidays
export const holidays = pgTable('holidays', {
	id: uuid('id').defaultRandom().primaryKey(),
	name: varchar('name', { length: 255 }).notNull(),
	date: date('date').notNull(),
	createdAt: timestamp('created_at').notNull().defaultNow()
});

// Investments
export const investments = pgTable(
	'investments',
	{
		id: uuid('id').defaultRandom().primaryKey(),
		userId: uuid('user_id')
			.notNull()
			.references(() => users.id, { onDelete: 'cascade' }),
		planId: uuid('plan_id')
			.notNull()
			.references(() => plans.id, { onDelete: 'cascade' }),
		amount: decimal('amount', { precision: 18, scale: 2 }).notNull(),
		paymentMethod: varchar('payment_method', { length: 50 }).notNull(),
		cryptoSymbol: varchar('crypto_symbol', { length: 10 }),
		cryptoAmount: decimal('crypto_amount', { precision: 18, scale: 8 }),
		transactionHash: varchar('transaction_hash', { length: 255 }),
		payoutOption: varchar('payout_option', { length: 20 }).notNull(),
		status: varchar('status', { length: 20 }).notNull().default('pending'),
		profitAccrued: decimal('profit_accrued', { precision: 18, scale: 2 }).notNull().default('0'),
		totalExpectedProfit: decimal('total_expected_profit', { precision: 18, scale: 2 }).notNull(),
		startDate: date('start_date'),
		endDate: date('end_date'),
		nextPayoutDate: date('next_payout_date'),
		createdAt: timestamp('created_at').notNull().defaultNow(),
		updatedAt: timestamp('updated_at').notNull().defaultNow()
	},
	(table) => ({
		userIdIdx: index('investments_user_id_idx').on(table.userId),
		statusIdx: index('investments_status_idx').on(table.status)
	})
);

// Payouts
export const payouts = pgTable('payouts', {
	id: uuid('id').defaultRandom().primaryKey(),
	investmentId: uuid('investment_id')
		.notNull()
		.references(() => investments.id, { onDelete: 'cascade' }),
	userId: uuid('user_id')
		.notNull()
		.references(() => users.id, { onDelete: 'cascade' }),
	date: date('date').notNull(),
	capitalGrowth: decimal('capital_growth', { precision: 18, scale: 2 }).notNull(),
	payoutAmount: decimal('payout_amount', { precision: 18, scale: 2 }).notNull(),
	roiPercent: decimal('roi_percent', { precision: 5, scale: 2 }).notNull(),
	status: varchar('status', { length: 20 }).notNull().default('pending'),
	createdAt: timestamp('created_at').notNull().defaultNow()
});

// Wallets (user crypto wallets)
export const wallets = pgTable('wallets', {
	id: uuid('id').defaultRandom().primaryKey(),
	userId: uuid('user_id')
		.notNull()
		.references(() => users.id, { onDelete: 'cascade' }),
	cryptocurrency: varchar('cryptocurrency', { length: 10 }).notNull(),
	name: varchar('name', { length: 100 }).notNull(),
	address: varchar('address', { length: 255 }).notNull(),
	createdAt: timestamp('created_at').notNull().defaultNow(),
	updatedAt: timestamp('updated_at').notNull().defaultNow()
});

// Platform wallets (admin wallets for receiving payments)
export const platformWallets = pgTable('platform_wallets', {
	id: uuid('id').defaultRandom().primaryKey(),
	cryptocurrency: varchar('cryptocurrency', { length: 10 }).notNull(),
	name: varchar('name', { length: 100 }).notNull(),
	address: varchar('address', { length: 255 }).notNull(),
	isActive: boolean('is_active').notNull().default(true),
	createdAt: timestamp('created_at').notNull().defaultNow()
});

// Withdrawals
export const withdrawals = pgTable(
	'withdrawals',
	{
		id: uuid('id').defaultRandom().primaryKey(),
		userId: uuid('user_id')
			.notNull()
			.references(() => users.id, { onDelete: 'cascade' }),
		walletId: uuid('wallet_id')
			.notNull()
			.references(() => wallets.id, { onDelete: 'restrict' }),
		walletType: varchar('wallet_type', { length: 20 }).notNull(),
		amount: decimal('amount', { precision: 18, scale: 2 }).notNull(),
		cryptoSymbol: varchar('crypto_symbol', { length: 10 }).notNull(),
		cryptoAmount: decimal('crypto_amount', { precision: 18, scale: 8 }),
		status: varchar('status', { length: 20 }).notNull().default('pending'),
		processedAt: timestamp('processed_at'),
		transactionHash: varchar('transaction_hash', { length: 255 }),
		createdAt: timestamp('created_at').notNull().defaultNow(),
		updatedAt: timestamp('updated_at').notNull().defaultNow()
	},
	(table) => ({
		userIdIdx: index('withdrawals_user_id_idx').on(table.userId),
		statusIdx: index('withdrawals_status_idx').on(table.status)
	})
);

// Referrals
export const referrals = pgTable('referrals', {
	id: uuid('id').defaultRandom().primaryKey(),
	referrerId: uuid('referrer_id')
		.notNull()
		.references(() => users.id, { onDelete: 'cascade' }),
	referredId: uuid('referred_id')
		.notNull()
		.references(() => users.id, { onDelete: 'cascade' }),
	investmentId: uuid('investment_id').references(() => investments.id),
	bonusEarned: decimal('bonus_earned', { precision: 18, scale: 2 }).notNull(),
	referralLevel: integer('referral_level').notNull(),
	status: varchar('status', { length: 20 }).notNull().default('active'),
	createdAt: timestamp('created_at').notNull().defaultNow()
});

// User groups
export const userGroups = pgTable('user_groups', {
	id: uuid('id').defaultRandom().primaryKey(),
	name: varchar('name', { length: 100 }).notNull().unique(),
	tokenThreshold: decimal('token_threshold', { precision: 18, scale: 2 }).notNull(),
	description: text('description'),
	createdAt: timestamp('created_at').notNull().defaultNow()
});

// Surveys
export const surveys = pgTable('surveys', {
	id: uuid('id').defaultRandom().primaryKey(),
	name: varchar('name', { length: 255 }).notNull(),
	description: text('description'),
	type: varchar('type', { length: 50 }).notNull(),
	status: varchar('status', { length: 20 }).notNull().default('active'),
	createdAt: timestamp('created_at').notNull().defaultNow()
});

// Survey questions
export const surveyQuestions = pgTable('survey_questions', {
	id: uuid('id').defaultRandom().primaryKey(),
	surveyId: uuid('survey_id')
		.notNull()
		.references(() => surveys.id, { onDelete: 'cascade' }),
	text: text('text').notNull(),
	type: varchar('type', { length: 30 }).notNull(),
	options: jsonb('options'),
	required: boolean('required').notNull().default(false),
	sortOrder: integer('sort_order').notNull()
});

// Survey responses
export const surveyResponses = pgTable('survey_responses', {
	id: uuid('id').defaultRandom().primaryKey(),
	surveyId: uuid('survey_id')
		.notNull()
		.references(() => surveys.id, { onDelete: 'cascade' }),
	userId: uuid('user_id')
		.notNull()
		.references(() => users.id, { onDelete: 'cascade' }),
	answers: jsonb('answers').notNull(),
	createdAt: timestamp('created_at').notNull().defaultNow()
});

// Blog posts
export const blogPosts = pgTable('blog_posts', {
	id: uuid('id').defaultRandom().primaryKey(),
	title: varchar('title', { length: 255 }).notNull(),
	slug: varchar('slug', { length: 255 }).notNull().unique(),
	content: text('content').notNull(),
	excerpt: text('excerpt'),
	coverImage: varchar('cover_image', { length: 500 }),
	authorId: uuid('author_id')
		.notNull()
		.references(() => users.id, { onDelete: 'cascade' }),
	category: varchar('category', { length: 100 }).notNull().default('Market Updates'),
	readTime: varchar('read_time', { length: 50 }).default('5 min read'),
	authorBio: text('author_bio'),
	authorImage: varchar('author_image', { length: 500 }),
	relatedArticleIds: jsonb('related_article_ids').default([]),
	status: varchar('status', { length: 20 }).notNull().default('draft'),
	publishedAt: timestamp('published_at'),
	createdAt: timestamp('created_at').notNull().defaultNow(),
	updatedAt: timestamp('updated_at').notNull().defaultNow()
});

// AI settings
export const aiSettings = pgTable('ai_settings', {
	id: serial('id').primaryKey(),
	key: varchar('key', { length: 100 }).notNull().unique(),
	value: text('value')
});

// Site settings
export const siteSettings = pgTable('site_settings', {
	id: serial('id').primaryKey(),
	key: varchar('key', { length: 100 }).notNull().unique(),
	value: text('value')
});

// Notifications
export const notifications = pgTable(
	'notifications',
	{
		id: uuid('id').defaultRandom().primaryKey(),
		userId: uuid('user_id')
			.notNull()
			.references(() => users.id, { onDelete: 'cascade' }),
		title: varchar('title', { length: 255 }).notNull(),
		message: text('message').notNull(),
		type: varchar('type', { length: 50 }).notNull(),
		read: boolean('read').notNull().default(false),
		link: varchar('link', { length: 500 }),
		createdAt: timestamp('created_at').notNull().defaultNow()
	},
	(table) => ({
		userIdReadIdx: index('notifications_user_id_read_idx').on(table.userId, table.read)
	})
);

// KYC documents
export const kycDocuments = pgTable('kyc_documents', {
	id: uuid('id').defaultRandom().primaryKey(),
	userId: uuid('user_id')
		.notNull()
		.references(() => users.id, { onDelete: 'cascade' }),
	documentType: varchar('document_type', { length: 50 }).notNull(),
	filePath: varchar('file_path', { length: 500 }).notNull(),
	status: varchar('status', { length: 20 }).notNull().default('pending'),
	notes: text('notes'),
	createdAt: timestamp('created_at').notNull().defaultNow(),
	updatedAt: timestamp('updated_at').notNull().defaultNow()
});

// Contact form submissions
export const contactSubmissions = pgTable('contact_submissions', {
	id: uuid('id').defaultRandom().primaryKey(),
	firstName: varchar('first_name', { length: 100 }).notNull(),
	lastName: varchar('last_name', { length: 100 }).notNull(),
	email: varchar('email', { length: 255 }).notNull(),
	interest: varchar('interest', { length: 100 }).notNull().default('General Inquiry'),
	message: text('message').notNull(),
	read: boolean('read').notNull().default(false),
	createdAt: timestamp('created_at').notNull().defaultNow()
});

// Relations
export const usersRelations = relations(users, ({ many, one }) => ({
	sessions: many(sessions),
	investments: many(investments),
	wallets: many(wallets),
	withdrawals: many(withdrawals),
	referralsMade: many(referrals, { relationName: 'referrer' }),
	referralsReceived: many(referrals, { relationName: 'referred' }),
	referredByUser: one(users, {
		fields: [users.referredBy],
		references: [users.id]
	}),
	surveyResponses: many(surveyResponses),
	blogPosts: many(blogPosts),
	notifications: many(notifications),
	kycDocuments: many(kycDocuments),
	passwordResetTokens: many(passwordResetTokens),
	emailVerificationTokens: many(emailVerificationTokens)
}));

export const sessionsRelations = relations(sessions, ({ one }) => ({
	user: one(users, {
		fields: [sessions.userId],
		references: [users.id]
	})
}));

export const plansRelations = relations(plans, ({ many }) => ({
	investments: many(investments)
}));

export const investmentsRelations = relations(investments, ({ one, many }) => ({
	user: one(users, {
		fields: [investments.userId],
		references: [users.id]
	}),
	plan: one(plans, {
		fields: [investments.planId],
		references: [plans.id]
	}),
	payouts: many(payouts),
	referrals: many(referrals)
}));

export const payoutsRelations = relations(payouts, ({ one }) => ({
	investment: one(investments, {
		fields: [payouts.investmentId],
		references: [investments.id]
	}),
	user: one(users, {
		fields: [payouts.userId],
		references: [users.id]
	})
}));

export const walletsRelations = relations(wallets, ({ one, many }) => ({
	user: one(users, {
		fields: [wallets.userId],
		references: [users.id]
	}),
	withdrawals: many(withdrawals)
}));

export const withdrawalsRelations = relations(withdrawals, ({ one }) => ({
	user: one(users, {
		fields: [withdrawals.userId],
		references: [users.id]
	}),
	wallet: one(wallets, {
		fields: [withdrawals.walletId],
		references: [wallets.id]
	})
}));

export const referralsRelations = relations(referrals, ({ one }) => ({
	referrer: one(users, {
		fields: [referrals.referrerId],
		references: [users.id],
		relationName: 'referrer'
	}),
	referred: one(users, {
		fields: [referrals.referredId],
		references: [users.id],
		relationName: 'referred'
	}),
	investment: one(investments, {
		fields: [referrals.investmentId],
		references: [investments.id]
	})
}));

export const surveysRelations = relations(surveys, ({ many }) => ({
	questions: many(surveyQuestions),
	responses: many(surveyResponses)
}));

export const surveyQuestionsRelations = relations(surveyQuestions, ({ one }) => ({
	survey: one(surveys, {
		fields: [surveyQuestions.surveyId],
		references: [surveys.id]
	})
}));

export const surveyResponsesRelations = relations(surveyResponses, ({ one }) => ({
	survey: one(surveys, {
		fields: [surveyResponses.surveyId],
		references: [surveys.id]
	}),
	user: one(users, {
		fields: [surveyResponses.userId],
		references: [users.id]
	})
}));

export const blogPostsRelations = relations(blogPosts, ({ one }) => ({
	author: one(users, {
		fields: [blogPosts.authorId],
		references: [users.id]
	})
}));

export const notificationsRelations = relations(notifications, ({ one }) => ({
	user: one(users, {
		fields: [notifications.userId],
		references: [users.id]
	})
}));

export const kycDocumentsRelations = relations(kycDocuments, ({ one }) => ({
	user: one(users, {
		fields: [kycDocuments.userId],
		references: [users.id]
	})
}));

// Type exports for TypeScript
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Session = typeof sessions.$inferSelect;
export type NewSession = typeof sessions.$inferInsert;
export type Plan = typeof plans.$inferSelect;
export type NewPlan = typeof plans.$inferInsert;
export type Investment = typeof investments.$inferSelect;
export type NewInvestment = typeof investments.$inferInsert;
export type Payout = typeof payouts.$inferSelect;
export type NewPayout = typeof payouts.$inferInsert;
export type Wallet = typeof wallets.$inferSelect;
export type NewWallet = typeof wallets.$inferInsert;
export type PlatformWallet = typeof platformWallets.$inferSelect;
export type NewPlatformWallet = typeof platformWallets.$inferInsert;
export type Withdrawal = typeof withdrawals.$inferSelect;
export type NewWithdrawal = typeof withdrawals.$inferInsert;
export type Referral = typeof referrals.$inferSelect;
export type NewReferral = typeof referrals.$inferInsert;
export type UserGroup = typeof userGroups.$inferSelect;
export type NewUserGroup = typeof userGroups.$inferInsert;
export type Survey = typeof surveys.$inferSelect;
export type NewSurvey = typeof surveys.$inferInsert;
export type SurveyQuestion = typeof surveyQuestions.$inferSelect;
export type NewSurveyQuestion = typeof surveyQuestions.$inferInsert;
export type SurveyResponse = typeof surveyResponses.$inferSelect;
export type NewSurveyResponse = typeof surveyResponses.$inferInsert;
export type BlogPost = typeof blogPosts.$inferSelect;
export type NewBlogPost = typeof blogPosts.$inferInsert;
export type Notification = typeof notifications.$inferSelect;
export type NewNotification = typeof notifications.$inferInsert;
export type KycDocument = typeof kycDocuments.$inferSelect;
export type NewKycDocument = typeof kycDocuments.$inferInsert;
