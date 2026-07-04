<script>
    import * as Card from '$lib/components/ui/card';
    import Status from '$lib/components/Status.svelte';
    import { formatDateDay, formatCurrency, timeAgo, formatNumber } from '$lib/utils';
    import { SYSTEM } from '$lib/store';

    let { id, data } = $props();
</script>

<Card.Root class="w-full">
    <Card.Content class="space-y-6">
        <div class="grid grid-cols-1 gap-4">
            <div class="space-y-1 p-4 border rounded-lg bg-zinc-50 dark:bg-zinc-900">
                <h1 class="text-sm font-semibold mb-2">Plan Information</h1>
                <div class="flex justify-between">
                    <span class="text-muted-foreground text-xs">Duration</span>
                    <span class="font-medium text-xs">{data.plan.duration} Days</span>
                </div>
                <div class="flex justify-between">
                    <span class="text-muted-foreground text-xs">Amount</span>
                    <span class="font-medium text-xs">{formatCurrency(data.plan.amount)}</span>
                </div>
                <div class="flex justify-between">
                    <span class="text-muted-foreground text-xs">Category</span>
                    <span class="font-medium text-xs">{data.plan.category}</span>
                </div>
                <div class="flex justify-between">
                    <span class="text-muted-foreground text-xs">ROI</span>
                    <span class="font-medium text-xs">{data.plan.roi}</span>
                </div>
                <div class="flex justify-between">
                    <span class="text-muted-foreground text-xs">Crypto</span>
                    <span class="font-medium text-xs">{data.crypto.name}</span>
                </div>
                <div class="flex justify-between">
                    <span class="text-muted-foreground text-xs">End Date</span>
                    <span class="font-medium text-xs">{formatDateDay(data.endDate)}</span>
                </div>
            </div>

            <div class="space-y-1 p-4 border rounded-lg bg-zinc-50 dark:bg-zinc-900">
                <h1 class="text-sm font-semibold mb-2">Token Earnings</h1>
                <div class="flex justify-between">
                    <span class="text-muted-foreground text-xs">Tokens</span>
                    <span class="font-medium text-xs">{formatNumber(data.tokens)}</span>
                </div>
                <div class="flex justify-between">
                    <span class="text-muted-foreground text-xs">Token Value</span>
                    <!-- you can use token multiplier i am guessing here-->
                    <span class="font-medium text-xs">{formatCurrency(data.tokens * $SYSTEM.tokenMultiplier)}</span>
                </div>
            </div>

            <div class="space-y-1 p-4 border rounded-lg bg-zinc-50 dark:bg-zinc-900">
                <div class="flex justify-between">
                    <span class="text-muted-foreground text-xs">Created</span>
                    <span class="font-medium text-xs">{timeAgo(data.createdAt)}</span>
                </div>
            </div>
        </div>
    </Card.Content>
</Card.Root>
