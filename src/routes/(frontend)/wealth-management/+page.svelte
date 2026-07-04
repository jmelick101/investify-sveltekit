<script lang="ts">
    import { siteSettings } from '$lib/stores/site.svelte';
    import { animate, splitText, heroParallax, magnetic } from '$lib/utils/gsap';
    import { ArrowRight } from 'lucide-svelte';

    let activeStep = $state<string | null>(null);

    const steps = [
        { id: 'discovery', title: 'Discovery & Onboarding', desc: 'We begin with a comprehensive review of your financial position, goals, risk tolerance, and long-term aspirations.' },
        { id: 'strategy', title: 'Strategy Design', desc: 'Our investment committee builds a bespoke allocation strategy aligned to your unique objectives and timeline.' },
        { id: 'execution', title: 'Execution & Deployment', desc: 'Institutional-grade portfolio construction with access to opportunities unavailable through conventional channels.' },
        { id: 'review', title: 'Ongoing Review', desc: 'Regular performance reviews with transparent reporting and proactive rebalancing as conditions evolve.' },
    ];
</script>

<!-- TEMPLATE A: Editorial split hero with side-by-side image + text -->
<section class="relative min-h-screen overflow-hidden bg-primary">
    <img use:heroParallax={0.4} src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=1600" alt="Wealth management" class="absolute inset-0 h-full w-full object-cover opacity-40" />
    <div class="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary/50 to-transparent"></div>
    <div class="relative z-10 flex min-h-screen flex-col justify-between px-6 pb-16 pt-24 lg:px-20">
        <div>
            <nav use:animate={{ type: 'fadeUp', delay: 0.1 }} class="mb-8 flex items-center gap-2 text-xs text-primary-foreground/40">
                <a href="/" class="hover:text-primary-foreground/70 transition-colors">Home</a>
                <span>/</span>
                <span class="text-primary-foreground/70">Wealth Management</span>
            </nav>
            <p use:animate={{ type: 'fadeUp', delay: 0.2 }} class="editorial-label-light mb-6">Verticals</p>
            <h1 use:splitText={{ delay: 0.4 }} class="editorial-heading max-w-3xl text-5xl font-semibold text-primary-foreground sm:text-6xl lg:text-7xl">
                Preserving Legacy, Architecting Future
            </h1>
        </div>
        <div class="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <p use:animate={{ type: 'fadeUp', delay: 0.8 }} class="max-w-md text-sm leading-relaxed text-primary-foreground/60">
                Comprehensive wealth management for high-net-worth individuals and families. We bring institutional rigor to personal portfolio construction.
            </p>
            <div use:animate={{ type: 'stagger', stagger: 0.1 }} class="flex gap-12 text-right">
                <div>
                    <p class="text-2xl font-semibold text-primary-foreground">$12B+</p>
                    <p class="text-xs text-primary-foreground/40">Assets Under Management</p>
                </div>
                <div>
                    <p class="text-2xl font-semibold text-primary-foreground">35+</p>
                    <p class="text-xs text-primary-foreground/40">Years Experience</p>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Image + text intro -->
<section class="py-24 lg:py-36">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-center">
            <div use:animate={{ type: 'reveal' }} class="aspect-[4/3] overflow-hidden">
                <img src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=800" alt="Client meeting" class="h-full w-full object-cover" />
            </div>
            <div use:animate={{ type: 'fadeRight', delay: 0.2 }}>
                <p class="editorial-label mb-6">Our Philosophy</p>
                <h2 class="editorial-heading text-4xl font-semibold text-foreground sm:text-5xl">
                    Institutional grade access for the individual investor
                </h2>
                <p class="mt-6 text-sm leading-relaxed text-muted-foreground max-w-md">
                    Unlike traditional investment firms, we are not restricted by holding periods, allowing us to pursue investments that align with our investment philosophy.
                </p>
                <a href="/contact-us" class="mt-8 inline-flex items-center gap-2 text-sm font-medium text-foreground underline underline-offset-4 decoration-muted-foreground hover:decoration-foreground transition-all">
                    Schedule a consultation <ArrowRight size={16} class="flex-shrink-0" />
                </a>
            </div>
        </div>
    </div>
</section>

