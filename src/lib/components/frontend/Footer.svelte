<script lang="ts">
    import { siteSettings } from '$lib/stores/site.svelte';
    import { useAppearance } from '$lib/hooks/useAppearance.svelte';

    const currentYear = $derived(new Date().getFullYear());
    const { appearance, updateAppearance } = useAppearance();

    let isDark = $state(appearance === 'dark');

    function toggleDarkMode() {
        updateAppearance(isDark ? 'light' : 'dark');
        isDark = !isDark;
    }
</script>

<footer class="bg-foreground text-background">
    <div class="mx-auto max-w-7xl px-6 pb-10 pt-16 lg:px-8">
        <!-- Two-column layout -->
        <div class="grid grid-cols-1 gap-12 md:grid-cols-2">
            <!-- Left: Brand + Contact -->
            <div>
                <a href="/" class="text-base font-semibold tracking-tight text-background">
                    {siteSettings.siteName}
                </a>
                <p class="mt-6 max-w-xs text-sm leading-relaxed text-background/50">
                    A regulated investment manager investing in public and private markets across the capital structure.
                </p>
                <div class="mt-8 space-y-2 text-sm text-background/60">
                    <p><span class="mr-3 font-medium text-background/30">N</span>{siteSettings.phone}</p>
                    <p><span class="mr-3 font-medium text-background/30">E</span>{siteSettings.email}</p>
                    <p><span class="mr-3 font-medium text-background/30">A</span>{siteSettings.address}</p>
                </div>
            </div>

            <!-- Right: Navigation -->
            <div class="grid grid-cols-3 gap-8">
                <div>
                    <p class="text-xs uppercase tracking-[0.15em] text-background/30">Verticals</p>
                    <ul class="mt-4 space-y-3 text-sm">
                        <li><a class="text-background/60 transition-colors hover:text-background" href="/wealth-management">Wealth Management</a></li>
                        <li><a class="text-background/60 transition-colors hover:text-background" href="/mutual-funds">Mutual Funds</a></li>
                        <li><a class="text-background/60 transition-colors hover:text-background" href="/exchange-traded-funds">ETFs</a></li>
                        <li><a class="text-background/60 transition-colors hover:text-background" href="/securities">Securities</a></li>
                        <li><a class="text-background/60 transition-colors hover:text-background" href="/private-wealth">Private Wealth</a></li>
                    </ul>
                </div>
                <div>
                    <p class="text-xs uppercase tracking-[0.15em] text-background/30">Portfolio</p>
                    <ul class="mt-4 space-y-3 text-sm">
                        <li><a class="text-background/60 transition-colors hover:text-background" href="/private-equity">Private Equity</a></li>
                        <li><a class="text-background/60 transition-colors hover:text-background" href="/infrastructure-real-estate">Real Estate</a></li>
                        <li><a class="text-background/60 transition-colors hover:text-background" href="/renewable-energy">Renewable Energy</a></li>
                        <li><a class="text-background/60 transition-colors hover:text-background" href="/pharmaceuticals">Pharmaceuticals</a></li>
                    </ul>
                </div>
                <div>
                    <p class="text-xs uppercase tracking-[0.15em] text-background/30">Company</p>
                    <ul class="mt-4 space-y-3 text-sm">
                        <li><a class="text-background/60 transition-colors hover:text-background" href="/about">About Us</a></li>
                        <li><a class="text-background/60 transition-colors hover:text-background" href="/news-and-insights">Insights</a></li>
                        <li><a class="text-background/60 transition-colors hover:text-background" href="/wealth-club">Wealth Club</a></li>
                        <li><a class="text-background/60 transition-colors hover:text-background" href="/contact-us">Contact</a></li>
                    </ul>
                </div>
            </div>
        </div>

        <!-- Bottom bar -->
        <div class="mt-16 flex flex-col items-start justify-between gap-4 border-t border-background/10 pt-8 text-xs text-background/40 md:flex-row md:items-center">
            <p>© {currentYear} {siteSettings.company}. All rights reserved.</p>

            <div class="flex flex-wrap items-center gap-6">
                <a class="transition-colors hover:text-background/70" href="/privacy-policy">Privacy</a>
                <a class="transition-colors hover:text-background/70" href="/terms-of-use">Terms</a>
                <a class="transition-colors hover:text-background/70" href="/regulatory-disclosures">Regulatory Disclosures</a>
                <button
                    onclick={toggleDarkMode}
                    class="flex items-center gap-1.5 transition-colors hover:text-background/70 cursor-pointer"
                    aria-label="Toggle dark mode"
                >
                    {#if isDark}
                        <span class="material-icons text-sm">light_mode</span>
                        <span>Light</span>
                    {:else}
                        <span class="material-icons text-sm">dark_mode</span>
                        <span>Dark</span>
                    {/if}
                </button>
            </div>
        </div>

        <p class="mt-6 text-[10px] leading-relaxed text-background/25">
            Investing involves risk, including possible loss of principal. The information provided here is for general informational purposes only and should not be considered an individualized recommendation or personalized investment advice.
        </p>
    </div>
</footer>
