<script lang="ts">
    import { RotateCcw, DollarSign, BanknoteArrowDownIcon, BanknoteArrowUpIcon } from 'lucide-svelte';
    import { Button } from '$lib/components/ui/button';
    import CalculatorDetailsSection from '$lib/components-legacy/user/CalculatorDetailsSection.svelte';
    import StatCard from '$lib/components/StatCard.svelte';
    import { formatCurrency } from '$lib/utils';
    import CalculatorPayoutTable from '$lib/components-legacy/user/CalculatorPayoutTable.svelte';
    import BuyPlanModal from '$lib/components-legacy/user/BuyPlanModal.svelte';
    import type { PageData } from './$types';

    let { data }: { data: PageData } = $props();
</script>

<svelte:head>
    <title>Calculator</title>
</svelte:head>

<div class="space-y-6 px-6 py-8">
    <div class="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
            <h1 class="text-2xl font-bold tracking-tight text-foreground">Calculator</h1>
            <p class="text-muted-foreground mt-1 text-sm">
                Calculated ROI for <span class="font-bold text-primary">{data.calculatedInvestment.plan?.name ?? 'Unknown Plan'}</span>
            </p>
        </div>
        <div class="flex items-center gap-3">
            <BuyPlanModal data={data.calculatedInvestment} />
        </div>
    </div>

    <div class="grid gap-6 lg:grid-cols-4">
        <div class="lg:col-span-3 space-y-6">
            <!-- Stats -->
            <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <StatCard title="Total Invested" number={formatCurrency(data.calculatedInvestment.investedCapital)}>
                    {#snippet icon()}
                        <BanknoteArrowDownIcon class="size-4" />
                    {/snippet}
                </StatCard>
                <StatCard title="Total Profit Acrued" number={formatCurrency(data.calculatedInvestment.profit)}>
                    {#snippet icon()}
                        <DollarSign class="size-4" />
                    {/snippet}
                </StatCard>
                <!-- since it is estimated i used ~ -->
                <StatCard title="Total Expected Profit" number={'~' + formatCurrency(data.calculatedInvestment.totalExpectedProfit)}>
                    {#snippet icon()}
                        <BanknoteArrowUpIcon class="size-4" />
                    {/snippet}
                </StatCard>
            </div>

            <!-- Payouts -->
            <CalculatorPayoutTable id={data.calculatedInvestment.id} payouts={data.payouts} />
        </div>
        <div class="lg:col-span-1">
            <CalculatorDetailsSection id={data.calculatedInvestment.id} data={data.calculatedInvestment} />
        </div>
    </div>
</div>
