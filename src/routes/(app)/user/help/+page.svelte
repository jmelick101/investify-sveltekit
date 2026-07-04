<script lang="ts">
    import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
    import * as InputGroup from '$lib/components/ui/input-group/index.js';
    import { Search, ListFilter, FileQuestionMark } from 'lucide-svelte';
    import { Button } from '$lib/components/ui/button';
    import * as Pagination from '$lib/components/ui/pagination/index.js';
    import { Badge } from '$lib/components/ui/badge';
    import { linkTransform, formatDateExt } from '$lib/utils';

    const helpData = [
        {
            id: '1212',
            title: 'How to use the platform',
            description: 'Learn how to use the platform',
            category: 'General',
            type: 'help',
            video: 'https://www.youtube.com/watch?v=OJ5o8QZYjMM',
            createdAt: '2026-01-01',
        },
        {
            id: '1213',
            title: 'How to use the platform',
            description: 'Learn how to use the platform',
            category: 'Investment',
            type: 'resource',
            thumbnail: 'https://placehold.co/600x400',
            file: 'https://placehold.co/600x400',
            createdAt: '2026-01-01',
        },
    ];

    let searchQuery = $state('');

    let filteredDocuments = $derived(
        helpData.filter((doc) => {
            const lowerQuery = searchQuery.toLowerCase();
            return (
                doc.category.toLowerCase().includes(lowerQuery) ||
                doc.title.toLowerCase().includes(lowerQuery) ||
                doc.id.toLowerCase().includes(lowerQuery) ||
                doc.description.toLowerCase().includes(lowerQuery) ||
                doc.type.toLowerCase().includes(lowerQuery)
            );
        }),
    );
</script>

<svelte:head>
    <title>Help & Resources</title>
</svelte:head>

<div class="space-y-6 px-6 py-8">
    <!-- Header Section -->
    <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
            <h1 class="text-2xl font-bold tracking-tight text-foreground">Help & Resources</h1>
            <p class="text-muted-foreground mt-1 text-sm">Browse tutorials, guides, and platform resources.</p>
        </div>
        <div class="flex items-center gap-3">
            <!-- Search -->
            <InputGroup.Root>
                <InputGroup.Input placeholder="Search resources..." bind:value={searchQuery} />
                <InputGroup.Addon>
                    <Search class="size-4" />
                </InputGroup.Addon>
                <InputGroup.Addon align="inline-end">
                    <DropdownMenu.Root>
                        <DropdownMenu.Trigger>
                            <Button variant="secondary" size="icon" class="size-6">
                                <ListFilter class="size-4" />
                            </Button>
                        </DropdownMenu.Trigger>
                        <DropdownMenu.Content align="end" class="w-48">
                            <DropdownMenu.Label>Filter by Category</DropdownMenu.Label>
                            <DropdownMenu.Item class="gap-2" onclick={() => (searchQuery = '')}>
                                <span>All</span>
                            </DropdownMenu.Item>

                            {#each [{ value: 'general', label: 'General' }, { value: 'investment', label: 'Investment' }, { value: 'withdrawal', label: 'Withdrawal' }, { value: 'deposit', label: 'Deposit' }, { value: 'support', label: 'Support' }, { value: 'other', label: 'Other' }] as status}
                                <DropdownMenu.Item class="gap-2" onclick={() => (searchQuery = status.value)}>
                                    <span>{status.label}</span>
                                </DropdownMenu.Item>
                            {/each}
                        </DropdownMenu.Content>
                    </DropdownMenu.Root>
                </InputGroup.Addon>
            </InputGroup.Root>
        </div>
    </div>

    {#if filteredDocuments.length > 0}
        <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {#each filteredDocuments as doc (doc.id)}
                <div class="group flex flex-col bg-card rounded-xl border shadow-sm hover:shadow-md transition-all overflow-hidden h-full">
                    <!-- Media container -->
                    <div class="relative w-full aspect-video bg-muted overflow-hidden shrink-0">
                        {#if doc.type === 'help'}
                            <iframe
                                src={linkTransform(doc.video)}
                                title={doc.title}
                                class="h-full w-full object-cover"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowfullscreen
                            ></iframe>
                        {:else if doc.thumbnail}
                            <a href={doc.file} target="_blank" class="w-full h-full block">
                                <img
                                    src={doc.thumbnail}
                                    alt={doc.title}
                                    class="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                            </a>
                        {:else}
                            <div class="w-full h-full flex flex-col items-center justify-center bg-secondary/30 text-muted-foreground">
                                <FileQuestionMark class="size-10 mb-2 opacity-50" />
                                <span class="text-xs uppercase tracking-wider font-semibold">No Preview</span>
                            </div>
                        {/if}

                        <!-- Badge overlay -->
                        <div class="absolute w-full top-3 flex items-center justify-end px-3 select-none pointer-events-none">
                            <Badge
                                variant="outline"
                                class="capitalize backdrop-blur-md shadow-sm border-white/20 {doc.type === 'help'
                                    ? 'bg-green-500/90 text-white dark:bg-green-600/90'
                                    : 'bg-purple-500/90 text-white dark:bg-purple-600/90'}"
                            >
                                {doc.type}
                            </Badge>
                        </div>
                    </div>

                    <!-- Content container -->
                    <div class="flex flex-col p-5 grow">
                        <h3 class="font-semibold text-foreground text-[17px] leading-[1.3] line-clamp-2 mb-2">
                            {#if doc.type === 'help'}
                                {doc.title}
                            {:else}
                                <a href={doc.file} class="hover:text-primary transition-colors underline-offset-4 hover:underline" target="_blank"
                                    >{doc.title}</a
                                >
                            {/if}
                        </h3>

                        <!-- Description (using line-clamp so it doesn't break height) -->
                        <div class="text-muted-foreground text-sm line-clamp-3 mb-5 grow">
                            {@html doc.description}
                        </div>

                        <!-- Footer part -->
                        <div class="mt-auto pt-4 border-t flex items-center justify-between text-xs text-muted-foreground w-full">
                            <span class="bg-secondary/60 text-secondary-foreground font-medium px-2.5 py-1 rounded-md">
                                {doc.category}
                            </span>
                            <span class="font-medium">{formatDateExt(doc.createdAt)}</span>
                        </div>
                    </div>
                </div>
            {/each}
        </div>
    {:else}
        <!-- Empty state -->
        <div class="flex flex-col items-center justify-center py-20 px-4 text-center bg-card rounded-xl border border-dashed shadow-sm">
            <div class="h-14 w-14 rounded-full bg-muted flex items-center justify-center mb-5">
                <FileQuestionMark class="h-7 w-7 text-muted-foreground" />
            </div>
            <h3 class="text-lg font-semibold text-foreground">No resources found</h3>
            <p class="text-muted-foreground mt-2 max-w-sm mx-auto text-sm">
                {#if searchQuery}
                    We couldn't find anything matching "{searchQuery}". Try adjusting your filters or search terms.
                {:else}
                    There are no help resources available at the moment. Please check back later.
                {/if}
            </p>
            {#if searchQuery}
                <Button variant="outline" class="mt-6" onclick={() => (searchQuery = '')}>Clear search</Button>
            {/if}
        </div>
    {/if}

    <Pagination.Root count={30} page={1} class="justify-center mt-8">
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
                    <Pagination.Ellipsis />
                </Pagination.Item>
                <Pagination.Item>
                    <Pagination.Next />
                </Pagination.Item>
            </Pagination.Content>
        {/snippet}
    </Pagination.Root>
</div>
