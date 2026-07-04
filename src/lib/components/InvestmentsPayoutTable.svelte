<script lang="ts">
    import * as Table from '$lib/components/ui/table/index.js';
    import { formatDateExt, formatCurrency } from '$lib/utils';
    import * as Card from '$lib/components/ui/card';
    import * as Pagination from '$lib/components/ui/pagination/index.js';
    import { Layers } from 'lucide-svelte';

    let { id } = $props();


    // You can use a payouts props above if you want to pass payouts from the parent component but i put it here
    // so admin and user UI can use the same component
    const payouts = $state([
        {
            daily: [
                {
                    date: '2024-01-01',
                    capitalGrowth: 500,
                    payout: 50,
                },
                {
                    date: '2024-01-02',
                    capitalGrowth: 500,
                    payout: 50,
                },
                {
                    date: '2024-01-03',
                    capitalGrowth: 500,
                    payout: 50,
                },
                {
                    date: '2024-01-04',
                    capitalGrowth: 500,
                    payout: 50,
                },
                {
                    date: '2024-01-05',
                    capitalGrowth: 500,
                    payout: 50,
                },
            ],
            monthly: [
                {
                    date: '2024-01-01',
                    capitalGrowth: 500,
                    payout: 53,
                },
                {
                    date: '2024-02-01',
                    capitalGrowth: 500,
                    payout: 58,
                },
                {
                    date: '2024-03-01',
                    capitalGrowth: 500,
                    payout: 59,
                },
                {
                    date: '2024-04-01',
                    capitalGrowth: 500,
                    payout: 90,
                },
                {
                    date: '2024-05-01',
                    capitalGrowth: 500,
                    payout: 50,
                },
            ],
            yearly: [
                {
                    date: '2024-01-01',
                    capitalGrowth: 500,
                    payout: 50,
                },
                {
                    date: '2025-01-02',
                    capitalGrowth: 500,
                    payout: 50,
                },
                {
                    date: '2026-01-03',
                    capitalGrowth: 500,
                    payout: 50,
                },
            ],
        },
    ]);

    let timeFrame: 'daily' | 'monthly' | 'yearly' = $state('daily');
</script>

<div class="space-y-3">
    <div class="flex items-center justify-between">
        <h1 class="text-lg font-bold">Payouts</h1>
        <div class="flex items-center gap-1 rounded-lg bg-muted p-1">
            <button
                class="rounded-md px-3 py-1.5 text-xs font-medium transition-colors {timeFrame === 'daily'
                    ? 'bg-background text-foreground shadow-sm'
                    : 'text-muted-foreground hover:bg-background/50 hover:text-foreground'}"
                onclick={() => (timeFrame = 'daily')}
            >
                Daily
            </button>
            <button
                class="rounded-md px-3 py-1.5 text-xs font-medium transition-colors {timeFrame === 'monthly'
                    ? 'bg-background text-foreground shadow-sm'
                    : 'text-muted-foreground hover:bg-background/50 hover:text-foreground'}"
                onclick={() => (timeFrame = 'monthly')}
            >
                Monthly
            </button>
            <button
                class="rounded-md px-3 py-1.5 text-xs font-medium transition-colors {timeFrame === 'yearly'
                    ? 'bg-background text-foreground shadow-sm'
                    : 'text-muted-foreground hover:bg-background/50 hover:text-foreground'}"
                onclick={() => (timeFrame = 'yearly')}
            >
                Yearly
            </button>
        </div>
    </div>
    <Card.Root class="py-0 overflow-hidden">
        <Table.Root class="overflow-hidden">
            <Table.Header class="bg-gray-50 dark:bg-zinc-900">
                <Table.Row class="[&>th]:px-3">
                    <Table.Head class="ps-6">S/N</Table.Head>
                    <Table.Head>Capital Growth</Table.Head>
                    <Table.Head>Payout</Table.Head>
                    <Table.Head>Date</Table.Head>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {#each payouts[0][timeFrame] as payout, i}
                    <Table.Row class="[&>td]:py-3 [&>td]:px-3">
                        <Table.Cell class="ps-6 font-medium">
                            {i + 1}
                        </Table.Cell>
                        <Table.Cell>
                            {formatCurrency(payout.capitalGrowth)}
                        </Table.Cell>
                        <Table.Cell class="text-green-600">
                            +{formatCurrency(payout.payout)}
                        </Table.Cell>
                        <Table.Cell>
                            {formatDateExt(payout.date)}
                        </Table.Cell>
                    </Table.Row>
                {:else}
                    <Table.Row>
                        <Table.Cell colspan={4} class="h-52 text-center">
                            <div class="flex flex-col items-center justify-center text-muted-foreground">
                                <Layers class="size-10 mb-2 opacity-20" />
                                <p>No {timeFrame} payouts available</p>
                            </div>
                        </Table.Cell>
                    </Table.Row>
                {/each}
            </Table.Body>
        </Table.Root>
    </Card.Root>

    {#if timeFrame === 'daily'}
        <Pagination.Root count={30} page={1} class="justify-end">
            {#snippet children({ pages, currentPage })}
                <Pagination.Content>
                    <Pagination.Item>
                        <Pagination.Previous />
                    </Pagination.Item>
                    {#each pages as page (page.key)}
                        {#if page.type === 'ellipsis'}
                            <Pagination.Item>
                                <Pagination.Ellipsis />
                            </Pagination.Item>
                        {:else}
                            <Pagination.Item>
                                <Pagination.Link {page} isActive={currentPage === page.value}>
                                    {page.value}
                                </Pagination.Link>
                            </Pagination.Item>
                        {/if}
                    {/each}
                    <Pagination.Item>
                        <Pagination.Ellipsis />
                    </Pagination.Item>
                    <Pagination.Item>
                        <Pagination.Next />
                    </Pagination.Item>
                </Pagination.Content>
            {/snippet}
        </Pagination.Root>
    {/if}
</div>
