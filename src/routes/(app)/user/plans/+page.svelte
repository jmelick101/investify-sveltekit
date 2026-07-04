<script lang="ts">
    import { Search, Calendar, TrendingUp, Wallet, Clock, Layers, ListFilter, Users, CircleCheck } from 'lucide-svelte';
    import * as Card from '$lib/components/ui/card';
    import { Button } from '$lib/components/ui/button';
    import { Badge } from '$lib/components/ui/badge';
    import * as Accordion from '$lib/components/ui/accordion';
    import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
    import { formatCurrency, formatNumber, timeAgo } from '$lib/utils';
    import * as InputGroup from '$lib/components/ui/input-group/index.js';
    import CalculatorModal from '$lib/components-legacy/user/CalculatorModal.svelte';
    import BuyPlanModal from '$lib/components-legacy/user/BuyPlanModal.svelte';
    import type { PageData } from './$types';

    let { data }: { data: PageData } = $props();

    let searchQuery = $state('');

    const filteredPlans = $derived(
        data.plans.filter(
            (plan) => plan.name.toLowerCase().includes(searchQuery.toLowerCase()) || plan.category.toLowerCase().includes(searchQuery.toLowerCase()),
        ),
    );

    let selectedPlan = $state(null);
    let openModal = $state(false);
</script>

<svelte:head>
    <title>Plans</title>
</svelte:head>

