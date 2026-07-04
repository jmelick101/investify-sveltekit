<script lang="ts">
    import AppContent from '$lib/components/AppContent.svelte';
    import AppShell from '$lib/components/AppShell.svelte';
    import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
    import type { BreadcrumbItemType } from '$lib/types';
    import { Toaster } from 'svelte-sonner';
    import Header from '$lib/components/Header.svelte';
    import Footer from '$lib/components/Footer.svelte';
    import type { LayoutData } from './$types';

    let { data, children }: { data: LayoutData; children?: any } = $props();

    // Breadcrumbs will be passed from child pages via context or props
    let breadcrumbs: BreadcrumbItemType[] = $state([]);

    let showAlert = $state(false);
    let showPromo = $state(false);
    let showSurvey = $state(false);

    let takeover = true;
</script>

<AppShell variant="header">
    <!-- Top Navigation Bar -->
    <div>
        <Header user={data.user} />

        <!-- Breadcrumbs -->
        {#if breadcrumbs.length > 1}
            <div class="flex w-full border-b border-sidebar-border/70">
                <div class="mx-auto flex h-10 w-full items-center justify-start px-4 text-muted-foreground sm:px-6 lg:px-8">
                    <Breadcrumbs {breadcrumbs} />
                </div>
            </div>
        {/if}
    </div>

    <!-- Content -->
    <AppContent variant="header">
        <div class="flex flex-col min-h-screen">
            <div class="flex-1">
                {@render children?.()}
            </div>
            <Footer />
        </div>
    </AppContent>
</AppShell>

{#if takeover && data.user?.role !== 'admin'}
    <div class="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 pointer-events-none">
        <p
            class="animate-pulse rounded-full border border-red-500 bg-red-500/10 px-4 py-2 text-xs font-semibold text-red-500 shadow-lg backdrop-blur-md"
        >
            Takeover Mode Active
        </p>
    </div>
{/if}

<Toaster richColors position="bottom-right" />
