<script lang="ts">
    import { DollarSign, BanknoteArrowDownIcon, BanknoteArrowUpIcon } from 'lucide-svelte';
    import InvestmentDetailsSection from '$lib/components/InvestmentDetailsSection.svelte';
    import StatCard from '$lib/components/StatCard.svelte';
    import { formatCurrency } from '$lib/utils';
    import InvestmentsPayoutTable from '$lib/components/InvestmentsPayoutTable.svelte';
    import type { PageData } from './$types';

    let { data }: { data: PageData } = $props();
</script>

<svelte:head>
    <title>Manage Investment {data.investment?.id}</title>
</svelte:head>

<div class="space-y-6 px-6 py-8">
    <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h1 class="text-xl font-bold">{data.investment?.plan.name ?? 'Investment Details'}</h1>
    </div>

    {#if data.investment}
        <div class="grid gap-6 grid-cols-4">
            <div class="col-span-1">
                <InvestmentDetailsSection id={data.investment.id} data={data.investment} />
            </div>
            <div class="col-span-3 space-y-6">
                <!-- Stats -->
                <div class="grid gap-4 md:grid-cols-3">
                    <StatCard title="Total Invested" number={formatCurrency(data.investment.investedCapital)}>
                        {#snippet icon()}
                            <BanknoteArrowDownIcon class="size-4" />
                        {/snippet}
                    </StatCard>
                    <StatCard title="Total Profit Acrued" number={formatCurrency(data.investment.profit)}>
                        {#snippet icon()}
                            <DollarSign class="size-4" />
                        {/snippet}
                    </StatCard>
                    <!-- since it is estimated i used ~ -->
                    <StatCard title="Total Expected Profit" number={"~" + formatCurrency(data.investment.totalExpectedProfit)}>
                        {#snippet icon()}
                            <BanknoteArrowUpIcon class="size-4" />
                        {/snippet}
                    </StatCard>
                </div>

                <!-- Payouts -->
                <InvestmentsPayoutTable id={data.investment.id} />
            </div>
        </div>
    {:else}
        <div class="text-center py-16">
            <p class="text-muted-foreground">Investment not found</p>
        </div>
    {/if}
</div>
