<script lang="ts">
    import { animate, splitText, heroParallax } from '$lib/gsap';
    import { ArrowRight } from 'lucide-svelte';

    let activeItem = $state<string | null>(null);

    const principles = [
        { id: 'fiduciary', title: 'Fiduciary Responsibility', desc: 'We act solely in the best interests of our clients at all times, with no conflicts of interest and full transparency of fees.' },
        { id: 'governance', title: 'Corporate Governance', desc: 'We actively engage with investee companies on governance standards, board composition, and executive accountability.' },
        { id: 'stewardship', title: 'Active Stewardship', desc: 'We vote our proxies thoughtfully and engage in constructive dialogue with management on material ESG risks.' },
        { id: 'reporting', title: 'Transparent Reporting', desc: 'Annual stewardship reports documenting our engagement activities, voting records, and outcomes.' },
    ];

    const commitments = [
        { label: 'PRI Signatory', desc: 'Founding signatory of the UN Principles for Responsible Investment.' },
        { label: 'TCFD Aligned', desc: 'Full climate-risk disclosure aligned with the TCFD framework.' },
        { label: 'Net Zero by 2040', desc: 'Committed to net-zero emissions across portfolio and operations.' },
    ];
</script>

<!-- Hero -->
<section class="relative min-h-[80vh] overflow-hidden bg-primary">
    <img
        use:heroParallax={0.4}
        src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=1600"
        alt="Responsible stewardship"
        class="absolute inset-0 h-full w-full object-cover opacity-40"
    />
    <div class="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/40 to-primary/30"></div>
    <div class="relative z-10 flex min-h-[80vh] flex-col justify-between px-6 pb-16 pt-24 lg:px-20">
        <div>
            <nav use:animate={{ type: 'fadeDown', delay: 0.1 }} class="mb-8 flex items-center gap-2 text-xs text-primary-foreground/40">
                <a href="/" class="hover:text-primary-foreground/70 transition-colors">Home</a>
                <span>/</span>
                <span class="text-primary-foreground/70">Responsible Stewardship</span>
            </nav>
            <p use:animate={{ type: 'fadeUp', delay: 0.2 }} class="editorial-label-light mb-6">Our Values</p>
            <h1 use:splitText={{ delay: 0.4 }} class="editorial-heading max-w-3xl text-5xl font-semibold text-primary-foreground sm:text-6xl lg:text-7xl">
                Capital with Conscience
            </h1>
        </div>
        <p use:animate={{ type: 'fadeUp', delay: 0.8 }} class="max-w-md text-sm leading-relaxed text-primary-foreground/60">
            We believe that how you invest matters as much as how much you invest. Responsible stewardship is not a constraint — it is a competitive advantage.
        </p>
    </div>
</section>

<!-- Commitment blocks -->
<section class="border-y border-border/40 py-16">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div use:animate={{ type: 'stagger' }} class="grid grid-cols-1 gap-0 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border/40">
            {#each commitments as c}
                <div class="py-8 px-8 md:first:pl-0 md:last:pr-0">
                    <p class="text-sm font-semibold text-foreground">{c.label}</p>
                    <p class="mt-2 text-sm leading-relaxed text-muted-foreground">{c.desc}</p>
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
                <p class="editorial-label mb-6">Our Commitment</p>
                <h2 use:splitText={{ delay: 0.3 }} class="editorial-heading text-4xl font-semibold text-foreground sm:text-5xl">
                    Long-term value creation through responsible ownership
                </h2>
            </div>
            <div use:animate={{ type: 'stagger', stagger: 0.1 }} class="space-y-8 pt-2 lg:pt-12">
                {#each [
                    { title: 'PRI Signatory', body: 'A founding signatory of the UN Principles for Responsible Investment, committed to integrating ESG across all strategies.' },
                    { title: 'TCFD Aligned', body: 'Full disclosure of climate-related financial risks in line with the Task Force on Climate-related Financial Disclosures framework.' },
                    { title: 'Net Zero by 2040', body: 'Committed to achieving net-zero emissions across our investment portfolio and operations by 2040.' },
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

<!-- Full-width image band -->
<section use:animate={{ type: 'reveal' }} class="overflow-hidden">
    <div class="aspect-[21/7]">
        <img
            use:heroParallax={0.3}
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=2000"
            alt="Stewardship in action"
            class="h-full w-full object-cover"
        />
    </div>
</section>

<!-- Dark accordion -->
<section class="bg-primary py-24 lg:py-36">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="grid grid-cols-1 gap-16 lg:grid-cols-[40%_1fr]">
            <div use:animate={{ type: 'fadeUp', delay: 0.1 }}>
                <p class="editorial-label-light mb-6">Our Principles</p>
                <h2 class="editorial-heading text-4xl font-semibold text-primary-foreground sm:text-5xl">
                    How we practise stewardship
                </h2>
            </div>
            <div use:animate={{ type: 'stagger', stagger: 0.08 }}>
                {#each principles as p}
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
                Invest responsibly. Invest with us.
            </h2>
            <div use:animate={{ type: 'fadeUp', delay: 0.3 }} class="flex flex-col gap-4 sm:flex-row md:justify-end">
                <a href="/esg-responsible-investment" class="inline-flex items-center justify-center border border-foreground px-8 py-3.5 text-sm font-medium text-foreground transition-colors hover:bg-foreground hover:text-background">
                    Learn about ESG
                </a>
                <a href="/contact-us" class="inline-flex items-center justify-center px-8 py-3.5 text-sm font-medium text-muted-foreground underline underline-offset-4 decoration-muted-foreground/40 hover:text-foreground transition-colors">
                    Contact Us <ArrowRight size={16} class="flex-shrink-0" />
                </a>
            </div>
        </div>
    </div>
</section>
