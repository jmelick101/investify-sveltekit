<script lang="ts">
    import { VenetianMask, ChevronRight } from 'lucide-svelte';
    import { Label } from '$lib/components/ui/label/index.js';
    import { Switch } from '$lib/components/ui/switch/index.js';
    import * as Dialog from '$lib/components/ui/dialog/index.js';
    import { buttonVariants } from '$lib/components/ui/button/index.js';
    import { cn } from '$lib/utils';
    import { toast } from 'svelte-sonner';

    let { type = 'icon' }: { type?: 'icon' | 'text' } = $props();

    function handleToggleWallet(checked: boolean) {
        toast.info(checked ? 'Wallet is now hidden' : 'Wallet is now visible');
    }

    function handleToggleEarnings(checked: boolean) {
        toast.info(checked ? 'Earnings are now hidden' : 'Earnings are now visible');
    }
</script>

<Dialog.Root>
    {#if type === 'icon'}
        <Dialog.Trigger class={cn(buttonVariants({ variant: 'ghost', size: 'icon' }), 'cursor-pointer')}>
            <VenetianMask class="size-5" />
        </Dialog.Trigger>
    {:else}
        <Dialog.Trigger class={buttonVariants({ variant: 'ghost', size: 'sm', className: 'w-full px-2 justify-between' })}>
            <div class="flex items-center gap-2 font-normal w-full">
                <VenetianMask class="size-4 text-muted-foreground" /><span>Incognito Mode</span>
            </div>


        </Dialog.Trigger>
    {/if}
    <Dialog.Content class="sm:max-w-[425px]">
        <Dialog.Header>
            <Dialog.Title>Incognito Mode</Dialog.Title>
            <Dialog.Description>Set visibility of your profile.</Dialog.Description>
        </Dialog.Header>
        <div class="grid gap-4 py-4">
            <div class="flex items-center space-x-2">
                <Switch id="hide-wallet" onCheckedChange={handleToggleWallet} />
                <Label for="hide-wallet">Hide Wallet</Label>
            </div>
            <div class="flex items-center space-x-2">
                <Switch id="hide-earnings" onCheckedChange={handleToggleEarnings} />
                <Label for="hide-earnings">Hide my earnings</Label>
            </div>
        </div>
    </Dialog.Content>
</Dialog.Root>
