<script lang="ts">
    import { fade, scale } from 'svelte/transition';
    import { quintOut } from 'svelte/easing';
    import { X } from 'lucide-svelte';
    import { Button } from '$lib/components/ui/button';

    interface Props {
        open?: boolean;
        image?: string;
        title?: string;
        body?: string;
        onClose?: () => void;
    }

    let {
        open = false,
        image = '/images/promotion-placeholder.jpg',
        title = 'Special Offer',
        body = "Don't miss out on our latest updates and exclusive offers designed just for you.",
        onClose,
    }: Props = $props();

    function handleClose() {
        if (onClose) {
            onClose();
        }
    }
</script>

{#if open}
    <!-- Backdrop -->
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6" role="dialog" aria-modal="true">
        <div
            class="absolute inset-0 bg-gray-900/60 transition-opacity backdrop-blur-sm"
            transition:fade={{ duration: 200 }}
            onclick={handleClose}
            aria-hidden="true"
        ></div>

        <!-- Modal Panel -->
        <div
            class="relative w-full max-w-3xl transform overflow-hidden rounded-3xl bg-background shadow-2xl transition-all sm:flex"
            transition:scale={{ duration: 300, opacity: 0, start: 0.95, easing: quintOut }}
        >
            <!-- Close Button (Absolute) -->
            <button
                type="button"
                class="absolute right-4 top-4 z-20 flex size-8 items-center justify-center rounded-full bg-background/50 text-foreground backdrop-blur-md transition-colors hover:bg-background/80"
                onclick={handleClose}
            >
                <span class="sr-only">Close</span>
                <X class="size-4" />
            </button>

            <!-- Image Area -->
            {#if image}
                <div class="relative h-56 w-full shrink-0 overflow-hidden sm:h-auto sm:w-2/5">
                    <img src={image} alt={title} class="h-full w-full object-cover transition-transform duration-700 hover:scale-105" />
                    <!-- Creative Gradient Overlay -->
                    <div
                        class="absolute inset-0 bg-linear-to-tr from-primary/80 to-transparent mix-blend-multiply transition-opacity duration-300 pointer-events-none"
                    ></div>
                </div>
            {/if}

            <!-- Content Area -->
            <div class="flex flex-col justify-center p-8 sm:p-12">
                <div class="space-y-4">
                    <div
                        class="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs sm:text-sm font-medium text-primary"
                    >
                        ✨ Exclusive Feature
                    </div>

                    <h3 class="text-3xl font-bold tracking-tight text-foreground">
                        {title}
                    </h3>

                    <p class="text-base sm:text-lg leading-relaxed text-muted-foreground">
                        {body}
                    </p>
                </div>

                <!-- Action Footer -->
                <div class="mt-8 flex items-center justify-start gap-4">
                    <Button type="button" onclick={handleClose} size="lg">Got it, thanks!</Button>
                </div>
            </div>
        </div>
    </div>
{/if}
