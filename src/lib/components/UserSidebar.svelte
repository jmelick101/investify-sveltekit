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
    import { type NavItem, type UserMenuItem } from '$lib/types';
    // Link: use native <a> tags
    import { LayoutGrid, Headset, ArrowDownToLine, Wallet, Users, Newspaper, Calendar, TrendingUp, ArrowLeft, Shield, Sparkles } from 'lucide-svelte';
    import AppLogo from './AppLogo.svelte';
    import { USER } from '$lib/store';
    import Promotionalbanner from './user/Promotionalbanner.svelte';
    import { formatCurrency } from '$lib/utils';
    import { isCompanyUser } from '$lib/isAdmin.svelte';

    const sidebar = useSidebar();

    const customerMenuItems: UserMenuItem[] = [
        {
            menuGroup: 'Overview',
            items: [
                {
                    title: 'Dashboard',
                    href: '/user/dashboard',
                    icon: LayoutGrid,
                },
                {
                    title: 'Portfolio',
                    href: '/user/my-investments',
                    icon: TrendingUp,
                },
            ],
        },
        {
            menuGroup: 'Invest',
            items: [
                {
                    title: 'Explore Plans',
                    href: '/user/plans',
                    icon: Sparkles,
                },
                {
                    title: 'Invite & Earn',
                    href: '/user/referrals',
                    icon: Users,
                },
            ],
        },
        {
            menuGroup: 'Finance',
            items: [
                {
                    title: 'Withdraw',
                    href: '/user/withdrawals',
                    icon: ArrowDownToLine,
                    counter: 5,
                },
                {
                    title: 'Wallets',
                    href: '/user/my-wallets',
                    icon: Wallet,
                },
            ],
        },
    ];

    const footerNavItems: NavItem[] = [
        {
            title: 'News',
            href: '/user/news',
            icon: Newspaper,
        },
        {
            title: 'Support',
            href: '/user/help',
            icon: Headset,
        },
    ];
</script>

<Sidebar collapsible="icon" variant="inset">
    <SidebarHeader>
        <SidebarMenu>
            <SidebarMenuItem>
                <SidebarMenuButton size="lg">
                    <Link href={route('user.dashboard')}>
                        <AppLogo />
                    </Link>
                </SidebarMenuButton>
            </SidebarMenuItem>

            {#if $isCompanyUser}
                <SidebarMenuItem>
                    {#if sidebar.state === 'expanded'}
                        <div class="flex items-center gap-2 rounded-lg bg-primary/5 dark:bg-primary/10 px-2.5 py-1.5">
                            <Shield size={14} class="text-primary" />
                            <span class="text-xs font-semibold tracking-wider text-primary">CORPORATE</span>
                        </div>
                    {:else}
                        <div class="flex items-center justify-center rounded-md bg-primary/5 dark:bg-primary/10 p-1">
                            <Shield size={14} class="text-primary" />
                        </div>
                    {/if}
                </SidebarMenuItem>
                <SidebarSeparator />
            {/if}
        </SidebarMenu>
    </SidebarHeader>

    <SidebarContent>
        <NavMain items={customerMenuItems} />
    </SidebarContent>

    <SidebarFooter>
        {#if sidebar.state === 'expanded'}
            <Promotionalbanner
                href="#"
                referralBonus={1000}
                title="Refer & Earn"
                description={`Earn ${formatCurrency(1000)} for every invite.`}
                linkText="Start earning"
            />
        {/if}

        {#if sidebar.state === 'expanded'}
            <div class="flex items-center gap-2">
                <span class="rounded-full bg-accent px-2.5 py-0.5 text-xs font-medium text-muted-foreground">{$USER.group}</span>
            </div>
        {/if}

        <NavFooter items={footerNavItems} class="mt-auto" />

        <SidebarSeparator />
        <SidebarMenu>
            <SidebarMenuItem>
                <SidebarMenuButton size="sm">
                    <a href="/" class="flex items-center gap-2">
                        <ArrowLeft size={16} />
                        {#if sidebar.state === 'expanded'}
                            Back to Home
                        {/if}
                    </a>
                </SidebarMenuButton>
            </SidebarMenuItem>
        </SidebarMenu>

        <NavUser />
    </SidebarFooter>
</Sidebar>