<div class="space-y-6 px-6 py-8">
    <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
            <h1 class="text-2xl font-bold tracking-tight text-foreground">Explore Portfolios</h1>
            <p class="text-muted-foreground mt-1 text-sm">Discover and invest in curated, high-yield wealth management strategies.</p>
        </div>
        <div class="flex items-center gap-3">
            <InputGroup.Root>
                <InputGroup.Input placeholder="Search..." bind:value={searchQuery} />
                <InputGroup.Addon>
                    <Search />
                </InputGroup.Addon>
                <InputGroup.Addon align="inline-end">
                    <DropdownMenu.Root>
                        <DropdownMenu.Trigger>
                            <Button variant="secondary" size="icon" class="size-6 hover:cursor-pointer">
                                <ListFilter class="size-4" />
                            </Button>
                        </DropdownMenu.Trigger>
                        <DropdownMenu.Content align="end" class="w-48">
                            <DropdownMenu.Label>Filter by Category</DropdownMenu.Label>
                            <DropdownMenu.Item class="gap-2" onclick={() => (searchQuery = '')}>
                                <span>All</span>
                            </DropdownMenu.Item>

                            {#each [...new Set(data.plans.map((p) => p.category))] as category}
                                <DropdownMenu.Item class="gap-2" onclick={() => (searchQuery = category)}>
                                    <span>{category}</span>
                                </DropdownMenu.Item>
                            {/each}
                        </DropdownMenu.Content>
                    </DropdownMenu.Root>
                </InputGroup.Addon>
            </InputGroup.Root>
            <CalculatorModal plans={data.plans} />
        </div>
    </div>

    <div class="flex flex-col gap-6 w-full">
        {#each filteredPlans as plan (plan.id)}
            <Card.Root
                class="group relative overflow-hidden border-border/40 bg-card/60 backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:shadow-xl w-full"
            >
                <div
                    class="absolute inset-0 bg-linear-to-b from-primary/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:from-primary/10 pointer-events-none"
                ></div>

                <div class="flex flex-col lg:grid lg:grid-cols-12 h-full">
                    <!-- Left Section: Header & Core Info -->
                    <div class="flex flex-col justify-between p-6 lg:col-span-4 lg:border-r lg:border-border/40 relative z-10">
                        <div>
                            <div class="flex items-start justify-between mb-4">
                                <Badge variant="outline" class="bg-primary/5 text-primary border-primary/20 px-3 py-0.5">
                                    {plan.category}
                                </Badge>
                                {#if plan.recommended}
                                    <Badge variant="secondary" class="bg-purple/10 text-primary border-primary/10">
                                        <span class="mr-1.5 h-1.5 w-1.5 rounded-full bg-primary animate-pulse"></span>
                                        Recommended
                                    </Badge>
                                {/if}
                            </div>
                            <Card.Title class="text-2xl font-bold group-hover:text-primary transition-colors leading-tight mb-2">
                                {plan.name}
                            </Card.Title>
                            <Card.Description class="flex items-center gap-1.5 text-xs font-medium">
                                <Clock class="h-3.5 w-3.5" />
                                Active Plan
                            </Card.Description>
                        </div>

                        <div class="mt-8 space-y-3">
                            <div class="flex items-center justify-between text-sm">
                                <span class="text-muted-foreground flex items-center gap-2.5">
                                    <Calendar class="h-4 w-4 text-primary/60" />
                                    Duration
                                </span>
                                <span class="font-semibold">{plan.duration} Days</span>
                            </div>
                            <div class="flex items-center justify-between text-sm">
                                <span class="text-muted-foreground flex items-center gap-2.5">
                                    <Clock class="h-4 w-4 text-primary/60" />
                                    Payout
                                </span>
                                <span class="font-semibold">{plan.payout.join(', ')}</span>
                            </div>
                            <div class="flex items-center justify-between text-sm">
                                <span class="text-muted-foreground flex items-center gap-2.5">
                                    <Users class="h-4 w-4 text-primary/60" />
                                    Subscribers
                                </span>
                                <span class="font-semibold">{formatNumber(plan.subscribedUsers)}</span>
                            </div>
                        </div>
                    </div>

                    <!-- Middle Section: Financials & Features -->
                    <div class="flex flex-col p-6 lg:col-span-5 lg:border-r lg:border-border/40 relative z-10 bg-muted/5">
                        <div class="grid grid-cols-2 gap-4 mb-8">
                            <div class="rounded-xl bg-background p-4 border border-border/50 shadow-sm">
                                <span
                                    class="text-muted-foreground mb-1.5 flex items-center gap-1.5 text-[10px] uppercase font-bold tracking-widest"
                                >
                                    <Wallet class="h-3.5 w-3.5 text-primary/80" />
                                    Investment
                                </span>
                                <div class="font-bold text-sm lg:text-base tracking-tight whitespace-nowrap">
                                    {formatCurrency(plan.minAmount)} - {formatCurrency(plan.maxAmount)}
                                </div>
                            </div>
                            <div class="rounded-xl bg-primary/5 p-4 border border-primary/20 shadow-sm">
                                <span class="text-primary/80 mb-1.5 flex items-center gap-1.5 text-[10px] uppercase font-bold tracking-widest">
                                    <TrendingUp class="h-3.5 w-3.5" />
                                    Returns
                                </span>
                                <div class="font-bold text-base lg:text-lg tracking-tight text-primary">
                                    {plan.percentMin === plan.percentMax ? `${plan.percentMin}%` : `${plan.percentMin}% - ${plan.percentMax}%`}
                                </div>
                            </div>
                        </div>

                        <div class="space-y-4 flex-1">
                            <h4 class="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Portfolio Features</h4>
                            <ul class="space-y-3">
                                {#each plan.features as feature}
                                    <li class="flex items-start gap-3 text-sm text-foreground/80">
                                        <CircleCheck class="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                                        <span class="leading-snug">{feature}</span>
                                    </li>
                                {/each}
                            </ul>
                        </div>
                    </div>

                    <!-- Right Section: Action & Extras -->
                    <div class="flex flex-col justify-between p-6 lg:col-span-3 relative z-10 bg-background">
                        <div class="mb-4">
                            <Accordion.Root type="single" class="w-full">
                                <Accordion.Item value="referrals" class="border-border/40 border rounded-lg px-3 bg-muted/10">
                                    <Accordion.Trigger
                                        class="py-2.5 hover:no-underline font-bold text-muted-foreground text-xs uppercase tracking-wider"
                                    >
                                        <div class="flex items-center gap-2">
                                            <Layers class="h-3.5 w-3.5 text-primary" />
                                            Referrals
                                        </div>
                                    </Accordion.Trigger>
                                    <Accordion.Content>
                                        <div class="space-y-1.5 pb-1">
                                            {#each plan.referrals as ref}
                                                <div class="flex items-center justify-between text-xs text-foreground/80">
                                                    <span class="flex items-center gap-1.5">
                                                        <span class="h-1 w-1 rounded-full bg-primary/40"></span>
                                                        Level {ref.level}
                                                    </span>
                                                    <span class="font-bold text-primary">{ref.percent}%</span>
                                                </div>
                                            {/each}
                                        </div>
                                    </Accordion.Content>
                                </Accordion.Item>
                            </Accordion.Root>
                        </div>

                        <div class="mt-auto pt-4 lg:border-t border-border/40">
                            <BuyPlanModal
                                data={plan}
                                class="w-full h-12 text-base font-semibold shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5"
                            />
                        </div>
                    </div>
                </div>
            </Card.Root>
        {:else}
            <div class="col-span-full flex flex-col items-center justify-center py-20 text-center animate-in fade-in zoom-in duration-300">
                <div class="rounded-full bg-muted/50 p-6 mb-6 ring-1 ring-border shadow-inner">
                    <Search class="h-10 w-10 text-muted-foreground/50" />
                </div>
                <h3 class="text-xl font-bold tracking-tight">No plans found</h3>
                <p class="text-muted-foreground mt-2 max-w-[250px] mx-auto">We couldn't find any plans matching "{searchQuery}".</p>
                <Button variant="outline" onclick={() => (searchQuery = '')} class="mt-6 rounded-full px-6">Clear Search</Button>
            </div>
        {/each}
    </div>
</div>
