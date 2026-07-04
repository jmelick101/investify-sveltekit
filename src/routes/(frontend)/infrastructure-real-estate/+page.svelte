<script lang="ts">
    import { animate, splitText, heroParallax, magnetic } from '$lib/utils/gsap';

    const assets = [
        {
            title: 'Commercial Real Estate',
            desc: 'Class-A office, logistics, and mixed-use developments across major global cities.',
            image: 'photo-1486406146926-c627a92ad1ab',
        },
        {
            title: 'Premium Residential',
            desc: 'High-end residential and build-to-rent portfolios in supply-constrained urban markets.',
            image: 'photo-1545324418-cc1a3fa10c00',
        },
        {
            title: 'Transport Infrastructure',
            desc: 'Airports, ports, toll roads, and rail providing essential connectivity and regulated revenues.',
            image: 'photo-1474487548417-781cb71495f7',
        },
        {
            title: 'Digital Infrastructure',
            desc: 'Data centres, fibre networks, and cell towers powering the digital economy.',
            image: 'photo-1558494949-ef010cbdcc31',
        },
    ];

    const stats = [
        { value: '$2.8B', label: 'Assets Under Management' },
        { value: '25+', label: 'Active Assets' },
        { value: '8-12%', label: 'Target Yield' },
        { value: '15yr', label: 'Track Record' },
    ];
</script>

<!-- Hero -->
<section class="relative min-h-[80vh] overflow-hidden bg-primary">
    <img
        use:heroParallax={0.4}
        src="https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&q=80&w=1920"
        alt="City skyline at dusk"
        class="absolute inset-0 h-[120%] w-full object-cover opacity-40"
    />
    <div class="absolute inset-0 bg-gradient-to-t from-primary via-primary/60 to-primary/30"></div>
    <div class="relative z-10 flex min-h-[80vh] flex-col justify-between px-6 pb-16 pt-24 lg:px-20">
        <div>
            <nav class="mb-8 flex items-center gap-2 text-xs text-primary-foreground/40">
                <a href="/" class="transition-colors hover:text-primary-foreground/70">Home</a>
                <span>/</span>
                <span class="text-primary-foreground/70">Infrastructure & Real Estate</span>
            </nav>
            <p class="editorial-label-light mb-6" use:animate={{ type: 'fadeUp', delay: 0.1 }}>Portfolio</p>
            <h1
                class="editorial-heading max-w-4xl text-5xl font-semibold text-primary-foreground sm:text-6xl lg:text-7xl"
                use:animate={{ type: 'fadeUp', delay: 0.2 }}
            >
                Real Assets for Real Returns
            </h1>
        </div>
        <div class="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <p
                class="max-w-md text-sm leading-relaxed text-primary-foreground/60"
                use:animate={{ type: 'fadeUp', delay: 0.4 }}
            >
                Infrastructure and real estate provide stable, inflation-linked income streams and long-duration value preservation for sophisticated portfolios.
            </p>
            <div class="flex gap-12 text-right" use:animate={{ type: 'fadeUp', delay: 0.5 }}>
                <div>
                    <p class="text-2xl font-semibold text-primary-foreground">8-12%</p>
                    <p class="text-xs text-primary-foreground/40">Target Yield</p>
                </div>
                <div>
                    <p class="text-2xl font-semibold text-primary-foreground">25+</p>
                    <p class="text-xs text-primary-foreground/40">Active Assets</p>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Split Intro -->
