<script lang="ts">
    import { animate, splitText, heroParallax } from '$lib/gsap';
    import { ArrowRight } from 'lucide-svelte';

    let activeItem = $state<string | null>(null);

    const initiatives = [
        { id: 'carbon', title: 'Carbon Reduction', desc: 'Science-based targets for reducing portfolio carbon intensity by 50% by 2030, aligned with a 1.5°C pathway.' },
        { id: 'circular', title: 'Circular Economy', desc: 'Active investment in waste reduction, material reuse, and regenerative business models across our private market strategies.' },
        { id: 'water', title: 'Water Stewardship', desc: 'Water risk assessment and reduction programmes embedded in our real asset and industrial investment due diligence.' },
        { id: 'biodiversity', title: 'Biodiversity', desc: 'No deforestation commitment and nature-positive investment criteria applied to all new investments from 2024.' },
    ];

    const targets = [
        { value: '50%', label: 'Carbon Reduction by 2030' },
        { value: 'Net Zero', label: 'Portfolio Target 2040' },
        { value: '30%', label: 'New AUM in Green Assets' },
        { value: 'A+', label: 'UN PRI Rating' },
    ];
</script>

<!-- Hero -->
<section class="relative min-h-[80vh] overflow-hidden bg-primary">
    <img
        use:heroParallax={0.4}
        src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=1600"
        alt="Sustainability nature"
        class="absolute inset-0 h-full w-full object-cover opacity-40"
    />
    <div class="absolute inset-0 bg-gradient-to-b from-primary/30 via-primary/40 to-primary/70"></div>
    <div class="relative z-10 flex min-h-[80vh] flex-col justify-between px-6 pb-16 pt-24 lg:px-20">
        <div>
            <nav use:animate={{ type: 'fadeDown', delay: 0.1 }} class="mb-8 flex items-center gap-2 text-xs text-primary-foreground/40">
                <a href="/" class="hover:text-primary-foreground/70 transition-colors">Home</a>
                <span>/</span>
                <span class="text-primary-foreground/70">Sustainability</span>
            </nav>
            <p use:animate={{ type: 'fadeUp', delay: 0.2 }} class="editorial-label-light mb-6">Our Values</p>
            <h1 use:splitText={{ delay: 0.4 }} class="editorial-heading max-w-3xl text-5xl font-semibold text-primary-foreground sm:text-6xl lg:text-7xl">
                Investing for a Sustainable Planet
            </h1>
        </div>
        <p use:animate={{ type: 'fadeUp', delay: 0.8 }} class="max-w-md text-sm leading-relaxed text-primary-foreground/60">
            Sustainability is at the core of how we think about risk and return. The businesses that will create the most value are those built for the long term.
        </p>
    </div>
</section>

<!-- Targets band -->
<section class="border-y border-border/40">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div use:animate={{ type: 'stagger' }} class="grid grid-cols-2 divide-x divide-y md:grid-cols-4 md:divide-y-0 divide-border/30">
            {#each targets as t}
                <div class="px-8 py-10 text-center">
                    <p class="text-3xl font-semibold text-foreground lg:text-4xl">{t.value}</p>
                    <p class="mt-1 text-xs uppercase tracking-[0.15em] text-muted-foreground">{t.label}</p>
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
                <p class="editorial-label mb-6">Our Targets</p>
                <h2 use:splitText={{ delay: 0.3 }} class="editorial-heading text-4xl font-semibold text-foreground sm:text-5xl">
                    Concrete commitments, measurable progress
                </h2>
            </div>
            <div use:animate={{ type: 'stagger', stagger: 0.1 }} class="space-y-8 pt-2 lg:pt-12">
                {#each [
                    { title: 'Net Zero by 2040', body: 'Our portfolio net-zero commitment is ahead of the Paris Agreement timeline and covers Scope 1, 2, and 3 emissions.' },
                    { title: 'Annual Impact Report', body: 'Comprehensive annual reporting on environmental footprint, progress against targets, and methodology for all calculations.' },
                    { title: 'Green Financing', body: 'We have committed to directing 30% of all new investment to activities directly supporting the green transition.' },
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
            src="https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&q=80&w=2000"
            alt="Sustainable forest"
            class="h-full w-full object-cover"
        />
    </div>
</section>

<!-- Dark accordion -->
<section class="bg-primary py-24 lg:py-36">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="grid grid-cols-1 gap-16 lg:grid-cols-[40%_1fr]">
            <div use:animate={{ type: 'fadeUp', delay: 0.1 }}>
                <p class="editorial-label-light mb-6">Key Initiatives</p>
                <h2 class="editorial-heading text-4xl font-semibold text-primary-foreground sm:text-5xl">
                    Where we focus our sustainability efforts
                </h2>
            </div>
            <div use:animate={{ type: 'stagger', stagger: 0.08 }}>
                {#each initiatives as i}
                    <button class="accordion-row-light w-full text-left" onclick={() => (activeItem = activeItem === i.id ? null : i.id)}>
                        <span class="text-sm font-medium text-primary-foreground">{i.title}</span>
                        <span class="shrink-0 text-lg font-light text-primary-foreground/40 {activeItem === i.id ? 'rotate-45' : ''}">+</span>
                    </button>
                    {#if activeItem === i.id}
                        <p class="pb-4 pt-2 text-sm leading-relaxed text-primary-foreground/60">{i.desc}</p>
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
                Build a portfolio that's good for the planet and your wealth.
            </h2>
            <div use:animate={{ type: 'fadeUp', delay: 0.3 }} class="flex flex-col gap-4 sm:flex-row md:justify-end">
                <a href="/esg-responsible-investment" class="inline-flex items-center justify-center border border-foreground px-8 py-3.5 text-sm font-medium text-foreground transition-colors hover:bg-foreground hover:text-background">
                    Our ESG Approach
                </a>
                <a href="/contact-us" class="inline-flex items-center justify-center px-8 py-3.5 text-sm font-medium text-muted-foreground underline underline-offset-4 decoration-muted-foreground/40 hover:text-foreground transition-colors">
                    Contact Us <ArrowRight size={16} class="flex-shrink-0" />
                </a>
            </div>
        </div>
    </div>
</section>
