<script lang="ts">
    import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
    import * as InputGroup from '$lib/components/ui/input-group/index.js';
    import { Search, ListFilter, File, FileCheck, FileQuestionMark, FileX, Plus, TrendingUp } from 'lucide-svelte';
    import { Button } from '$lib/components/ui/button';
    import * as Pagination from '$lib/components/ui/pagination/index.js';
    import { formatDateExt, formatCurrency } from '$lib/utils';
    import type { PageData } from './$types';

    let { data }: { data: PageData } = $props();

    let searchQuery = $state('');

    let total = $derived(data.investments.length);
    let approved = $derived(data.investments.filter((d) => d.status === 'approved' || d.status === 'active').length);
    let pending = $derived(data.investments.filter((d) => d.status === 'pending').length);
    let rejected = $derived(data.investments.filter((d) => d.status === 'rejected').length);

    let filteredInvestments = $derived(
        data.investments.filter((inv) => {
            const lowerQuery = searchQuery.toLowerCase();
            return (
                inv.status.toLowerCase().includes(lowerQuery) ||
                inv.id.toLowerCase().includes(lowerQuery) ||
                inv.plan.name.toLowerCase().includes(lowerQuery)
            );
        }),
    );
</script>

<svelte:head>
    <title>My Investments</title>
</svelte:head>

