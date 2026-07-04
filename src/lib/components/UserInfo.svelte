<script lang="ts">
    import { Avatar, AvatarFallback, AvatarImage } from '$lib/components/ui/avatar';
    import { useInitials } from '$lib/hooks/useInitials';
    import type { User } from '$lib/types';
    import { USER } from '$lib/store';
    import { page } from '$app/stores';
    import { isAdmin } from '$lib/isAdmin.svelte.js';

    interface Props {
        user: User;
        showEmail?: boolean;
        showGroup?: boolean;
    }

    let { user, showEmail = false, showGroup = false }: Props = $props();

    const { getInitials } = useInitials();

    // you can do this or
    // let isAdmin = $derived($page.url.startsWith('/admin'));

    // or you can check if the user is admin by checking the role in the stored
    // let isAdmin = $derived($page.props.auth.user.role === 'admin');
</script>

<!-- <Avatar class="h-8 w-8 overflow-hidden rounded-full">
    {#if user.profile_photo_url}
        <AvatarImage src={user.profile_photo_url} alt={user.first_name} />
    {:else}
        <AvatarFallback class="rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">
            {getInitials(user.first_name + ' ' + user.last_name)}
        </AvatarFallback>
    {/if}
</Avatar> -->

<div class="grid flex-1 text-left text-sm leading-tight">
    <div class="flex items-center gap-2">
        <span class="truncate font-medium">{user.first_name} {user.last_name}</span>
        {#if showGroup && !$isAdmin}
            <span class="text-xs font-bold border border-zinc-200 rounded-full px-1.5 py-0.5 w-fit mt-0.5">{$USER.group}</span>
        {/if}
    </div>

    {#if showEmail}
        <span class="truncate text-xs text-muted-foreground">{user.email}</span>
    {/if}
</div>
