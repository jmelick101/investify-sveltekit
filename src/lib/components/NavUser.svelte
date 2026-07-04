<script lang="ts">
    import UserInfo from '$lib/components/UserInfo.svelte';
    import UserMenuContent from '$lib/components/UserMenuContent.svelte';
    import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '$lib/components/ui/dropdown-menu';
    import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '$lib/components/ui/sidebar';
    import { page } from '$app/stores';
    import { ChevronsUpDown } from 'lucide-svelte';

    const user = $derived($page.props.auth.user);
</script>

<SidebarMenu>
    <SidebarMenuItem>
        <DropdownMenu>
            <DropdownMenuTrigger>
                <SidebarMenuButton size="lg" class="text-sidebar-accent-foreground data-[state=open]:bg-sidebar-accent group">
                    <UserInfo {user} />
                    <ChevronsUpDown class="ml-auto size-4" />
                </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent class="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg" side="bottom" align="end" sideOffset={4}>
                <UserMenuContent {user} />
            </DropdownMenuContent>
        </DropdownMenu>
    </SidebarMenuItem>
</SidebarMenu>
