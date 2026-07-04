<script lang="ts">
    import * as Card from '$lib/components/ui/card';
    import { Badge } from '$lib/components/ui/badge';
    import SurveyViewer from '$lib/components/SurveyViewer.svelte';
    import type { PageData } from './$types';

    let { data }: { data: PageData } = $props();
</script>

<svelte:head>
    <title>Survey</title>
</svelte:head>

<div class="space-y-6 px-6 py-8">
    <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
            <h1 class="text-xl font-bold">Survey</h1>
            <p class="text-muted-foreground mt-1 text-sm">{data.survey?.name ?? 'Survey'}</p>
        </div>
    </div>

    {#if data.survey}
        <SurveyViewer survey={data.survey} />
    {:else}
        <Card.Root class="p-8 text-center">
            <p class="text-muted-foreground">Survey not found</p>
        </Card.Root>
    {/if}
</div>
