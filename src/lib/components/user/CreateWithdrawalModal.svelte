<script lang="ts">
    import { formatCurrency } from '$lib/utils';
    import { Button, buttonVariants } from '$lib/components/ui/button/index.js';
    import { Input } from '$lib/components/ui/input/index.js';
    import { Label } from '$lib/components/ui/label/index.js';
    import { cn } from '$lib/utils';
    import { toast } from 'svelte-sonner';
    import * as InputGroup from '$lib/components/ui/input-group/index.js';
    import * as Dialog from '$lib/components/ui/dialog/index.js';
    import ComboBox from '../ComboBox.svelte';
    import { CRYPTO_WALLETS } from '$lib/store';
    import { BanknoteArrowUp } from 'lucide-svelte';

    let open = $state(false);
    let form = $state({
        wallet: null,
        cryptoWallet: null,
        amount: null,
    });
    // I am guessing this will only be active wallets shown so need for statys
    const wallets = $state([
        {
            id: 1,
            name: 'Main',
            balance: 1000,
        },
        {
            id: 2,
            name: 'Token',
            balance: 152,
        },
        {
            id: 3,
            name: 'Compounding',
            balance: 31434,
        },
        {
            id: 4,
            name: 'Bonus',
            balance: 213,
        },
    ]);

    const formatedWalletsOptions = $derived(
        wallets.map((wallet) => ({
            value: wallet.id,
            label: wallet.name + ' - ' + formatCurrency(wallet.balance),
        })),
    );

    function handleSubmit(e: Event) {
        e.preventDefault();
        toast.success('Withdrawal created successfully');
        open = false;
    }
</script>

<Dialog.Root bind:open>
    <Dialog.Trigger class={cn(buttonVariants({ variant: 'default' }), 'cursor-pointer')}>
        <BanknoteArrowUp class="size-4" />
        Make Withdrawal
    </Dialog.Trigger>
    <Dialog.Content class="sm:max-w-[525px]">
        <Dialog.Header>
            <Dialog.Title>Create Withdrawal</Dialog.Title>
            <Dialog.Description>Create withdrawal request for user</Dialog.Description>
        </Dialog.Header>
        <form class="flex flex-col gap-4" onsubmit={handleSubmit}>
            <div class="grid gap-2">
                <Label for="wallet">Wallet</Label>
                <ComboBox type="single" options={formatedWalletsOptions} bind:value={form.wallet} search={false} />
            </div>
            <div class="grid grid-cols-2 gap-2">
                <div class="grid gap-2">
                    <Label for="cryptoWallet">Crypto Wallet</Label>
                    <ComboBox
                        type="single"
                        options={$CRYPTO_WALLETS.map((wallet) => ({ value: wallet.id, label: wallet.name }))}
                        bind:value={form.cryptoWallet}
                        search={false}
                        disabled={form.wallet === null}
                    />
                </div>
                <div class="grid gap-2">
                    <Label for="amount">Amount</Label>
                    <InputGroup.Root>
                        <InputGroup.Addon>
                            <InputGroup.Text>£</InputGroup.Text>
                        </InputGroup.Addon>
                        <InputGroup.Input
                            placeholder="0.00"
                            id="amount"
                            name="amount"
                            type="number"
                            step="0.01"
                            bind:value={form.amount}
                            required
                            disabled={form.wallet === null}
                        />
                        <InputGroup.Addon align="inline-end">
                            <InputGroup.Text>GBP</InputGroup.Text>
                        </InputGroup.Addon>
                    </InputGroup.Root>
                </div>
            </div>

            <div class="col-span-2 flex justify-end items-center gap-2">
                <Button variant="outline" onclick={() => (open = false)}>Cancel</Button>
                <Button
                    type="submit"
                    disabled={form.wallet === null ||
                        form.cryptoWallet === null ||
                        form.amount === null}>Make Withdrawal</Button
                >
            </div>
        </form>
    </Dialog.Content>
</Dialog.Root>
