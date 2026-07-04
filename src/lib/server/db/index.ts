import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

// Support both SvelteKit and standalone environments
let DATABASE_URL: string;
try {
	const env = await import('$env/static/private');
	DATABASE_URL = env.DATABASE_URL;
} catch {
	// Fallback for standalone scripts (seed, migrations, etc.)
	if (!process.env.DATABASE_URL) {
		const { config } = await import('dotenv');
		config({ path: '.env' });
	}
	DATABASE_URL = process.env.DATABASE_URL || '';
}

const client = postgres(DATABASE_URL, {
	ssl: DATABASE_URL.includes('sslmode=require') ? { rejectUnauthorized: false } : undefined
});
export const db = drizzle(client, { schema });
