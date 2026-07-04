<script lang="ts">
    import { animate, splitText, heroParallax } from '$lib/gsap';
    import { ArrowRight } from 'lucide-svelte';
    import { siteSettings } from '$lib/stores/site.svelte';

    let activeItem = $state<string | null>(null);

    const pillars = [
        { id: 'environment', title: 'Environmental', desc: 'Carbon footprint measurement and reduction, climate risk assessment, biodiversity impact, and resource efficiency across all investments.' },
        { id: 'social', title: 'Social', desc: 'Labour standards, human rights, community engagement, supply chain responsibility, and diversity metrics at investee companies.' },
        { id: 'governance', title: 'Governance', desc: 'Board independence, executive pay, shareholder rights, audit quality, and anti-corruption policies.' },
        { id: 'integration', title: 'ESG Integration', desc: 'Systematic incorporation of ESG factors into fundamental analysis and portfolio construction across every asset class.' },
    ];

    const metrics = [
        { value: '100%', label: 'Portfolios ESG Scored' },
        { value: 'A+', label: 'PRI Rating' },
        { value: '2040', label: 'Net Zero Target' },
        { value: '£2.4B', label: 'Impact AUM' },
    ];
</script>

<!-- Hero -->
<section class="relative min-h-[80vh] overflow-hidden bg-primary">
    <img
        use:heroParallax={0.4}
        src="https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&q=80&w=1600"
        alt="ESG sustainable investing"
        class="absolute inset-0 h-full w-full object-cover opacity-40"
    />
    <div class="absolute inset-0 bg-gradient-to-b from-primary/40 via-primary/30 to-primary/70"></div>
    <div class="relative z-10 flex min-h-[80vh] flex-col justify-between px-6 pb-16 pt-24 lg:px-20">
        <div>
            <nav use:animate={{ type: 'fadeDown', delay: 0.1 }} class="mb-8 flex items-center gap-2 text-xs text-primary-foreground/40">
                <a href="/" class="hover:text-primary-foreground/70 transition-colors">Home</a>
                <span>/</span>
                <span class="text-primary-foreground/70">ESG Responsible Investment</span>
            </nav>
            <p use:animate={{ type: 'fadeUp', delay: 0.2 }} class="editorial-label-light mb-6">Our Values</p>
            <h1 use:splitText={{ delay: 0.4 }} class="editorial-heading max-w-3xl text-5xl font-semibold text-primary-foreground sm:text-6xl lg:text-7xl">
                Profit and Purpose, United
            </h1>
        </div>
        <p use:animate={{ type: 'fadeUp', delay: 0.8 }} class="max-w-md text-sm leading-relaxed text-primary-foreground/60">
            ESG factors are not a constraint on returns — they are a source of alpha. Companies with superior ESG profiles consistently outperform over the long term.
        </p>
    </div>
</section>

<!-- Impact metrics row -->
<section class="border-y border-border/40">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div use:animate={{ type: 'stagger' }} class="grid grid-cols-2 divide-x divide-y md:grid-cols-4 md:divide-y-0 divide-border/30">
            {#each metrics as m}
                <div class="px-8 py-10 text-center">
                    <p class="text-3xl font-semibold text-foreground lg:text-4xl">{m.value}</p>
                    <p class="mt-1 text-xs uppercase tracking-[0.15em] text-muted-foreground">{m.label}</p>
                </div>
            {/each}
        </div>
    </div>
</section>

<!-- Split editorial -->
<section class="py-24 lg:py-36">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="grid grid-cols-1 gap-16 lg:grid-cols-[55%_1fr]">
            <div use:animate={{ type: 'fadeUp', delay: 0.1 }}>
                <p class="editorial-label mb-6">Our ESG Approach</p>
                <h2 use:splitText={{ delay: 0.3 }} class="editorial-heading text-4xl font-semibold text-foreground sm:text-5xl">
                    Integrating sustainability into every investment decision
                </h2>
            </div>
            <div use:animate={{ type: 'stagger', stagger: 0.1 }} class="space-y-8 pt-2 lg:pt-12">
                {#each [
                    { title: 'Proprietary Scoring', body: 'Our ESG team develops bespoke scores for every holding, going beyond third-party ratings to capture material factors.' },
                    { title: 'Engagement First', body: 'We prefer engagement over exclusion — working with companies to improve ESG performance and unlock hidden value.' },
                    { title: 'Impact Measurement', body: 'Rigorous measurement and reporting of real-world environmental and social outcomes achieved through our portfolios.' },
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

<!-- Large image band -->
<section use:animate={{ type: 'reveal' }} class="overflow-hidden">
    <div class="aspect-[21/7]">
        <img
            use:heroParallax={0.3}
            src="https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&q=80&w=2000"
            alt="Sustainable landscape"
            class="h-full w-full object-cover"
        />
    </div>
</section>

<!-- Dark accordion - ESG framework -->
<section class="bg-primary py-24 lg:py-36">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="grid grid-cols-1 gap-16 lg:grid-cols-[40%_1fr]">
            <div use:animate={{ type: 'fadeUp', delay: 0.1 }}>
                <p class="editorial-label-light mb-6">The ESG Framework</p>
                <h2 class="editorial-heading text-4xl font-semibold text-primary-foreground sm:text-5xl">
                    Three pillars, one integrated approach
                </h2>
            </div>
            <div use:animate={{ type: 'stagger', stagger: 0.08 }}>
                {#each pillars as p}
                    <button class="accordion-row-light w-full text-left" onclick={() => (activeItem = activeItem === p.id ? null : p.id)}>
                        <span class="text-sm font-medium text-primary-foreground">{p.title}</span>
                        <span class="shrink-0 text-lg font-light text-primary-foreground/40 {activeItem === p.id ? 'rotate-45' : ''}">+</span>
                    </button>
                    {#if activeItem === p.id}
                        <p class="pb-4 pt-2 text-sm leading-relaxed text-primary-foreground/60">{p.desc}</p>
                    {/if}
                {/each}
            </div>
        </div>
    </div>
</section>

<!-- CTA -->
<section class="py-24 lg:py-36">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="grid grid-cols-1 gap-8 md:grid-cols-2 md:items-center">
            <h2 use:splitText={{ delay: 0.2 }} class="editorial-heading text-3xl font-semibold text-foreground sm:text-4xl">
                Align your portfolio with your values.
            </h2>
            <div use:animate={{ type: 'fadeUp', delay: 0.3 }} class="flex flex-col gap-4 sm:flex-row md:justify-end">
                <a href="/register" class="inline-flex items-center justify-center border border-foreground px-8 py-3.5 text-sm font-medium text-foreground transition-colors hover:bg-foreground hover:text-background">
                    Start Investing
                </a>
                <a href="/contact-us" class="inline-flex items-center justify-center px-8 py-3.5 text-sm font-medium text-muted-foreground underline underline-offset-4 decoration-muted-foreground/40 hover:text-foreground transition-colors">
                    Talk to an Advisor <ArrowRight size={16} class="flex-shrink-0" />
                </a>
            </div>
        </div>
    </div>
</section>
