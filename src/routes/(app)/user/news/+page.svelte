<script lang="ts">
    import * as Card from '$lib/components/ui/card';
    import * as Dialog from '$lib/components/ui/dialog';
    import { Button } from '$lib/components/ui/button';
    import { Badge } from '$lib/components/ui/badge';
    import * as Pagination from '$lib/components/ui/pagination/index.js';
    import { Calendar, Share2, X, Search } from 'lucide-svelte';
    import * as InputGroup from '$lib/components/ui/input-group/index.js';
    import type { PageData } from './$types';

    let { data }: { data: PageData } = $props();

    let selectedArticle: any = $state(null);
    let open = $state(false);
    let searchQuery = $state('');

    function openArticle(article: any) {
        selectedArticle = article;
        open = true;
    }

    let filteredArticles = $derived(
        data.newsArticles.filter((article) => {
            const query = searchQuery.toLowerCase();
            return (
                article.title.toLowerCase().includes(query) ||
                article.summary.toLowerCase().includes(query) ||
                article.category.toLowerCase().includes(query)
            );
        }),
    );
</script>

<svelte:head>
    <title>News & Updates | User Dashboard</title>
</svelte:head>

<div class="space-y-6 px-6 py-8">
    <!-- Header Section -->
    <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
            <h1 class="text-xl font-bold">News & Updates</h1>
            <p class="text-muted-foreground mt-1 text-sm">Stay informed with the latest announcements, market insights, and platform updates.</p>
        </div>

        <div class="flex items-center gap-3">
            <!-- Search -->
            <InputGroup.Root>
                <InputGroup.Input placeholder="Search news..." bind:value={searchQuery} />
                <InputGroup.Addon>
                    <Search />
                </InputGroup.Addon>
            </InputGroup.Root>
        </div>
    </div>

    <!-- News Grid -->
    <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {#each filteredArticles as article (article.id)}
            <div class="group h-full">
                <Card.Root
                    class="h-full flex flex-col overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:border-primary/20 hover:-translate-y-1"
                >
                    <!-- Image Container -->
                    <div class="relative h-48 overflow-hidden bg-muted">
                        <img
                            src={article.imageUrl}
                            alt={article.title}
                            class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div class="absolute top-3 left-3">
                            <Badge
                                variant="secondary"
                                class="bg-background/80 backdrop-blur-md shadow-sm text-xs font-medium px-2.5 py-0.5 border-none"
                            >
                                {article.category}
                            </Badge>
                        </div>
                    </div>

                    <Card.Header class="space-y-2 pb-2">
                        <div class="flex items-center justify-between text-xs text-muted-foreground">
                            <div class="flex items-center gap-1.5">
                                <Calendar class="h-3.5 w-3.5" />
                                <span>{article.date}</span>
                            </div>
                        </div>
                        <Card.Title class="text-xl leading-tight line-clamp-2 text-foreground group-hover:text-primary transition-colors">
                            {article.title}
                        </Card.Title>
                    </Card.Header>
 
                    <Card.Content class="flex-grow">
                        <p class="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                            {article.summary}
                        </p>
                    </Card.Content>

                    <Card.Footer class="pt-4 border-t border-border/30 mt-auto">
                        <Button
                            variant="link"
                            size="sm"
                            class="hover:underline cursor-pointer"
                            onclick={() => openArticle(article)}
                        >
                            <span class="text-sm font-medium">Read Article</span>
                        </Button>
                    </Card.Footer>
                </Card.Root>
            </div>
        {/each}
    </div>

    <!-- Pagination -->
    <Pagination.Root count={data.newsArticles.length} page={1} perPage={6} class="justify-end">
        {#snippet children({ pages, currentPage })}
            <Pagination.Content>
                <Pagination.Item>
                    <Pagination.Previous />
                </Pagination.Item>
                {#each pages as page (page.key)}
                    {#if page.type === 'ellipsis'}
                        <Pagination.Item>
                            <Pagination.Ellipsis />
                        </Pagination.Item>
                    {:else}
                        <Pagination.Item>
                            <Pagination.Link {page} isActive={currentPage === page.value}>
                                {page.value}
                            </Pagination.Link>
                        </Pagination.Item>
                    {/if}
                {/each}
                <Pagination.Item>
                    <Pagination.Next />
                </Pagination.Item>
            </Pagination.Content>
        {/snippet}
    </Pagination.Root>
</div>

<!-- Article Detail Dialog -->
<Dialog.Root bind:open>
    <Dialog.Content class="max-w-5xl min-w-5xl max-h-[95vh] overflow-y-auto p-0 gap-0 border-none sm:rounded-2xl">
        {#if selectedArticle}
            <div class="relative h-64 sm:h-96 w-full overflow-hidden">
                <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10"></div>
                <img src={selectedArticle.imageUrl} alt={selectedArticle.title} class="h-full w-full object-cover" />
                <div class="absolute top-4 right-4 z-20">
                    <Button
                        variant="secondary"
                        size="icon"
                        class="h-8 w-8 rounded-full bg-background/20 backdrop-blur-md hover:bg-background/40 border-none text-white"
                        onclick={() => (open = false)}
                    >
                        <X class="h-4 w-4" />
                        <span class="sr-only">Close</span>
                    </Button>
                </div>
                <div class="absolute bottom-0 left-0 right-0 p-6 sm:p-10 z-20">
                    <Badge variant="outline" class="mb-4 text-white border-white/30 bg-black/20 backdrop-blur-md">
                        {selectedArticle.category}
                    </Badge>
                    <h2 class="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-4 text-shadow-sm">
                        {selectedArticle.title}
                    </h2>
                    <div class="flex items-center gap-4 text-white/80 text-sm sm:text-base">
                        <div class="flex items-center gap-2">
                            <Calendar class="h-5 w-5" />
                            <span>{selectedArticle.date}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="p-6 sm:p-10 bg-background">
                <div class="prose prose-sm sm:prose-lg dark:prose-invert max-w-none text-muted-foreground leading-relaxed">
                    {@html selectedArticle.content}
                </div>

                <div class="mt-10 pt-6 border-t flex justify-end">
                    <Button variant="outline" class="gap-2">
                        <Share2 class="h-4 w-4" />
                        Share Article
                    </Button>
                </div>
            </div>
        {/if}
    </Dialog.Content>
</Dialog.Root>

<style>
    .text-shadow-sm {
        text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
    }
</style>
