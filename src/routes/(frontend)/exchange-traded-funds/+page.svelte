<script lang="ts">
    import { animate, splitText, heroParallax, magnetic } from '$lib/gsap';

    const benefits = [
        { num: '01', title: 'Cost Efficiency', desc: 'ETFs typically cost a fraction of actively managed funds, with total expense ratios well below 0.5% — keeping more capital working for you.' },
        { num: '02', title: 'Tax Efficiency', desc: 'The ETF structure minimizes capital gains distributions through in-kind creation and redemption, reducing your annual tax burden.' },
        { num: '03', title: 'Transparency', desc: 'Daily portfolio disclosure means you always know exactly what you own, how it is priced, and where your money is allocated.' },
    ];

    const comparison = [
        { label: 'Trading', etf: 'Intraday', mutual: 'End of Day' },
        { label: 'Expense Ratio', etf: '<0.2%', mutual: '0.5 - 1.5%' },
        { label: 'Transparency', etf: 'Daily Holdings', mutual: 'Monthly / Quarterly' },
        { label: 'Tax Efficiency', etf: 'High', mutual: 'Moderate' },
        { label: 'Minimum Investment', etf: 'None', mutual: '$1,000+' },
    ];

    const products = [
        { id: 'core', name: 'Core Equity', desc: 'Broad market index funds covering global developed and emerging market equities at ultra-low cost.', ter: '0.03%', link: '/exchange-traded-funds' },
        { id: 'factor', name: 'Factor & Smart Beta', desc: 'Rules-based ETFs targeting value, quality, momentum, and low-volatility factors with systematic rebalancing.', ter: '0.12%', link: '/exchange-traded-funds' },
        { id: 'sector', name: 'Sector & Thematic', desc: 'Focused exposure to technology, healthcare, energy transition, and other high-conviction macro themes.', ter: '0.15%', link: '/exchange-traded-funds' },
        { id: 'esg', name: 'ESG & Sustainable', desc: 'Screened and integrated ESG ETFs enabling responsible investing without sacrificing diversification.', ter: '0.10%', link: '/exchange-traded-funds' },
    ];

    const steps = [
        { num: '01', title: 'Open Account', desc: 'Complete our streamlined onboarding in minutes with digital identity verification.' },
        { num: '02', title: 'Choose ETFs', desc: 'Browse our curated range or build a custom portfolio matched to your risk profile.' },
        { num: '03', title: 'Start Trading', desc: 'Execute trades intraday with real-time pricing and institutional-grade execution.' },
    ];
</script>

<!-- Hero -->
<section class="relative min-h-[70vh] overflow-hidden bg-primary">
    <img
        use:heroParallax={0.4}
        src="https://images.unsplash.com/photo-1642790106117-e829e14a795f?auto=format&fit=crop&q=80&w=1600"
        alt="ETF trading"
        class="absolute inset-0 h-full w-full object-cover opacity-40"
    />
    <div class="absolute inset-0 bg-gradient-to-b from-primary/30 via-primary/50 to-primary/80"></div>

    <div class="relative z-10 flex min-h-[70vh] flex-col justify-between px-6 pb-16 pt-24 lg:px-20">
        <div class="max-w-4xl">
            <nav use:animate={{ type: 'fadeUp', delay: 0.2 }} class="mb-8 flex items-center gap-2 text-xs text-primary-foreground/40">
                <a href="/" class="transition-colors hover:text-primary-foreground/70">Home</a>
                <span>/</span>
                <span class="text-primary-foreground/70">Exchange Traded Funds</span>
            </nav>
            <p use:animate={{ type: 'fadeUp', delay: 0.3 }} class="editorial-label-light mb-6">Verticals</p>
            <h1 use:splitText={{ delay: 0.4 }} class="editorial-heading max-w-3xl text-5xl font-semibold text-primary-foreground sm:text-6xl lg:text-7xl">
                Low-Cost Market Exposure with Institutional Precision
            </h1>
        </div>

        <div class="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
            <p use:animate={{ type: 'fadeUp', delay: 0.8 }} class="max-w-md text-sm leading-relaxed text-primary-foreground/60">
                Exchange-Traded Funds combine the diversification of mutual funds with the flexibility of stock trading. Our ETF platform offers best-in-class access to global markets.
            </p>
            <div use:animate={{ type: 'fade', delay: 1 }} class="flex gap-12 text-right">
                <div>
                    <p class="text-2xl font-semibold text-primary-foreground">Intraday</p>
                    <p class="text-xs text-primary-foreground/40">Trading Liquidity</p>
                </div>
                <div>
                    <p class="text-2xl font-semibold text-primary-foreground">&lt;0.2%</p>
                    <p class="text-xs text-primary-foreground/40">Average TER</p>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Why ETFs - 3 large benefit blocks -->
