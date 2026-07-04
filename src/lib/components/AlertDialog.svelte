<script>
    import { fly } from 'svelte/transition';

    import { ChevronRight, TriangleAlert, CircleCheck } from 'lucide-svelte';

    let { title, message, additionalContent = undefined, component = undefined, position = 'top-right' } = $props();

    let showAlert = $state(true);
    let isExpanded = $state(false);

    const positionClasses = {
        'top-right': 'top-24 right-6',
        'bottom-right': 'bottom-6 right-6',
        'top-left': 'top-24 left-6',
        'bottom-left': 'bottom-6 left-6',
    };

    const transitionOffset = $derived(position.includes('right') ? 20 : -20);

    let open = $state(false);
    let loading = $state(false);

    function closeAlert() {
        showAlert = false;
    }

    function toggleExpanded() {
        isExpanded = !isExpanded;
    }
</script>

{#if showAlert}
    <div
        class="fixed {positionClasses[position] || positionClasses['top-right']} z-50 max-w-sm"
        in:fly={{ x: transitionOffset, duration: 300 }}
        out:fly={{ x: transitionOffset, duration: 200 }}
    >
        <!-- The main Alert Card -->
        <div
            class="bg-card bg-linear-to-r from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/20 border border-primary/20 dark:border-primary/30 rounded-lg shadow-lg overflow-hidden backdrop-blur-sm"
        >
            <!-- Header with close button -->
            <div class="flex items-center justify-between p-4 pb-2">
                <div class="flex items-center">
                    <div class="flex-shrink-0 mt-0.5">
                        <TriangleAlert class="h-5 w-5 text-primary" />
                    </div>
                    <div class="ml-3">
                        <h3 class="text-sm font-semibold text-primary">{title}</h3>
                    </div>
                </div>
                <button onclick={closeAlert} aria-label="Close" class="text-muted-foreground hover:text-primary transition-colors">
                    <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
            </div>

            <!-- Alert content -->
            <div class="px-4 pb-4">
                <p class="text-sm text-muted-foreground mb-3">
                    {@html message}
                </p>

                {@render component?.()}

                {#if additionalContent}
                    <!-- Action dropdown link -->
                    <div class="flex space-x-2">
                        <button
                            onclick={toggleExpanded}
                            class="text-primary hover:text-primary/80 text-sm cursor-pointer font-medium transition-colors duration-200 flex items-center gap-x-1"
                        >
                            Learn more
                            <ChevronRight class="h-4 w-4" />
                        </button>
                    </div>

                    <!-- Expanded details -->
                    {#if isExpanded}
                        <div
                            class="mt-3 pt-3 border-t border-primary/20 dark:border-primary/30"
                            in:fly={{ y: -8, duration: 200 }}
                            out:fly={{ y: -8, duration: 150 }}
                        >
                            <div class="space-y-2">
                                {@html additionalContent}
                            </div>

                            <!-- <div class="mt-3">
                            <button
                                onclick={() => (open = true)}
                                class="block w-full bg-amber-600 hover:bg-amber-700 text-white text-xs font-medium py-2 px-3 rounded-md text-center transition-colors duration-200"
                            >
                                Activate Account
                            </button>
                        </div> -->
                        </div>
                    {/if}
                {/if}
            </div>
        </div>
    </div>
{/if}