<!-- 2-column features with border-left accent -->
<section class="border-t border-border/40 py-24 lg:py-36">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <p use:animate={{ type: 'fadeUp' }} class="editorial-label mb-16">What Sets Us Apart</p>
        <div use:animate={{ type: 'stagger', stagger: 0.1 }} class="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
            {#each [
                { title: 'Bespoke Portfolios', body: 'No two clients are alike. Every portfolio is purpose-built to reflect your unique circumstances and objectives.' },
                { title: 'Transparent Reporting', body: 'Real-time access to your full portfolio with institutional-quality performance attribution and risk analytics.' },
                { title: 'Integrated Planning', body: 'Seamless coordination with tax, estate, and legal advisors for a truly holistic wealth strategy.' },
                { title: 'Direct Market Access', body: 'Unfiltered access to primary and secondary markets across equities, fixed income, and alternatives.' },
                { title: 'Independent Research', body: 'Our in-house team produces proprietary analysis free from conflicts of interest common in the industry.' },
                { title: 'Tax Optimisation', body: 'Active tax-loss harvesting and structuring to maximise after-tax returns across all jurisdictions.' },
            ] as feature}
                <div class="border-l-2 border-primary pl-6">
                    <h3 class="text-base font-semibold text-foreground">{feature.title}</h3>
                    <p class="mt-2 text-sm leading-relaxed text-muted-foreground">{feature.body}</p>
                </div>
            {/each}
        </div>
    </div>
</section>

<!-- Full-width quote band -->
<section class="bg-muted/30 py-20">
    <div class="mx-auto max-w-4xl px-6 lg:px-8 text-center">
        <p use:splitText class="editorial-heading text-2xl font-semibold text-foreground sm:text-3xl lg:text-4xl">
            "The best investment you can make is an investment in yourself and in the quality of the people around you."
        </p>
        <p use:animate={{ type: 'fadeUp', delay: 0.4 }} class="mt-6 text-xs text-muted-foreground uppercase tracking-[0.2em]">— James Whitfield, CEO</p>
    </div>
</section>

<!-- How we operate accordion — dark -->
<section class="bg-primary py-24 lg:py-36">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="grid grid-cols-1 gap-16 lg:grid-cols-[40%_1fr]">
            <div use:animate={{ type: 'fadeLeft' }}>
                <p class="editorial-label-light mb-6">How We Operate</p>
                <h2 class="editorial-heading text-4xl font-semibold text-primary-foreground sm:text-5xl">A disciplined four-step process</h2>
                <p class="mt-6 max-w-xs text-sm leading-relaxed text-primary-foreground/60">From onboarding to ongoing stewardship, every step is designed around your long-term success.</p>
            </div>
            <div use:animate={{ type: 'stagger', stagger: 0.08 }}>
                {#each steps as step}
                    <button class="accordion-row-light w-full text-left" onclick={() => (activeStep = activeStep === step.id ? null : step.id)}>
                        <span class="text-sm font-medium text-primary-foreground">{step.title}</span>
                        <span class="shrink-0 text-lg font-light text-primary-foreground/40 transition-transform {activeStep === step.id ? 'rotate-45' : ''}">+</span>
                    </button>
                    {#if activeStep === step.id}
                        <p class="pb-4 pt-2 text-sm leading-relaxed text-primary-foreground/60">{step.desc}</p>
                    {/if}
                {/each}
            </div>
        </div>
    </div>
</section>

<!-- CTA -->
<section use:animate={{ type: 'fadeUp' }} class="py-24 lg:py-36">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="grid grid-cols-1 gap-8 md:grid-cols-2 md:items-center">
            <h2 class="editorial-heading text-3xl font-semibold text-foreground sm:text-4xl">Ready to put your wealth to work?</h2>
            <div class="flex flex-col gap-4 sm:flex-row md:justify-end">
                <a href="/register" class="inline-flex items-center justify-center border border-foreground px-8 py-3.5 text-sm font-medium text-foreground transition-colors hover:bg-foreground hover:text-background">Start Investing</a>
                <a href="/contact-us" class="inline-flex items-center justify-center gap-2 px-8 py-3.5 text-sm font-medium text-muted-foreground underline underline-offset-4 decoration-muted-foreground/40 hover:text-foreground transition-colors">Talk to an Advisor <ArrowRight size={16} class="flex-shrink-0" /></a>
            </div>
        </div>
    </div>
</section>
