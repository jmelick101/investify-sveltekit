<script lang="ts">
    import { Avatar, AvatarFallback, AvatarImage } from '$lib/components/ui/avatar';
    import { Button } from '$lib/components/ui/button';
    import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '$lib/components/ui/dropdown-menu';
    import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '$lib/components/ui/sheet';
    import UserMenuContent from '$lib/components/UserMenuContent.svelte';
    import { getInitials } from '$lib/hooks/useInitials';
    import { page } from '$app/stores';
    import { SYSTEM } from '$lib/store.svelte';
    import { LayoutGrid, TrendingUp, Compass, Users, ArrowDownToLine, Wallet, Newspaper, Headset, Menu, ArrowLeft } from 'lucide-svelte';
    import type { User } from '$lib/types';

    let { user }: { user: User } = $props();

    const isCurrentRoute = (url: string) => $page.url.pathname.startsWith(url);

    const primaryNav = [
        { title: 'Dashboard', href: '/user/dashboard', icon: LayoutGrid },
        { title: 'Portfolio', href: '/user/my-investments', icon: TrendingUp },
        { title: 'Explore Plans', href: '/user/plans', icon: Compass },
        { title: 'Wallets', href: '/user/my-wallets', icon: Wallet },
    ];

    const secondaryNav = [
        { title: 'Withdraw', href: '/user/withdrawals', icon: ArrowDownToLine },
        { title: 'Invite & Earn', href: '/user/referrals', icon: Users },
        { title: 'News', href: '/user/news', icon: Newspaper },
        { title: 'Support', href: '/user/help', icon: Headset },
    ];
</script>

<div class="border-b border-sidebar-border/80">
    <div class="mx-auto flex h-16 w-full items-center px-4 sm:px-6 lg:px-8">
        <!-- Mobile menu -->
        <div class="lg:hidden">
            <Sheet>
                <SheetTrigger>
                    <Button variant="ghost" size="icon" class="mr-2 h-9 w-9">
                        <Menu class="h-5 w-5" />
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" class="w-72 p-0">
                    <SheetTitle class="sr-only">Navigation Menu</SheetTitle>
                    <SheetHeader class="border-b border-border/50 p-4">
                        <a href="/" class="flex items-center gap-2.5">
                            <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
                                <span class="text-sm font-bold">{$SYSTEM.siteName?.charAt(0) ?? 'V'}</span>
                            </div>
                            <span class="text-base font-semibold tracking-tight">{$SYSTEM.siteName}</span>
                        </a>
                    </SheetHeader>
                    <div class="flex h-full flex-1 flex-col justify-between p-4">
                        <nav class="space-y-1">
                            <p class="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Main</p>
                            {#each primaryNav as item}
                                <a
                                    href={item.href}
                                    class="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors {isCurrentRoute(
                                        item.href,
                                    )
                                        ? 'bg-accent text-foreground'
                                        : 'text-muted-foreground hover:bg-accent hover:text-foreground'}"
                                >
                                    <item.icon class="h-4 w-4" />
                                    {item.title}
                                </a>
                            {/each}
                            <p class="mb-2 mt-6 text-xs font-semibold uppercase tracking-wider text-muted-foreground">More</p>
                            {#each secondaryNav as item}
                                <a
                                    href={item.href}
                                    class="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors {isCurrentRoute(
                                        item.href,
                                    )
                                        ? 'bg-accent text-foreground'
                                        : 'text-muted-foreground hover:bg-accent hover:text-foreground'}"
                                >
                                    <item.icon class="h-4 w-4" />
                                    {item.title}
                                </a>
                            {/each}
                        </nav>
                        <div class="border-t border-border/50 pt-4">
                            <a href="/" class="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:text-foreground">
                                <ArrowLeft class="h-4 w-4" />
                                Back to Home
                            </a>
                        </div>
                    </div>
                </SheetContent>
            </Sheet>
        </div>

        <!-- Logo -->
        <a href="/user/dashboard" class="flex items-center gap-2.5">
            <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
                <span class="text-sm font-bold">{$SYSTEM.siteName?.charAt(0) ?? 'V'}</span>
            </div>
            <span class="hidden text-base font-semibold tracking-tight sm:block">{$SYSTEM.siteName}</span>
        </a>

        <!-- Desktop Navigation -->
        <nav class="ml-8 hidden h-full items-center gap-1 lg:flex">
            {#each primaryNav as item}
                <a
                    href={item.href}
                    class="relative flex h-full items-center gap-2 px-3 text-sm font-medium transition-colors {isCurrentRoute(item.href)
                        ? 'text-foreground'
                        : 'text-muted-foreground hover:text-foreground'}"
                >
                    <item.icon class="h-4 w-4" />
                    {item.title}
                    {#if isCurrentRoute(item.href)}
                        <div class="absolute bottom-0 left-0 h-0.5 w-full bg-primary"></div>
                    {/if}
                </a>
            {/each}
        </nav>

        <!-- Right side -->
        <div class="ml-auto flex items-center gap-2">
            <!-- Secondary nav links (desktop only, subtle) -->
            <div class="hidden items-center gap-1 xl:flex">
                {#each secondaryNav as item}
                    <a
                        href={item.href}
                        class="rounded-lg px-2.5 py-1.5 text-xs font-medium transition-colors {isCurrentRoute(item.href)
                            ? 'bg-accent text-foreground'
                            : 'text-muted-foreground hover:bg-accent hover:text-foreground'}"
                    >
                        {item.title}
                    </a>
                {/each}
            </div>

            <!-- Back to home -->
            <a
                href="/"
                class="group hidden items-center justify-center gap-2 overflow-hidden ext-muted-foreground transition-all hover:text-foreground lg:flex"
            >
                <ArrowLeft class="h-4 w-4 shrink-0" />
                <span
                    class="max-w-0 overflow-hidden whitespace-nowrap text-xs font-medium opacity-0 transition-all duration-300 ease-in-out group-hover:max-w-[120px] group-hover:opacity-100"
                >
                    Back to Website
                </span>
            </a>

            <!-- User avatar -->
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <Button
                        variant="ghost"
                        size="icon"
                        class="relative size-10 w-auto rounded-full p-1 focus-within:ring-2 focus-within:ring-primary"
                    >
                        <Avatar class="size-8 overflow-hidden rounded-full">
                            {#if user.avatar_path}
                                <AvatarImage src={user.profile_photo_url} alt={user.name} />
                            {:else}
                                <AvatarFallback class="rounded-full bg-primary/10 text-sm font-semibold text-primary">
                                    {getInitials(user.name || '')}
                                </AvatarFallback>
                            {/if}
                        </Avatar>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" class="w-56">
                    <UserMenuContent {user} />
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    </div>
</div>