<section class="py-24 lg:py-36">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="mb-16 max-w-2xl">
            <p use:animate={{ type: 'fadeUp', delay: 0.1 }} class="editorial-label mb-6">Why ETFs</p>
            <h2 use:animate={{ type: 'fadeUp', delay: 0.2 }} class="editorial-heading text-4xl font-semibold text-foreground sm:text-5xl">
                The most efficient vehicle for global market access
            </h2>
        </div>
        <div use:animate={{ type: 'stagger' }} class="grid grid-cols-1 gap-0 md:grid-cols-3">
            {#each benefits as benefit, i}
                <div class="group relative border-t border-border/40 py-10 md:border-l md:border-t-0 md:px-8 md:py-0 md:first:border-l-0 md:first:pl-0 md:last:pr-0">
                    <span class="mb-6 block font-mono text-6xl font-extralight text-border/60 lg:text-7xl">{benefit.num}</span>
                    <h3 class="mb-3 text-lg font-semibold text-foreground">{benefit.title}</h3>
                    <p class="text-sm leading-relaxed text-muted-foreground">{benefit.desc}</p>
                </div>
            {/each}
        </div>
    </div>
</section>

<!-- ETF vs Mutual Fund Comparison -->
<section class="border-y border-border/40 bg-muted/10 py-24 lg:py-36">
    <div class="mx-auto max-w-5xl px-6 lg:px-8">
        <p use:animate={{ type: 'fadeUp', delay: 0.1 }} class="editorial-label mb-6">How ETFs Compare</p>
        <h2 use:animate={{ type: 'fadeUp', delay: 0.2 }} class="editorial-heading mb-16 max-w-2xl text-4xl font-semibold text-foreground sm:text-5xl">
            ETF vs. Mutual Fund
        </h2>

        <div use:animate={{ type: 'fadeUp', delay: 0.3 }} class="overflow-hidden rounded-sm border border-border/40">
            <!-- Table header -->
            <div class="grid grid-cols-3 bg-foreground text-background">
                <div class="px-6 py-4 text-xs font-medium uppercase tracking-[0.15em]">Feature</div>
                <div class="border-l border-background/10 px-6 py-4 text-center text-xs font-medium uppercase tracking-[0.15em]">ETF</div>
                <div class="border-l border-background/10 px-6 py-4 text-center text-xs font-medium uppercase tracking-[0.15em]">Mutual Fund</div>
            </div>
            <!-- Table rows -->
            {#each comparison as row, i}
                <div class="grid grid-cols-3 {i % 2 === 0 ? 'bg-background' : 'bg-muted/20'} border-t border-border/30">
                    <div class="px-6 py-5 text-sm font-medium text-foreground">{row.label}</div>
                    <div class="border-l border-border/20 px-6 py-5 text-center text-sm font-semibold text-foreground">{row.etf}</div>
                    <div class="border-l border-border/20 px-6 py-5 text-center text-sm text-muted-foreground">{row.mutual}</div>
                </div>
            {/each}
        </div>
    </div>
</section>

<!-- Product Grid -->
<section class="border-t border-border/40 py-24 lg:py-36">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <p use:animate={{ type: 'fadeUp', delay: 0.1 }} class="editorial-label mb-6">ETF Categories</p>
        <h2 use:animate={{ type: 'fadeUp', delay: 0.2 }} class="editorial-heading mb-16 max-w-2xl text-4xl font-semibold text-foreground sm:text-5xl">
            Our ETF product range
        </h2>

        <div use:animate={{ type: 'stagger' }} class="grid grid-cols-1 gap-px overflow-hidden rounded-sm border border-border/40 bg-border/40 sm:grid-cols-2">
            {#each products as product}
                <div class="flex flex-col justify-between bg-background p-8 lg:p-10">
                    <div>
                        <h3 class="mb-3 text-lg font-semibold text-foreground">{product.name}</h3>
                        <p class="mb-6 text-sm leading-relaxed text-muted-foreground">{product.desc}</p>
                    </div>
                    <div class="flex items-end justify-between">
                        <div>
                            <p class="text-xs uppercase tracking-[0.15em] text-muted-foreground/60">TER from</p>
                            <p class="mt-1 text-xl font-semibold text-foreground">{product.ter}</p>
                        </div>
                        <a href={product.link} class="text-sm font-medium text-foreground underline underline-offset-4 decoration-border transition-colors hover:decoration-foreground">
                            Explore &rarr;
                        </a>
                    </div>
                </div>
            {/each}
        </div>
    </div>
</section>

<!-- How It Works - Process Steps -->
<section class="bg-primary py-24 lg:py-36">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <p use:animate={{ type: 'fadeUp', delay: 0.1 }} class="editorial-label-light mb-6">Getting Started</p>
        <h2 use:animate={{ type: 'fadeUp', delay: 0.2 }} class="editorial-heading mb-20 max-w-2xl text-4xl font-semibold text-primary-foreground sm:text-5xl">
            Three steps to your portfolio
        </h2>

        <div use:animate={{ type: 'stagger' }} class="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-0">
            {#each steps as step, i}
                <div class="relative md:px-8 md:first:pl-0 md:last:pr-0">
                    {#if i < steps.length - 1}
                        <div class="absolute right-0 top-6 hidden h-px w-8 bg-primary-foreground/20 md:block"></div>
                    {/if}
                    <span class="mb-4 block font-mono text-7xl font-extralight text-primary-foreground/15 lg:text-8xl">{step.num}</span>
                    <h3 class="mb-3 text-lg font-semibold text-primary-foreground">{step.title}</h3>
                    <p class="text-sm leading-relaxed text-primary-foreground/50">{step.desc}</p>
                </div>
            {/each}
        </div>
    </div>
</section>

<!-- CTA -->
<section class="py-24 lg:py-36">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div use:animate={{ type: 'fadeUp' }} class="grid grid-cols-1 gap-8 md:grid-cols-2 md:items-center">
            <h2 class="editorial-heading text-3xl font-semibold text-foreground sm:text-4xl">
                Build a low-cost, diversified portfolio today.
            </h2>
            <div class="flex flex-col gap-4 sm:flex-row md:justify-end">
                <a href="/register" class="inline-flex items-center justify-center border border-foreground px-8 py-3.5 text-sm font-medium text-foreground transition-colors hover:bg-foreground hover:text-background">
                    Start Investing
                </a>
                <a href="/contact-us" class="inline-flex items-center justify-center px-8 py-3.5 text-sm font-medium text-muted-foreground underline underline-offset-4 decoration-muted-foreground/40 transition-colors hover:text-foreground">
                    Talk to an Advisor &rarr;
                </a>
            </div>
        </div>
    </div>
</section>
