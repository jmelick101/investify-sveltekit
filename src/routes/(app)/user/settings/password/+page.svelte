<script lang="ts">
	import { enhance } from '$app/forms';
	import LoadingSpinner from '$lib/components/ui/LoadingSpinner.svelte';

	let { data } = $props();
	let saving = $state(false);
	let currentPassword = $state('');
	let newPassword = $state('');
	let confirmPassword = $state('');
	let message = $state('');
	let isError = $state(false);

	function validatePassword(password: string): string[] {
		const errors: string[] = [];
		if (password.length < 8) errors.push('At least 8 characters');
		if (!/[A-Z]/.test(password)) errors.push('One uppercase letter');
		if (!/[a-z]/.test(password)) errors.push('One lowercase letter');
		if (!/[0-9]/.test(password)) errors.push('One number');
		return errors;
	}

	let passwordErrors = $derived(validatePassword(newPassword));
	let passwordsMatch = $derived(newPassword === confirmPassword);
	let canSubmit = $derived(
		currentPassword && newPassword && confirmPassword && passwordErrors.length === 0 && passwordsMatch
	);
</script>

<svelte:head>
	<title>Change Password | Investify</title>
</svelte:head>

<div class="space-y-6">
	<div>
		<h2 class="text-2xl font-bold">Change Password</h2>
		<p class="text-muted-foreground">Update your account password</p>
	</div>

	{#if message}
		<div class="rounded-lg p-4 {isError ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-green-50 text-green-700 border border-green-200'}">
			{message}
		</div>
	{/if}

	<form
		method="POST"
		action="?/changePassword"
		use:enhance={() => {
			saving = true;
			message = '';
			return async ({ result }) => {
				saving = false;
				if (result.type === 'success') {
					message = 'Password changed successfully';
					isError = false;
					currentPassword = '';
					newPassword = '';
					confirmPassword = '';
				} else {
					message = result.data?.error || 'Failed to change password';
					isError = true;
				}
			};
		}}
		class="space-y-6 rounded-xl border bg-card p-6"
	>
		<div>
			<label for="currentPassword" class="mb-1 block text-sm font-medium">Current Password</label>
			<input
				type="password"
				id="currentPassword"
				name="currentPassword"
				bind:value={currentPassword}
				required
				class="w-full rounded-lg border bg-background px-4 py-2.5"
			/>
		</div>

		<div>
			<label for="newPassword" class="mb-1 block text-sm font-medium">New Password</label>
			<input
				type="password"
				id="newPassword"
				name="newPassword"
				bind:value={newPassword}
				required
				class="w-full rounded-lg border bg-background px-4 py-2.5"
			/>
			{#if newPassword}
				<div class="mt-2 space-y-1">
					{#each passwordErrors as error}
						<p class="text-xs text-red-500">• {error}</p>
					{/each}
					{#if passwordErrors.length === 0}
						<p class="text-xs text-green-500">• Strong password</p>
					{/if}
				</div>
			{/if}
		</div>

		<div>
			<label for="confirmPassword" class="mb-1 block text-sm font-medium">Confirm New Password</label>
			<input
				type="password"
				id="confirmPassword"
				name="confirmPassword"
				bind:value={confirmPassword}
				required
				class="w-full rounded-lg border bg-background px-4 py-2.5"
			/>
			{#if confirmPassword && !passwordsMatch}
				<p class="mt-1 text-xs text-red-500">Passwords do not match</p>
			{/if}
		</div>

		<div class="flex justify-end">
			<button
				type="submit"
				disabled={saving || !canSubmit}
				class="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-primary-foreground font-medium hover:bg-primary/90 disabled:opacity-50"
			>
				{#if saving}
					<LoadingSpinner size="sm" />
				{/if}
				Change Password
			</button>
		</div>
	</form>
</div>
