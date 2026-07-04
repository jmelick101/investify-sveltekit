<script lang="ts">
    import { siteSettings } from '$lib/stores/site.svelte';
    import { animate, splitText, heroParallax, magnetic } from '$lib/utils/gsap';
    import { ArrowRight } from 'lucide-svelte';

    let activeDivision = $state<string | null>(null);

    const divisions = [
        { id: 'etf', title: 'ETF & Index Strategies', desc: 'Passive and smart-beta strategies tracking global indices with institutional precision and low-cost execution.' },
        { id: 'securities', title: 'Securities & Fixed Income', desc: 'Equity and bond market exposure across developed and emerging markets with active risk management.' },
        { id: 'real-estate', title: 'Real Estate', desc: 'Premium commercial and residential property across gateway cities, managed through direct ownership vehicles.' },
        { id: 'private-equity', title: 'Private Equity', desc: 'Growth-stage and buyout investments in exceptional companies alongside world-class management teams.' },
        { id: 'mutual-funds', title: 'Mutual Funds', desc: 'Diversified pooled investment vehicles across equity, fixed income, and multi-asset strategies.' },
        { id: 'infrastructure', title: 'Infrastructure & Real Assets', desc: 'Long-duration essential assets providing stable, inflation-linked cash flows for institutional portfolios.' },
    ];

    const timeline = [
        { year: '1982', event: 'Founded', desc: 'Established as a boutique investment advisory firm in London.' },
        { year: '1998', event: 'Global Expansion', desc: 'Opened offices across North America, Asia-Pacific, and the Middle East.' },
        { year: '2010', event: 'Regulatory Recognition', desc: 'Received FCA authorisation as a full-scope Alternative Investment Fund Manager.' },
        { year: '2023', event: 'Platform Launch', desc: 'Launched our digital investment platform, democratising access to institutional strategies.' },
    ];
</script>

<!-- Hero -->
<section class="relative min-h-[75vh] overflow-hidden bg-primary">
    <img use:heroParallax={0.4} src="https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&q=80&w=1600" alt="City skyline" class="absolute inset-0 h-full w-full object-cover opacity-40" />
    <div class="absolute inset-0 bg-gradient-to-b from-primary/30 via-primary/50 to-primary/70"></div>
    <div class="relative z-10 flex min-h-[75vh] flex-col justify-between px-6 pb-16 pt-24 lg:px-20">
        <div class="max-w-3xl">
            <p use:animate={{ type: 'fadeUp', delay: 0.2 }} class="editorial-label-light mb-6">About Us</p>
            <h1 use:splitText={{ delay: 0.4 }} class="editorial-heading text-5xl font-semibold text-primary-foreground sm:text-6xl lg:text-7xl">
                Partner in Your Financial Legacy
            </h1>
        </div>
        <p use:animate={{ type: 'fadeUp', delay: 0.8 }} class="max-w-md text-sm leading-relaxed text-primary-foreground/60">
            For over four decades we have partnered with families, institutions, and entrepreneurs to preserve and grow wealth across generations.
        </p>
    </div>
</section>

<!-- Who We Are -->
<section class="py-24 lg:py-36">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="grid grid-cols-1 gap-16 lg:grid-cols-[55%_1fr]">
            <div use:animate={{ type: 'fadeLeft' }}>
                <p class="editorial-label mb-6">Who We Are</p>
                <h2 class="editorial-heading text-4xl font-semibold text-foreground sm:text-5xl">
                    A global investment firm built on integrity, insight, and long-term thinking
                </h2>
            </div>
            <div use:animate={{ type: 'stagger', stagger: 0.15 }} class="space-y-8 pt-2 lg:pt-12">
                {#each [
                    { stat: '96', label: 'Global Locations', body: 'Offices across North America, Europe, Asia-Pacific, and the Middle East.' },
                    { stat: '1,000+', label: 'Investment Professionals', body: 'Deep domain expertise across every major asset class and geography.' },
                    { stat: '$12B+', label: 'Assets Under Management', body: 'Trusted by families, institutions, and sovereign wealth funds worldwide.' },
                ] as item}
                    <div class="border-t border-border/40 pt-5">
                        <p class="text-2xl font-semibold text-foreground">{item.stat}</p>
                        <p class="mt-1 text-sm font-medium text-foreground">{item.label}</p>
                        <p class="mt-1 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
                    </div>
                {/each}
            </div>
        </div>
    </div>
