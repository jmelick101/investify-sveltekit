<script lang="ts">
    import { animate, splitText, heroParallax } from '$lib/gsap';
    import { articles } from '$lib/articles';
    import { ArrowRight } from 'lucide-svelte';

    const allCategories = ['All', 'Market Updates', 'Wealth Strategy', 'Global Trends'];
    let activeFilter = $state('All');
    let showAll = $state(false);

    let filteredArticles = $derived(activeFilter === 'All' ? articles : articles.filter((a) => a.category === activeFilter));
    let displayedArticles = $derived(showAll ? filteredArticles : filteredArticles.slice(0, 4));

    function setFilter(category) {
        activeFilter = category;
        showAll = false;
    }
</script>

<!-- Hero -->
<section class="relative min-h-[50vh] overflow-hidden bg-primary">
    <img use:heroParallax={0.3} src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1600" alt="Market data" class="absolute inset-0 h-full w-full object-cover opacity-40" />
    <div class="absolute inset-0 bg-gradient-to-b from-primary/30 via-primary/50 to-primary/70"></div>
    <div class="relative z-10 flex min-h-[50vh] flex-col justify-between px-6 pb-16 pt-24 lg:px-20">
        <div class="max-w-3xl">
            <p use:animate={{ type: 'fadeUp', delay: 0.2 }} class="editorial-label-light mb-6">Thought Leadership</p>
            <h1 use:splitText={{ delay: 0.4 }} class="editorial-heading text-5xl font-semibold text-primary-foreground sm:text-6xl lg:text-7xl">
                News &amp; Insights
            </h1>
        </div>
        <p use:animate={{ type: 'fadeUp', delay: 0.8 }} class="max-w-md text-sm leading-relaxed text-primary-foreground/60">
            Curated market intelligence, strategic wealth planning guides, and updates from our global network.
        </p>
    </div>
</section>

<!-- Filter tabs + articles -->
<section class="py-24 lg:py-36">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <!-- Filter tabs -->
        <div class="mb-16 flex gap-8 border-b border-border/40 pb-0">
            {#each allCategories as category}
                <button
                    onclick={() => setFilter(category)}
                    class="pb-4 text-sm font-medium transition-colors border-b-2 {activeFilter === category
                        ? 'border-foreground text-foreground'
                        : 'border-transparent text-muted-foreground hover:text-foreground'}"
                >
                    {category}
                </button>
            {/each}
        </div>

        <!-- Featured first article -->
        {#if displayedArticles.length > 0}
            {@const featured = displayedArticles[0]}
            <article use:animate={{ type: 'fadeUp' }} class="group mb-16 grid grid-cols-1 gap-8 border-b border-border/40 pb-16 lg:grid-cols-2">
                <a href={`/news-and-insights/${featured.id}`} class="block aspect-[16/10] overflow-hidden">
                    <img
                        src={featured.image}
                        alt={featured.title}
                        class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                </a>
                <div class="flex flex-col justify-center">
                    <p class="editorial-label mb-4">{featured.category}</p>
                    <a href={`/news-and-insights/${featured.id}`}>
                        <h2 class="editorial-heading text-3xl font-semibold text-foreground sm:text-4xl hover:text-primary transition-colors">{featured.title}</h2>
                    </a>
                    <p class="mt-4 text-sm leading-relaxed text-muted-foreground">{featured.excerpt}</p>
                    <div class="mt-6 flex items-center gap-4 text-xs text-muted-foreground">
                        <span>{featured.date}</span>
                        <span>·</span>
                        <span>{featured.readTime}</span>
                        <span>·</span>
                        <span>{featured.author}</span>
                    </div>
                    <a href={`/news-and-insights/${featured.id}`} class="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-foreground underline underline-offset-4 decoration-muted-foreground hover:decoration-foreground transition-all">
                        Learn more
                        <ArrowRight size={16} class="flex-shrink-0" />
                    </a>
                </div>
            </article>
        {/if}

        <!-- Remaining articles: 3-col grid -->
        {#if displayedArticles.length > 1}
            <div use:animate={{ type: 'stagger', stagger: 0.12 }} class="grid gap-10 md:grid-cols-3">
                {#each displayedArticles.slice(1) as article (article.id)}
                    <a href={`/news-and-insights/${article.id}`} class="group block">
                        <div class="aspect-[16/10] overflow-hidden">
                            <img
                                src={article.image}
                                alt={article.title}
                                class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                        </div>
                        <div class="mt-5">
                            <p class="editorial-label mb-2">{article.category}</p>
                            <h3 class="text-base font-semibold text-foreground transition-colors group-hover:text-primary">{article.title}</h3>
                            <p class="mt-2 text-sm leading-relaxed text-muted-foreground line-clamp-2">{article.excerpt}</p>
                            <div class="mt-4 flex items-center gap-3 text-xs text-muted-foreground">
                                <span>{article.date}</span>
                                <span>·</span>
                                <span>{article.readTime}</span>
                            </div>
                        </div>
                    </a>
                {/each}
            </div>
        {/if}

        <!-- Load more -->
        {#if filteredArticles.length > 4 && !showAll}
            <div class="mt-16 text-center">
                <button
                    onclick={() => (showAll = true)}
                    class="inline-flex items-center gap-1.5 text-sm font-medium text-foreground underline underline-offset-4 decoration-muted-foreground hover:decoration-foreground transition-all"
                >
                    Load more
                    <ArrowRight size={16} class="flex-shrink-0" />
                </button>
            </div>
        {/if}
    </div>
</section>
