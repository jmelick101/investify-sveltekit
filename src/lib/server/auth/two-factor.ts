import * as OTPAuth from 'otpauth';
import QRCode from 'qrcode';

export interface TwoFactorSecret {
	base32: string;
	otpauthUrl: string;
}

export async function generateTwoFactorSecret(email: string): Promise<TwoFactorSecret> {
	const secret = new OTPAuth.Secret({ size: 20 });
	const totp = new OTPAuth.TOTP({
		issuer: 'Investify',
		label: email,
		algorithm: 'SHA1',
		digits: 6,
		period: 30,
		secret
	});

	return {
		base32: secret.base32,
		otpauthUrl: totp.toString()
	};
}

export function generateTOTPSecret(): string {
	const secret = new OTPAuth.Secret({ size: 20 });
	return secret.base32;
}

export function generateTOTPUri(email: string, secret: string): string {
	const totp = new OTPAuth.TOTP({
		issuer: 'Investify',
		label: email,
		algorithm: 'SHA1',
		digits: 6,
		period: 30,
		secret
	});

	return totp.toString();
}

export async function generateQRCode(uri: string): Promise<string> {
	return QRCode.toDataURL(uri);
}

export function verifyTOTP(secret: string, token: string): boolean {
	const totp = new OTPAuth.TOTP({
		issuer: 'Investify',
		algorithm: 'SHA1',
		digits: 6,
		period: 30,
		secret
	});

	const delta = totp.validate({ token, window: 1 });

	return delta !== null;
}

export function generateRecoveryCodes(): string[] {
	const codes: string[] = [];

	for (let i = 0; i < 8; i++) {
		const code = Math.random().toString(36).substring(2, 10).toUpperCase();
		codes.push(code);
	}

	return codes;
}

export function verifyRecoveryCode(codes: string[], inputCode: string): boolean {
	return codes.includes(inputCode.toUpperCase());
}

export function removeRecoveryCode(codes: string[], usedCode: string): string[] {
	return codes.filter((code) => code !== usedCode.toUpperCase());
}

export interface BackupCodesResult {
	codes: string[];
	codesHash: string;
}

export async function generateBackupCodes(userId: string): Promise<BackupCodesResult> {
	const codes = generateRecoveryCodes();
	const codesHash = codes.join(',');
	return { codes, codesHash };
}
