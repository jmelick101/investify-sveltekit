<script lang="ts">
    import { siteSettings } from '$lib/stores/site.svelte';
    import { Loader, ArrowRight } from 'lucide-svelte';
    import { toast } from 'svelte-sonner';
    import { animate, splitText, heroParallax, magnetic } from '$lib/utils/gsap';

    let coordinates = $state({
        latitude: '40.7058',
        longitude: '-74.0093',
    });

    let form = $state({
        firstName: '',
        lastName: '',
        email: '',
        interest: 'General Inquiry',
        message: '',
    });

    let processing = $state(false);

    function submit(e) {
        e.preventDefault();
        processing = true;
        setTimeout(() => {
            processing = false;
            toast.success('Message sent successfully!');
            form = {
                firstName: '',
                lastName: '',
                email: '',
                interest: 'General Inquiry',
                message: '',
            };
        }, 1000);
    }
</script>

<!-- Hero -->
<section class="relative min-h-[50vh] overflow-hidden bg-primary">
    <img
        use:heroParallax={0.3}
        src="https://images.unsplash.com/photo-1464082354059-27db6ce50048?auto=format&fit=crop&q=80&w=1600"
        alt="London office building"
        class="absolute inset-0 h-full w-full object-cover opacity-40"
    />
    <div class="absolute inset-0 bg-gradient-to-b from-primary/30 via-primary/50 to-primary/70"></div>
    <div class="relative z-10 flex min-h-[50vh] flex-col justify-between px-6 pb-16 pt-24 lg:px-20">
        <div class="max-w-3xl">
            <p use:animate={{ type: 'fadeUp', delay: 0.2 }} class="editorial-label-light mb-6">Contact</p>
            <h1 use:splitText={{ delay: 0.4 }} class="editorial-heading text-5xl font-semibold text-primary-foreground sm:text-6xl lg:text-7xl">
                Start the Conversation
            </h1>
        </div>
        <p use:animate={{ type: 'fadeUp', delay: 0.8 }} class="max-w-md text-sm leading-relaxed text-primary-foreground/60">
            Whether you're looking to protect your wealth, explore new investment opportunities, or plan for future generations, we're here to help.
        </p>
    </div>
</section>

<!-- Main content: info left, form right -->
<section class="py-24 lg:py-36">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="grid grid-cols-1 gap-16 lg:grid-cols-2">
            <!-- Left: Contact Info + Map -->
            <div use:animate={{ type: 'fadeLeft' }}>
                <p class="editorial-label mb-10">Get in Touch</p>

                <div class="space-y-8">
                    {#each [
                        { label: 'Headquarters', value: '100 Financial District Blvd, Suite 4500, New York, NY 10005', sub: null },
                        { label: 'Phone', value: siteSettings.phone, sub: 'Mon–Fri, 9am–6pm EST' },
                        { label: 'Email', value: siteSettings.email, sub: 'We typically reply within 24 hours' },
                    ] as item}
                        <div class="border-t border-border/40 pt-5">
                            <p class="text-xs uppercase tracking-[0.15em] text-muted-foreground">{item.label}</p>
                            <p class="mt-2 text-sm text-foreground">{item.value}</p>
                            {#if item.sub}
                                <p class="mt-1 text-xs text-muted-foreground">{item.sub}</p>
                            {/if}
                        </div>
                    {/each}
                </div>

                <!-- Map -->
                <div class="mt-12 overflow-hidden border border-border/40" style="height: 260px;">
                    <iframe
                        title="Map Location"
                        width="100%"
                        height="100%"
                        frameborder="0"
                        scrolling="no"
                        marginheight="0"
                        marginwidth="0"
                        src="https://www.openstreetmap.org/export/embed.html?bbox=-74.0293%2C40.6858%2C-73.9893%2C40.7258&amp;layer=mapnik&amp;marker={coordinates.latitude}%2C{coordinates.longitude}"
                        class="w-full h-full grayscale"
                    ></iframe>
                </div>
            </div>

            <!-- Right: Form -->
            <div use:animate={{ type: 'fadeRight', delay: 0.2 }}>
                <p class="editorial-label mb-10">Send a Message</p>

                <form onsubmit={submit} class="space-y-8">
                    <div class="grid grid-cols-2 gap-6">
                        <div>
                            <label class="block text-xs text-muted-foreground mb-2" for="firstName">First Name</label>
                            <input
                                bind:value={form.firstName}
                                class="w-full border-b border-border bg-transparent pb-3 text-sm text-foreground placeholder-muted-foreground/40 focus:border-foreground focus:outline-none transition-colors"
                                id="firstName"
                                placeholder="Jane"
                                type="text"
                            />
                        </div>
                        <div>
                            <label class="block text-xs text-muted-foreground mb-2" for="lastName">Last Name</label>
                            <input
                                bind:value={form.lastName}
                                class="w-full border-b border-border bg-transparent pb-3 text-sm text-foreground placeholder-muted-foreground/40 focus:border-foreground focus:outline-none transition-colors"
                                id="lastName"
                                placeholder="Doe"
                                type="text"
                            />
                        </div>
                    </div>
                    <div>
                        <label class="block text-xs text-muted-foreground mb-2" for="email">Email Address</label>
                        <input
                            bind:value={form.email}
                            class="w-full border-b border-border bg-transparent pb-3 text-sm text-foreground placeholder-muted-foreground/40 focus:border-foreground focus:outline-none transition-colors"
                            id="email"
                            placeholder="jane@example.com"
                            type="email"
                        />
                    </div>
                    <div>
                        <label class="block text-xs text-muted-foreground mb-2" for="subject">Area of Interest</label>
                        <select
                            bind:value={form.interest}
                            class="w-full border-b border-border bg-transparent pb-3 text-sm text-foreground focus:border-foreground focus:outline-none transition-colors"
                            id="subject"
                        >
                            <option>General Inquiry</option>
                            <option>Wealth Management</option>
                            <option>Investment Strategy</option>
                            <option>Real Estate</option>
                            <option>Partnership</option>
                        </select>
                    </div>
                    <div>
                        <label class="block text-xs text-muted-foreground mb-2" for="message">Message</label>
                        <textarea
                            bind:value={form.message}
                            class="w-full border-b border-border bg-transparent pb-3 text-sm text-foreground placeholder-muted-foreground/40 focus:border-foreground focus:outline-none transition-colors resize-none"
                            id="message"
                            placeholder="How can we help you?"
                            rows="4"
                        ></textarea>
                    </div>

                    <div class="pt-2">
                        <button
                            class="inline-flex items-center gap-2 text-sm font-medium text-foreground underline underline-offset-4 decoration-muted-foreground hover:decoration-foreground transition-all disabled:opacity-50"
                            type="submit"
                            disabled={processing}
                        >
                            {#if processing}
                                <Loader class="h-4 w-4 animate-spin" />
                                Sending...
                            {:else}
                                Send a request <ArrowRight size={16} class="flex-shrink-0" />
                            {/if}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</section>
