<script lang="ts">
    import StatCard from '$lib/components/StatCard.svelte';
    import { Copy, Search, Users, Coins, Award, ArrowRight, ListFilter, CircleQuestionMark, UserPlus } from 'lucide-svelte';
    import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
    import * as InputGroup from '$lib/components/ui/input-group/index.js';
    import { Button } from '$lib/components/ui/button';
    import { Input } from '$lib/components/ui/input';
    import * as Table from '$lib/components/ui/table/index.js';
    import { formatDateExt, formatCurrency, copy } from '$lib/utils';
    import Status from '$lib/components/Status.svelte';
    import * as Card from '$lib/components/ui/card';
    import * as Pagination from '$lib/components/ui/pagination/index.js';
    import * as Sheet from '$lib/components/ui/sheet/index.js';
    import type { PageData } from './$types';

    let { data }: { data: PageData } = $props();

    let searchQuery = $state('');
    let referralLink = $state(`https://investify.com/register?ref=${data.user.referralCode}`);
</script>

<svelte:head>
    <title>Referrals</title>
</svelte:head>

<div class="space-y-6 px-6 py-8">
    <!-- Header Section -->
    <div class="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
            <div class="flex items-center gap-2">
                <h1 class="text-2xl font-bold tracking-tight text-foreground">Referrals</h1>
                <Sheet.Root>
                    <Sheet.Trigger>
                        {#snippet child({ props })}
                            <Button
                                {...props}
                                variant="ghost"
                                size="icon"
                                class="h-7 w-7 rounded-full text-muted-foreground hover:text-foreground"
                            >
                                <CircleQuestionMark class="size-4" />
                            </Button>
                        {/snippet}
                    </Sheet.Trigger>
                    <Sheet.Content side="right">
                        <Sheet.Header>
                            <Sheet.Title>Referral Structures</Sheet.Title>
                            <Sheet.Description>Learn how our referral system works.</Sheet.Description>
                        </Sheet.Header>
                        <div class="grid gap-4 py-6">
                            <p class="text-sm text-foreground leading-relaxed bg-muted/50 p-4 rounded-lg border">
                                The accumulation of tokens will serve as the means of accessing the various referral levels available
                                on the system.
                            </p>
                        </div>
                    </Sheet.Content>
                </Sheet.Root>
            </div>
            <p class="text-muted-foreground mt-1 text-sm">Manage and view your referrals and earnings.</p>
        </div>
        <div class="flex items-center gap-3 w-full md:w-auto">
            <div class="flex items-center space-x-2 w-full md:w-auto bg-muted/30 p-1.5 rounded-lg border shadow-sm">
                <div class="relative flex-1 md:w-64">
                    <Input
                        id="link"
                        readonly
                        value={referralLink}
                        class="bg-card w-full h-9 border-muted pr-10 hover:border-border transition-colors truncate"
                    />
                </div>
                <Button
                    size="icon"
                    variant="secondary"
                    class="h-9 w-9 shrink-0"
                    onclick={() => copy(referralLink, 'Referral link copied to clipboard')}
                >
                    <span class="sr-only">Copy</span>
                    <Copy class="h-4 w-4" />
                </Button>
            </div>
        </div>
    </div>

    <!-- Promotional Banner -->
    <a href="#" class="block relative overflow-hidden rounded-xl border bg-card shadow-sm group mt-2 mb-6 h-32 md:h-40 xl:h-48 cursor-pointer">
        <img
            src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2664&auto=format&fit=crop"
            alt="Promotional Banner"
            class="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
        />
    </a>

    <!-- Stats Grid -->
    <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <StatCard title="Referral Earnings" number={formatCurrency(8200)} trend={{ value: 5.2, label: 'from last month', isPositive: true }}>
            {#snippet icon()}
                <Coins class="h-4 w-4 text-muted-foreground" />
            {/snippet}
        </StatCard>
        <StatCard title="Bonus Balance" number={formatCurrency(12450)}>
            {#snippet icon()}
                <Award class="h-4 w-4 text-muted-foreground" />
            {/snippet}
            {#snippet link()}
                <a href="/user/referrals" class="text-xs font-medium text-primary hover:underline flex items-center justify-end gap-1 mt-2">
                    Withdraw Bonus
                    <ArrowRight class="size-3" />
                </a>
            {/snippet}
        </StatCard>
        <StatCard title="Team Volume" number={formatCurrency(3100)} trend={{ value: 2.1, label: 'from last month', isPositive: true }}>
            {#snippet icon()}
                <Users class="h-4 w-4 text-muted-foreground" />
            {/snippet}
        </StatCard>
    </div>

    <!-- Table Header Section -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-8">
        <h2 class="text-lg font-semibold tracking-tight text-foreground">Referral History</h2>

        <div class="flex items-center gap-2">
            <form class="w-full sm:w-auto">
                <!-- Search -->
                <InputGroup.Root>
                    <InputGroup.Input placeholder="Search downlines..." bind:value={searchQuery} />
                    <InputGroup.Addon>
                        <Search class="size-4" />
                    </InputGroup.Addon>
                    <InputGroup.Addon align="inline-end">
                        <DropdownMenu.Root>
                            <DropdownMenu.Trigger>
                                <Button variant="secondary" size="icon" class="size-6">
                                    <ListFilter class="size-4" />
                                </Button>
                            </DropdownMenu.Trigger>
                            <DropdownMenu.Content align="end" class="w-48">
                                <DropdownMenu.Label>Filter by Group</DropdownMenu.Label>
                                <DropdownMenu.Item class="gap-2" onclick={() => (searchQuery = '')}>
                                    <span>All</span>
                                </DropdownMenu.Item>

                                {#each [{ value: 'Pioneer', label: 'Pioneer' }, { value: 'Elite Partner', label: 'Elite Partner' }, { value: 'Regional Leader', label: 'Regional Leader' }] as group}
                                    <DropdownMenu.Item class="gap-2" onclick={() => (searchQuery = group.value)}>
                                        <span>{group.label}</span>
                                    </DropdownMenu.Item>
                                {/each}
                            </DropdownMenu.Content>
                        </DropdownMenu.Root>
                    </InputGroup.Addon>
                </InputGroup.Root>
            </form>
        </div>
    </div>

    <!-- Table -->
    <Card.Root class="py-0 overflow-hidden mt-4">
        <Table.Root class="overflow-hidden">
            <Table.Header class="bg-muted/50 dark:bg-zinc-900 border-b border-border">
                <Table.Row class="[&>th]:px-4">
                    <Table.Head class="ps-6">Group</Table.Head>
                    <Table.Head>User</Table.Head>
                    <Table.Head>Plan</Table.Head>
                    <Table.Head>Bonus</Table.Head>
                    <Table.Head>Level</Table.Head>
                    <Table.Head>Date</Table.Head>
                    <Table.Head>Status</Table.Head>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {#each data.referrals as referral}
                    <Table.Row class="[&>td]:py-4 [&>td]:px-4 hover:bg-muted/30 transition-colors">
                        <Table.Cell class="ps-6">
                            <span
                                class="capitalize border bg-secondary/40 px-2.5 py-1 rounded-full text-[11px] font-medium text-foreground whitespace-nowrap"
                            >
                                {referral.group}
                            </span>
                        </Table.Cell>
                        <Table.Cell>
                            <div class="font-medium text-foreground">{referral.user.name}</div>
                            <div class="text-[13px] text-muted-foreground truncate max-w-[150px]">{referral.user.email}</div>
                        </Table.Cell>

                        <Table.Cell class="max-w-[200px]">
                            <span class="truncate block whitespace-nowrap" title={referral.plan}>
                                {referral.plan}
                            </span>
                        </Table.Cell>
                        <Table.Cell class="font-semibold text-green-600 dark:text-green-500">
                            +{formatCurrency(referral.bonusEarned)}
                        </Table.Cell>
                        <Table.Cell>
                            <span class="bg-primary/10 text-primary px-2 rounded-md font-medium text-xs py-0.5">
                                Lvl {referral.referralLevel}
                            </span>
                        </Table.Cell>
                        <Table.Cell class="text-muted-foreground text-sm">
                            {formatDateExt(referral.date)}
                        </Table.Cell>

                        <Table.Cell>
                            <Status status={referral.status} />
                        </Table.Cell>
                    </Table.Row>
                {:else}
                    <Table.Row>
                        <Table.Cell colspan={7} class="h-52 text-center bg-card">
                            <div class="flex flex-col items-center justify-center text-muted-foreground w-full py-8">
                                <UserPlus class="size-10 mb-3 opacity-20" />
                                <p class="font-medium text-foreground">No downlines assigned</p>
                                <p class="text-sm mt-1">You haven't referred anyone yet.</p>
                            </div>
                        </Table.Cell>
                    </Table.Row>
                {/each}
            </Table.Body>

            <Table.Footer class="bg-muted/20">
                <Table.Row>
                    <Table.Cell colspan={7} class="text-[13px] text-muted-foreground px-6 py-3">
                        Total Downlines: <span class="font-medium text-foreground">{data.referrals.length || 0}</span>
                    </Table.Cell>
                </Table.Row>
            </Table.Footer>
        </Table.Root>
    </Card.Root>

    <Pagination.Root count={30} page={1} class="justify-center mt-8">
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
