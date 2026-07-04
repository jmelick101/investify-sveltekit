<script lang="ts">
    import { animate, splitText, heroParallax, magnetic } from '$lib/gsap';
    import { ArrowRight } from 'lucide-svelte';

    const pipelineStages = [
        { label: 'Discovery', count: 14, color: 'bg-primary/20' },
        { label: 'Pre-Clinical', count: 9, color: 'bg-primary/35' },
        { label: 'Phase I', count: 7, color: 'bg-primary/50' },
        { label: 'Phase II', count: 5, color: 'bg-primary/65' },
        { label: 'Phase III', count: 3, color: 'bg-primary/80' },
        { label: 'Approved', count: 2, color: 'bg-primary' },
    ];

    const focusAreas = [
        { num: '01', title: 'Biotechnology', desc: 'Growth-stage biotech companies developing novel therapeutics, vaccines, and diagnostics targeting significant unmet medical need across oncology, immunology, and rare disease.' },
        { num: '02', title: 'Medical Devices', desc: 'Innovative medtech platforms improving clinical outcomes through minimally invasive procedures, robotic surgery, and next-generation implantable technologies.' },
        { num: '03', title: 'Genomics & Precision Medicine', desc: 'Next-generation sequencing, gene therapy, and personalised medicine platforms reshaping how we diagnose, treat, and prevent disease at the molecular level.' },
        { num: '04', title: 'Digital Health', desc: 'AI-powered diagnostics, remote patient monitoring, and software platforms transforming healthcare delivery, access, and cost efficiency at scale.' },
    ];

    const stats = [
        { value: '$800M', label: 'Deployed' },
        { value: '32', label: 'Companies' },
        { value: '3', label: 'FDA Approvals' },
        { value: '12', label: 'Therapeutic Areas' },
    ];
</script>

<!-- Hero -->
<section class="relative min-h-[80vh] overflow-hidden bg-primary">
    <img
        use:heroParallax={0.4}
        src="https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&q=80&w=1600"
        alt="Pharmaceuticals laboratory"
        class="absolute inset-0 h-full w-full object-cover opacity-40"
    />
    <div class="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-primary/60"></div>
    <div class="relative z-10 flex min-h-[80vh] flex-col justify-between px-6 pb-16 pt-24 lg:px-20">
        <div>
            <nav use:animate={{ type: 'fadeUp', delay: 0.1 }} class="mb-8 flex items-center gap-2 text-xs text-primary-foreground/40">
                <a href="/" class="hover:text-primary-foreground/70 transition-colors">Home</a>
                <span>/</span>
                <span class="text-primary-foreground/70">Pharmaceuticals</span>
            </nav>
            <p use:animate={{ type: 'fadeUp', delay: 0.2 }} class="editorial-label-light mb-6">Portfolio</p>
            <h1 use:splitText={{ delay: 0.4 }} class="editorial-heading max-w-3xl text-5xl font-semibold text-primary-foreground sm:text-6xl lg:text-7xl">
                Investing in the Future of Human Health
            </h1>
        </div>
        <p use:animate={{ type: 'fadeUp', delay: 0.8 }} class="max-w-md text-sm leading-relaxed text-primary-foreground/60">
            Healthcare innovation represents one of the most compelling long-term investment opportunities. We partner with pioneers developing the next generation of life-changing therapies.
        </p>
    </div>
</section>

<!-- Split intro -->
<section class="py-24 lg:py-36">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <div use:animate={{ type: 'reveal' }} class="aspect-[4/3] overflow-hidden">
                <img
                    src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800"
                    alt="Laboratory research"
                    class="h-full w-full object-cover"
                />
            </div>
            <div use:animate={{ type: 'fadeRight', delay: 0.2 }}>
                <p class="editorial-label mb-6">Science-Led Investing</p>
                <h2 class="editorial-heading text-4xl font-semibold text-foreground sm:text-5xl">
                    Deep therapeutic expertise meets institutional rigour
                </h2>
                <div class="mt-8 space-y-6 text-sm leading-relaxed text-muted-foreground">
                    <p class="max-w-md">
                        Our investment team includes former physicians, research scientists, and regulatory specialists who evaluate clinical viability, intellectual property strength, and commercial potential at every stage.
                    </p>
                    <p class="max-w-md">
                        We invest across therapeutic areas and development stages, managing binary trial risk through disciplined portfolio construction and deep scientific due diligence.
                    </p>
                </div>
                <a href="/contact-us" class="mt-8 inline-flex items-center gap-2 text-sm font-medium text-foreground underline underline-offset-4 decoration-muted-foreground hover:decoration-foreground transition-all">
                    Learn about our approach <ArrowRight size={16} class="flex-shrink-0" />
                </a>
            </div>
        </div>
    </div>
</section>

