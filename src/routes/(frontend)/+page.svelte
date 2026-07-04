<script lang="ts">
    import { siteSettings } from '$lib/stores/site.svelte';
    import { animate, splitText, heroParallax, magnetic } from '$lib/utils/gsap';
    import { ArrowRight } from 'lucide-svelte';

    let activeAccordion = $state<string | null>('private-markets');

    const sectors = [
        { id: 'private-markets', title: 'Credit and Equities', desc: 'We invest in lower middle-market companies partnering with exceptional founders and teams across North America and Western Europe.' },
        { id: 'public-markets', title: 'Public Markets', desc: 'Disciplined long/short equity and fixed income strategies with a focus on risk-adjusted returns and capital preservation.' },
        { id: 'real-estate', title: 'Real Estate', desc: 'Premium commercial and residential developments in gateway cities. Direct ownership through institutional-grade vehicles.' },
        { id: 'uncorrelated', title: 'Uncorrelated Strategies', desc: 'Absolute return approaches that generate alpha independent of broad market direction through systematic and discretionary methods.' },
        { id: 'venture', title: 'Venture Capital & Growth Equity', desc: 'Early and growth-stage investments in transformative technology and healthcare businesses alongside leading venture partners.' },
    ];
</script>

<!-- ① Hero — Full screen, dark primary, editorial headline -->
<section class="relative min-h-screen overflow-hidden bg-primary">
    <img
        use:heroParallax={0.4}
        src="https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&q=80&w=1600"
        alt="City aerial"
        class="absolute inset-0 h-full w-full object-cover opacity-40"
    />
    <div class="absolute inset-0 bg-gradient-to-b from-primary/40 via-primary/50 to-primary/80"></div>

    <div class="relative z-10 flex min-h-screen flex-col justify-between px-6 pb-16 pt-24 lg:px-20">
        <div class="max-w-4xl">
            <p use:animate={{ type: 'fadeUp', delay: 0.2 }} class="editorial-label-light mb-6">Regulated Fund Manager</p>
            <h1 use:splitText={{ delay: 0.4 }} class="editorial-heading text-5xl font-semibold text-primary-foreground sm:text-6xl lg:text-7xl xl:text-8xl">
                A Global Fund Manager
            </h1>
        </div>

        <div class="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
            <div use:animate={{ type: 'fadeUp', delay: 0.8 }} class="max-w-sm">
                <p class="text-sm leading-relaxed text-primary-foreground/60">
                    {siteSettings.siteName} is a Regulated Fund Manager that invests in public and private markets across the capital structure.
                </p>
                <a href="/contact-us" class="mt-5 inline-flex items-center gap-2 text-sm font-medium text-primary-foreground underline underline-offset-4 decoration-primary-foreground/40 hover:decoration-primary-foreground transition-all">
                    Get in touch
                    <ArrowRight size={16} class="flex-shrink-0" />
                </a>
            </div>
            <div use:animate={{ type: 'fade', delay: 1 }} class="text-right">
                <p class="text-xs text-primary-foreground/30 uppercase tracking-[0.2em]">London</p>
                <p class="mt-1 font-mono text-xs text-primary-foreground/20">51.5074° N, 0.1278° W</p>
            </div>
        </div>
    </div>
</section>

