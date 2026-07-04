<script lang="ts">
	import { enhance } from '$app/forms';
	import { Button } from '$lib/components/ui/button';
	import TextLink from '$lib/components/TextLink.svelte';
	import type { ActionData, PageData } from './$types';

	interface Props {
		data: PageData;
		form?: ActionData;
	}

	let { data, form }: Props = $props();

	let loading = $state(false);
</script>

<svelte:head>
	<title>Verify Email - Investify</title>
</svelte:head>

<div class="space-y-6">
	<div class="text-center">
		<h1 class="text-2xl font-bold tracking-tight">Verify your email</h1>
		<p class="mt-2 text-sm text-muted-foreground">
			We sent a verification link to <strong>{data.email}</strong>
		</p>
	</div>

	{#if form?.success}
		<div class="rounded-md bg-green-50 p-4 dark:bg-green-950">
			<p class="text-sm text-green-800 dark:text-green-200">
				Verification email sent! Check your inbox.
			</p>
		</div>
	{:else if form?.error}
		<div class="rounded-md bg-destructive/10 p-4">
			<p class="text-sm text-destructive">{form.error}</p>
		</div>
	{/if}

	<div class="space-y-4">
		<p class="text-sm text-muted-foreground">
			Didn't receive the email? Check your spam folder or request a new one.
		</p>

		<form
			method="POST"
			action="?/resend"
			use:enhance={() => {
				loading = true;
				return async ({ update }) => {
					await update();
					loading = false;
				};
			}}
		>
			<Button type="submit" variant="outline" class="w-full" disabled={loading}>
				{loading ? 'Sending...' : 'Resend verification email'}
			</Button>
		</form>

		<div class="text-center">
			<TextLink href="/user/dashboard" class="text-sm">Skip for now</TextLink>
		</div>
	</div>
</div>
