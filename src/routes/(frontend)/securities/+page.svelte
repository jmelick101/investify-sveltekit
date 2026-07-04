<script lang="ts">
    import { animate, splitText, heroParallax, magnetic } from '$lib/gsap';
    import { ArrowRight } from 'lucide-svelte';

    const products = [
        { num: '01', title: 'Global Equities', desc: 'Long-only and long/short equity strategies across developed and emerging markets, managed by sector specialists.', metric: '+14.2%', metricLabel: '5yr CAGR' },
        { num: '02', title: 'Fixed Income', desc: 'Investment-grade and high-yield bond portfolios optimised for income, duration, and credit quality.', metric: '6.8%', metricLabel: 'Yield to Maturity' },
        { num: '03', title: 'Government Securities', desc: 'Sovereign debt instruments providing capital safety and liquidity with risk-free benchmark returns.', metric: 'AAA', metricLabel: 'Credit Rating' },
        { num: '04', title: 'Structured Products', desc: 'Capital-protected and enhanced-return structures engineered to specific risk/return targets.', metric: '92%', metricLabel: 'Capital Protection' },
    ];

    const performance = [
        { period: '1 Year', equities: '+18.4%', fixed: '+6.2%', blend: '+12.3%' },
        { period: '3 Year', equities: '+42.1%', fixed: '+14.8%', blend: '+28.5%' },
        { period: '5 Year', equities: '+71.6%', fixed: '+22.4%', blend: '+47.0%' },
        { period: 'Since Inception', equities: '+156.3%', fixed: '+48.7%', blend: '+102.5%' },
    ];
</script>

<!-- Hero -->
<section class="relative min-h-[70vh] overflow-hidden bg-primary">
    <img
        use:heroParallax={0.4}
        src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=1600"
        alt="Financial markets"
        class="absolute inset-0 h-full w-full object-cover opacity-40"
    />
    <div class="absolute inset-0 bg-gradient-to-b from-primary/30 via-primary/50 to-primary/80"></div>

    <div class="relative z-10 flex min-h-[70vh] flex-col justify-between px-6 pb-16 pt-24 lg:px-20">
        <div>
            <nav use:animate={{ type: 'fadeUp', delay: 0.2 }} class="mb-8 flex items-center gap-2 text-xs text-primary-foreground/40">
                <a href="/" class="transition-colors hover:text-primary-foreground/70">Home</a>
                <span>/</span>
                <span class="text-primary-foreground/70">Securities</span>
            </nav>
            <p use:animate={{ type: 'fadeUp', delay: 0.3 }} class="editorial-label-light mb-6">Verticals</p>
            <h1 use:splitText={{ delay: 0.4 }} class="editorial-heading max-w-3xl text-5xl font-semibold text-primary-foreground sm:text-6xl lg:text-7xl">
                Equity &amp; Bond Markets, Managed with Precision
            </h1>
        </div>

        <div class="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <p use:animate={{ type: 'fadeUp', delay: 0.8 }} class="max-w-md text-sm leading-relaxed text-primary-foreground/60">
                Public securities remain the most liquid and accessible investment universe. Our active management adds value through disciplined security selection and risk control.
            </p>
            <div use:animate={{ type: 'fade', delay: 1 }} class="flex gap-12 text-right">
                <div>
                    <p class="text-2xl font-semibold text-primary-foreground">Daily</p>
                    <p class="text-xs text-primary-foreground/40">Liquidity Available</p>
                </div>
                <div>
                    <p class="text-2xl font-semibold text-primary-foreground">12%</p>
                    <p class="text-xs text-primary-foreground/40">Avg. Annual Return</p>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Product Cards -->
