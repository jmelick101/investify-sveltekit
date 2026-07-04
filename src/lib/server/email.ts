/**
 * Email notification service
 * In production, integrate with a real email service (SendGrid, Mailgun, etc.)
 * For now, we log emails with structured format for easy integration later
 */

interface EmailOptions {
	to: string;
	subject: string;
	html: string;
	text?: string;
}

interface NotificationData {
	userId: string;
	title: string;
	message: string;
	type: 'info' | 'warning' | 'success' | 'error';
	link?: string;
}

interface EmailLogEntry {
	timestamp: string;
	to: string;
	subject: string;
	preview: string;
	status: 'sent' | 'failed';
}

const emailLog: EmailLogEntry[] = [];

/**
 * Send an email (stub - replace with real email service in production)
 * Logs structured email data for monitoring and debugging
 */
export async function sendEmail(options: EmailOptions): Promise<boolean> {
	const preview = options.text?.substring(0, 100) || options.html.replace(/<[^>]*>/g, '').substring(0, 100);
	const timestamp = new Date().toISOString();

	const logEntry: EmailLogEntry = {
		timestamp,
		to: options.to,
		subject: options.subject,
		preview,
		status: 'sent'
	};

	emailLog.push(logEntry);

	if (emailLog.length > 1000) {
		emailLog.shift();
	}

	console.log(JSON.stringify({
		level: 'info',
		message: 'Email sent',
		timestamp,
		to: options.to,
		subject: options.subject,
		preview
	}));

	return true;
}

/**
 * Get recent email logs for debugging
 */
export function getEmailLogs(limit = 50): EmailLogEntry[] {
	return emailLog.slice(-limit);
}

/**
 * Send investment approval email
 */
export async function sendInvestmentApprovalEmail(
	userEmail: string,
	planName: string,
	amount: string
): Promise<boolean> {
	return sendEmail({
		to: userEmail,
		subject: 'Investment Approved - Investify',
		html: `
			<h1>Your Investment Has Been Approved</h1>
			<p>Great news! Your investment in <strong>${planName}</strong> has been approved.</p>
			<p>Amount: £${amount}</p>
			<p>Your investment is now active and earning returns.</p>
			<p>Best regards,<br>The Investify Team</p>
		`,
		text: `Your investment in ${planName} for £${amount} has been approved and is now active.`
	});
}

/**
 * Send investment rejection email
 */
export async function sendInvestmentRejectionEmail(
	userEmail: string,
	planName: string,
	amount: string,
	reason?: string
): Promise<boolean> {
	return sendEmail({
		to: userEmail,
		subject: 'Investment Update - Investify',
		html: `
			<h1>Investment Update</h1>
			<p>Unfortunately, your investment in <strong>${planName}</strong> could not be approved at this time.</p>
			<p>Amount: £${amount}</p>
			${reason ? `<p>Reason: ${reason}</p>` : ''}
			<p>If you have questions, please contact our support team.</p>
			<p>Best regards,<br>The Investify Team</p>
		`,
		text: `Your investment in ${planName} for £${amount} could not be approved. ${reason || ''}`
	});
}

/**
 * Send withdrawal approval email
 */
export async function sendWithdrawalApprovalEmail(
	userEmail: string,
	amount: string,
	cryptoSymbol: string
): Promise<boolean> {
	return sendEmail({
		to: userEmail,
		subject: 'Withdrawal Approved - Investify',
		html: `
			<h1>Withdrawal Approved</h1>
			<p>Your withdrawal request has been approved and processed.</p>
			<p>Amount: £${amount} (${cryptoSymbol})</p>
			<p>The funds have been sent to your wallet.</p>
			<p>Best regards,<br>The Investify Team</p>
		`,
		text: `Your withdrawal of £${amount} (${cryptoSymbol}) has been approved and processed.`
	});
}

/**
 * Send withdrawal rejection email
 */
