<script lang="ts">
    import * as InputGroup from '$lib/components/ui/input-group/index.js';
    import { Input } from '$lib/components/ui/input';
    import { Label } from '$lib/components/ui/label';
    import { Search, Plus, Trash2Icon, Pencil } from 'lucide-svelte';
    import { Button } from '$lib/components/ui/button';
    import { formatCurrency, timeAgo } from '$lib/utils';
    import * as Dialog from '$lib/components/ui/dialog';
    import * as Select from '$lib/components/ui/select';
    import { toast } from 'svelte-sonner';
    import type { PageData } from './$types';

    let { data }: { data: PageData } = $props();

    let wallets = $state(data.wallets);
    let open = $state(false);
    let isEditing = $state(false);
    let editingId = $state('');
    let searchQuery = $state('');

    let formData = $state({
        cryptocurrency: '',
        name: '',
        address: '',
    });

    const SUPPORT_CRYPTOS = [
        { symbol: 'BTC', name: 'Bitcoin' },
        { symbol: 'ETH', name: 'Ethereum' },
        { symbol: 'USDT', name: 'Tether' },
        { symbol: 'BNB', name: 'Binance Coin' }
    ];

    function handleDelete(id: string) {
        if (!confirm('Are you sure you want to delete this wallet?')) return;
        wallets = wallets.filter((w) => w.id !== id);
        toast.success('Wallet deleted successfully');
    }

    function handleEdit(wallet: any) {
        isEditing = true;
        editingId = wallet.id;
        formData = {
            cryptocurrency: wallet.cryptocurrency,
            name: wallet.name,
            address: wallet.address,
        };
        open = true;
    }

    function resetForm() {
        formData = {
            cryptocurrency: '',
            name: '',
            address: '',
        };
        isEditing = false;
        editingId = '';
    }

    function handleSubmit(e?: Event) {
        if (e) e.preventDefault();

        if (!formData.cryptocurrency || !formData.name || !formData.address) {
            toast.error('Please fill in all fields');
            return;
        }

        if (isEditing) {
            wallets = wallets.map((w) => (w.id === editingId ? { ...w, ...formData } : w));
            toast.success('Wallet updated successfully');
        } else {
            const newWallet = {
                id: Math.random().toString(36).substr(2, 9),
                cryptocurrency: formData.cryptocurrency,
                name: formData.name,
                address: formData.address,
                received: '0.00',
                created_at: new Date().toISOString(),
            };
            wallets = [newWallet, ...wallets];
            toast.success('Wallet created successfully');
        }

        open = false;
        resetForm();
    }

    function openCreateDialog() {
        resetForm();
        open = true;
    }
</script>

<svelte:head>
    <title>My Wallets</title>
</svelte:head>