<section class="py-24 lg:py-36">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <p use:animate={{ type: 'fadeUp', delay: 0.1 }} class="editorial-label mb-12">Strategy Categories</p>
        <div use:animate={{ type: 'stagger', stagger: 0.12 }} class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {#each products as product}
                <div class="group border border-border/40 p-6 transition-shadow hover:shadow-lg">
                    <div class="mb-6 border-b border-border/20 pb-4">
                        <span class="font-mono text-xs text-muted-foreground/50">{product.num}</span>
                        <div class="mt-2 h-px w-8 bg-foreground/20"></div>
                    </div>
                    <h3 class="text-lg font-semibold text-foreground">{product.title}</h3>
                    <p class="mt-3 text-sm leading-relaxed text-muted-foreground">{product.desc}</p>
                    <div class="mt-6 border-t border-border/20 pt-4">
                        <p class="text-xl font-semibold text-foreground">{product.metric}</p>
                        <p class="mt-0.5 text-xs text-muted-foreground/60">{product.metricLabel}</p>
                    </div>
                </div>
            {/each}
        </div>
    </div>
</section>

<!-- Performance Section -->
<section class="bg-muted/10 py-24 lg:py-36">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="grid grid-cols-1 gap-16 lg:grid-cols-2">
            <div use:animate={{ type: 'fadeLeft', delay: 0.2 }}>
                <p class="editorial-label mb-6">Performance</p>
                <h2 class="editorial-heading mb-8 text-3xl font-semibold text-foreground sm:text-4xl">
                    Consistent returns across market cycles
                </h2>

                <div class="relative h-56 w-full">
                    <svg class="absolute inset-0 h-full w-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 100">
                        <defs>
                            <linearGradient id="securitiesChartGrad" x1="0" x2="0" y1="0" y2="1">
                                <stop offset="0%" stop-color="currentColor" stop-opacity="0.08"></stop>
                                <stop offset="100%" stop-color="currentColor" stop-opacity="0"></stop>
                            </linearGradient>
                        </defs>
                        <!-- Grid lines -->
                        {#each [25, 50, 75] as y}
                            <line x1="0" y1={y} x2="100" y2={y} stroke="currentColor" stroke-opacity="0.06" stroke-width="0.5" vector-effect="non-scaling-stroke" />
                        {/each}
                        <!-- Area fill -->
                        <path d="M0,85 C8,82 15,75 25,68 C35,60 42,52 50,45 C58,38 65,32 75,26 C85,20 92,16 100,14 V100 H0 Z" fill="url(#securitiesChartGrad)" class="text-foreground"></path>
                        <!-- Main line -->
                        <path d="M0,85 C8,82 15,75 25,68 C35,60 42,52 50,45 C58,38 65,32 75,26 C85,20 92,16 100,14" fill="none" stroke="currentColor" stroke-opacity="0.3" stroke-linecap="round" stroke-width="1.5" vector-effect="non-scaling-stroke" class="text-foreground"></path>
                        <!-- Secondary line (fixed income) -->
                        <path d="M0,78 C8,76 15,73 25,70 C35,67 42,64 50,60 C58,57 65,54 75,50 C85,47 92,45 100,43" fill="none" stroke="currentColor" stroke-opacity="0.15" stroke-linecap="round" stroke-width="1" stroke-dasharray="3 3" vector-effect="non-scaling-stroke" class="text-foreground"></path>
                        <!-- End dots -->
                        <circle cx="100" cy="14" r="3" fill="currentColor" fill-opacity="0.4" class="text-foreground"></circle>
                        <circle cx="100" cy="43" r="2" fill="currentColor" fill-opacity="0.2" class="text-foreground"></circle>
                    </svg>
                </div>
                <div class="mt-4 flex gap-6 text-xs text-muted-foreground/50">
                    <span class="flex items-center gap-2"><span class="inline-block h-px w-4 bg-foreground/30"></span> Equities</span>
                    <span class="flex items-center gap-2"><span class="inline-block h-px w-4 border-t border-dashed border-foreground/20"></span> Fixed Income</span>
                </div>
            </div>

            <div use:animate={{ type: 'fadeRight', delay: 0.3 }} class="flex flex-col justify-center">
                <p class="mb-6 text-xs uppercase tracking-[0.15em] text-muted-foreground/50">Returns by Period</p>
                <div class="space-y-0">
                    {#each performance as row}
                        <div class="flex items-center justify-between border-t border-border/30 py-4">
                            <span class="text-sm font-medium text-foreground">{row.period}</span>
                            <div class="flex gap-8 text-right">
                                <div>
                                    <p class="text-sm font-semibold text-foreground">{row.equities}</p>
                                    <p class="text-[10px] text-muted-foreground/40">Equities</p>
                                </div>
                                <div>
                                    <p class="text-sm font-semibold text-foreground">{row.fixed}</p>
                                    <p class="text-[10px] text-muted-foreground/40">Fixed Inc.</p>
                                </div>
                                <div>
                                    <p class="text-sm font-semibold text-foreground">{row.blend}</p>
                                    <p class="text-[10px] text-muted-foreground/40">Blended</p>
                                </div>
                            </div>
                        </div>
                    {/each}
                    <div class="border-t border-border/30"></div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Split Editorial -->
<section class="border-t border-border/40 py-24 lg:py-36">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="grid grid-cols-1 gap-16 lg:grid-cols-[55%_1fr]">
            <div use:animate={{ type: 'fadeLeft' }}>
                <h2 class="editorial-heading text-4xl font-semibold text-foreground sm:text-5xl">
                    Alpha generation through rigorous research and disciplined execution
                </h2>
            </div>

            <div use:animate={{ type: 'stagger', stagger: 0.15 }} class="space-y-8 pt-2 lg:pt-12">
                {#each [
                    { title: 'Fundamental Research', body: 'Our analysts conduct deep bottom-up research on companies and credits, supported by proprietary quantitative screens.' },
                    { title: 'Risk Management', body: 'Position sizing, sector limits, and drawdown controls are embedded in every strategy from inception.' },
                    { title: 'Liquidity First', body: 'Daily liquidity across all public securities strategies, with no lock-up periods or redemption gates.' },
                ] as block}
                    <div class="border-t border-border/40 pt-5">
                        <h3 class="text-base font-semibold text-foreground">{block.title}</h3>
                        <p class="mt-2 text-sm leading-relaxed text-muted-foreground">{block.body}</p>
                    </div>
                {/each}
            </div>
        </div>
    </div>
</section>

<!-- Dark Quote Band -->
<section class="bg-primary py-24 lg:py-36">
    <div class="mx-auto max-w-4xl px-6 lg:px-8 text-center">
        <p use:animate={{ type: 'fadeUp', delay: 0.1 }} class="editorial-label-light mb-10">Our Philosophy</p>
        <p use:splitText={{ delay: 0.3 }} class="editorial-heading text-3xl font-semibold text-primary-foreground sm:text-4xl lg:text-5xl">
            Market discipline, not market timing, is the foundation of sustainable portfolio returns
        </p>
    </div>
</section>

<!-- CTA -->
<section class="py-24 lg:py-36">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="grid grid-cols-1 gap-8 md:grid-cols-2 md:items-center">
            <h2 use:animate={{ type: 'fadeUp' }} class="editorial-heading text-3xl font-semibold text-foreground sm:text-4xl">
                Access public markets with institutional edge.
            </h2>
            <div use:animate={{ type: 'fadeUp', delay: 0.2 }} class="flex flex-col gap-4 sm:flex-row md:justify-end">
                <a href="/register" class="inline-flex items-center justify-center border border-foreground px-8 py-3.5 text-sm font-medium text-foreground transition-colors hover:bg-foreground hover:text-background">
                    Start Investing
                </a>
                <a href="/contact-us" class="inline-flex items-center justify-center px-8 py-3.5 text-sm font-medium text-muted-foreground underline underline-offset-4 decoration-muted-foreground/40 transition-colors hover:text-foreground">
                    Talk to an Advisor <ArrowRight size={16} class="flex-shrink-0" />
                </a>
            </div>
        </div>
    </div>
</section>