<section class="py-24 lg:py-36">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="grid grid-cols-1 gap-16 lg:grid-cols-[55%_1fr]">
            <div use:animate={{ type: 'fadeUp', delay: 0.1 }}>
                <p class="editorial-label mb-6">Why Real Assets</p>
                <h2 class="editorial-heading text-4xl font-semibold text-foreground sm:text-5xl">
                    Tangible assets that endure market cycles
                </h2>
            </div>
            <div class="space-y-8 pt-2 lg:pt-12" use:animate={{ type: 'fadeUp', delay: 0.3 }}>
                {#each [
                    { title: 'Inflation Protection', body: 'Infrastructure revenues are typically linked to inflation indices, providing natural protection against the erosion of purchasing power over long horizons.' },
                    { title: 'Diversification', body: 'Real assets have low correlation to public equity and fixed-income markets, meaningfully improving portfolio risk-adjusted returns.' },
                    { title: 'Income Generation', body: 'Long-term contracted cash flows from essential assets deliver stable, predictable income streams quarter after quarter.' },
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

<!-- Asset Showcase - Large Image Cards -->
<section class="border-t border-border/30 py-24 lg:py-36">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <p class="editorial-label mb-12" use:animate={{ type: 'fadeUp', delay: 0.1 }}>Asset Classes</p>
        <div class="grid grid-cols-1 gap-5 md:grid-cols-2">
            {#each assets as asset, i}
                <div
                    class="group relative overflow-hidden rounded-sm"
                    use:animate={{ type: 'scale', delay: 0.15 * i }}
                >
                    <div class="aspect-[16/10] overflow-hidden">
                        <img
                            src="https://images.unsplash.com/{asset.image}?auto=format&fit=crop&q=80&w=1200"
                            alt={asset.title}
                            class="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                    </div>
                    <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-colors duration-500 group-hover:from-black/60 group-hover:via-black/10"></div>
                    <div class="absolute inset-x-0 bottom-0 p-6 lg:p-8">
                        <h3 class="text-xl font-semibold text-white lg:text-2xl">{asset.title}</h3>
                        <p class="mt-2 max-w-sm text-sm leading-relaxed text-white/70">{asset.desc}</p>
                    </div>
                </div>
            {/each}
        </div>
    </div>
</section>

<!-- Stats Band -->
<section class="bg-primary py-20 lg:py-28">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div
            class="grid grid-cols-2 gap-10 text-center md:grid-cols-4"
            use:animate={{ type: 'stagger' }}
        >
            {#each stats as stat}
                <div>
                    <p class="text-3xl font-semibold text-primary-foreground lg:text-4xl">{stat.value}</p>
                    <p class="mt-2 text-xs uppercase tracking-widest text-primary-foreground/40">{stat.label}</p>
                </div>
            {/each}
        </div>
    </div>
</section>

<!-- Why Real Assets - Statement -->
<section class="py-24 lg:py-36">
    <div class="mx-auto max-w-5xl px-6 text-center lg:px-8">
        <p
            class="editorial-heading text-3xl font-semibold leading-snug text-foreground sm:text-4xl lg:text-5xl"
            use:splitText={{ delay: 0.4 }}
        >
            Real assets offer a rare combination of inflation protection, portfolio diversification, and durable income generation that public markets alone cannot provide.
        </p>
    </div>
</section>

<!-- CTA -->
<section class="border-t border-border/30 py-24 lg:py-36">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="grid grid-cols-1 gap-8 md:grid-cols-2 md:items-center">
            <h2
                class="editorial-heading text-3xl font-semibold text-foreground sm:text-4xl"
                use:animate={{ type: 'fadeUp', delay: 0.1 }}
            >
                Build a resilient portfolio with real assets.
            </h2>
            <div class="flex flex-col gap-4 sm:flex-row md:justify-end" use:animate={{ type: 'fadeUp', delay: 0.3 }}>
                <a
                    href="/register"
                    class="inline-flex items-center justify-center border border-foreground px-8 py-3.5 text-sm font-medium text-foreground transition-colors hover:bg-foreground hover:text-background"
                >
                    Start Investing
                </a>
                <a
                    href="/contact-us"
                    class="inline-flex items-center justify-center px-8 py-3.5 text-sm font-medium text-muted-foreground underline decoration-muted-foreground/40 underline-offset-4 transition-colors hover:text-foreground"
                >
                    Talk to an Advisor
                </a>
            </div>
        </div>
    </div>
</section>
