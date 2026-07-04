<script lang="ts">
    import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
    import { SidebarTrigger } from '$lib/components/ui/sidebar';
    import type { BreadcrumbItem, Notification as NotificationType } from '$lib/types';
    import Notification from '$lib/components/Notification.svelte';
    import { isAdmin, isAdminUser } from '$lib/isAdmin.svelte.js';
    import ShareRefferal from './user/ShareRefferal.svelte';
    import { USER } from '$lib/store';
    import IncognitoToggle from './user/IncognitoToggle.svelte';

    interface Props {
        breadcrumbs?: BreadcrumbItem[];
        notifications?: NotificationType[];
        notificationAction?: (notification: NotificationType) => void;
    }

    let { breadcrumbs = [], notifications = [], notificationAction = () => {} }: Props = $props();
</script>

<header
    class="flex h-16 shrink-0 items-center justify-between gap-2 border-b border-sidebar-border/70 px-6 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 md:px-4"
>
    <div class="flex items-center gap-2">
        <SidebarTrigger class="-ml-1" />

        {#if breadcrumbs.length > 0}
            <Breadcrumbs {breadcrumbs} />
        {/if}
    </div>

    <div class="flex items-center gap-2">
        {#if !$isAdmin}
            <IncognitoToggle />
        {/if}
        <Notification {notifications} action={notificationAction} />
        {#if !$isAdmin}
            <ShareRefferal referralLink={$USER.referralLink} />
        {/if}
    </div>
</header>
