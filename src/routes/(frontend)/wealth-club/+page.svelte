<script lang="ts">
    import { animate, splitText, heroParallax, magnetic } from '$lib/gsap';

    let activeBenefit = $state<string | null>(null);

    const whyJoin = [
        { num: '01', title: 'Curated Network', body: 'Connect with a vetted community of high-net-worth investors, entrepreneurs, and industry leaders who share your ambition.' },
        { num: '02', title: 'Institutional Opportunities', body: 'Access investment opportunities with minimums and terms typically reserved for institutional capital.' },
        { num: '03', title: 'Knowledge Edge', body: 'Stay ahead with proprietary research, economic briefings, and real-time portfolio intelligence.' },
    ];

    const tiers = [
        {
            name: 'Select',
            minimum: '$1M+',
            features: [
                'Quarterly investment forums',
                'Monthly market intelligence reports',
                'Dedicated relationship manager',
                'Co-investment opportunities',
                'Member networking events',
            ],
        },
        {
            name: 'Premier',
            minimum: '$5M+',
            features: [
                'Everything in Select, plus:',
                'Pre-IPO deal access',
                'Private placement priority',
                'Sector-specific briefings',
                'Annual strategy retreat',
                'Tax optimization consulting',
            ],
        },
        {
            name: 'Institutional',
            minimum: '$25M+',
            features: [
                'Everything in Premier, plus:',
                'Bespoke portfolio construction',
                'Direct access to senior partners',
                'Custom research on demand',
                'Global macro advisory',
                'Family office integration',
                'Legacy & succession planning',
            ],
        },
    ];

    const benefits = [
        { id: 'access', title: 'Exclusive Deal Access', desc: 'Early access to pre-IPO opportunities, private placements, and co-investments alongside our institutional partners.' },
        { id: 'events', title: 'Member Events', desc: 'Quarterly investment forums, sector briefings, and curated networking events with industry leaders and fellow members.' },
        { id: 'research', title: 'Proprietary Research', desc: 'Monthly market intelligence reports and sector outlooks prepared exclusively for Wealth Club members.' },
        { id: 'advisory', title: 'Priority Advisory', desc: 'Dedicated relationship manager and priority access to our senior investment team for strategic guidance.' },
        { id: 'network', title: 'Private Network', desc: 'An invitation-only community of like-minded investors, entrepreneurs, and thought leaders across industries.' },
        { id: 'concierge', title: 'Concierge Services', desc: 'White-glove support for portfolio reviews, event coordination, and bespoke investment structuring.' },
    ];
</script>

<!-- 1. Split Hero -->
<section class="grid min-h-screen lg:grid-cols-2">
    <div class="relative flex flex-col justify-between bg-primary px-6 pb-16 pt-24 lg:px-16">
        <div>
            <nav class="mb-8 flex items-center gap-2 text-xs text-primary-foreground/40" use:animate={{ type: 'fadeDown', delay: 0.1 }}>
                <a href="/" class="transition-colors hover:text-primary-foreground/70">Home</a>
                <span>/</span>
                <span class="text-primary-foreground/70">Wealth Club</span>
            </nav>
            <p class="editorial-label-light mb-6" use:animate={{ type: 'fadeUp', delay: 0.2 }}>Membership</p>
            <h1
                class="editorial-heading max-w-xl text-5xl font-semibold text-primary-foreground sm:text-6xl lg:text-7xl"
                use:splitText={{ delay: 0.4 }}
            >
                The Inner Circle of Serious Investors
            </h1>
        </div>
        <p class="max-w-sm text-sm leading-relaxed text-primary-foreground/60" use:animate={{ type: 'fadeUp', delay: 0.8 }}>
            The Wealth Club is our invitation-only investment community for high-conviction investors seeking exclusive access and peer connections.
        </p>
    </div>
    <div class="relative hidden lg:block">
        <img
            src="https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&q=80&w=1600"
            alt="Exclusive investor lounge"
            class="absolute inset-0 h-full w-full object-cover"
            use:heroParallax={0.4}
        />
    </div>
</section>

