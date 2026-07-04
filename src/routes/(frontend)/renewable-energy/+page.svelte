<script lang="ts">
    import { animate, splitText, heroParallax, magnetic } from '$lib/utils/gsap';

    let activeItem = $state<string | null>(null);

    const vehicles = [
        { id: 'infra', title: 'Infrastructure Equity', desc: 'Direct ownership of solar, wind, and hydroelectric assets generating long-duration, inflation-linked cash flows.' },
        { id: 'pyrolysis', title: 'Pyrolysis & Circular Economy', desc: 'Advanced waste-to-energy ventures converting non-recyclable materials into valuable fuel and feedstock.' },
        { id: 'bonds', title: 'Green Bonds', desc: 'Investment-grade fixed income instruments funding certified environmental and sustainable development projects.' },
        { id: 'carbon', title: 'Carbon Credits & Markets', desc: 'Participation in voluntary and compliance carbon markets, capitalising on the global pricing of emissions.' },
    ];

    const impactStats = [
        { value: '2.4GW', label: 'Clean Energy' },
        { value: '500K', label: 'Tonnes CO2 Avoided' },
        { value: '12', label: 'Countries' },
        { value: 'A+', label: 'ESG Rated' },
    ];
</script>

<!-- 1. Hero -->
<section class="relative min-h-screen overflow-hidden bg-primary">
    <img
        use:heroParallax={0.4}
        src="https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&q=80&w=1600"
        alt="Solar panels at sunrise"
        class="absolute inset-0 h-full w-full object-cover opacity-40"
    />
    <div class="absolute inset-0 bg-gradient-to-b from-primary/40 via-primary/30 to-primary/50"></div>

    <div class="relative z-10 flex min-h-screen flex-col justify-between px-6 pb-16 pt-24 lg:px-20">
        <div class="max-w-4xl">
            <nav use:animate={{ type: 'fadeUp', delay: 0.2 }} class="mb-8 flex items-center gap-2 text-xs text-primary-foreground/40">
                <a href="/" class="hover:text-primary-foreground/70 transition-colors">Home</a>
                <span>/</span>
                <span class="text-primary-foreground/70">Renewable Energy</span>
            </nav>
            <p use:animate={{ type: 'fadeUp', delay: 0.3 }} class="editorial-label-light mb-6">Portfolio</p>
            <h1 use:splitText={{ delay: 0.4 }} class="editorial-heading text-5xl font-semibold text-primary-foreground sm:text-6xl lg:text-7xl xl:text-8xl">
                Capitalising on the Circular Economy
            </h1>
        </div>

        <div class="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
            <p use:animate={{ type: 'fadeUp', delay: 0.8 }} class="max-w-md text-sm leading-relaxed text-primary-foreground/60">
                Renewable energy is the fastest-growing asset class of the decade. We provide investors with diversified exposure to this structural megatrend.
            </p>
            <div use:animate={{ type: 'fade', delay: 1 }} class="flex gap-12 text-right">
                <div>
                    <p class="text-2xl font-semibold text-primary-foreground">ESG</p>
                    <p class="text-xs text-primary-foreground/40">Impact Rated</p>
                </div>
                <div>
                    <p class="text-2xl font-semibold text-primary-foreground">8–12%</p>
                    <p class="text-xs text-primary-foreground/40">Target Yield</p>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- 2. Impact Metrics Bar -->
