<script lang="ts">
    import { Button, buttonVariants } from '$lib/components/ui/button/index.js';
    import { CreditCard, Wallet, Copy, Check, LoaderCircle, CircleAlertIcon, Loader } from 'lucide-svelte';
    import { Label } from '$lib/components/ui/label/index.js';
    import { cn } from '$lib/utils';
    import { toast } from 'svelte-sonner';
    import * as InputGroup from '$lib/components/ui/input-group/index.js';
    import * as RadioGroup from '$lib/components/ui/radio-group/index.js';
    import * as Dialog from '$lib/components/ui/dialog/index.js';
    import { Checkbox } from '$lib/components/ui/checkbox/index.js';
    import { Input } from '$lib/components/ui/input/index.js';

    import ComboBox from '../ComboBox.svelte';
    import { SUPPORT_CRYPTOS, CRYPTO_WALLETS } from '$lib/store';

    import QRCode from 'qrcode';
    import { copy, formatCurrency, convertGBPToCrypto } from '$lib/utils';
    import * as Alert from '$lib/components/ui/alert/index.js';
    import { USER, SYSTEM } from '$lib/store';

    let { data, open = $bindable(false), class: className = '' } = $props();

    let form = $state({
        plan: null,
        payoutOption: null,
        crypto: null,
        amount: 0,
        paymentMethod: '',
        calculatorId: null,
    });

    let isSubmitting = $state(false);
    let showQrCode = $state(false);
    let qrCodeUrl = $state('');
    let selectedWalletAddress = $state('');

    // Payment Verification State
    let cryptoConversion = $state<{ amount: number; symbol: string; formattedAmount: string; usdAmount: number } | null>(null);
    let isLoadingConversion = $state(false);
    let hasPaid = $state(false);
    let transactionHash = $state('');
    let isSubmittingPayment = $state(false);

    $inspect(form);

    // Helper to determine if we are dealing with a calculator result or a raw plan
    const isCalculator = $derived(data && 'plan' in data);
    const activePlan = $derived(isCalculator ? data.plan : data);

    $effect(() => {
        if (data && !open) {
            // Reset state when modal closes/opens fresh
            resetForm();
        }
    });

    function resetForm() {
        if (!data) return;
        form.plan = activePlan?.id;
        form.amount = isCalculator ? data.amount : data.minAmount || 0;
        form.payoutOption = data.payoutOption || null;
        form.crypto = data.crypto?.symbol || null;
        form.calculatorId = isCalculator ? data.id : null;
        if (!form.paymentMethod) form.paymentMethod = '1';

        isSubmitting = false;
        showQrCode = false;
        qrCodeUrl = '';
        selectedWalletAddress = '';

        // Reset Checkbox Form
        cryptoConversion = null;
        isLoadingConversion = false;
        hasPaid = false;
        transactionHash = '';
        isSubmittingPayment = false;
    }

    const formatedPlansOptions = $derived([
        {
            value: activePlan?.id,
            label: activePlan?.name,
        },
    ]);

    const payoutOptions = $derived.by(() => {
        if (!activePlan?.payout) return [];
        return activePlan.payout.map((payoutOption: any) => ({
            value: payoutOption,
            label: payoutOption,
        }));
    });

    const insufficientFunds = $derived(
        form.paymentMethod === '2' &&
            Number(form.amount) > Number($USER.walletBalance) + Number($USER.tokenBalance) * Number($SYSTEM.tokenMultiplier),
    );

    async function handleSubmit(e: Event) {
        e.preventDefault();
        if (isSubmitting) return;

        isSubmitting = true;

        // Find wallet address
        // Fix: Map symbol to name for wallet lookup
        const cryptoInfo = $SUPPORT_CRYPTOS.find((c) => c.symbol === form.crypto);
        const wallet = $CRYPTO_WALLETS.find((w) => w.name === cryptoInfo?.name) || $CRYPTO_WALLETS[0];
        selectedWalletAddress = wallet?.address || '0x0000000000000000000000000000000000000000';

        // Simulate transaction delay
        setTimeout(async () => {
            try {
                // Perform Currency Conversion FIRST
                isLoadingConversion = true;
                const result = await convertGBPToCrypto(form.amount, form.crypto || 'BTC');
                cryptoConversion = result;

                // Construct Payment URI
                let paymentURI = selectedWalletAddress;
                if (result?.amount && cryptoInfo) {
                    const scheme = cryptoInfo.name.toLowerCase();
                    if (scheme === 'bitcoin') {
                        paymentURI = `bitcoin:${selectedWalletAddress}?amount=${result.amount}`;
                    } else if (scheme === 'ethereum') {
                        paymentURI = `ethereum:${selectedWalletAddress}?value=${result.amount}`; // keeping simple, standardized EIP-681 usually requires wei/exponential
                    } else {
                        // Generic fallback for others
                        paymentURI = `${scheme}:${selectedWalletAddress}?amount=${result.amount}`;
                    }
                }

                // Generate QR Code with URI
                qrCodeUrl = await QRCode.toDataURL(paymentURI, {
                    width: 200,
                    margin: 2,
                    color: {
                        dark: '#000000',
                        light: '#ffffff',
                    },
                });

                showQrCode = true;
                toast.success('Order initiated! Please complete payment.');
            } catch (err) {
                console.error(err);
                toast.error('Failed to initiate order');
            } finally {
                isSubmitting = false;
                isLoadingConversion = false;
            }
        }, 2000);
    }

    async function handlePaymentSubmit(e: Event) {
        e.preventDefault();
        if (isSubmittingPayment) return;

        isSubmittingPayment = true;
        // fake delay
        setTimeout(() => {
            toast.success('Payment submitted for verification!');
            isSubmittingPayment = false;
            handleClose();
        }, 1500);
    }

    function handleClose() {
        open = false;
        resetForm();
    }