<!-- ② Statement — Split editorial, white -->
<section class="py-24 lg:py-36">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="grid grid-cols-1 gap-16 lg:grid-cols-[55%_1fr]">
            <div use:animate={{ type: 'fadeLeft' }}>
                <h2 class="editorial-heading text-4xl font-semibold text-foreground sm:text-5xl lg:text-6xl">
                    Generate Long-term capital appreciation with disciplined risk management
                </h2>
            </div>

            <div use:animate={{ type: 'stagger', stagger: 0.15 }} class="space-y-8 pt-2 lg:pt-4">
                {#each [
                    { title: 'Risk-adjusted return', body: 'Our objective is to actively generate alpha, outperforming the market, all the while managing and minimising downside risk.' },
                    { title: 'Long-term investment horizon', body: 'We are not bound by traditional investment cycles. Our mission is to deliver consistent long-term outperformance.' },
                    { title: 'Flexibility and Speed', body: 'Our flexible mandate lets us pivot and capitalise on attractive market opportunities while applying discipline to protect against losses.' },
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

<!-- ③ Full-width image band -->
<section use:animate={{ type: 'reveal' }} class="relative aspect-[21/8] w-full overflow-hidden">
    <img
        use:heroParallax={0.2}
        src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1600"
        alt="Modern office interior"
        class="h-full w-full object-cover"
    />
    <div class="absolute bottom-4 right-6 text-xs text-white/40 uppercase tracking-[0.15em]">
        88 Brook Street, London, W1K 5AY
    </div>
</section>

<!-- ④ What we do — Dark blue, accordion + chart -->
<section class="bg-primary py-24 lg:py-36">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <p use:animate={{ type: 'fadeUp' }} class="editorial-label-light mb-12">(What we do)</p>

        <div class="grid grid-cols-1 gap-16 lg:grid-cols-2">
            <div>
                <h2 use:animate={{ type: 'fadeUp', delay: 0.1 }} class="editorial-heading mb-10 text-4xl font-semibold text-primary-foreground sm:text-5xl">
                    Private Markets
                </h2>

                <div use:animate={{ type: 'stagger', stagger: 0.08 }}>
                    {#each sectors as sector}
                        <button
                            class="accordion-row-light w-full text-left"
                            onclick={() => (activeAccordion = activeAccordion === sector.id ? null : sector.id)}
                        >
                            <span class="text-sm font-medium text-primary-foreground">{sector.title}</span>
                            <span class="shrink-0 text-lg font-light text-primary-foreground/40 transition-transform {activeAccordion === sector.id ? 'rotate-45' : ''}">+</span>
                        </button>
                        {#if activeAccordion === sector.id}
                            <div class="pb-4 pt-2">
                                <p class="text-sm leading-relaxed text-primary-foreground/60">{sector.desc}</p>
                                <a href="/contact-us" class="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-primary-foreground/60 underline underline-offset-4 hover:text-primary-foreground transition-colors">
                                    Get in touch
                                    <ArrowRight size={14} class="flex-shrink-0" />
                                </a>
                            </div>
                        {/if}
                    {/each}
                </div>
            </div>

            <div use:animate={{ type: 'fadeRight', delay: 0.3 }} class="flex items-center justify-center">
                <div class="w-full">
                    <p class="mb-3 text-xs uppercase tracking-[0.15em] text-primary-foreground/30">Portfolio Performance</p>
                    <div class="relative h-56 w-full">
                        <svg class="absolute inset-0 h-full w-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 100">
                            <defs>
                                <linearGradient id="chartGrad" x1="0" x2="0" y1="0" y2="1">
                                    <stop offset="0%" stop-color="white" stop-opacity="0.08"></stop>
                                    <stop offset="100%" stop-color="white" stop-opacity="0"></stop>
                                </linearGradient>
                            </defs>
                            <path d="M0,80 C10,78 20,72 30,65 C40,58 50,48 60,38 C70,30 80,25 90,22 C95,20 98,19 100,18 V100 H0 Z" fill="url(#chartGrad)"></path>
                            <path d="M0,80 C10,78 20,72 30,65 C40,58 50,48 60,38 C70,30 80,25 90,22 C95,20 98,19 100,18" fill="none" stroke="white" stroke-opacity="0.4" stroke-linecap="round" stroke-width="1.5" vector-effect="non-scaling-stroke"></path>
                            <circle cx="100" cy="18" r="3" fill="white" fill-opacity="0.6"></circle>
                        </svg>
                    </div>
                    <div class="mt-6 flex items-end justify-between border-t border-primary-foreground/10 pt-4">
                        <div>
                            <p class="text-2xl font-semibold text-primary-foreground">$4.2B</p>
                            <p class="text-xs text-primary-foreground/40">Assets Under Management</p>
                        </div>
                        <div class="text-right">
                            <p class="text-2xl font-semibold text-primary-foreground">12.4%</p>
                            <p class="text-xs text-primary-foreground/40">Avg. Annual Return</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- ⑤ Selected investments quote -->
<section class="py-24 lg:py-36">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <p use:animate={{ type: 'fadeUp' }} class="editorial-label mb-12 text-center">(Selected investments)</p>
        <p use:splitText class="editorial-heading mx-auto max-w-4xl text-center text-3xl font-semibold text-foreground sm:text-4xl lg:text-5xl">
            We primarily invest in North America and Western Europe and are also open to exploring opportunities in the rest of the world
        </p>
        <div use:animate={{ type: 'fadeUp', delay: 0.4 }} class="mt-10 text-center">
            <a href="/contact-us" class="inline-flex items-center gap-1.5 text-sm font-medium text-foreground underline underline-offset-4 decoration-muted-foreground hover:decoration-foreground transition-all">
                Get in touch
                <ArrowRight size={16} class="flex-shrink-0" />
            </a>
        </div>
    </div>
</section>

<!-- ⑥ Our Investment Portfolio — stats -->
<section class="border-t border-border/40 py-24 lg:py-36">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="grid grid-cols-1 gap-12 lg:grid-cols-[40%_1fr]">
            <div use:animate={{ type: 'fadeUp' }}>
                <p class="editorial-label mb-4">(32 strategies)</p>
                <h2 class="editorial-heading text-4xl font-semibold text-foreground sm:text-5xl">Our Investment Portfolio</h2>
                <p class="mt-6 max-w-xs text-sm leading-relaxed text-muted-foreground">
                    We place a high value on reputation and integrity, aiming to cultivate lasting relationships with founders, family owners, management teams, and co-investors.
                </p>
                <a href="/wealth-management" class="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-foreground underline underline-offset-4 decoration-muted-foreground hover:decoration-foreground transition-all">
                    Go to portfolio
                    <ArrowRight size={16} class="flex-shrink-0" />
                </a>
            </div>

            <div use:animate={{ type: 'stagger', stagger: 0.08 }} class="grid grid-cols-2 gap-6 sm:grid-cols-3">
                {#each [
                    { mark: '$4.2B', label: 'Assets Under Management', sub: 'Venture Markets' },
                    { mark: '12.4%', label: 'Average Annual Return', sub: 'Public Markets' },
                    { mark: '15K+', label: 'Active Investors', sub: 'Public Markets' },
                    { mark: '25+', label: 'Years of Experience', sub: 'Combined' },
                    { mark: '96', label: 'Global Locations', sub: 'Worldwide' },
                    { mark: '1,000+', label: 'Investment Professionals', sub: 'Global Team' },
                ] as stat}
                    <div class="border-t border-border/40 pt-5">
                        <p class="editorial-label mb-2">{stat.sub}</p>
                        <p class="text-2xl font-semibold text-foreground">{stat.mark}</p>
                        <p class="mt-1 text-xs text-muted-foreground">{stat.label}</p>
                    </div>
                {/each}
            </div>
        </div>
    </div>
</section>

<!-- ⑦ Contact CTA — dark blue, form + building photo -->
<section class="bg-primary py-24 lg:py-36">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="grid grid-cols-1 gap-16 lg:grid-cols-2">
            <div use:animate={{ type: 'fadeLeft' }}>
                <h2 class="editorial-heading text-4xl font-semibold text-primary-foreground sm:text-5xl">
                    Cultivate opportunities and contact us for investment guidance and inquiries
                </h2>
                <p class="mt-4 text-sm text-primary-foreground/50">{siteSettings.email}</p>

                <form class="mt-10 space-y-4">
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label class="block text-xs text-primary-foreground/40 mb-1.5">Enter your name</label>
                            <input type="text" class="w-full border-b border-primary-foreground/20 bg-transparent pb-3 text-sm text-primary-foreground placeholder-primary-foreground/30 focus:border-primary-foreground/60 focus:outline-none transition-colors" placeholder="Full name" />
                        </div>
                        <div>
                            <label class="block text-xs text-primary-foreground/40 mb-1.5">Enter your email</label>
                            <input type="email" class="w-full border-b border-primary-foreground/20 bg-transparent pb-3 text-sm text-primary-foreground placeholder-primary-foreground/30 focus:border-primary-foreground/60 focus:outline-none transition-colors" placeholder="Email address" />
                        </div>
                    </div>
                    <div>
                        <label class="block text-xs text-primary-foreground/40 mb-1.5">Enter no.</label>
                        <input type="tel" class="w-full border-b border-primary-foreground/20 bg-transparent pb-3 text-sm text-primary-foreground placeholder-primary-foreground/30 focus:border-primary-foreground/60 focus:outline-none transition-colors" placeholder="Phone number (optional)" />
                    </div>
                    <div class="pt-2">
                        <button use:magnetic={0.15} type="submit" class="inline-flex items-center gap-2 text-sm font-medium text-primary-foreground underline underline-offset-4 decoration-primary-foreground/40 hover:decoration-primary-foreground transition-all">
                            Send a request
                            <ArrowRight size={16} class="flex-shrink-0" />
                        </button>
                    </div>
                </form>
            </div>

            <div use:animate={{ type: 'reveal', delay: 0.2 }} class="relative overflow-hidden">
                <img src="https://images.unsplash.com/photo-1464082354059-27db6ce50048?auto=format&fit=crop&q=80&w=800" alt="London office building" class="h-full w-full object-cover" style="min-height: 320px;" />
                <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-primary/60 to-transparent p-6">
                    <p class="text-xs text-primary-foreground/50 uppercase tracking-[0.15em]">Let's build the next big thing together</p>
                </div>
            </div>
        </div>
    </div>
</section>