<!-- Pipeline visualization -->
<section class="border-y border-border/40 bg-muted/10 py-24 lg:py-36">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <p use:animate={{ type: 'fadeUp' }} class="editorial-label mb-4">Investment Pipeline</p>
        <h2 use:animate={{ type: 'fadeUp', delay: 0.1 }} class="editorial-heading mb-16 max-w-2xl text-3xl font-semibold text-foreground sm:text-4xl">
            Active portfolio across every stage of development
        </h2>

        <!-- Pipeline track -->
        <div use:animate={{ type: 'stagger', stagger: 0.1 }} class="relative">
            <!-- Connecting line -->
            <div class="absolute left-0 right-0 top-1/2 hidden h-px -translate-y-8 bg-border/60 md:block"></div>

            <div class="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-6">
                {#each pipelineStages as stage, i}
                    <div class="relative flex flex-col items-center text-center">
                        <!-- Stage dot and count -->
                        <div class="relative z-10 mb-4 flex h-16 w-16 items-center justify-center rounded-full border-2 border-primary/30 bg-background transition-all hover:border-primary hover:shadow-lg">
                            <span class="text-xl font-semibold text-foreground">{stage.count}</span>
                        </div>
                        <!-- Stage bar -->
                        <div class="mb-3 h-1.5 w-full rounded-full bg-border/30">
                            <div class="{stage.color} h-full rounded-full" style="width: {Math.round(((i + 1) / pipelineStages.length) * 100)}%"></div>
                        </div>
                        <!-- Label -->
                        <p class="text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground">{stage.label}</p>
                    </div>
                {/each}
            </div>

            <!-- Arrow indicator -->
            <div class="mt-8 flex items-center justify-center gap-2 text-xs text-muted-foreground/60">
                <span class="h-px w-8 bg-muted-foreground/30"></span>
                <span class="uppercase tracking-[0.2em]">Development Progression</span>
                <span class="h-px w-8 bg-muted-foreground/30"></span>
            </div>
        </div>
    </div>
</section>

<!-- Focus areas -->
<section class="py-24 lg:py-36">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <p use:animate={{ type: 'fadeUp' }} class="editorial-label mb-16">Investment Focus Areas</p>
        <div use:animate={{ type: 'stagger', stagger: 0.1 }} class="grid grid-cols-1 gap-10 md:grid-cols-2">
            {#each focusAreas as area}
                <div class="border-l-2 border-primary/30 pl-6 transition-colors hover:border-primary">
                    <span class="text-xs font-medium text-muted-foreground/50">{area.num}</span>
                    <h3 class="mt-1 text-lg font-semibold text-foreground">{area.title}</h3>
                    <p class="mt-3 text-sm leading-relaxed text-muted-foreground">{area.desc}</p>
                </div>
            {/each}
        </div>
    </div>
</section>

<!-- Dark stats + quote -->
<section class="bg-primary py-24 lg:py-36">
    <div class="mx-auto max-w-4xl px-6 lg:px-8 text-center">
        <p use:splitText={{ delay: 0.3 }} class="editorial-heading text-2xl font-semibold text-primary-foreground sm:text-3xl lg:text-4xl">
            "The convergence of biology and technology is creating a once-in-a-generation opportunity to improve human health and generate exceptional returns."
        </p>
        <p use:animate={{ type: 'fadeUp', delay: 0.6 }} class="mt-6 text-xs uppercase tracking-[0.2em] text-primary-foreground/40">
            — Dr. Sarah Chen, Head of Life Sciences
        </p>
    </div>
    <div class="mx-auto mt-20 max-w-5xl px-6 lg:px-8">
        <div use:animate={{ type: 'stagger', stagger: 0.1 }} class="grid grid-cols-2 gap-8 border-t border-primary-foreground/10 pt-12 md:grid-cols-4">
            {#each stats as stat}
                <div class="text-center">
                    <p class="text-3xl font-semibold text-primary-foreground lg:text-4xl">{stat.value}</p>
                    <p class="mt-2 text-xs uppercase tracking-[0.15em] text-primary-foreground/40">{stat.label}</p>
                </div>
            {/each}
        </div>
    </div>
</section>

<!-- CTA -->
<section use:animate={{ type: 'fadeUp' }} class="py-24 lg:py-36">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="grid grid-cols-1 gap-8 md:grid-cols-2 md:items-center">
            <h2 class="editorial-heading text-3xl font-semibold text-foreground sm:text-4xl">
                Gain exposure to healthcare's most innovative companies.
            </h2>
            <div class="flex flex-col gap-4 sm:flex-row md:justify-end">
                <a href="/register" class="inline-flex items-center justify-center border border-foreground px-8 py-3.5 text-sm font-medium text-foreground transition-colors hover:bg-foreground hover:text-background">
                    Start Investing
                </a>
                <a href="/contact-us" class="inline-flex items-center justify-center gap-2 px-8 py-3.5 text-sm font-medium text-muted-foreground underline underline-offset-4 decoration-muted-foreground/40 hover:text-foreground transition-colors">
                    Talk to an Advisor
                    <ArrowRight size={16} class="flex-shrink-0" />
                </a>
            </div>
        </div>
    </div>
</section>
