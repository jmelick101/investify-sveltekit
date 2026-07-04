<script lang="ts">
    import NavFooter from '$lib/components/NavFooter.svelte';
    import NavMain from '$lib/components/NavMain.svelte';
    import NavUser from '$lib/components/NavUser.svelte';
    import {
        Sidebar,
        SidebarContent,
        SidebarFooter,
        SidebarHeader,
        SidebarMenu,
        SidebarMenuButton,
        SidebarMenuItem,
        SidebarSeparator,
        useSidebar,
    } from '$lib/components/ui/sidebar';
    import type { NavItem, UserMenuItem } from '$lib/types';
    // Link replaced with native <a> tags
    import { 
        LayoutGrid, 
        TrendingUp, 
        Users, 
        Sparkles, 
        ArrowDownToLine, 
        Shield, 
        Newspaper, 
        MessageSquare, 
        Globe, 
        Settings, 
        Wallet,
        BarChart3,
        ArrowLeft
    } from 'lucide-svelte';
    import AppLogo from '$lib/components/AppLogo.svelte';

    const sidebar = useSidebar();

    const adminMenuItems: UserMenuItem[] = [
        {
            menuGroup: 'Overview',
            items: [
                {
                    title: 'Dashboard',
                    href: '/admin/dashboard',
                    icon: LayoutGrid,
                },
                {
                    title: 'Analytics',
                    href: '/admin/analytics',
                    icon: BarChart3,
                },
            ]
        },
        {
            menuGroup: 'Management',
            items: [
                {
                    title: 'Users',
                    href: '/admin/users',
                    icon: Users,
                },
                {
                    title: 'Investments',
                    href: '/admin/investments',
                    icon: TrendingUp,
                },
                {
                    title: 'Plans',
                    href: '/admin/plans',
                    icon: Sparkles,
                },
                {
                    title: 'Withdrawals',
                    href: '/admin/withdrawals',
                    icon: ArrowDownToLine,
                },
                {
                    title: 'KYC Verification',
                    href: '/admin/kyc',
                    icon: Shield,
                },
            ]
        },
        {
            menuGroup: 'Content',
            items: [
                {
                    title: 'Blog',
                    href: '/admin/blog',
                    icon: Newspaper,
                },
                {
                    title: 'Surveys',
                    href: '/admin/surveys',
                    icon: MessageSquare,
                },
            ]
        },
        {
            menuGroup: 'Settings',
            items: [
                {
                    title: 'Website',
                    href: '/admin/settings/website',
                    icon: Globe,
                },
                {
                    title: 'Platform',
                    href: '/admin/settings/platform',
                    icon: Settings,
                },
                {
                    title: 'Wallets',
                    href: '/admin/settings/wallets',
                    icon: Wallet,
                },
            ]
        }
    ];

    const footerNavItems: NavItem[] = [
        {
            title: 'User View',
            href: '/user/dashboard',
            icon: ArrowLeft,
        },
    ];
</script>

<Sidebar collapsible="icon" variant="inset">
    <SidebarHeader>
        <SidebarMenu>
            <SidebarMenuItem>
                <SidebarMenuButton size="lg">
                    <Link href={route('admin.dashboard')}>
                        <AppLogo />
                    </Link>
                </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
                {#if sidebar.state === 'expanded'}
                    <div class="flex items-center gap-2 rounded-lg bg-primary/5 dark:bg-primary/10 px-2.5 py-1.5">
                        <Shield size={14} class="text-primary" />
                        <span class="text-xs font-semibold tracking-wider text-primary">ADMIN PANEL</span>
                    </div>
                {:else}
                    <div class="flex items-center justify-center rounded-md bg-primary/5 dark:bg-primary/10 p-1">
                        <Shield size={14} class="text-primary" />
                    </div>
                {/if}
            </SidebarMenuItem>
            <SidebarSeparator />
        </SidebarMenu>
    </SidebarHeader>

    <SidebarContent>
        <NavMain items={adminMenuItems} />
    </SidebarContent>

    <SidebarFooter>
        <NavFooter items={footerNavItems} class="mt-auto" />
        <SidebarSeparator />
        <NavUser />
    </SidebarFooter>
</Sidebar>
