<script lang="ts">
	import { enhance } from '$app/forms';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import type { ActionData } from './$types';

	interface Props {
		form?: ActionData;
	}

	let { form }: Props = $props();

	let loading = $state(false);
	let showRecovery = $state(false);
</script>

<svelte:head>
	<title>Two-Factor Authentication - Investify</title>
</svelte:head>

<div class="space-y-6">
	<div class="text-center">
		<h1 class="text-2xl font-bold tracking-tight">Two-Factor Authentication</h1>
		<p class="mt-2 text-sm text-muted-foreground">
			{showRecovery
				? 'Enter one of your recovery codes'
				: 'Enter the 6-digit code from your authenticator app'}
		</p>
	</div>

	{#if showRecovery}
		<form
			method="POST"
			action="?/recovery"
			use:enhance={() => {
				loading = true;
				return async ({ update }) => {
					await update();
					loading = false;
				};
			}}
			class="space-y-4"
		>
			<div class="grid gap-2">
				<Label for="recoveryCode">Recovery Code</Label>
				<Input
					id="recoveryCode"
					name="recoveryCode"
					type="text"
					required
					placeholder="XXXXXXXX"
					aria-invalid={form?.recoveryErrors?.recoveryCode ? 'true' : undefined}
				/>
				{#if form?.recoveryErrors?.recoveryCode}
					<p class="text-sm text-destructive">{form.recoveryErrors.recoveryCode[0]}</p>
				{/if}
			</div>

			<Button type="submit" class="w-full" disabled={loading}>
				{loading ? 'Verifying...' : 'Verify'}
			</Button>

			<button
				type="button"
				onclick={() => (showRecovery = false)}
				class="w-full text-center text-sm text-muted-foreground hover:text-primary"
			>
				Use authenticator code instead
			</button>
		</form>
	{:else}
		<form
			method="POST"
			action="?/code"
			use:enhance={() => {
				loading = true;
				return async ({ update }) => {
					await update();
					loading = false;
				};
			}}
			class="space-y-4"
		>
			<div class="grid gap-2">
				<Label for="code">Authentication Code</Label>
				<Input
					id="code"
					name="code"
					type="text"
					required
					pattern="\d{6}"
					placeholder="000000"
					class="text-center text-lg tracking-widest"
					aria-invalid={form?.errors?.code ? 'true' : undefined}
				/>
				{#if form?.errors?.code}
					<p class="text-sm text-destructive">{form.errors.code[0]}</p>
				{/if}
			</div>

			<Button type="submit" class="w-full" disabled={loading}>
				{loading ? 'Verifying...' : 'Verify'}
			</Button>

			<button
				type="button"
				onclick={() => (showRecovery = true)}
				class="w-full text-center text-sm text-muted-foreground hover:text-primary"
			>
				Use recovery code instead
			</button>
		</form>
	{/if}

	<div class="text-center">
		<a href="/login" class="text-sm text-muted-foreground hover:text-primary"> Back to login </a>
	</div>
</div>
