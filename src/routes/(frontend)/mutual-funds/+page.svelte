<script lang="ts">
    import { animate, heroParallax } from '$lib/gsap';

    let activeItem = $state<string | null>(null);

    const funds = [
        {
            name: 'Global Growth',
            risk: 4,
            minInvestment: '$5,000',
            returnTarget: '10–14%',
            expenseRatio: '0.72%',
            desc: 'High-conviction global equity fund targeting long-term capital appreciation through quality growth companies across developed markets.',
            color: 'bg-emerald-500',
        },
        {
            name: 'Multi-Asset Income',
            risk: 3,
            minInvestment: '$2,500',
            returnTarget: '5–7%',
            expenseRatio: '0.58%',
            desc: 'Balanced portfolio of equities, bonds, and alternatives targeting stable annual income distribution with moderate growth.',
            color: 'bg-sky-500',
        },
        {
            name: 'Conservative Balanced',
            risk: 2,
            minInvestment: '$1,000',
            returnTarget: '3–5%',
            expenseRatio: '0.45%',
            desc: 'Risk-managed allocation with capital preservation as primary objective, suitable for income-oriented and near-retirement investors.',
            color: 'bg-amber-500',
        },
        {
            name: 'Emerging Markets',
            risk: 5,
            minInvestment: '$10,000',
            returnTarget: '12–18%',
            expenseRatio: '0.89%',
            desc: 'Diversified exposure to high-growth emerging market economies with active country selection and currency management.',
            color: 'bg-rose-500',
        },
    ];

    const riskLabels = ['', 'Very Low', 'Low', 'Moderate', 'High', 'Very High'];

    const faqs = [
        {
            id: 'what',
            q: 'What is a mutual fund?',
            a: 'A mutual fund pools money from many investors to purchase a diversified portfolio of stocks, bonds, or other securities. Professional fund managers make the investment decisions on behalf of all shareholders, offering expertise and diversification that would be difficult to achieve individually.',
        },
        {
            id: 'min',
            q: 'What is the minimum investment required?',
            a: 'Minimum investments vary by fund. Our Conservative Balanced fund starts at just $1,000, while our Emerging Markets fund requires a $10,000 minimum. We offer systematic investment plans that allow you to build toward these minimums over time.',
        },
        {
            id: 'fees',
            q: 'How are fees structured?',
            a: 'Each fund charges an annual expense ratio that covers management fees, administration, and operating costs. There are no front-end or back-end loads on any of our funds. The expense ratio is deducted directly from fund assets and reflected in the daily NAV.',
        },
        {
            id: 'redeem',
            q: 'How quickly can I redeem my investment?',
            a: 'All of our funds offer T+2 settlement, meaning redemption proceeds are typically available within two business days of your request. There are no lock-up periods or early redemption penalties on any of our core fund range.',
        },
        {
            id: 'tax',
            q: 'What are the tax implications?',
            a: 'Mutual fund distributions — including dividends, interest, and capital gains — are generally taxable in the year they are received. We provide detailed annual tax statements and work with tax advisors to structure distributions efficiently. Tax-advantaged account options are also available.',
        },
    ];

    const chartPoints = [
        { year: 0, growth: 10000, income: 10000, balanced: 10000, emerging: 10000 },
        { year: 1, growth: 11200, income: 10600, balanced: 10400, emerging: 11500 },
        { year: 2, growth: 12540, income: 11230, balanced: 10810, emerging: 12800 },
        { year: 3, growth: 13800, income: 11900, balanced: 11240, emerging: 14200 },
        { year: 4, growth: 15400, income: 12610, balanced: 11690, emerging: 13900 },
        { year: 5, growth: 17100, income: 13370, balanced: 12160, emerging: 16500 },
        { year: 6, growth: 18900, income: 14170, balanced: 12650, emerging: 18700 },
        { year: 7, growth: 21000, income: 15020, balanced: 13150, emerging: 21200 },
        { year: 8, growth: 23200, income: 15920, balanced: 13680, emerging: 23800 },
        { year: 9, growth: 25700, income: 16880, balanced: 14230, emerging: 27000 },
        { year: 10, growth: 28500, income: 17890, balanced: 14800, emerging: 30500 },
    ];

    const chartWidth = 720;
    const chartHeight = 320;
    const padLeft = 50;
    const padRight = 20;
    const padTop = 20;
    const padBottom = 40;
    const plotW = chartWidth - padLeft - padRight;
    const plotH = chartHeight - padTop - padBottom;
    const maxVal = 32000;
    const minVal = 8000;

    function toX(year: number) {
        return padLeft + (year / 10) * plotW;
    }

    function toY(val: number) {
        return padTop + plotH - ((val - minVal) / (maxVal - minVal)) * plotH;
    }

    function makePath(key: 'growth' | 'income' | 'balanced' | 'emerging') {
        return chartPoints.map((p, i) => `${i === 0 ? 'M' : 'L'}${toX(p.year)},${toY(p[key])}`).join(' ');
    }

    function makeArea(key: 'growth' | 'income' | 'balanced' | 'emerging') {
        const line = chartPoints.map((p, i) => `${i === 0 ? 'M' : 'L'}${toX(p.year)},${toY(p[key])}`).join(' ');
        return `${line} L${toX(10)},${toY(minVal)} L${toX(0)},${toY(minVal)} Z`;
    }
