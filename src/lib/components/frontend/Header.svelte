<script lang="ts">
    import { siteSettings } from '$lib/stores/site.svelte';
    import type { User } from '$lib/types';
    import { ArrowRight } from 'lucide-svelte';

    let { user }: { user?: User } = $props();

    let isMenuOpen = $state(false);
    let activeDropdown = $state<string | null>(null);

    function toggleDropdown(name: string) {
        activeDropdown = activeDropdown === name ? null : name;
    }

    function closeMenu() {
        isMenuOpen = false;
        activeDropdown = null;
    }

    const solutions = [
        { title: 'Wealth Management', href: '/wealth-management', desc: 'Holistic financial planning', icon: 'trending_up' },
        { title: 'Mutual Funds', href: '/mutual-funds', desc: 'Diversified fund portfolios', icon: 'account_balance' },
        { title: 'ETFs', href: '/exchange-traded-funds', desc: 'Exchange-traded strategies', icon: 'swap_horiz' },
        { title: 'Securities', href: '/securities', desc: 'Equity & bond markets', icon: 'bar_chart' },
    ];

    const markets = [
        { title: 'Private Equity', href: '/private-equity', desc: 'Growth-stage investments', icon: 'rocket_launch' },
        { title: 'Real Estate', href: '/infrastructure-real-estate', desc: 'Commercial & residential', icon: 'apartment' },
        { title: 'Pharmaceuticals', href: '/pharmaceuticals', desc: 'Healthcare innovation', icon: 'biotech' },
        { title: 'Renewable Energy', href: '/renewable-energy', desc: 'Sustainable infrastructure', icon: 'bolt' },
    ];
</script>