<div class="space-y-6 px-6 py-8">
    <div class="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
            <h1 class="text-2xl font-bold tracking-tight text-foreground">My Investments</h1>
            <p class="text-muted-foreground mt-1 text-sm">Manage and view investments.</p>
            <div class="mt-4 flex flex-wrap items-center gap-2">
                <div
                    class="flex items-center gap-1.5 rounded-full border border-border/50 bg-background px-3 py-1 text-xs font-medium text-muted-foreground shadow-sm"
                >
                    <File class="h-3.5 w-3.5 text-primary" /> Total: <span class="text-foreground">{total}</span>
                </div>
                <div
                    class="flex items-center gap-1.5 rounded-full border border-success/20 bg-success/5 px-3 py-1 text-xs font-medium text-success shadow-sm"
                >
                    <FileCheck class="h-3.5 w-3.5" /> Approved: <span>{approved}</span>
                </div>
                <div
                    class="flex items-center gap-1.5 rounded-full border border-warning/20 bg-warning/5 px-3 py-1 text-xs font-medium text-warning shadow-sm"
                >
                    <FileQuestionMark class="h-3.5 w-3.5" /> Pending: <span>{pending}</span>
                </div>
                <div
                    class="flex items-center gap-1.5 rounded-full border border-destructive/20 bg-destructive/5 px-3 py-1 text-xs font-medium text-destructive shadow-sm"
                >
                    <FileX class="h-3.5 w-3.5" /> Rejected: <span>{rejected}</span>
                </div>
            </div>
        </div>
        <div class="flex items-center gap-3">
            <!-- Search -->
            <InputGroup.Root>
                <InputGroup.Input placeholder="Search..." bind:value={searchQuery} />
                <InputGroup.Addon>
                    <Search />
                </InputGroup.Addon>
                <InputGroup.Addon align="inline-end">
                    <DropdownMenu.Root>
                        <DropdownMenu.Trigger>
                            <Button variant="secondary" size="icon" class="size-6">
                                <ListFilter class="size-4" />
                            </Button>
                        </DropdownMenu.Trigger>
                        <DropdownMenu.Content align="end" class="w-48">
                            <DropdownMenu.Label>Filter by Status</DropdownMenu.Label>
                            <DropdownMenu.Item class="gap-2" onclick={() => (searchQuery = '')}>
                                <span>All</span>
                            </DropdownMenu.Item>

                            {#each [{ value: 'approved', label: 'Approved' }, { value: 'pending', label: 'Pending' }, { value: 'rejected', label: 'Rejected' }] as status}
                                <DropdownMenu.Item class="gap-2" onclick={() => (searchQuery = status.value)}>
                                    <span>{status.label}</span>
                                </DropdownMenu.Item>
                            {/each}
                        </DropdownMenu.Content>
                    </DropdownMenu.Root>
                </InputGroup.Addon>
            </InputGroup.Root>

            <a href="/user/plans">
                <Button variant="default">
                    <Plus class="size-4" />
                    New Investment
                </Button>
            </a>
        </div>
    </div>

    {#if filteredInvestments.length > 0}
        <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {#each filteredInvestments as investment (investment.id)}
                <a
                    class="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-border/40 bg-card p-5 text-left transition-all hover:border-primary/30 hover:shadow-md"
                    href="/user/my-investments/{investment.id}"
                >
                    <!-- Top Area -->
                    <div class="mb-4 flex items-start justify-between">
                        <div
                            class="flex h-10 w-10 items-center justify-center rounded-lg {investment.status.toLowerCase() === 'approved' ||
                            investment.status.toLowerCase() === 'active'
                                ? 'bg-success/10 text-success'
                                : investment.status.toLowerCase() === 'pending'
                                  ? 'bg-warning/10 text-warning'
                                  : 'bg-destructive/10 text-destructive'}"
                        >
                            <TrendingUp class="h-5 w-5" />
                        </div>
                        <span
                            class="rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize
                            {investment.status.toLowerCase() === 'approved' || investment.status.toLowerCase() === 'active'
                                ? 'bg-success/10 text-success'
                                : investment.status.toLowerCase() === 'pending'
                                  ? 'bg-warning/10 text-warning'
                                  : 'bg-destructive/10 text-destructive'}"
                        >
                            {investment.status}
                        </span>
                    </div>

                    <!-- Content Head -->
                    <div>
                        <h4 class="line-clamp-1 font-semibold text-foreground">{investment.plan.name}</h4>
                        <p class="mt-1 text-xs text-muted-foreground font-mono">ID: {investment.id}</p>
                    </div>

                    <!-- Main Stats -->
                    <div class="mt-4 grid grid-cols-2 gap-4 border-y border-border/40 py-4">
                        <div>
                            <p class="mb-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Invested</p>
                            <p class="text-sm font-bold text-foreground">{formatCurrency(investment.invested)}</p>
                        </div>
                        <div class="text-right">
                            <p class="mb-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Split (L/R)</p>
                            <p class="text-sm font-medium text-foreground">
                                {formatCurrency(investment.split.left)}/{formatCurrency(investment.split.right)}
                            </p>
                        </div>
                    </div>

                    <!-- Dates -->
                    <div class="mt-4 space-y-2">
                        <div class="flex items-center justify-between text-xs">
                            <span class="text-muted-foreground">Start Date</span>
                            <span class="font-medium text-foreground">{formatDateExt(investment.startDate)}</span>
                        </div>
                        <div class="flex items-center justify-between text-xs">
                            <span class="text-muted-foreground">End Date</span>
                            <span class="font-medium text-foreground">{formatDateExt(investment.endDate)}</span>
                        </div>
                        <div class="flex items-center justify-between text-xs">
                            <span class="text-muted-foreground">Next Payment</span>
                            <span class="font-medium text-primary">{formatDateExt(investment.nextPaymentDate)}</span>
                        </div>
                    </div>
                </a>
            {/each}
        </div>
    {:else}
        <div class="rounded-2xl border border-border/50 bg-card py-16 shadow-sm">
            <div class="flex flex-col items-center justify-center text-center">
                <div class="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted/50">
                    <FileQuestionMark class="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 class="text-lg font-semibold text-foreground">No investments found</h3>
                <p class="mt-1 max-w-sm text-sm text-muted-foreground">We couldn't find any investments matching your current filters.</p>
                <Button variant="outline" class="mt-6" onclick={() => (searchQuery = '')}>Clear Filters</Button>
            </div>
        </div>
    {/if}

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
</div>
