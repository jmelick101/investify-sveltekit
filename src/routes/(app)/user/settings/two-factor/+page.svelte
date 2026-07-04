<script lang="ts">
	import { enhance } from '$app/forms';
	import LoadingSpinner from '$lib/components/ui/LoadingSpinner.svelte';
	import ConfirmationDialog from '$lib/components/ui/ConfirmationDialog.svelte';

	let { data } = $props();
	let loading = $state(false);
	let enabling = $state(false);
	let showConfirmDisable = $state(false);
	let qrCodeData = $state<string | null>(null);
	let backupCodes = $state<string[]>([]);
	let message = $state('');
	let isError = $state(false);

	async function handleEnable() {
		enabling = true;
		message = '';
		try {
			const response = await fetch('/api/2fa/enable', { method: 'POST' });
			const result = await response.json();
			if (result.success) {
				qrCodeData = result.qrCode;
				backupCodes = result.backupCodes;
			} else {
				message = result.error || 'Failed to enable 2FA';
				isError = true;
			}
		} catch (e) {
			message = 'Failed to enable 2FA';
			isError = true;
		} finally {
			enabling = false;
		}
	}

	function handleDisable() {
		showConfirmDisable = true;
	}
</script>

<svelte:head>
	<title>Two-Factor Authentication | Investify</title>
</svelte:head>

<div class="space-y-6">
	<div>
		<h2 class="text-2xl font-bold">Two-Factor Authentication</h2>
		<p class="text-muted-foreground">Add an extra layer of security to your account</p>
	</div>

	{#if message}
		<div class="rounded-lg p-4 {isError ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-green-50 text-green-700 border border-green-200'}">
			{message}
		</div>
	{/if}

	{#if data.twoFactorEnabled}
		<div class="rounded-xl border bg-card p-6">
			<div class="flex items-center justify-between">
				<div>
					<h3 class="font-semibold text-green-600">2FA is Enabled</h3>
					<p class="text-sm text-muted-foreground">Your account is protected with two-factor authentication</p>
				</div>
				<button
					onclick={handleDisable}
					class="rounded-lg border border-red-200 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
				>
					Disable 2FA
				</button>
			</div>
		</div>
	{:else if qrCodeData}
		<div class="rounded-xl border bg-card p-6 space-y-4">
			<h3 class="font-semibold">Scan QR Code</h3>
			<p class="text-sm text-muted-foreground">Scan this QR code with your authenticator app (Google Authenticator, Authy, etc.)</p>

			<div class="flex justify-center">
				<img src={qrCodeData} alt="2FA QR Code" class="rounded-lg border" />
			</div>

			<div>
				<h4 class="mb-2 text-sm font-medium">Backup Codes</h4>
				<p class="mb-2 text-xs text-muted-foreground">Save these codes in a secure place. Each can be used once if you lose access to your authenticator.</p>
				<div class="grid grid-cols-2 gap-2 md:grid-cols-4">
					{#each backupCodes as code}
						<code class="rounded bg-muted px-2 py-1 text-center text-sm">{code}</code>
					{/each}
				</div>
			</div>

			<form
				method="POST"
				action="?/confirmTwoFactor"
				use:enhance={() => {
					loading = true;
					return async ({ result }) => {
						loading = false;
						if (result.type === 'success') {
							message = '2FA enabled successfully';
							isError = false;
							qrCodeData = null;
							backupCodes = [];
						} else {
							message = result.data?.error || 'Failed to confirm 2FA';
							isError = true;
						}
					};
				}}
				class="space-y-4"
			>
				<div>
					<label for="code" class="mb-1 block text-sm font-medium">Enter verification code</label>
					<input
						type="text"
						id="code"
						name="code"
						placeholder="000000"
						maxlength="6"
						required
						class="w-full rounded-lg border bg-background px-4 py-2.5 text-center text-lg tracking-[0.5em]"
					/>
				</div>

				<div class="flex justify-end">
					<button
						type="submit"
						disabled={loading}
						class="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-primary-foreground font-medium hover:bg-primary/90 disabled:opacity-50"
					>
						{#if loading}
							<LoadingSpinner size="sm" />
						{/if}
						Confirm & Enable
					</button>
				</div>
			</form>
		</div>
	{:else}
		<div class="rounded-xl border bg-card p-6">
			<div class="flex items-center justify-between">
				<div>
					<h3 class="font-semibold">2FA is Disabled</h3>
					<p class="text-sm text-muted-foreground">We recommend enabling two-factor authentication for added security</p>
				</div>
				<button
					onclick={handleEnable}
					disabled={enabling}
					class="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm text-primary-foreground font-medium hover:bg-primary/90 disabled:opacity-50"
				>
					{#if enabling}
						<LoadingSpinner size="sm" />
					{/if}
					Enable 2FA
				</button>
			</div>
		</div>
	{/if}
</div>

{#if showConfirmDisable}
	<ConfirmationDialog
		title="Disable Two-Factor Authentication?"
		message="Your account will be less secure. You can re-enable 2FA at any time."
		confirmLabel="Disable"
		variant="danger"
		onConfirm={async () => {
			loading = true;
			try {
				const response = await fetch('/api/2fa/disable', { method: 'POST' });
				const result = await response.json();
				if (result.success) {
					message = '2FA disabled';
					isError = false;
				} else {
					message = result.error || 'Failed to disable 2FA';
					isError = true;
				}
			} catch (e) {
				message = 'Failed to disable 2FA';
				isError = true;
			} finally {
				loading = false;
				showConfirmDisable = false;
			}
		}}
		onCancel={() => { showConfirmDisable = false; }}
	/>
{/if}