<!-- Editorial Minimal Navigation -->
<nav class="sticky top-0 z-50 w-full border-b border-border bg-background">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="flex h-16 items-center justify-between">
            <!-- Logo -->
            <a href="/" class="text-base font-semibold tracking-tight text-foreground" onclick={closeMenu}>
                {siteSettings.siteName}
            </a>

            <!-- Desktop Navigation — centered -->
            <div class="hidden items-center gap-8 lg:flex">
                <!-- Solutions Dropdown -->
                <div class="group relative">
                    <button class="flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground">
                        Verticals
                        <span class="material-icons text-sm transition-transform group-hover:rotate-180">expand_more</span>
                    </button>
                    <div class="mega-menu absolute left-1/2 top-full mt-px w-[480px] -translate-x-1/2 border border-border bg-background shadow-lg">
                        <div class="grid grid-cols-2 gap-0 divide-x divide-border">
                            {#each solutions as item}
                                <a href={item.href} class="block px-5 py-4 transition-colors hover:bg-muted">
                                    <p class="text-sm font-medium text-foreground">{item.title}</p>
                                    <p class="mt-0.5 text-xs text-muted-foreground">{item.desc}</p>
                                </a>
                            {/each}
                        </div>
                        <div class="border-t border-border px-5 py-3">
                            <a href="/private-wealth" class="inline-flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-foreground">
                                Private Wealth Services
                                <ArrowRight size={12} class="flex-shrink-0" />
                            </a>
                        </div>
                    </div>
                </div>

                <!-- Markets Dropdown -->
                <div class="group relative">
                    <button class="flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground">
                        Portfolio
                        <span class="material-icons text-sm transition-transform group-hover:rotate-180">expand_more</span>
                    </button>
                    <div class="mega-menu absolute left-1/2 top-full mt-px w-[480px] -translate-x-1/2 border border-border bg-background shadow-lg">
                        <div class="grid grid-cols-2 gap-0 divide-x divide-border">
                            {#each markets as item}
                                <a href={item.href} class="block px-5 py-4 transition-colors hover:bg-muted">
                                    <p class="text-sm font-medium text-foreground">{item.title}</p>
                                    <p class="mt-0.5 text-xs text-muted-foreground">{item.desc}</p>
                                </a>
                            {/each}
                        </div>
                    </div>
                </div>

                <a class="text-sm text-muted-foreground transition-colors hover:text-foreground" href="/wealth-club">
                    Wealth Club
                </a>
                <a class="text-sm text-muted-foreground transition-colors hover:text-foreground" href="/news-and-insights">
                    Insights
                </a>
                <a class="text-sm text-muted-foreground transition-colors hover:text-foreground" href="/about">
                    About
                </a>
            </div>

            <!-- Right: CTA -->
            <div class="hidden items-center gap-6 lg:flex">
                {#if user && (user.role === 'user' || user.role === 'company')}
                    <a class="text-sm text-muted-foreground transition-colors hover:text-foreground" href="/user/dashboard">
                        Dashboard
                    </a>
                {:else}
                    <a class="text-sm text-muted-foreground transition-colors hover:text-foreground" href="/login">
                        Private Area
                    </a>
                {/if}
                <a href="/contact-us" class="inline-flex items-center gap-1.5 text-sm font-medium text-foreground underline underline-offset-4 decoration-muted-foreground transition-colors hover:decoration-foreground">
                    Contact us
                    <ArrowRight size={16} class="flex-shrink-0" />
                </a>
            </div>

            <!-- Mobile menu toggle -->
            <button
                class="flex h-9 w-9 items-center justify-center text-foreground lg:hidden"
                onclick={() => (isMenuOpen = !isMenuOpen)}
                aria-label="Toggle menu"
            >
                <span class="material-icons text-xl">{isMenuOpen ? 'close' : 'menu'}</span>
            </button>
        </div>
    </div>

    <!-- Mobile Menu -->
    {#if isMenuOpen}
        <div class="border-t border-border bg-background lg:hidden">
            <div class="mx-auto max-w-7xl divide-y divide-border/50 px-6 py-2">
                <!-- Solutions Group -->
                <button
                    class="flex w-full items-center justify-between py-4 text-sm font-medium text-foreground"
                    onclick={() => toggleDropdown('solutions')}
                >
                    Verticals
                    <span class="material-icons text-base text-muted-foreground transition-transform {activeDropdown === 'solutions' ? 'rotate-180' : ''}">expand_more</span>
                </button>
                {#if activeDropdown === 'solutions'}
                    <div class="pb-3 pl-4">
                        {#each solutions as item}
                            <a href={item.href} class="block py-2.5 text-sm text-muted-foreground hover:text-foreground" onclick={closeMenu}>
                                {item.title}
                            </a>
                        {/each}
                    </div>
                {/if}

                <!-- Markets Group -->
                <button
                    class="flex w-full items-center justify-between py-4 text-sm font-medium text-foreground"
                    onclick={() => toggleDropdown('markets')}
                >
                    Portfolio
                    <span class="material-icons text-base text-muted-foreground transition-transform {activeDropdown === 'markets' ? 'rotate-180' : ''}">expand_more</span>
                </button>
                {#if activeDropdown === 'markets'}
                    <div class="pb-3 pl-4">
                        {#each markets as item}
                            <a href={item.href} class="block py-2.5 text-sm text-muted-foreground hover:text-foreground" onclick={closeMenu}>
                                {item.title}
                            </a>
                        {/each}
                    </div>
                {/if}

                <a href="/wealth-club" class="block py-4 text-sm font-medium text-foreground" onclick={closeMenu}>Wealth Club</a>
                <a href="/news-and-insights" class="block py-4 text-sm font-medium text-foreground" onclick={closeMenu}>Insights</a>
                <a href="/about" class="block py-4 text-sm font-medium text-foreground" onclick={closeMenu}>About</a>

                <div class="flex flex-col gap-3 py-4">
                    {#if user && (user.role === 'user' || user.role === 'company')}
                        <a href="/user/dashboard" class="text-sm text-muted-foreground hover:text-foreground" onclick={closeMenu}>Dashboard</a>
                    {:else}
                        <a href="/login" class="text-sm text-muted-foreground hover:text-foreground" onclick={closeMenu}>Private Area</a>
                    {/if}
                    <a href="/contact-us" class="inline-flex items-center gap-1.5 text-sm font-medium text-foreground" onclick={closeMenu}>Contact us <ArrowRight size={16} class="flex-shrink-0" /></a>
                </div>
            </div>
        </div>
    {/if}
</nav>
