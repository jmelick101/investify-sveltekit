import { error, fail } from '@sveltejs/kit';
import type { ActionFailure } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import type { PgTransaction } from 'drizzle-orm/pg-core';
import type { ExtractTablesWithRelations } from 'drizzle-orm';

type TransactionClient = PgTransaction<
	Record<string, never>,
	typeof db._.fullSchema,
	ExtractTablesWithRelations<typeof db._.fullSchema>
>;

/**
 * Safely execute a database query with error handling
 * @param queryFn The database query function to execute
 * @param errorMessage Custom error message
 * @returns The query result
 * @throws 500 error with message if query fails
 */
export async function safeQuery<T>(
	queryFn: () => Promise<T>,
	errorMessage = 'Database query failed'
): Promise<T> {
	try {
		return await queryFn();
	} catch (err) {
		console.error(errorMessage, err);
		throw error(500, {
			message: errorMessage
		});
	}
}

/**
 * Safely execute a database query and return null on failure
 * @param queryFn The database query function to execute
 * @param errorMessage Custom error message
 * @returns The query result or null if failed
 */
export async function safeQueryOrNull<T>(
	queryFn: () => Promise<T>,
	errorMessage = 'Database query failed'
): Promise<T | null> {
	try {
		return await queryFn();
	} catch (err) {
		console.error(errorMessage, err);
		return null;
	}
}

/**
 * Safely execute a database mutation (insert, update, delete)
 * @param mutationFn The database mutation function to execute
 * @param errorMessage Custom error message
 * @returns The mutation result or fail object
 */
export async function safeMutation<T>(
	mutationFn: () => Promise<T>,
	errorMessage = 'Database operation failed'
): Promise<T | ActionFailure<{ error: string }>> {
	try {
		return await mutationFn();
	} catch (err) {
		console.error(errorMessage, err);
		return fail(500, {
			error: errorMessage
		});
	}
}

/**
 * Execute a database transaction with error handling
 * @param transactionFn The function to execute within the transaction
 * @param errorMessage Custom error message
 * @returns The transaction result
 */
export async function withTransaction<T>(
	transactionFn: (tx: TransactionClient) => Promise<T>,
	errorMessage = 'Transaction failed'
): Promise<T> {
	try {
		return await db.transaction(transactionFn);
	} catch (err) {
		console.error(errorMessage, err);
		throw error(500, {
			message: errorMessage
		});
	}
}

/**
 * Format pagination metadata
 * @param page Current page number
 * @param limit Items per page
 * @param total Total number of items
 * @returns Pagination metadata object
 */
export function formatPagination(page: number, limit: number, total: number) {
	return {
		page,
		limit,
		total,
		totalPages: Math.ceil(total / limit),
		hasNext: page * limit < total,
		hasPrev: page > 1
	};
}