export async function sendWithdrawalRejectionEmail(
	userEmail: string,
	amount: string,
	reason?: string
): Promise<boolean> {
	return sendEmail({
		to: userEmail,
		subject: 'Withdrawal Update - Investify',
		html: `
			<h1>Withdrawal Update</h1>
			<p>Unfortunately, your withdrawal request could not be processed at this time.</p>
			<p>Amount: £${amount}</p>
			${reason ? `<p>Reason: ${reason}</p>` : ''}
			<p>The funds have been returned to your wallet.</p>
			<p>If you have questions, please contact our support team.</p>
			<p>Best regards,<br>The Investify Team</p>
		`,
		text: `Your withdrawal of £${amount} could not be processed. ${reason || ''}`
	});
}

/**
 * Send KYC approval email
 */
export async function sendKycApprovalEmail(userEmail: string): Promise<boolean> {
	return sendEmail({
		to: userEmail,
		subject: 'KYC Verification Approved - Investify',
		html: `
			<h1>KYC Verification Approved</h1>
			<p>Your identity verification has been approved.</p>
			<p>You can now access all platform features.</p>
			<p>Best regards,<br>The Investify Team</p>
		`,
		text: 'Your KYC verification has been approved. You can now access all platform features.'
	});
}

/**
 * Send KYC rejection email
 */
export async function sendKycRejectionEmail(
	userEmail: string,
	reason?: string
): Promise<boolean> {
	return sendEmail({
		to: userEmail,
		subject: 'KYC Verification Update - Investify',
		html: `
			<h1>KYC Verification Update</h1>
			<p>Unfortunately, your identity verification could not be approved at this time.</p>
			${reason ? `<p>Reason: ${reason}</p>` : ''}
			<p>Please upload a new document and try again.</p>
			<p>If you have questions, please contact our support team.</p>
			<p>Best regards,<br>The Investify Team</p>
		`,
		text: `Your KYC verification could not be approved. ${reason || ''} Please upload a new document.`
	});
}

/**
 * Send payout notification email
 */
export async function sendPayoutEmail(
	userEmail: string,
	amount: string,
	planName: string
): Promise<boolean> {
	return sendEmail({
		to: userEmail,
		subject: 'Payout Received - Investify',
		html: `
			<h1>Payout Received</h1>
			<p>You have received a payout from your <strong>${planName}</strong> investment.</p>
			<p>Amount: £${amount}</p>
			<p>The funds have been credited to your main wallet.</p>
			<p>Best regards,<br>The Investify Team</p>
		`,
		text: `You have received a payout of £${amount} from your ${planName} investment.`
	});
}

/**
 * Send password reset email
 */
export async function sendPasswordResetEmail(
	userEmail: string,
	resetLink: string
): Promise<boolean> {
	return sendEmail({
		to: userEmail,
		subject: 'Password Reset Request - Investify',
		html: `
			<h1>Password Reset Request</h1>
			<p>You have requested to reset your password.</p>
			<p>Click the link below to reset your password:</p>
			<p><a href="${resetLink}">Reset Password</a></p>
			<p>This link will expire in 1 hour.</p>
			<p>If you did not request this, please ignore this email.</p>
			<p>Best regards,<br>The Investify Team</p>
		`,
		text: `You have requested to reset your password. Use this link to reset: ${resetLink}`
	});
}

/**
 * Send welcome email
 */
export async function sendWelcomeEmail(
	userEmail: string,
	firstName: string
): Promise<boolean> {
	return sendEmail({
		to: userEmail,
		subject: 'Welcome to Investify',
		html: `
			<h1>Welcome to Investify, ${firstName}!</h1>
			<p>Thank you for joining our investment platform.</p>
			<p>Here's what you can do next:</p>
			<ul>
				<li>Complete your profile</li>
				<li>Verify your identity (KYC)</li>
				<li>Explore our investment plans</li>
				<li>Start investing and earning returns</li>
			</ul>
			<p>If you have any questions, our support team is here to help.</p>
			<p>Best regards,<br>The Investify Team</p>
		`,
		text: `Welcome to Investify, ${firstName}! Start exploring our investment plans today.`
	});
}
