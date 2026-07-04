<script lang="ts">
    import { animate, splitText, heroParallax } from '$lib/gsap';
    import { ArrowRight } from 'lucide-svelte';
    import { siteSettings } from '$lib/stores/site.svelte';

    let activeItem = $state<string | null>(null);

    const commitments = [
        { id: 'hiring', title: 'Inclusive Hiring', desc: 'Structured hiring processes, diverse interview panels, and partnerships with underrepresented talent pipelines to eliminate bias.' },
        { id: 'leadership', title: 'Leadership Development', desc: 'Mentorship programmes, sponsorship initiatives, and leadership development tracks specifically for underrepresented professionals.' },
        { id: 'culture', title: 'Inclusive Culture', desc: 'Employee resource groups, inclusive policies, and regular culture surveys to ensure all team members feel valued and heard.' },
        { id: 'investing', title: 'Diversity in Investing', desc: 'Preferred allocation to funds and companies led by diverse founders and management teams as part of our investment mandate.' },
    ];

    const stats = [
        { value: '40%', label: 'Women in Senior Roles' },
        { value: '35%', label: 'Underrepresented Groups' },
        { value: '12+', label: 'ERG Chapters' },
        { value: '2027', label: 'Parity Target Year' },
    ];
</script>

<!-- Hero -->
<section class="relative min-h-[80vh] overflow-hidden bg-primary">
    <img
        use:heroParallax={0.4}
        src="https://images.unsplash.com/photo-1531545514256-b1400bc00f31?auto=format&fit=crop&q=80&w=1600"
        alt="Diversity and inclusion"
        class="absolute inset-0 h-full w-full object-cover opacity-40"
    />
    <div class="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/40 to-primary/20"></div>
    <div class="relative z-10 flex min-h-[80vh] flex-col justify-between px-6 pb-16 pt-24 lg:px-20">
        <div>
            <nav use:animate={{ type: 'fadeDown', delay: 0.1 }} class="mb-8 flex items-center gap-2 text-xs text-primary-foreground/40">
                <a href="/" class="hover:text-primary-foreground/70 transition-colors">Home</a>
                <span>/</span>
                <span class="text-primary-foreground/70">Diversity & Inclusion</span>
            </nav>
            <p use:animate={{ type: 'fadeUp', delay: 0.2 }} class="editorial-label-light mb-6">Our Values</p>
            <h1 use:splitText={{ delay: 0.4 }} class="editorial-heading max-w-3xl text-5xl font-semibold text-primary-foreground sm:text-6xl lg:text-7xl">
                Diversity Drives Better Outcomes
            </h1>
        </div>
        <p use:animate={{ type: 'fadeUp', delay: 0.8 }} class="max-w-md text-sm leading-relaxed text-primary-foreground/60">
            Diverse teams make better decisions. We are committed to building an organisation that reflects the world we invest in and the clients we serve.
        </p>
    </div>
</section>

<!-- Stats band -->
<section class="border-y border-border/40">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div use:animate={{ type: 'stagger' }} class="grid grid-cols-2 divide-x divide-y md:grid-cols-4 md:divide-y-0 divide-border/30">
            {#each stats as s}
                <div class="px-8 py-10 text-center">
                    <p class="text-3xl font-semibold text-foreground lg:text-4xl">{s.value}</p>
                    <p class="mt-1 text-xs uppercase tracking-[0.15em] text-muted-foreground">{s.label}</p>
                </div>
            {/each}
        </div>
    </div>
</section>

<!-- Split editorial with large stats -->
<section class="py-24 lg:py-36">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="grid grid-cols-1 gap-16 lg:grid-cols-[55%_1fr]">
            <div use:animate={{ type: 'fadeUp', delay: 0.1 }}>
                <p class="editorial-label mb-6">Our Commitment</p>
                <h2 use:splitText={{ delay: 0.3 }} class="editorial-heading text-4xl font-semibold text-foreground sm:text-5xl">
                    An inclusive firm for an inclusive world
                </h2>
            </div>
            <div use:animate={{ type: 'stagger', stagger: 0.1 }} class="space-y-8 pt-2 lg:pt-12">
                {#each [
                    { stat: '40%', label: 'Women in Senior Roles', body: 'We have achieved 40% female representation at senior leadership level and are targeting 50% by 2027.' },
                    { stat: '35%', label: 'Underrepresented Groups', body: '35% of our workforce identifies from underrepresented ethnic, cultural, or background groups.' },
                    { stat: '12+', label: 'ERG Chapters', body: 'Active employee resource groups spanning gender, ethnicity, LGBTQ+, disability, and socioeconomic background.' },
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

<!-- Full-width image band -->
<section use:animate={{ type: 'reveal' }} class="overflow-hidden">
    <div class="aspect-[21/7]">
        <img
            use:heroParallax={0.3}
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=2000"
            alt="Diverse team collaboration"
            class="h-full w-full object-cover"
        />
    </div>
</section>

<!-- Dark accordion -->
<section class="bg-primary py-24 lg:py-36">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="grid grid-cols-1 gap-16 lg:grid-cols-[40%_1fr]">
            <div use:animate={{ type: 'fadeUp', delay: 0.1 }}>
                <p class="editorial-label-light mb-6">Our Programmes</p>
                <h2 class="editorial-heading text-4xl font-semibold text-primary-foreground sm:text-5xl">
                    How we build a more inclusive firm
                </h2>
            </div>
            <div use:animate={{ type: 'stagger', stagger: 0.08 }}>
                {#each commitments as c}
                    <button class="accordion-row-light w-full text-left" onclick={() => (activeItem = activeItem === c.id ? null : c.id)}>
                        <span class="text-sm font-medium text-primary-foreground">{c.title}</span>
                        <span class="shrink-0 text-lg font-light text-primary-foreground/40 {activeItem === c.id ? 'rotate-45' : ''}">+</span>
                    </button>
                    {#if activeItem === c.id}
                        <p class="pb-4 pt-2 text-sm leading-relaxed text-primary-foreground/60">{c.desc}</p>
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
                Join a firm that champions diversity in all its forms.
            </h2>
            <div use:animate={{ type: 'fadeUp', delay: 0.3 }} class="flex flex-col gap-4 sm:flex-row md:justify-end">
                <a href="/about" class="inline-flex items-center justify-center border border-foreground px-8 py-3.5 text-sm font-medium text-foreground transition-colors hover:bg-foreground hover:text-background">
                    About Us
                </a>
                <a href="/contact-us" class="inline-flex items-center justify-center px-8 py-3.5 text-sm font-medium text-muted-foreground underline underline-offset-4 decoration-muted-foreground/40 hover:text-foreground transition-colors">
                    Contact Us <ArrowRight size={16} class="flex-shrink-0" />
                </a>
            </div>
        </div>
    </div>
</section>
