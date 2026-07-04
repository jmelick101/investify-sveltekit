<script lang="ts">
    import { animate, splitText, heroParallax, magnetic } from '$lib/utils/gsap';

    const thesisBlocks = [
        { num: '01', title: 'Lower Middle Market Focus', desc: 'Businesses with £5M-£50M EBITDA represent the most attractive risk-adjusted opportunity in private equity today. Less competition, more operational alpha.' },
        { num: '02', title: 'Operational Transformation', desc: 'We bring hands-on expertise in sales, technology, operations, and talent to drive fundamental business improvement beyond what capital alone achieves.' },
        { num: '03', title: 'Patient Capital Advantage', desc: 'Our flexible mandate allows 5-10+ year hold periods, compounding value without exit pressure and aligning with founder timelines.' },
    ];

    const caseStudies = [
        {
            name: 'TechScale Solutions',
            sector: 'Enterprise Software',
            year: '2019',
            multiple: '3.2x',
            image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
            desc: 'Partnered with founders to scale ARR from £8M to £42M through product expansion and international go-to-market strategy.',
        },
        {
            name: 'MediCore Health',
            sector: 'Healthcare Services',
            year: '2020',
            multiple: '2.8x',
            image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800',
            desc: 'Built a regional healthcare platform through three strategic acquisitions and a centralised technology infrastructure.',
        },
        {
            name: 'GreenBuild Corp',
            sector: 'Sustainable Construction',
            year: '2021',
            multiple: '2.1x',
            image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800',
            desc: 'Supported management in pivoting to net-zero building methods, tripling margins and winning major government contracts.',
        },
    ];

    const processSteps = [
        { num: '01', title: 'Rigorous Selection', desc: 'Less than 2% of reviewed opportunities reach our investment committee. Exhaustive due diligence across financials, management, and market position.' },
        { num: '02', title: 'Active Partnership', desc: 'We sit on boards, contribute operating expertise, and open our network to the businesses we back.' },
        { num: '03', title: 'Value Creation', desc: 'A structured 100-day plan and ongoing operational support to accelerate growth and unlock embedded value.' },
        { num: '04', title: 'Disciplined Exit', desc: 'Exit timing is driven by value maximisation, not fund lifecycle pressure. We are patient capital.' },
    ];
</script>

<!-- 1. Cinematic Hero -->
<section class="relative min-h-screen overflow-hidden bg-primary">
    <img
        use:heroParallax={0.4}
        src="https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&q=80&w=1600"
        alt="Private equity boardroom"
        class="absolute inset-0 h-full w-full object-cover opacity-40"
    />
    <div class="absolute inset-0 bg-gradient-to-t from-primary/60 via-primary/40 to-transparent"></div>
    <div class="relative z-10 flex min-h-screen flex-col justify-between px-6 pb-16 pt-24 lg:px-20">
        <div>
            <nav class="mb-8 flex items-center gap-2 text-xs text-primary-foreground/40" use:animate={{ type: 'fadeDown', delay: 0.1 }}>
                <a href="/" class="transition-colors hover:text-primary-foreground/70">Home</a>
                <span>/</span>
                <span class="text-primary-foreground/70">Private Equity</span>
            </nav>
            <p class="editorial-label-light mb-6" use:animate={{ type: 'fadeUp', delay: 0.2 }}>Portfolio</p>
            <h1
                class="editorial-heading max-w-4xl text-5xl font-semibold text-primary-foreground sm:text-6xl lg:text-8xl"
                use:animate={{ type: 'fadeUp', delay: 0.3 }}
            >
                Unlocking Hidden Value in Private Markets
            </h1>
        </div>
        <div class="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <p class="max-w-md text-sm leading-relaxed text-primary-foreground/60" use:animate={{ type: 'fadeUp', delay: 0.5 }}>
                We invest in lower middle-market companies with exceptional founders, applying operational expertise and patient capital to drive sustained value creation.
            </p>
            <div class="flex gap-12 text-right" use:animate={{ type: 'fadeUp', delay: 0.6 }}>
                <div>
                    <p class="text-3xl font-semibold text-primary-foreground lg:text-4xl">50+</p>
                    <p class="mt-1 text-xs tracking-wide text-primary-foreground/40">Portfolio Companies</p>
                </div>
                <div>
                    <p class="text-3xl font-semibold text-primary-foreground lg:text-4xl">25%</p>
                    <p class="mt-1 text-xs tracking-wide text-primary-foreground/40">Target IRR</p>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- 2. Investment Thesis -->
