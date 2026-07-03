<script lang="ts">
	import { enhance } from '$app/forms';
	import { Button } from '$lib/components/ui/button';
	import type { PageData } from './$types';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();
</script>

<svelte:head>
	<title>Admin Dashboard</title>
</svelte:head>

<div class="p-6">
	<h1 class="text-2xl font-bold mb-4">Admin Dashboard</h1>
	<p class="mb-4">Welcome back, Admin {data.user?.firstName || 'User'}!</p>

	<form method="post" action="/logout" use:enhance>
		<Button type="submit">Log Out</Button>
	</form>
</div>
