<script>
    import * as Card from '$lib/components/ui/card';
    import { Avatar, AvatarFallback, AvatarImage } from '$lib/components/ui/avatar';
    import Status from '$lib/components/Status.svelte';
    import { Button } from '$lib/components/ui/button';
    import { formatDateDay, formatCurrency } from '$lib/utils';
    import { CalendarSync, CalendarClock } from 'lucide-svelte';
    // router replaced with goto from $app/navigation


    let { id, data } = $props();
</script>

<Card.Root class="w-full">

    <Card.Content class="space-y-6">
        <div class="grid grid-cols-1 gap-4">

            <div class="space-y-1 p-4 border rounded-lg bg-zinc-50 dark:bg-zinc-900">
                <h1 class="text-sm font-semibold mb-2">Plan Information</h1>
                <!-- <div class="flex justify-between">
                    <span class="text-muted-foreground text-xs">Plan Name</span>
                    <span class="font-medium text-xs">{data.plan.name}</span>
                </div> -->
                <div class="flex justify-between">
                      <!-- status can be here or-->
                    <span class="text-muted-foreground text-xs">Status</span>
                    <span class="font-medium text-xs"><Status status={data.status} /></span>
                </div>
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
                    <span class="text-muted-foreground text-xs">End Date</span>
                    <span class="font-medium text-xs">{formatDateDay(data.endDate)}</span>
                </div>
            </div>

            <div class="space-y-1 p-4 border rounded-lg bg-zinc-50 dark:bg-zinc-900">
                <div class="flex justify-between">
                    <span class="text-muted-foreground text-xs">Created At</span>
                    <span class="font-medium text-xs">{formatDateDay(data.createdAt)}</span>
                </div>
                <div class="flex justify-between">
                    <span class="text-muted-foreground text-xs">Updated At</span>
                    <span class="font-medium text-xs">{formatDateDay(data.updatedAt)}</span>
                </div>
            </div>


        </div>
    </Card.Content>
</Card.Root>
