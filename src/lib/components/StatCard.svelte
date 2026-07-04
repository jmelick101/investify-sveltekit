<script lang="ts">
    import type { Snippet } from 'svelte';
    import * as Card from '$lib/components/ui/card';

    /**
     * StatCard component for displaying key metrics with an icon snippet and optional trend.
     *
     * @param title - The label for the statistic (e.g., "Total Revenue")
     * @param number - The numeric value to display (e.g., "$45,231.89")
     * @param icon - A Svelte snippet to render the icon
     * @param description - Optional text to display below the number
     * @param trend - Optional trend information
     * @slot link - Optional slot to render the link
     */
    interface Props {
        title: string;
        number: string | number;
        icon: Snippet;
        description?: string;
        trend?: {
            value: number;
            label: string;
            isPositive: boolean;
        };
        link?: Snippet;
    }

    let { title, number, icon, description, trend, link }: Props = $props();
</script>

<Card.Root class="overflow-hidden transition-all hover:shadow-md">
    <Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
        <Card.Title class="text-sm font-medium">{title}</Card.Title>
        <div class="rounded-lg bg-muted p-2 text-muted-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
            {@render icon()}
        </div>
    </Card.Header>
    <Card.Content>
        <div class="text-2xl font-bold tracking-tight">{number}</div>

        {#if trend || description}
            <div class="mt-1 flex items-center gap-1.5 text-xs">
                {#if trend}
                    <div
                        class="flex items-center font-medium {trend.isPositive
                            ? 'text-emerald-600 dark:text-emerald-500'
                            : 'text-rose-600 dark:text-rose-500'}"
                    >
                        <!-- We can hardcode the trend icons or pass them, but for simplicity let's use a standard trend icon style -->
                        <span class="mr-1">{trend.isPositive ? '↑' : '↓'}</span>
                        {trend.isPositive ? '+' : '-'}{trend.value}%
                    </div>
                    <span class="text-muted-foreground">{trend.label}</span>
                {:else if description}
                    <span class="text-muted-foreground">{description}</span>
                {/if}
            </div>
        {/if}

        {#if link}
            {@render link()}
        {/if}
    </Card.Content>
</Card.Root>