<div class="space-y-6 px-6 py-8">
    <div class="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
            <h1 class="text-2xl font-bold tracking-tight text-foreground">My Wallets</h1>
            <p class="text-muted-foreground mt-1 text-sm">Manage and view your crypto wallets.</p>
        </div>
        <div class="flex items-center gap-3">
            <!-- Search -->
            <InputGroup.Root>
                <InputGroup.Input placeholder="Search..." bind:value={searchQuery} />
                <InputGroup.Addon>
                    <Search />
                </InputGroup.Addon>
            </InputGroup.Root>

            <Dialog.Root bind:open>
                <Dialog.Trigger>
                    {#snippet child({ props })}
                        <Button {...props}  class="gap-2" variant="default" onclick={openCreateDialog}>
                            <Plus class="size-4" />
                            Create Wallet
                        </Button>
                    {/snippet}
                </Dialog.Trigger>
                <Dialog.Content class="sm:max-w-[425px]">
                    <Dialog.Header>
                        <Dialog.Title>{isEditing ? 'Edit Wallet' : 'Create New Wallet'}</Dialog.Title>
                        <Dialog.Description>{isEditing ? 'Update the wallet details.' : 'Add a new wallet to the system.'}</Dialog.Description>
                    </Dialog.Header>

                    <div class="grid gap-4 py-4">
                        <div class="grid gap-2">
                            <Label>Cryptocurrency</Label>
                            <Select.Root type="single" bind:value={formData.cryptocurrency}>
                                <Select.Trigger class="w-full">
                                    {formData.cryptocurrency
                                        ? SUPPORT_CRYPTOS.find((c) => c.symbol === formData.cryptocurrency)?.name
                                        : 'Select a cryptocurrency'}
                                </Select.Trigger>
                                <Select.Content>
                                    {#each SUPPORT_CRYPTOS as crypto}
                                        <Select.Item value={crypto.symbol} label={crypto.name}>{crypto.name}</Select.Item>
                                    {/each}
                                </Select.Content>
                            </Select.Root>
                        </div>

                        <div class="grid gap-2">
                            <Label for="name">Wallet Name</Label>
                            <Input id="name" bind:value={formData.name} placeholder="e.g. Main BTC Fund" required />
                        </div>

                        <div class="grid gap-2">
                            <Label for="address">Wallet Address</Label>
                            <Input id="address" bind:value={formData.address} placeholder="Enter wallet address" required />
                        </div>
                    </div>

                    <Dialog.Footer>
                        <Button onclick={() => handleSubmit()}>{isEditing ? 'Update Wallet' : 'Create Wallet'}</Button>
                    </Dialog.Footer>
                </Dialog.Content>
            </Dialog.Root>
        </div>
    </div>

    <div class="grid gap-4 mt-2">
        {#each wallets as wallet (wallet.id)}
            {@const crypto = SUPPORT_CRYPTOS.find((c) => c.symbol === wallet.cryptocurrency)}
            {@const cryptoName = crypto?.name || wallet.cryptocurrency}
            {@const hasReceived = Number(wallet.received) > 0}

            <div
                class="group flex flex-col sm:flex-row sm:items-center justify-between p-5 bg-card rounded-xl border shadow-sm hover:shadow-md transition-all gap-4"
            >
                <!-- Left: Wallet Details -->
                <div class="flex items-center gap-4 min-w-0">
                    <!-- Crypto Icon/Badge -->
                    <div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-lg">
                        {wallet.cryptocurrency.substring(0, 3)}
                    </div>

                    <!-- Info -->
                    <div class="min-w-0">
                        <div class="flex items-center gap-2">
                            <h3 class="font-semibold text-foreground text-base truncate">{wallet.name}</h3>
                            {#if wallet.created_at}
                                <span class="text-[11px] text-muted-foreground bg-secondary/50 px-2 py-0.5 rounded-[4px] whitespace-nowrap">
                                    Added {timeAgo(wallet.created_at)}
                                </span>
                            {/if}
                        </div>
                        <div class="flex items-center gap-2 text-sm text-muted-foreground mt-0.5">
                            <span class="font-medium text-foreground">{cryptoName}</span>
                            <span class="text-border dark:text-zinc-700">•</span>
                            <!-- Truncated address -->
                            <span class="font-mono text-xs truncate max-w-[120px] sm:max-w-[160px] lg:max-w-[250px]" title={wallet.address}>
                                {wallet.address}
                            </span>
                        </div>
                    </div>
                </div>

                <!-- Right: Stats & Actions -->
                <div class="flex items-center justify-between sm:justify-end gap-6 border-t sm:border-t-0 pt-4 sm:pt-0 mt-2 sm:mt-0">
                    <!-- Received Stats -->
                    <div class="text-left sm:text-right">
                        <p class="text-xs text-muted-foreground mb-1">Total Received</p>
                        <p class="font-semibold text-sm {hasReceived ? 'text-green-600 dark:text-green-400' : 'text-foreground'}">
                            {formatCurrency(Number(wallet.received))}
                        </p>
                    </div>

                    <!-- Actions -->
                    <div class="flex items-center gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            class="h-10 w-10 p-0 text-muted-foreground hover:text-primary transition-colors"
                            onclick={() => handleEdit(wallet)}
                        >
                            <Pencil class="size-4" />
                            <span class="sr-only">Edit</span>
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            class="h-10 w-10 p-0 text-muted-foreground hover:text-destructive hover:border-destructive/30 hover:bg-destructive/10 transition-colors"
                            onclick={() => handleDelete(wallet.id)}
                        >
                            <Trash2Icon class="size-4" />
                            <span class="sr-only">Delete</span>
                        </Button>
                    </div>
                </div>
            </div>
        {:else}
            <div class="flex flex-col items-center justify-center py-16 px-4 text-center bg-card rounded-xl border border-dashed shadow-sm">
                <div class="h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-4">
                    <Plus class="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 class="text-lg font-semibold text-foreground">No wallets found</h3>
                <p class="text-muted-foreground mt-1 max-w-sm mx-auto text-sm">You haven't added any wallets yet. Create one to get started.</p>
                <Button variant="outline" class="mt-6 gap-2" onclick={openCreateDialog}>
                    <Plus class="size-4" />
                    Create your first wallet
                </Button>
            </div>
        {/each}
    </div>
</div>