</section>

<!-- Timeline -->
<section class="border-t border-border/40 py-24 lg:py-36">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <p use:animate={{ type: 'fadeUp' }} class="editorial-label mb-16">Our History</p>
        <div use:animate={{ type: 'stagger', stagger: 0.12 }} class="grid grid-cols-2 gap-8 md:grid-cols-4">
            {#each timeline as item}
                <div class="border-t-2 border-primary pt-6">
                    <p class="text-xs uppercase tracking-[0.15em] text-muted-foreground">{item.year}</p>
                    <p class="mt-3 text-base font-semibold text-foreground">{item.event}</p>
                    <p class="mt-2 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
                </div>
            {/each}
        </div>
    </div>
</section>

<!-- Leadership -->
<section class="bg-primary py-24 lg:py-36">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <p use:animate={{ type: 'fadeUp' }} class="editorial-label-light mb-12">Leadership</p>
        <h2 use:animate={{ type: 'fadeUp', delay: 0.1 }} class="editorial-heading mb-16 text-4xl font-semibold text-primary-foreground sm:text-5xl">Our executive team</h2>
        <div use:animate={{ type: 'stagger', stagger: 0.1 }} class="grid grid-cols-2 gap-8 md:grid-cols-4">
            {#each [
                { name: 'James Whitfield', title: 'Chief Executive Officer', img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400' },
                { name: 'Sarah Chen', title: 'Chief Investment Officer', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400' },
                { name: 'Marcus Okafor', title: 'Head of Private Markets', img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400' },
                { name: 'Elena Vasquez', title: 'Chief Risk Officer', img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400' },
            ] as person}
                <div>
                    <div class="aspect-[3/4] overflow-hidden">
                        <img src={person.img} alt={person.name} class="h-full w-full object-cover opacity-80 grayscale" />
                    </div>
                    <p class="mt-4 text-sm font-medium text-primary-foreground">{person.name}</p>
                    <p class="mt-0.5 text-xs text-primary-foreground/50">{person.title}</p>
                </div>
            {/each}
        </div>
    </div>
</section>

<!-- Investment Divisions — accordion -->
<section class="py-24 lg:py-36">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="grid grid-cols-1 gap-16 lg:grid-cols-[40%_1fr]">
            <div use:animate={{ type: 'fadeUp' }}>
                <p class="editorial-label mb-6">What We Offer</p>
                <h2 class="editorial-heading text-4xl font-semibold text-foreground sm:text-5xl">Investment divisions</h2>
                <p class="mt-6 max-w-xs text-sm leading-relaxed text-muted-foreground">Six specialised divisions covering every major asset class and investment approach.</p>
            </div>
            <div use:animate={{ type: 'stagger', stagger: 0.06 }}>
                {#each divisions as div}
                    <button class="accordion-row w-full text-left" onclick={() => (activeDivision = activeDivision === div.id ? null : div.id)}>
                        <span class="text-sm font-medium text-foreground">{div.title}</span>
                        <span class="shrink-0 text-lg font-light text-muted-foreground transition-transform {activeDivision === div.id ? 'rotate-45' : ''}">+</span>
                    </button>
                    {#if activeDivision === div.id}
                        <p class="pb-4 pt-2 text-sm leading-relaxed text-muted-foreground">{div.desc}</p>
                    {/if}
                {/each}
            </div>
        </div>
    </div>
</section>

<!-- CTA -->
<section use:animate={{ type: 'fadeUp' }} class="border-t border-border/40 bg-muted/20 py-24">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="grid grid-cols-1 gap-8 md:grid-cols-2 md:items-center">
            <h2 class="editorial-heading text-3xl font-semibold text-foreground sm:text-4xl">Ready to start your investment journey?</h2>
            <div class="flex flex-col gap-4 sm:flex-row md:justify-end">
                <a href="/register" class="inline-flex items-center justify-center border border-foreground px-8 py-3.5 text-sm font-medium text-foreground transition-colors hover:bg-foreground hover:text-background">Start Investing</a>
                <a href="/contact-us" class="inline-flex items-center justify-center gap-2 px-8 py-3.5 text-sm font-medium text-muted-foreground underline underline-offset-4 decoration-muted-foreground/40 hover:text-foreground transition-colors">Talk to an Advisor <ArrowRight size={16} class="flex-shrink-0" /></a>
            </div>
        </div>
    </div>
</section>
