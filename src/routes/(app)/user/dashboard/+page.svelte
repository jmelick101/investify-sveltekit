<script lang="ts">
    import StatCard from '$lib/components/StatCard.svelte';
    import { Wallet, TrendingUp, Users, Coins, Award, RefreshCw, ArrowUpRight, Compass } from 'lucide-svelte';
    import Chart from '$lib/components/user/Chart.svelte';
    import { formatCurrency, formatNumber } from '$lib/utils';
    import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '$lib/components/ui/empty';
    import { Button } from '$lib/components/ui/button';
    import AiChatSheet from '$lib/components/user/AiChatSheet.svelte';
    import type { PageData } from './$types';

    let { data }: { data: PageData } = $props();

    let aiChatOpen = $state(false);
</script>

<svelte:head>
    <title>Dashboard</title>
</svelte:head>

<div class="mx-auto w-full space-y-6 px-4 py-6 sm:px-6 lg:px-8">
    <!-- Welcome Banner -->
    <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
            <h1 class="text-2xl font-semibold text-foreground">
                Welcome back, {data.user?.firstName ?? 'Investor'}
            </h1>
            <p class="mt-1 text-sm text-muted-foreground">Here's an overview of your portfolio performance.</p>
        </div>
        <div class="flex gap-2">
            <a href="/user/plans">
                <Button variant="secondary" class="gap-2">
                    <Compass class="h-4 w-4" />
                    Explore Plans
                </Button>
            </a>
            <AiChatSheet bind:open={aiChatOpen} />
        </div>
    </div>

    <!-- Stat Cards — 2x3 grid -->
    <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard title="Total Invested" number={formatCurrency(8200)} trend={{ value: 5.2, label: 'from last month', isPositive: true }}>
            {#snippet icon()}
                <TrendingUp class="h-4 w-4" />
            {/snippet}
        </StatCard>
        <StatCard title="Available Balance" number={formatCurrency(12450)} trend={{ value: 12.5, label: 'from last month', isPositive: true }}>
            {#snippet icon()}
                <Wallet class="h-4 w-4" />
            {/snippet}
        </StatCard>
        <StatCard title="Compound Earnings" number={formatCurrency(3100)} trend={{ value: 2.1, label: 'from last month', isPositive: true }}>
            {#snippet icon()}
                <RefreshCw class="h-4 w-4" />
            {/snippet}
        </StatCard>
        <StatCard title="Referral Earnings" number={formatCurrency(450)}>
            {#snippet icon()}
                <Users class="h-4 w-4" />
            {/snippet}
        </StatCard>
        <StatCard title="Token Balance" number={formatNumber(15000) + ' TKN'}>
            {#snippet icon()}
                <Coins class="h-4 w-4" />
            {/snippet}
        </StatCard>
        <StatCard title="Tokens Earned" number={formatNumber(2500) + ' TKN'} trend={{ value: 8.4, label: 'from last month', isPositive: true }}>
            {#snippet icon()}
                <Award class="h-4 w-4" />
            {/snippet}
        </StatCard>
    </div>

    <!-- Chart Section -->
    <div class="rounded-2xl border border-border/50 bg-card p-6 shadow-sm">
        <h3 class="mb-6 font-semibold text-foreground">Performance Overview</h3>
        <Chart />
    </div>

    <!-- Active Investments Section -->
    <div class="space-y-4">
        <div class="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
                <h3 class="font-semibold text-foreground">Active Investments</h3>
                <p class="text-sm text-muted-foreground">Monitor your current portfolio performance.</p>
            </div>
            <a href="/user/my-investments">
                <Button variant="ghost" size="sm" class="gap-1 text-primary hover:bg-primary/10">
                    View entire portfolio
                    <ArrowUpRight class="h-4 w-4" />
                </Button>
            </a>
        </div>

        {#if data.investments.length > 0}
            <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {#each data.investments as investment}
                    <a
                        class="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-border/40 bg-card p-5 transition-all hover:border-primary/30 hover:shadow-md"
                        href="/user/my-investments/{investment.id}"
                    >
                        <!-- Top Area -->
                        <div class="mb-4 flex items-start justify-between">
                            <div
                                class="flex h-10 w-10 items-center justify-center rounded-lg {investment.status === 'active'
                                    ? 'bg-success/10 text-success'
                                    : 'bg-primary/10 text-primary'}"
                            >
                                <TrendingUp class="h-5 w-5" />
                            </div>
                            <span class="rounded-full bg-accent px-2.5 py-0.5 text-xs font-medium text-foreground">
                                {investment.status === 'active' ? 'Active' : 'Pending'}
                            </span>
                        </div>

                        <!-- Content -->
                        <div>
                            <h4 class="font-semibold text-foreground line-clamp-1">{investment.planName}</h4>
                            <div class="mt-4 flex items-end justify-between">
                                <div>
                                    <p class="text-xs text-muted-foreground uppercase tracking-wider mb-1">Invested</p>
                                    <p class="text-lg font-bold text-foreground">{formatCurrency(parseFloat(investment.amount))}</p>
                                </div>
                                <div class="text-right">
                                    <p class="text-xs text-muted-foreground uppercase tracking-wider mb-1">Profit</p>
                                    <p class="text-sm font-semibold text-success">+{formatCurrency(parseFloat(investment.profitAccrued || '0'))}</p>
                                </div>
                            </div>
                        </div>

                        <!-- Progress/Timeline bar -->
                        <div class="mt-5 space-y-1.5">
                            <div class="flex items-center justify-between text-xs text-muted-foreground">
                                <span>Progress</span>
                                <span>12 days remaining</span>
                            </div>
                            <div class="h-1.5 w-full overflow-hidden rounded-full bg-accent">
                                <div class="h-full rounded-full bg-primary" style="width: 65%;"></div>
                            </div>
                        </div>
                    </a>
                {/each}
            </div>
        {:else}
            <div class="rounded-2xl border border-border/50 bg-card shadow-sm">
                <Empty>
                    <EmptyMedia>
                        <div class="flex h-16 w-16 items-center justify-center rounded-full bg-muted/50">
                            <TrendingUp class="h-8 w-8 text-muted-foreground" />
                        </div>
                    </EmptyMedia>
                    <EmptyContent>
                        <EmptyHeader>
                            <EmptyTitle>No active investments</EmptyTitle>
                            <EmptyDescription>Start your wealth-building journey today.</EmptyDescription>
                        </EmptyHeader>
                        <div class="mt-4">
                            <a href="/user/plans">
                                <Button>Explore Plans</Button>
                            </a>
                        </div>
                    </EmptyContent>
                </Empty>
            </div>
        {/if}
    </div>
</div>
