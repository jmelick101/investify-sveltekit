<script lang="ts">
	import { enhance } from '$app/forms';

	let { data } = $props();
	let theme = $state('system');
	let message = $state('');
	let isError = $state(false);
</script>

<svelte:head>
	<title>Appearance Settings | Investify</title>
</svelte:head>

<div class="space-y-6">
	<div>
		<h2 class="text-2xl font-bold">Appearance</h2>
		<p class="text-muted-foreground">Customize how Investify looks on your device</p>
	</div>

	{#if message}
		<div class="rounded-lg p-4 {isError ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-green-50 text-green-700 border border-green-200'}">
			{message}
		</div>
	{/if}

	<form
		method="POST"
		action="?/updateTheme"
		use:enhance={() => {
			return async ({ result }) => {
				if (result.type === 'success') {
					message = 'Theme preference saved';
					isError = false;
					const t = result.data?.theme || 'system';
					document.documentElement.classList.toggle('dark', t === 'dark' || (t === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches));
				} else {
					message = result.data?.error || 'Failed to save theme';
					isError = true;
				}
			};
		}}
		class="space-y-6 rounded-xl border bg-card p-6"
	>
		<div>
			<label class="mb-3 block text-sm font-medium">Theme</label>
			<div class="grid grid-cols-3 gap-3">
				<label class="cursor-pointer">
					<input type="radio" name="theme" value="light" bind:group={theme} class="sr-only" />
					<div class="rounded-lg border-2 p-4 text-center transition-all {theme === 'light' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}">
						<div class="mb-2 text-2xl">☀️</div>
						<div class="text-sm font-medium">Light</div>
					</div>
				</label>

				<label class="cursor-pointer">
					<input type="radio" name="theme" value="dark" bind:group={theme} class="sr-only" />
					<div class="rounded-lg border-2 p-4 text-center transition-all {theme === 'dark' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}">
						<div class="mb-2 text-2xl">🌙</div>
						<div class="text-sm font-medium">Dark</div>
					</div>
				</label>

				<label class="cursor-pointer">
					<input type="radio" name="theme" value="system" bind:group={theme} class="sr-only" />
					<div class="rounded-lg border-2 p-4 text-center transition-all {theme === 'system' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}">
						<div class="mb-2 text-2xl">💻</div>
						<div class="text-sm font-medium">System</div>
					</div>
				</label>
			</div>
		</div>

		<div class="flex justify-end">
			<button
				type="submit"
				class="rounded-lg bg-primary px-6 py-2.5 text-primary-foreground font-medium hover:bg-primary/90"
			>
				Save Preference
			</button>
		</div>
	</form>
</div>
