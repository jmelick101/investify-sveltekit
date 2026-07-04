<script lang="ts">
    import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
    import * as InputGroup from '$lib/components/ui/input-group/index.js';
    import { Search, ListFilter, File, FileCheck, FileQuestionMark, FileX } from 'lucide-svelte';
    import { Button } from '$lib/components/ui/button';
    import * as Table from '$lib/components/ui/table/index.js';
    import * as Card from '$lib/components/ui/card';
    import * as Pagination from '$lib/components/ui/pagination/index.js';
    import { formatDateExt, formatCurrency } from '$lib/utils';
    import Status from '$lib/components/Status.svelte';
    import CreateWithdrawalModal from '$lib/components-legacy/user/CreateWithdrawalModal.svelte';
    import type { PageData } from './$types';

    let { data }: { data: PageData } = $props();

    let searchQuery = $state('');

    let total = $derived(data.withdrawals.length);
    let paid = $derived(data.withdrawals.filter((d) => d.status === 'paid').length);
    let pending = $derived(data.withdrawals.filter((d) => d.status === 'pending').length);
    let rejected = $derived(data.withdrawals.filter((d) => d.status === 'rejected').length);

    let filteredWithdrawals = $derived(
        data.withdrawals.filter((withdrawal) => {
            const lowerQuery = searchQuery.toLowerCase();
            return (
                withdrawal.status.toLowerCase().includes(lowerQuery) ||
                withdrawal.id.toLowerCase().includes(lowerQuery) ||
                withdrawal.crypto.toLowerCase().includes(lowerQuery)
            );
        }),
    );

    function cancelWithdrawal(id: string) {
        if (!confirm('Are you sure you want to cancel this withdrawal?')) {
            return;
        }
        console.log(id);
    }
</script>

<svelte:head>
    <title>Withdrawals</title>
</svelte:head>

<div class="space-y-6 px-6 py-8">
    <div class="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
            <h1 class="text-2xl font-bold tracking-tight text-foreground">Withdrawals</h1>
            <p class="text-muted-foreground mt-1 text-sm">Manage and view withdrawals.</p>
            <div class="mt-4 flex flex-wrap items-center gap-2">
                <div
                    class="flex items-center gap-1.5 rounded-full border border-border/50 bg-background px-3 py-1 text-xs font-medium text-muted-foreground shadow-sm"
                >
                    <File class="h-3.5 w-3.5 text-primary" /> Total: <span class="text-foreground">{total}</span>
                </div>
                <div
                    class="flex items-center gap-1.5 rounded-full border border-success/20 bg-success/5 px-3 py-1 text-xs font-medium text-success shadow-sm"
                >
                    <FileCheck class="h-3.5 w-3.5" /> Paid: <span>{paid}</span>
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

            <CreateWithdrawalModal />
        </div>
    </div>

    <Card.Root class="py-0 overflow-hidden">
        <Table.Root class="overflow-hidden">
            <Table.Header class="bg-gray-50 dark:bg-zinc-900">
                <Table.Row class="[&>th]:px-3">
                    <Table.Head class="ps-6">Amount</Table.Head>
                    <Table.Head>Crypto</Table.Head>
                    <Table.Head>Address</Table.Head>
                    <Table.Head>Status</Table.Head>
                    <Table.Head>Created</Table.Head>
                    <Table.Head>Paid</Table.Head>
                    <Table.Head class="flex items-center justify-end">Actions</Table.Head>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {#each filteredWithdrawals as withdrawal (withdrawal.id)}
                    <Table.Row class="[&>td]:py-3 [&>td]:px-3 hover:bg-muted/50">
                        <Table.Cell class="font-semibold text-green-600 ps-6">{formatCurrency(withdrawal.amount)}</Table.Cell>
                        <Table.Cell>
                            {withdrawal.crypto}
                        </Table.Cell>

                        <Table.Cell>
                            <span class="text-sm">
                                {withdrawal.address}
                            </span>
                        </Table.Cell>
                        <Table.Cell>
                            <Status status={withdrawal.status} />
                        </Table.Cell>
                        <Table.Cell>{formatDateExt(withdrawal.createdAt)}</Table.Cell>
                        <Table.Cell>{formatDateExt(withdrawal.updatedAt)}</Table.Cell>
                        <Table.Cell class="flex items-center justify-end">
                            {#if withdrawal.status === 'pending'}
                                <Button variant="destructive" class="cursor-pointer" size="sm" onclick={() => cancelWithdrawal(withdrawal.id)}
                                    >Cancel</Button
                                >
                            {/if}
                        </Table.Cell>
                    </Table.Row>
                {:else}
                    <Table.Row>
                        <Table.Cell colspan={11} class="h-96 text-center">
                            <div class="flex flex-col items-center justify-center text-muted-foreground">
                                <FileQuestionMark class="size-10 mb-2 opacity-20" />
                                <p>No withdrawal requests found</p>
                            </div>
                        </Table.Cell>
                    </Table.Row>
                {/each}
            </Table.Body>
            <Table.Footer></Table.Footer>
        </Table.Root>
    </Card.Root>

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
