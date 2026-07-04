<script lang="ts">
    import { Button, buttonVariants } from '$lib/components/ui/button/index.js';
    import { Input } from '$lib/components/ui/input/index.js';
    import { Calculator } from 'lucide-svelte';
    import { Label } from '$lib/components/ui/label/index.js';
    import { cn } from '$lib/utils';
    import { toast } from 'svelte-sonner';
    import * as InputGroup from '$lib/components/ui/input-group/index.js';
    import * as Dialog from '$lib/components/ui/dialog/index.js';
    import ComboBox from '../ComboBox.svelte';
    import { SUPPORT_CRYPTOS } from '$lib/store';
    import { goto } from '$app/navigation';

    let { plans } = $props();

    let open = $state(false);
    let form = $state({
        plan: null,
        payoutOption: null,
        crypto: null,
        amount: null,
        startDate: null,
    });

    const formatedPlansOptions = $derived(
        plans?.map((plan: any) => ({
            value: plan.id,
            label: plan.name,
        })) ?? [],
    );

    const payoutOptions = $derived.by(() => {
        if (!plans || !form.plan) return [];
        const selectedPlan = plans.find((plan: any) => plan.id === form.plan);
        if (!selectedPlan?.payout) return [];

        return selectedPlan.payout.map((payoutOption: any) => ({
            value: payoutOption,
            label: payoutOption,
        }));
    });

    function handleSubmit(e: Event) {
        e.preventDefault();
        toast.success('Plan calculated successfully');
        open = false;
        // TODO: pass the form data to the calculator page or whatever
        goto(`/user/calculator/${form.plan}`);
    }
</script>

<Dialog.Root bind:open>
    <Dialog.Trigger class={cn(buttonVariants({ variant: 'default' }), 'hover:cursor-pointer')}>
        <Calculator />
        Calculator
    </Dialog.Trigger>
    <Dialog.Content class="sm:max-w-[525px]">
        <Dialog.Header>
            <Dialog.Title>Calculate Investment</Dialog.Title>
            <Dialog.Description>Calculate your investment returns</Dialog.Description>
        </Dialog.Header>
        <form class="flex flex-col gap-4" onsubmit={handleSubmit}>
            <div class="grid gap-2">
                <Label for="plan">Plan</Label>
                <ComboBox type="single" options={formatedPlansOptions} bind:value={form.plan} search={true} />
            </div>
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

            <div class="col-span-2 flex justify-end items-center gap-2">
                <Button variant="outline" onclick={() => (open = false)}>Cancel</Button>
                <Button type="submit" disabled={form.plan === null || form.payoutOption === null || form.crypto === null || form.amount === null}
                    >Calculate</Button
                >
            </div>
        </form>
    </Dialog.Content>
</Dialog.Root>
