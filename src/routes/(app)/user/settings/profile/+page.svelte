<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import LoadingSpinner from '$lib/components/ui/LoadingSpinner.svelte';

	let { data } = $props();
	let saving = $state(false);
	let profile = $state(data.profile || {});
	let message = $state('');
	let isError = $state(false);
</script>

<svelte:head>
	<title>Edit Profile | Investify</title>
</svelte:head>

<div class="space-y-6">
	<div class="flex items-center justify-between">
		<div>
			<h2 class="text-2xl font-bold">Profile Settings</h2>
			<p class="text-muted-foreground">Update your personal information</p>
		</div>
	</div>

	{#if message}
		<div class="rounded-lg p-4 {isError ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-green-50 text-green-700 border border-green-200'}">
			{message}
		</div>
	{/if}

	<form
		method="POST"
		action="?/updateProfile"
		use:enhance={() => {
			saving = true;
			message = '';
			return async ({ result, update }) => {
				saving = false;
				if (result.type === 'success') {
					message = 'Profile updated successfully';
					isError = false;
				} else {
					message = result.data?.error || 'Failed to update profile';
					isError = true;
				}
				await update();
			};
		}}
		class="space-y-6 rounded-xl border bg-card p-6"
	>
		<div class="grid gap-4 md:grid-cols-2">
			<div>
				<label for="firstName" class="mb-1 block text-sm font-medium">First Name *</label>
				<input
					type="text"
					id="firstName"
					name="firstName"
					bind:value={profile.firstName}
					required
					class="w-full rounded-lg border bg-background px-4 py-2.5"
				/>
			</div>
			<div>
				<label for="lastName" class="mb-1 block text-sm font-medium">Last Name *</label>
				<input
					type="text"
					id="lastName"
					name="lastName"
					bind:value={profile.lastName}
					required
					class="w-full rounded-lg border bg-background px-4 py-2.5"
				/>
			</div>
		</div>

		<div>
			<label for="email" class="mb-1 block text-sm font-medium">Email</label>
			<input
				type="email"
				id="email"
				value={profile.email}
				disabled
				class="w-full rounded-lg border bg-muted px-4 py-2.5 text-muted-foreground"
			/>
			<p class="mt-1 text-xs text-muted-foreground">Email cannot be changed</p>
		</div>

		<div class="grid gap-4 md:grid-cols-2">
			<div>
				<label for="phone" class="mb-1 block text-sm font-medium">Phone</label>
				<input
					type="tel"
					id="phone"
					name="phone"
					bind:value={profile.phone}
					class="w-full rounded-lg border bg-background px-4 py-2.5"
				/>
			</div>
			<div>
				<label for="country" class="mb-1 block text-sm font-medium">Country</label>
				<input
					type="text"
					id="country"
					name="country"
					bind:value={profile.country}
					class="w-full rounded-lg border bg-background px-4 py-2.5"
				/>
			</div>
		</div>

		<div class="flex justify-end">
			<button
				type="submit"
				disabled={saving}
				class="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-primary-foreground font-medium hover:bg-primary/90 disabled:opacity-50"
			>
				{#if saving}
					<LoadingSpinner size="sm" />
				{/if}
				Save Changes
			</button>
		</div>
	</form>
</div>
