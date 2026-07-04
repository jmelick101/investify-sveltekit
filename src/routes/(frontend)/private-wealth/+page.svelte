<script lang="ts">
    import { animate, splitText, heroParallax, magnetic } from '$lib/utils/gsap';
    import { ArrowRight } from 'lucide-svelte';

    let activeService = $state<string | null>(null);

    const timeline = [
        { num: '01', title: 'Confidential Discovery', desc: 'A private, in-depth conversation to understand your full financial picture, family dynamics, and long-term vision.' },
        { num: '02', title: 'Bespoke Strategy', desc: 'Our investment committee designs a tailored allocation framework aligned to your unique objectives, risk profile, and timeline.' },
        { num: '03', title: 'Institutional Execution', desc: 'Portfolio construction with direct access to private funds, co-investments, and opportunities reserved for institutional investors.' },
        { num: '04', title: 'Continuous Stewardship', desc: 'Ongoing performance reviews, proactive rebalancing, and transparent reporting as markets and your life evolve.' },
    ];

    const services = [
        { id: 'family', title: 'Family Office Services', desc: 'Consolidated oversight of complex family financial interests including investments, tax, estate, and philanthropy.' },
        { id: 'concierge', title: 'Concierge Advisory', desc: 'A dedicated senior advisor available around the clock for time-sensitive decisions and ongoing strategic counsel.' },
        { id: 'alternative', title: 'Alternative Access', desc: 'Co-investment opportunities and direct access to private funds typically reserved for institutional investors.' },
        { id: 'legacy', title: 'Legacy & Estate Planning', desc: 'Intergenerational wealth transfer strategies designed to preserve capital and values across multiple generations.' },
    ];

    const stats = [
        { value: '$10M+', label: 'Minimum Relationship' },
        { value: '24/7', label: 'Advisory Access' },
        { value: '150+', label: 'Families Served' },
        { value: '40yr', label: 'Heritage' },
    ];
</script>

<!-- HERO: Centered text, full-screen, parallax background -->
<section class="relative min-h-screen overflow-hidden bg-primary">
    <img
        use:heroParallax={0.4}
        src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=1600"
        alt="Private wealth"
        class="absolute inset-0 h-full w-full object-cover opacity-40"
    />
    <div class="absolute inset-0 bg-gradient-to-b from-primary/50 via-primary/40 to-primary/60"></div>
    <div class="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <nav use:animate={{ type: 'fadeDown', delay: 0.1 }} class="absolute top-24 left-1/2 -translate-x-1/2 flex items-center gap-2 text-xs text-primary-foreground/40">
            <a href="/" class="hover:text-primary-foreground/70 transition-colors">Home</a>
            <span>/</span>
            <span class="text-primary-foreground/70">Private Wealth</span>
        </nav>
        <p use:animate={{ type: 'fadeUp', delay: 0.2 }} class="editorial-label-light mb-6">Private Wealth</p>
        <h1 use:splitText={{ delay: 0.4 }} class="editorial-heading max-w-4xl text-5xl font-semibold text-primary-foreground sm:text-6xl lg:text-8xl">
            Exceptional Service for Exceptional Clients
        </h1>
        <p use:animate={{ type: 'fadeUp', delay: 0.8 }} class="mt-8 max-w-lg text-sm leading-relaxed text-primary-foreground/60">
            Our private wealth division serves ultra-high-net-worth individuals with a minimum relationship size of $10M, providing the full scope of family office capabilities.
        </p>
        <div use:animate={{ type: 'stagger', stagger: 0.1 }} class="absolute bottom-16 flex gap-16">
            {#each [
                { value: '$12B+', label: 'Assets Managed' },
                { value: '35+', label: 'Years Experience' },
                { value: '98%', label: 'Client Retention' },
            ] as stat}
                <div class="text-center">
                    <p class="text-2xl font-semibold text-primary-foreground">{stat.value}</p>
                    <p class="mt-1 text-[10px] uppercase tracking-[0.2em] text-primary-foreground/40">{stat.label}</p>
                </div>
            {/each}
        </div>
    </div>
</section>