<section class="border-y border-border/40 bg-white">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div use:animate={{ type: 'stagger' }} class="grid grid-cols-2 md:grid-cols-4 divide-x divide-border/30">
            {#each impactStats as stat}
                <div class="py-8 px-6 text-center md:py-10">
                    <p class="text-3xl font-semibold text-foreground lg:text-4xl">{stat.value}</p>
                    <p class="mt-1 text-xs uppercase tracking-[0.15em] text-muted-foreground">{stat.label}</p>
                </div>
            {/each}
        </div>
    </div>
</section>

<!-- 3. Image Mosaic Grid -->
<section class="bg-white py-24 lg:py-36">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="mb-16">
            <p use:animate={{ type: 'fadeUp', delay: 0.1 }} class="editorial-label mb-6">Our Approach</p>
            <h2 use:animate={{ type: 'fadeUp', delay: 0.2 }} class="editorial-heading max-w-2xl text-4xl font-semibold text-foreground sm:text-5xl">
                Future-proof your legacy through sustainable infrastructure
            </h2>
        </div>

        <div use:animate={{ type: 'stagger' }} class="grid grid-cols-1 gap-4 md:grid-cols-2 md:grid-rows-2 lg:gap-5">
            <!-- Large image: Solar Farm (spans 2 rows) -->
            <div class="relative row-span-2 overflow-hidden rounded-lg group min-h-[400px] md:min-h-0">
                <img
                    src="https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&q=80&w=1200"
                    alt="Solar farm aerial view"
                    class="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                <div class="relative z-10 flex h-full flex-col justify-end p-8 lg:p-10">
                    <p class="text-xs uppercase tracking-[0.2em] text-white/50 mb-3">Long-Duration Assets</p>
                    <h3 class="text-xl font-semibold text-white lg:text-2xl">Solar Infrastructure</h3>
                    <p class="mt-2 max-w-sm text-sm leading-relaxed text-white/70">
                        20-30 year asset lives with government-backed offtake agreements providing stable, inflation-linked returns.
                    </p>
                </div>
            </div>

            <!-- Smaller image: Wind Turbines -->
            <div class="relative overflow-hidden rounded-lg group min-h-[240px]">
                <img
                    src="https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?auto=format&fit=crop&q=80&w=800"
                    alt="Wind turbines at dusk"
                    class="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                <div class="relative z-10 flex h-full flex-col justify-end p-8">
                    <p class="text-xs uppercase tracking-[0.2em] text-white/50 mb-3">Inflation Linkage</p>
                    <h3 class="text-lg font-semibold text-white">Wind Energy</h3>
                    <p class="mt-2 text-sm leading-relaxed text-white/70">
                        Energy contracts indexed to inflation, providing natural portfolio protection.
                    </p>
                </div>
            </div>

            <!-- Smaller image: Hydroelectric -->
            <div class="relative overflow-hidden rounded-lg group min-h-[240px]">
                <img
                    src="https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&q=80&w=800"
                    alt="Hydroelectric dam"
                    class="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                <div class="relative z-10 flex h-full flex-col justify-end p-8">
                    <p class="text-xs uppercase tracking-[0.2em] text-white/50 mb-3">ESG Alignment</p>
                    <h3 class="text-lg font-semibold text-white">Hydroelectric Power</h3>
                    <p class="mt-2 text-sm leading-relaxed text-white/70">
                        Rigorous environmental and social impact assessment before every commitment.
                    </p>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- 4. Split Text + Accordion (light bg) -->
<section class="bg-white py-24 lg:py-36 border-t border-border/40">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="grid grid-cols-1 gap-16 lg:grid-cols-[40%_1fr]">
            <div>
                <p use:animate={{ type: 'fadeUp', delay: 0.1 }} class="editorial-label mb-6">Investment Vehicles</p>
                <h2 use:animate={{ type: 'fadeUp', delay: 0.2 }} class="editorial-heading text-4xl font-semibold text-foreground sm:text-5xl">
                    How we access renewable markets
                </h2>
            </div>
            <div use:animate={{ type: 'fadeUp', delay: 0.4 }}>
                {#each vehicles as v}
                    <button class="accordion-row w-full text-left" onclick={() => (activeItem = activeItem === v.id ? null : v.id)}>
                        <span class="text-sm font-medium text-foreground">{v.title}</span>
                        <span class="shrink-0 text-lg font-light text-muted-foreground transition-transform duration-300 {activeItem === v.id ? 'rotate-45' : ''}">+</span>
                    </button>
                    {#if activeItem === v.id}
                        <p class="pb-4 pt-2 text-sm leading-relaxed text-muted-foreground">{v.desc}</p>
                    {/if}
                {/each}
            </div>
        </div>
    </div>
</section>

<!-- 5. Full-Width Parallax Image Band -->
<section class="relative overflow-hidden">
    <img
        use:heroParallax={0.4}
        src="https://images.unsplash.com/photo-1548337138-e87d889cc369?auto=format&fit=crop&q=80&w=1800"
        alt="Wind farm landscape at golden hour"
        class="w-full object-cover aspect-[21/8]"
    />
    <div class="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary/50 to-transparent"></div>
    <div class="absolute inset-0 z-10 flex items-center px-6 lg:px-20">
        <div use:animate={{ type: 'fadeRight', delay: 0.3 }} class="max-w-lg">
            <p class="text-xs uppercase tracking-[0.2em] text-primary-foreground/50 mb-4">The Energy Transition</p>
            <h3 class="editorial-heading text-3xl font-semibold text-primary-foreground sm:text-4xl lg:text-5xl">
                Powering the shift to a decarbonised world
            </h3>
            <p class="mt-4 text-sm leading-relaxed text-primary-foreground/60">
                The global energy transition represents a multi-trillion dollar reallocation of capital over the coming decades.
            </p>
        </div>
    </div>
</section>

<!-- 6. Dark Stats Section -->
<section class="bg-primary py-24 lg:py-36">
    <div class="mx-auto max-w-5xl px-6 text-center lg:px-8">
        <p use:splitText={{ delay: 0.3 }} class="editorial-heading mx-auto max-w-3xl text-3xl font-semibold text-primary-foreground sm:text-4xl lg:text-5xl">
            Sustainable investing is no longer a choice — it is the architecture of future returns.
        </p>
        <div use:animate={{ type: 'stagger' }} class="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-3">
            <div class="border-t border-primary-foreground/10 pt-8">
                <p class="text-4xl font-semibold text-primary-foreground lg:text-5xl">$8.4T</p>
                <p class="mt-2 text-xs uppercase tracking-[0.15em] text-primary-foreground/40">Global Renewable Investment by 2030</p>
            </div>
            <div class="border-t border-primary-foreground/10 pt-8">
                <p class="text-4xl font-semibold text-primary-foreground lg:text-5xl">72%</p>
                <p class="mt-2 text-xs uppercase tracking-[0.15em] text-primary-foreground/40">Institutions Increasing ESG Allocation</p>
            </div>
            <div class="border-t border-primary-foreground/10 pt-8">
                <p class="text-4xl font-semibold text-primary-foreground lg:text-5xl">3x</p>
                <p class="mt-2 text-xs uppercase tracking-[0.15em] text-primary-foreground/40">Growth vs Traditional Energy</p>
            </div>
        </div>
    </div>
</section>

<!-- 7. CTA -->
<section class="bg-white py-24 lg:py-36">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div use:animate={{ type: 'fadeUp', delay: 0.2 }} class="grid grid-cols-1 gap-8 md:grid-cols-2 md:items-center">
            <h2 class="editorial-heading text-3xl font-semibold text-foreground sm:text-4xl">
                Secure your portfolio's future with renewable energy.
            </h2>
            <div class="flex flex-col gap-4 sm:flex-row md:justify-end">
                <a href="/register" class="inline-flex items-center justify-center border border-foreground px-8 py-3.5 text-sm font-medium text-foreground transition-colors hover:bg-foreground hover:text-background">
                    Start Investing
                </a>
                <a href="/contact-us" class="inline-flex items-center justify-center px-8 py-3.5 text-sm font-medium text-muted-foreground underline underline-offset-4 decoration-muted-foreground/40 hover:text-foreground transition-colors">
                    Talk to an Advisor
                </a>
            </div>
        </div>
    </div>
</section>