<section class="py-24 lg:py-36">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="text-center" use:animate={{ type: 'fadeUp', delay: 0.2 }}>
            <p class="editorial-label mb-6">Our Investment Thesis</p>
            <h2 class="editorial-heading mx-auto max-w-3xl text-4xl font-semibold text-foreground sm:text-5xl">
                Patient capital, partnered with exceptional management teams
            </h2>
        </div>
        <div class="mt-20 grid grid-cols-1 gap-12 md:grid-cols-3" use:animate={{ type: 'stagger' }}>
            {#each thesisBlocks as block}
                <div class="group">
                    <span class="text-5xl font-extralight text-muted-foreground/20">{block.num}</span>
                    <h3 class="mt-4 text-lg font-semibold text-foreground">{block.title}</h3>
                    <p class="mt-3 text-sm leading-relaxed text-muted-foreground">{block.desc}</p>
                </div>
            {/each}
        </div>
    </div>
</section>

<!-- 3. Case Studies -->
<section class="border-t border-border/40 py-24 lg:py-36">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <p class="editorial-label mb-12" use:animate={{ type: 'fadeUp', delay: 0.1 }}>Selected Investments</p>
        <div class="grid grid-cols-1 gap-8 md:grid-cols-3" use:animate={{ type: 'stagger' }}>
            {#each caseStudies as study}
                <div class="group">
                    <div class="overflow-hidden">
                        <img
                            src={study.image}
                            alt={study.name}
                            class="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                    </div>
                    <div class="mt-5">
                        <div class="flex items-center gap-3">
                            <h3 class="text-lg font-semibold text-foreground">{study.name}</h3>
                            <span class="rounded-full border border-border/60 px-3 py-0.5 text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
                                {study.sector}
                            </span>
                        </div>
                        <p class="mt-3 text-sm leading-relaxed text-muted-foreground">{study.desc}</p>
                        <div class="mt-5 flex gap-8 border-t border-border/30 pt-4">
                            <div>
                                <p class="text-xs uppercase tracking-wide text-muted-foreground/60">Entry Year</p>
                                <p class="mt-1 text-sm font-semibold text-foreground">{study.year}</p>
                            </div>
                            <div>
                                <p class="text-xs uppercase tracking-wide text-muted-foreground/60">Return Multiple</p>
                                <p class="mt-1 text-sm font-semibold text-foreground">{study.multiple}</p>
                            </div>
                        </div>
                    </div>
                </div>
            {/each}
        </div>
    </div>
</section>

<!-- 4. Process Section -->
<section class="bg-primary py-24 lg:py-36">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <p class="editorial-label-light mb-16" use:animate={{ type: 'fadeUp', delay: 0.1 }}>Investment Approach</p>
        <div class="grid grid-cols-1 gap-px md:grid-cols-4" use:animate={{ type: 'stagger' }}>
            {#each processSteps as step, i}
                <div class="relative px-6 py-2 {i > 0 ? 'md:border-l md:border-primary-foreground/10' : ''}">
                    <span class="text-4xl font-extralight text-primary-foreground/20">{step.num}</span>
                    <h3 class="mt-4 text-base font-semibold text-primary-foreground">{step.title}</h3>
                    <p class="mt-3 text-sm leading-relaxed text-primary-foreground/50">{step.desc}</p>
                </div>
            {/each}
        </div>
    </div>
</section>

<!-- 5. Testimonial Quote -->
<section class="bg-muted/20 py-24 lg:py-36">
    <div class="mx-auto max-w-4xl px-6 text-center lg:px-8">
        <svg class="mx-auto mb-8 h-10 w-10 text-muted-foreground/20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311C9.591 11.69 11 13.166 11 15c0 1.933-1.567 3.5-3.5 3.5-1.293 0-2.43-.654-2.917-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311C19.591 11.69 21 13.166 21 15c0 1.933-1.567 3.5-3.5 3.5-1.293 0-2.43-.654-2.917-1.179z" />
        </svg>
        <blockquote
            class="editorial-heading text-3xl font-semibold leading-snug text-foreground sm:text-4xl lg:text-5xl"
            use:splitText={{ delay: 0.4 }}
        >
            Their operational expertise transformed our business. They didn't just invest capital — they invested time, insight, and network.
        </blockquote>
        <p class="mt-10 text-sm tracking-wide text-muted-foreground" use:animate={{ type: 'fadeUp', delay: 0.8 }}>
            — CEO, Portfolio Company
        </p>
    </div>
</section>

<!-- 6. CTA -->
<section class="py-24 lg:py-36">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="grid grid-cols-1 gap-8 md:grid-cols-2 md:items-center" use:animate={{ type: 'fadeUp', delay: 0.2 }}>
            <h2 class="editorial-heading text-3xl font-semibold text-foreground sm:text-4xl">
                Access private equity returns for your portfolio.
            </h2>
            <div class="flex flex-col gap-4 sm:flex-row md:justify-end">
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