<!-- VERTICAL NUMBERED TIMELINE -->
<section class="py-28 lg:py-40">
    <div class="mx-auto max-w-3xl px-6 lg:px-8">
        <div class="mb-20 text-center">
            <p use:animate={{ type: 'fadeUp' }} class="editorial-label mb-6">The Journey</p>
            <h2 use:splitText={{ delay: 0.2 }} class="editorial-heading text-4xl font-semibold text-foreground sm:text-5xl">
                A disciplined path to lasting wealth
            </h2>
        </div>
        <div use:animate={{ type: 'stagger', stagger: 0.15 }} class="relative">
            <!-- Vertical connecting line -->
            <div class="absolute left-[23px] top-0 bottom-0 w-px bg-border/60"></div>
            {#each timeline as step, i}
                <div class="relative flex gap-8 {i < timeline.length - 1 ? 'pb-16' : ''}">
                    <div class="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-border bg-background">
                        <span class="text-xs font-semibold text-foreground">{step.num}</span>
                    </div>
                    <div class="pt-1">
                        <h3 class="text-lg font-semibold text-foreground">{step.title}</h3>
                        <p class="mt-2 text-sm leading-relaxed text-muted-foreground max-w-md">{step.desc}</p>
                    </div>
                </div>
            {/each}
        </div>
    </div>
</section>

<!-- FULL-WIDTH IMAGE BAND -->
<section use:animate={{ type: 'reveal' }} class="overflow-hidden">
    <div class="aspect-[21/8]">
        <img
            use:heroParallax={0.3}
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2000"
            alt="Luxury office interior"
            class="h-full w-full object-cover"
        />
    </div>
</section>

<!-- SPLIT SECTION: Heading left, Image right -->
<section class="py-28 lg:py-40">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-center">
            <div use:animate={{ type: 'fadeLeft', delay: 0.1 }}>
                <p class="editorial-label mb-6">Private Wealth Division</p>
                <h2 use:splitText={{ delay: 0.3 }} class="editorial-heading text-4xl font-semibold text-foreground sm:text-5xl">
                    Your personal investment office, managed by experts
                </h2>
                <div class="mt-10 space-y-6">
                    {#each [
                        { title: 'Dedicated Senior Team', body: 'A lead partner with decades of experience and a full team dedicated exclusively to your affairs.' },
                        { title: 'Holistic View', body: 'We coordinate every dimension of your financial life — from investments and tax to estate and philanthropy.' },
                        { title: 'Discretionary Management', body: 'Full authority to act swiftly on your behalf within agreed parameters, ensuring optimal timing.' },
                    ] as block}
                        <div class="border-t border-border/40 pt-5">
                            <h3 class="text-base font-semibold text-foreground">{block.title}</h3>
                            <p class="mt-2 text-sm leading-relaxed text-muted-foreground">{block.body}</p>
                        </div>
                    {/each}
                </div>
            </div>
            <div use:animate={{ type: 'reveal' }} class="aspect-[4/5] overflow-hidden">
                <img
                    src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=800"
                    alt="Client meeting"
                    class="h-full w-full object-cover"
                />
            </div>
        </div>
    </div>
</section>

<!-- STATS BAND (dark) -->
<section class="bg-primary py-20 lg:py-28">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div use:animate={{ type: 'stagger', stagger: 0.1 }} class="grid grid-cols-2 gap-y-12 md:grid-cols-4">
            {#each stats as stat}
                <div class="text-center">
                    <p use:animate={{ type: 'counter' }} class="text-4xl font-semibold text-primary-foreground lg:text-5xl">{stat.value}</p>
                    <p class="mt-3 text-xs uppercase tracking-[0.2em] text-primary-foreground/40">{stat.label}</p>
                </div>
            {/each}
        </div>
    </div>
</section>

<!-- SERVICES ACCORDION (white bg) -->
<section class="py-28 lg:py-40">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="grid grid-cols-1 gap-16 lg:grid-cols-[40%_1fr]">
            <div use:animate={{ type: 'fadeLeft' }}>
                <p class="editorial-label mb-6">Our Services</p>
                <h2 class="editorial-heading text-4xl font-semibold text-foreground sm:text-5xl">
                    A complete suite of private wealth solutions
                </h2>
                <p class="mt-6 max-w-xs text-sm leading-relaxed text-muted-foreground">
                    Every service is designed to work in concert, providing seamless oversight of your entire financial life.
                </p>
            </div>
            <div use:animate={{ type: 'stagger', stagger: 0.08 }}>
                {#each services as service}
                    <button class="accordion-row w-full text-left" onclick={() => (activeService = activeService === service.id ? null : service.id)}>
                        <span class="text-sm font-medium text-foreground">{service.title}</span>
                        <span class="shrink-0 text-lg font-light text-muted-foreground transition-transform {activeService === service.id ? 'rotate-45' : ''}">+</span>
                    </button>
                    {#if activeService === service.id}
                        <p class="pb-4 pt-2 text-sm leading-relaxed text-muted-foreground">{service.desc}</p>
                    {/if}
                {/each}
            </div>
        </div>
    </div>
</section>

<!-- CTA -->
<section class="border-t border-border/40 py-28 lg:py-40">
    <div class="mx-auto max-w-4xl px-6 text-center lg:px-8">
        <h2 use:splitText class="editorial-heading text-3xl font-semibold text-foreground sm:text-4xl lg:text-5xl">
            Begin a confidential conversation about your wealth.
        </h2>
        <div use:animate={{ type: 'fadeUp', delay: 0.4 }} class="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a href="/contact-us" class="inline-flex items-center justify-center border border-foreground px-10 py-4 text-sm font-medium text-foreground transition-colors hover:bg-foreground hover:text-background">
                Request a Meeting
            </a>
            <a href="/register" class="inline-flex items-center justify-center px-10 py-4 text-sm font-medium text-muted-foreground underline underline-offset-4 decoration-muted-foreground/40 hover:text-foreground transition-colors">
                Open an Account <ArrowRight size={16} class="flex-shrink-0" />
            </a>
        </div>
    </div>
</section>