</script>

<!-- Hero -->
<section class="relative min-h-[70vh] overflow-hidden bg-primary">
    <img
        src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=1600"
        alt="Fund management"
        class="absolute inset-0 h-full w-full object-cover opacity-40 mix-blend-luminosity"
        use:heroParallax={0.4}
    />
    <div class="absolute inset-0 bg-primary/60"></div>
    <div class="relative z-10 flex min-h-[70vh] flex-col justify-between px-6 pb-16 pt-24 lg:px-20">
        <div>
            <nav class="mb-8 flex items-center gap-2 text-xs text-primary-foreground/40">
                <a href="/" class="hover:text-primary-foreground/70 transition-colors">Home</a>
                <span>/</span>
                <span class="text-primary-foreground/70">Mutual Funds</span>
            </nav>
            <p class="editorial-label-light mb-6">Verticals</p>
            <h1 class="editorial-heading max-w-3xl text-5xl font-semibold text-primary-foreground sm:text-6xl lg:text-7xl">
                Diversified Growth Through Expert Management
            </h1>
        </div>
        <div class="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <p class="max-w-md text-sm leading-relaxed text-primary-foreground/60" use:animate={{ type: 'fadeUp', delay: 0.3 }}>
                Our mutual fund range offers institutional-quality portfolio management in accessible, liquid vehicles — democratising sophisticated investment strategies.
            </p>
            <div class="flex gap-12 text-right" use:animate={{ type: 'fadeUp', delay: 0.5 }}>
                <div>
                    <p class="text-2xl font-semibold text-primary-foreground">4</p>
                    <p class="text-xs text-primary-foreground/40">Core Strategies</p>
                </div>
                <div>
                    <p class="text-2xl font-semibold text-primary-foreground">T+2</p>
                    <p class="text-xs text-primary-foreground/40">Settlement</p>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Centered Intro -->
