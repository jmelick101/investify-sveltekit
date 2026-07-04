<script lang="ts">
    import { Button } from '$lib/components/ui/button/index.js';
    import * as Popover from '$lib/components/ui/popover/index.js';
    import * as Dialog from '$lib/components/ui/dialog/index.js';
    import { Bell, BellOff } from 'lucide-svelte';
    import { timeAgo } from '$lib/utils';

    import type { Notification } from '$lib/types';

    let { notifications = [], action = () => {} }: { notifications: Notification[]; action: (notification: Notification) => void } = $props();

    let open = $state(false);
    let dialogOpen = $state(false);
    let selectedNotification = $state<Notification | null>(null);

    function handleNotificationClick(notification: Notification) {
        selectedNotification = notification;
        // I included a callback function to handle the notification click so do what you will with it
        action(notification);
        dialogOpen = true;
        open = false; // Close popover
    }
</script>

<Dialog.Root bind:open={dialogOpen}>
    <Dialog.Content class="sm:max-w-[425px]">
        <Dialog.Header>
            <Dialog.Title>{selectedNotification?.title}</Dialog.Title>
            <Dialog.Description>
                {selectedNotification ? new Date(selectedNotification.created).toLocaleString() : ''}
            </Dialog.Description>
        </Dialog.Header>
        <div class="grid gap-4 py-4">
            <p class="text-sm text-gray-700">
                {@html selectedNotification?.message}
            </p>
        </div>
    </Dialog.Content>
</Dialog.Root>

<Popover.Root bind:open>
    <Popover.Trigger>
        <Button variant="ghost" size="icon" class="cursor-pointer ">
            <div class="relative">
                <Bell class="size-5" />
                {#if notifications.some((n) => !n.read)}
                    <span class="absolute -right-1 -top-1 block h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-white"></span>
                {/if}
            </div>
            <span class="sr-only">Notifications</span>
        </Button>
    </Popover.Trigger>
    <Popover.Content align="end" class="w-80 overflow-hidden !rounded-xl border border-border bg-background p-0 shadow-lg">
        <div class="flex items-center justify-between border-b border-border bg-muted/30 px-4 py-3">
            <h4 class="text-sm font-semibold">Notifications</h4>
            {#if notifications.some((n) => !n.read)}
                <span class="rounded-full border bg-background px-2 py-0.5 text-[10px] text-muted-foreground">
                    {notifications.filter((n) => !n.read).length} new
                </span>
            {/if}
        </div>
        {#if notifications.length === 0}
            <div class="p-8 text-center text-sm text-muted-foreground">
                <BellOff class="mx-auto mb-2 size-8 opacity-20" />
                No notifications
            </div>
        {:else}
            <div class="max-h-[350px] overflow-y-auto">
                {#each notifications as notification}
                    <button
                        class="group relative w-full !rounded-none border-b border-border px-4 py-3 text-left transition-colors last:border-0 hover:bg-muted/50 focus:outline-none"
                        class:bg-blue-50={!notification.read}
                        class:dark:bg-blue-900_10={!notification.read}
                        onclick={() => handleNotificationClick(notification)}
                    >
                        {#if !notification.read}
                            <div class="absolute bottom-0 left-0 top-0 w-[3px] bg-blue-500"></div>
                        {/if}
                        <div class="mb-1 flex items-start justify-between gap-2">
                            <span class="pt-0.5 text-sm font-medium leading-none text-foreground/90 transition-colors group-hover:text-foreground">
                                {notification.title}
                            </span>
                            <span class="whitespace-nowrap pt-0.5 text-[10px] text-muted-foreground">
                                {timeAgo(notification.created)}
                            </span>
                        </div>
                        <div class="m-0 line-clamp-2 overflow-hidden text-ellipsis text-xs leading-relaxed text-muted-foreground">
                            {@html notification.message}
                        </div>
                    </button>
                {/each}
            </div>
        {/if}
    </Popover.Content>
</Popover.Root>
