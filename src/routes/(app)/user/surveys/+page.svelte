<script lang="ts">
	import SurveyViewer from '$lib/components/SurveyViewer.svelte';

	let { data } = $props();
</script>

<svelte:head>
	<title>Surveys | Investify</title>
</svelte:head>

<div class="space-y-6">
	<div>
		<h2 class="text-2xl font-bold">Surveys</h2>
		<p class="text-muted-foreground">Share your feedback and help us improve</p>
	</div>

	{#if data.surveys.length === 0}
		<div class="rounded-xl border bg-card p-12 text-center">
			<p class="text-muted-foreground">No active surveys at the moment. Check back later!</p>
		</div>
	{:else}
		{#each data.surveys as survey (survey.id)}
			<SurveyViewer {survey} />
		{/each}
	{/if}
</div>