<section class="py-24 lg:py-36">
    <div class="mx-auto max-w-3xl px-6 text-center lg:px-8">
        <h2 class="editorial-heading text-4xl font-semibold text-foreground sm:text-5xl" use:animate={{ type: 'fadeUp', delay: 0.2 }}>
            Institutional strategies, accessible to all investors
        </h2>
        <p class="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-muted-foreground" use:animate={{ type: 'fadeUp', delay: 0.35 }}>
            Our funds combine the rigour of institutional portfolio management with the simplicity individual investors need. Each strategy is built on deep research, disciplined risk management, and a commitment to long-term value creation.
        </p>
        <div class="mt-10 flex flex-wrap items-center justify-center gap-3" use:animate={{ type: 'fadeUp', delay: 0.5 }}>
            {#each ['Professional Management', 'Built-in Diversification', 'Accessible Minimums'] as pill}
                <span class="rounded-full border border-border/60 px-5 py-2 text-sm font-medium text-foreground">
                    {pill}
                </span>
            {/each}
        </div>
    </div>
</section>

<!-- Fund Comparison Cards -->
<section class="border-t border-border/40 py-24 lg:py-36">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <p class="editorial-label mb-6" use:animate={{ type: 'fadeUp', delay: 0.1 }}>Our Fund Range</p>
        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4" use:animate={{ type: 'stagger' }}>
            {#each funds as fund}
                <div class="group flex flex-col border border-border/40 p-6 transition-all duration-300 hover:border-foreground/20 hover:shadow-lg">
                    <h3 class="text-lg font-semibold text-foreground">{fund.name}</h3>

                    <!-- Risk Level -->
                    <div class="mt-4">
                        <div class="flex items-center justify-between text-xs text-muted-foreground">
                            <span>Risk Level</span>
                            <span class="font-medium text-foreground">{riskLabels[fund.risk]}</span>
                        </div>
                        <div class="mt-1.5 flex gap-1">
                            {#each Array(5) as _, i}
                                <div class="h-1.5 flex-1 rounded-full {i < fund.risk ? fund.color : 'bg-muted/40'}"></div>
                            {/each}
                        </div>
                    </div>

                    <!-- Stats -->
                    <div class="mt-6 space-y-3 border-t border-border/30 pt-4">
                        <div class="flex items-center justify-between text-sm">
                            <span class="text-muted-foreground">Min. Investment</span>
                            <span class="font-medium text-foreground">{fund.minInvestment}</span>
                        </div>
                        <div class="flex items-center justify-between text-sm">
                            <span class="text-muted-foreground">Return Target</span>
                            <span class="font-medium text-foreground">{fund.returnTarget}</span>
                        </div>
                        <div class="flex items-center justify-between text-sm">
                            <span class="text-muted-foreground">Expense Ratio</span>
                            <span class="font-medium text-foreground">{fund.expenseRatio}</span>
                        </div>
                    </div>

                    <!-- Description -->
                    <p class="mt-5 flex-1 text-sm leading-relaxed text-muted-foreground">
                        {fund.desc}
                    </p>

                    <!-- Link -->
                    <a href="/contact-us" class="mt-6 inline-flex items-center text-sm font-medium text-foreground transition-colors group-hover:underline underline-offset-4">
                        Learn more <span class="ml-1 transition-transform duration-200 group-hover:translate-x-1">&rarr;</span>
                    </a>
                </div>
            {/each}
        </div>
    </div>
</section>

<!-- Performance Chart -->
<section class="bg-primary py-24 lg:py-36">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <p class="editorial-label-light mb-6" use:animate={{ type: 'fadeUp', delay: 0.1 }}>Performance</p>
        <h2 class="editorial-heading mb-12 max-w-2xl text-4xl font-semibold text-primary-foreground sm:text-5xl" use:animate={{ type: 'fadeUp', delay: 0.2 }}>
            Fund Performance
        </h2>

        <div class="overflow-x-auto" use:animate={{ type: 'fadeUp', delay: 0.35 }}>
            <svg viewBox="0 0 {chartWidth} {chartHeight}" class="mx-auto w-full max-w-4xl" preserveAspectRatio="xMidYMid meet">
                <!-- Grid lines -->
                {#each [10000, 15000, 20000, 25000, 30000] as tick}
                    <line
                        x1={padLeft}
                        y1={toY(tick)}
                        x2={chartWidth - padRight}
                        y2={toY(tick)}
                        stroke="rgba(255,255,255,0.08)"
                        stroke-width="1"
                    />
                    <text
                        x={padLeft - 8}
                        y={toY(tick) + 4}
                        text-anchor="end"
                        fill="rgba(255,255,255,0.35)"
                        font-size="10"
                    >
                        ${(tick / 1000).toFixed(0)}K
                    </text>
                {/each}

                <!-- Year labels -->
                {#each [0, 2, 4, 6, 8, 10] as year}
                    <text
                        x={toX(year)}
                        y={chartHeight - 10}
                        text-anchor="middle"
                        fill="rgba(255,255,255,0.35)"
                        font-size="10"
                    >
                        Yr {year}
                    </text>
                {/each}

                <!-- Area fills -->
                <path d={makeArea('emerging')} fill="rgba(244,63,94,0.08)" />
                <path d={makeArea('growth')} fill="rgba(16,185,129,0.08)" />
                <path d={makeArea('income')} fill="rgba(56,189,248,0.06)" />

                <!-- Lines -->
                <path d={makePath('emerging')} fill="none" stroke="rgba(244,63,94,0.7)" stroke-width="2" />
                <path d={makePath('growth')} fill="none" stroke="rgba(16,185,129,0.9)" stroke-width="2" />
                <path d={makePath('income')} fill="none" stroke="rgba(56,189,248,0.7)" stroke-width="2" />
                <path d={makePath('balanced')} fill="none" stroke="rgba(245,158,11,0.7)" stroke-width="2" />

                <!-- End labels -->
                <text x={toX(10) + 6} y={toY(30500) + 4} fill="rgba(244,63,94,0.9)" font-size="10" font-weight="500">Emerging</text>
                <text x={toX(10) + 6} y={toY(28500) + 4} fill="rgba(16,185,129,0.9)" font-size="10" font-weight="500">Growth</text>
                <text x={toX(10) + 6} y={toY(17890) + 4} fill="rgba(56,189,248,0.9)" font-size="10" font-weight="500">Income</text>
                <text x={toX(10) + 6} y={toY(14800) + 4} fill="rgba(245,158,11,0.9)" font-size="10" font-weight="500">Balanced</text>
            </svg>
        </div>

        <p class="mt-4 text-center text-xs text-primary-foreground/30">
            Hypothetical growth of $10,000 — past performance does not guarantee future results
        </p>

        <div class="mt-12 grid grid-cols-2 gap-8 sm:grid-cols-4" use:animate={{ type: 'stagger' }}>
            <div class="text-center">
                <p class="text-2xl font-semibold text-primary-foreground">$28.5K</p>
                <p class="mt-1 text-xs text-primary-foreground/40">Global Growth (10yr)</p>
            </div>
            <div class="text-center">
                <p class="text-2xl font-semibold text-primary-foreground">$17.9K</p>
                <p class="mt-1 text-xs text-primary-foreground/40">Multi-Asset Income (10yr)</p>
            </div>
            <div class="text-center">
                <p class="text-2xl font-semibold text-primary-foreground">$14.8K</p>
                <p class="mt-1 text-xs text-primary-foreground/40">Conservative Balanced (10yr)</p>
            </div>
            <div class="text-center">
                <p class="text-2xl font-semibold text-primary-foreground">$30.5K</p>
                <p class="mt-1 text-xs text-primary-foreground/40">Emerging Markets (10yr)</p>
            </div>
        </div>
    </div>
</section>

<!-- FAQ Section -->
<section class="py-24 lg:py-36">
    <div class="mx-auto max-w-3xl px-6 lg:px-8">
        <p class="editorial-label mb-6" use:animate={{ type: 'fadeUp', delay: 0.1 }}>Support</p>
        <h2 class="editorial-heading mb-12 text-4xl font-semibold text-foreground sm:text-5xl" use:animate={{ type: 'fadeUp', delay: 0.2 }}>
            Frequently Asked
        </h2>
        <div use:animate={{ type: 'stagger' }}>
            {#each faqs as faq}
                <button
                    class="accordion-row w-full text-left"
                    onclick={() => (activeItem = activeItem === faq.id ? null : faq.id)}
                >
                    <span class="text-sm font-medium text-foreground">{faq.q}</span>
                    <span class="shrink-0 text-lg font-light text-muted-foreground transition-transform duration-300 {activeItem === faq.id ? 'rotate-45' : ''}">+</span>
                </button>
                {#if activeItem === faq.id}
                    <div class="pb-6 pr-12">
                        <p class="text-sm leading-relaxed text-muted-foreground">{faq.a}</p>
                    </div>
                {/if}
            {/each}
        </div>
    </div>
</section>

<!-- CTA -->
<section class="border-t border-border/40 py-24 lg:py-36">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="grid grid-cols-1 gap-8 md:grid-cols-2 md:items-center">
            <h2 class="editorial-heading text-3xl font-semibold text-foreground sm:text-4xl" use:animate={{ type: 'fadeUp', delay: 0.2 }}>
                Start building wealth with our managed funds.
            </h2>
            <div class="flex flex-col gap-4 sm:flex-row md:justify-end" use:animate={{ type: 'fadeUp', delay: 0.4 }}>
                <a href="/register" class="inline-flex items-center justify-center border border-foreground px-8 py-3.5 text-sm font-medium text-foreground transition-colors hover:bg-foreground hover:text-background">
                    Start Investing
                </a>
                <a href="/contact-us" class="inline-flex items-center justify-center px-8 py-3.5 text-sm font-medium text-muted-foreground underline underline-offset-4 decoration-muted-foreground/40 hover:text-foreground transition-colors">
                    Talk to an Advisor &rarr;
                </a>
            </div>
        </div>
    </div>
</section>