<!-- 2. Why Join -->
<section class="py-24 lg:py-36">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <h2
            class="editorial-heading mx-auto mb-20 max-w-3xl text-center text-4xl font-semibold text-foreground sm:text-5xl"
            use:splitText={{ delay: 0.2 }}
        >
            Where exceptional investors find exceptional opportunities
        </h2>
        <div class="grid grid-cols-1 gap-8 md:grid-cols-3" use:animate={{ type: 'stagger' }}>
            {#each whyJoin as card}
                <div class="border-t border-foreground/15 pt-8">
                    <span class="font-serif text-3xl font-light text-muted-foreground/40">{card.num}</span>
                    <h3 class="mt-4 text-lg font-semibold text-foreground">{card.title}</h3>
                    <p class="mt-3 text-sm leading-relaxed text-muted-foreground">{card.body}</p>
                </div>
            {/each}
        </div>
    </div>
</section>

<!-- 3. Membership Tiers -->
<section class="bg-muted/20 py-24 lg:py-36">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="mb-16 text-center">
            <p class="editorial-label mb-4" use:animate={{ type: 'fadeUp', delay: 0.1 }}>Tiers</p>
            <h2 class="editorial-heading text-4xl font-semibold text-foreground sm:text-5xl" use:animate={{ type: 'fadeUp', delay: 0.2 }}>
                Choose your level of access
            </h2>
        </div>
        <div class="grid grid-cols-1 gap-6 md:grid-cols-3" use:animate={{ type: 'stagger' }}>
            {#each tiers as tier, i}
                <div class="flex flex-col border border-border/60 bg-background p-8 transition-shadow duration-300 hover:shadow-lg {i === 1 ? 'ring-1 ring-foreground/10' : ''}">
                    <div class="mb-8">
                        <h3 class="text-xl font-semibold text-foreground">{tier.name}</h3>
                        <p class="mt-1 font-serif text-3xl font-light text-foreground/80">{tier.minimum}</p>
                        <p class="mt-1 text-xs text-muted-foreground">minimum investment</p>
                    </div>
                    <ul class="mb-8 flex-1 space-y-3">
                        {#each tier.features as feature}
                            <li class="flex items-start gap-2 text-sm text-muted-foreground">
                                <span class="mt-1 block h-1 w-1 shrink-0 rounded-full bg-foreground/30"></span>
                                {feature}
                            </li>
                        {/each}
                    </ul>
                    <a
                        href="/contact-us"
                        class="inline-flex items-center justify-center border border-foreground px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-foreground hover:text-background"
                    >
                        Inquire Now
                    </a>
                </div>
            {/each}
        </div>
    </div>
</section>

<!-- 4. Full-width Quote -->
<section class="bg-primary py-24 lg:py-36">
    <div class="mx-auto max-w-4xl px-6 text-center lg:px-8">
        <p
            class="editorial-heading text-3xl font-semibold leading-snug text-primary-foreground sm:text-4xl lg:text-5xl"
            use:splitText={{ delay: 0.3 }}
        >
            "Joining the Wealth Club transformed how I approach investing. The access to deal flow and the caliber of fellow members is simply unmatched."
        </p>
        <div class="mt-12" use:animate={{ type: 'fadeUp', delay: 0.6 }}>
            <p class="text-sm font-medium text-primary-foreground/80">Jonathan R. Whitfield</p>
            <p class="mt-1 text-xs text-primary-foreground/40">Premier Member since 2019</p>
        </div>
    </div>
</section>

<!-- 5. Benefits Accordion -->
<section class="py-24 lg:py-36">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="mb-16 max-w-2xl">
            <p class="editorial-label mb-6" use:animate={{ type: 'fadeUp', delay: 0.1 }}>Member Benefits</p>
            <h2
                class="editorial-heading text-4xl font-semibold text-foreground sm:text-5xl"
                use:animate={{ type: 'fadeUp', delay: 0.2 }}
            >
                Everything that comes with membership
            </h2>
        </div>
        <div use:animate={{ type: 'fadeUp', delay: 0.3 }}>
            {#each benefits as b}
                <button
                    class="accordion-row w-full text-left"
                    onclick={() => (activeBenefit = activeBenefit === b.id ? null : b.id)}
                >
                    <span class="text-sm font-medium text-foreground">{b.title}</span>
                    <span class="shrink-0 text-lg font-light text-muted-foreground transition-transform duration-300 {activeBenefit === b.id ? 'rotate-45' : ''}">+</span>
                </button>
                {#if activeBenefit === b.id}
                    <div class="pb-6 pt-2">
                        <p class="max-w-2xl text-sm leading-relaxed text-muted-foreground">{b.desc}</p>
                    </div>
                {/if}
            {/each}
        </div>
    </div>
</section>

<!-- 6. Image + Text: Application Process -->
<section class="py-24 lg:py-36">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <div class="relative aspect-[4/5] overflow-hidden" use:animate={{ type: 'fadeRight', delay: 0.2 }}>
                <img
                    src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=1200"
                    alt="Exclusive member event"
                    class="h-full w-full object-cover"
                    use:heroParallax={0.3}
                />
            </div>
            <div use:animate={{ type: 'fadeLeft', delay: 0.4 }}>
                <p class="editorial-label mb-6">Application Process</p>
                <h2 class="editorial-heading text-3xl font-semibold text-foreground sm:text-4xl">
                    A considered path to membership
                </h2>
                <div class="mt-8 space-y-6 text-sm leading-relaxed text-muted-foreground">
                    <p>
                        Membership in the Wealth Club is extended by invitation or through a formal application process. We carefully review each candidate to ensure alignment with our community's values and investment philosophy.
                    </p>
                    <p>
                        The process begins with a confidential inquiry, followed by a conversation with one of our senior partners. Approved members gain immediate access to our full suite of benefits, events, and investment opportunities.
                    </p>
                    <p>
                        We welcome individuals and families who share our commitment to disciplined, long-term wealth creation and value the power of an exceptional peer network.
                    </p>
                </div>
                <a
                    href="/contact-us"
                    class="mt-10 inline-flex items-center justify-center border border-foreground px-8 py-3.5 text-sm font-medium text-foreground transition-colors hover:bg-foreground hover:text-background"
                >
                    Begin Your Application
                </a>
            </div>
        </div>
    </div>
</section>

<!-- 7. CTA -->
<section class="border-t border-border/40 py-24 lg:py-36">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="grid grid-cols-1 gap-8 md:grid-cols-2 md:items-center">
            <h2
                class="editorial-heading text-3xl font-semibold text-foreground sm:text-4xl"
                use:animate={{ type: 'fadeUp', delay: 0.2 }}
            >
                Apply for Wealth Club membership today.
            </h2>
            <div class="flex flex-col gap-4 sm:flex-row md:justify-end" use:animate={{ type: 'fadeUp', delay: 0.4 }}>
                <a
                    href="/contact-us"
                    class="inline-flex items-center justify-center border border-foreground px-8 py-3.5 text-sm font-medium text-foreground transition-colors hover:bg-foreground hover:text-background"
                >
                    Apply for Membership
                </a>
                <a
                    href="/about"
                    class="inline-flex items-center justify-center px-8 py-3.5 text-sm font-medium text-muted-foreground underline decoration-muted-foreground/40 underline-offset-4 transition-colors hover:text-foreground"
                >
                    Learn More
                </a>
            </div>
        </div>
    </div>
</section>