</script>

<Dialog.Root bind:open>
    <Dialog.Trigger class={cn(buttonVariants({ variant: 'default' }), 'hover:cursor-pointer', className)}>
        <CreditCard />
        Buy Plan
    </Dialog.Trigger>
    <Dialog.Content class="sm:max-w-[525px]">
        <Dialog.Header>
            <Dialog.Title>{showQrCode ? 'Complete Payment' : 'Buy Plan'}</Dialog.Title>
            <Dialog.Description>{showQrCode ? 'Scan the QR code or copy the address to pay.' : 'Buy this plan and start earning'}</Dialog.Description>
        </Dialog.Header>

        {#if !showQrCode}
            <form class="flex flex-col gap-4" onsubmit={handleSubmit}>
                <div class="grid gap-2">
                    <Label for="plan">Plan</Label>
                    <ComboBox type="single" options={formatedPlansOptions} bind:value={form.plan} search={true} />
                </div>

                <RadioGroup.Root bind:value={form.paymentMethod} class="grid grid-cols-2 gap-3">
                    <div class="flex items-center space-x-2">
                        <Label
                            class="w-full hover:bg-accent/50 cursor-pointer flex items-start gap-3 rounded-lg border p-3 has-aria-checked:border-primary-600 has-aria-checked:bg-primary-50 dark:has-aria-checked:border-primary-900 dark:has-aria-checked:bg-primary-950"
                        >
                            <RadioGroup.Item
                                id="toggle-crypto"
                                value="1"
                                class="data-[state=checked]:border-primary-600 data-[state=checked]:bg-primary-600 data-[state=checked]:text-white dark:data-[state=checked]:border-primary-700 dark:data-[state=checked]:bg-primary-700"
                            />
                            <div class="grid gap-1.5 font-normal">
                                <p class="text-sm leading-none font-medium">Crypto</p>
                                <p class="text-muted-foreground text-xs">Pay with cryptocurrency</p>
                            </div>
                        </Label>
                    </div>
                    <div class="flex items-center space-x-2">
                        <Label
                            class="w-full hover:bg-accent/50 cursor-pointer flex items-start gap-3 rounded-lg border p-3 has-aria-checked:border-primary-600 has-aria-checked:bg-primary-50 dark:has-aria-checked:border-primary-900 dark:has-aria-checked:bg-primary-950"
                        >
                            <RadioGroup.Item
                                id="toggle-wallet"
                                value="2"
                                class="data-[state=checked]:border-primary-600 data-[state=checked]:bg-primary-600 data-[state=checked]:text-white dark:data-[state=checked]:border-primary-700 dark:data-[state=checked]:bg-primary-700"
                            />
                            <div class="grid gap-1.5 font-normal">
                                <p class="text-sm leading-none font-medium">Wallet Balance</p>
                                <p class="text-muted-foreground text-xs">Pay with your wallet balance</p>
                            </div>
                        </Label>
                    </div>
                </RadioGroup.Root>
                <div class="grid grid-cols-2 gap-2">
                    <div class="grid gap-2">
                        <Label for="plan">Payout Option</Label>
                        <ComboBox type="single" options={payoutOptions} bind:value={form.payoutOption} search={false} disabled={form.plan === null} />
                    </div>
                    <div class="grid gap-2">
                        <Label for="plan">Cryptocurrency</Label>
                        <ComboBox
                            type="single"
                            options={$SUPPORT_CRYPTOS.map((crypto) => ({ value: crypto.symbol, label: crypto.name }))}
                            bind:value={form.crypto}
                            search={false}
                            disabled={form.plan === null}
                        />
                    </div>
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
                            disabled={form.plan === null}
                        />
                        <InputGroup.Addon align="inline-end">
                            <InputGroup.Text>GBP</InputGroup.Text>
                        </InputGroup.Addon>
                    </InputGroup.Root>
                </div>

                {#if insufficientFunds}
                    <Alert.Root variant="destructive">
                        <CircleAlertIcon class="size-4" />
                        <Alert.Title>Insufficient Balance</Alert.Title>
                        <Alert.Description>
                            <p>
                                You do not have enough balance to purchase this plan. Please deposit more funds or select a different payment method.
                            </p>
                        </Alert.Description>
                    </Alert.Root>
                {/if}

                <div class="col-span-2 flex justify-end items-center gap-2">
                    <Button variant="outline" onclick={() => (open = false)} disabled={isSubmitting}>Cancel</Button>
                    <Button
                        type="submit"
                        class="cursor-pointer"
                        disabled={form.plan === null ||
                            form.payoutOption === null ||
                            form.crypto === null ||
                            form.amount === null ||
                            isSubmitting ||
                            insufficientFunds}
                    >
                        {#if isSubmitting}
                            <LoaderCircle class="size-4 animate-spin" /> Processing...
                        {:else}
                            Buy Plan
                        {/if}
                    </Button>
                </div>
            </form>
        {:else}
            <div class="flex flex-col items-center justify-center gap-6 py-2 animate-in fade-in zoom-in duration-300">
                <div class="text-center space-y-1">
                    <p class="text-muted-foreground text-sm">Send exactly</p>
                    <h2 class="text-3xl font-bold text-green-600">
                        {#if cryptoConversion}
                            {cryptoConversion.formattedAmount} <span class="text-lg">{cryptoConversion.symbol}</span>
                        {:else}
                            <span class="animate-pulse">Loading...</span>
                        {/if}
                    </h2>
                    <p class="text-xs font-medium text-muted-foreground uppercase">{formatCurrency(form.amount)}</p>
                </div>

                <div class="relative group">
                    <div class="relative bg-white p-2 rounded-lg">
                        <img src={qrCodeUrl} alt="Payment QR Code" class="w-48 h-48 rounded" />
                    </div>
                </div>

                <div class="w-full space-y-2">
                    <div class="flex items-center justify-between">
                        <Label class="text-xs text-muted-foreground ml-1">Wallet Address ({form.crypto})</Label>
                        <div class="flex items-center gap-2 text-xs font-medium text-orange-500">
                            <Loader class="animate-spin size-3" />
                            Awaiting payment
                        </div>
                    </div>
                    <InputGroup.Root>
                        <InputGroup.Addon>
                            <Wallet class="size-4" />
                        </InputGroup.Addon>
                        <InputGroup.Input value={selectedWalletAddress} readonly class="font-mono text-xs" />
                        <InputGroup.Addon align="inline-end">
                            <InputGroup.Button
                                onclick={() => copy(selectedWalletAddress, 'Address copied')}
                                class="cursor-pointer hover:text-primary transition-colors"
                            >
                                <Copy class="size-4" />
                            </InputGroup.Button>
                        </InputGroup.Addon>
                    </InputGroup.Root>
                </div>

                <!-- Payment Verification Form -->
                <form class="w-full space-y-4 pt-2 border-t" onsubmit={handlePaymentSubmit}>
                    <div class="flex items-center space-x-2">
                        <Checkbox id="paid" bind:checked={hasPaid} />
                        <Label for="paid" class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            I have paid
                        </Label>
                    </div>

                    {#if hasPaid}
                        <div class="space-y-2 animate-in slide-in-from-top-2 duration-300">
                            <Label for="hash">Transaction Hash</Label>
                            <Input id="hash" placeholder="Enter your transaction hash ID" bind:value={transactionHash} required />
                        </div>
                    {/if}

                    <div class="w-full flex justify-end gap-2 mt-2">
                        <Button variant="outline" onclick={handleClose} type="button">Close</Button>
                        <Button type="submit" class="cursor-pointer" disabled={!hasPaid || !transactionHash || isSubmittingPayment}>
                            {#if isSubmittingPayment}
                                <LoaderCircle class="mr-2 size-4 animate-spin" /> Verifying...
                            {:else}
                                <Check class="mr-2 size-4" /> Submit Payment
                            {/if}
                        </Button>
                    </div>
                </form>
            </div>
        {/if}
    </Dialog.Content>
</Dialog.Root>
