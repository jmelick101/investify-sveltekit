<script lang="ts">
    import AppShell from '$lib/components/AppShell.svelte';
    import AppContent from '$lib/components/AppContent.svelte';
    import AppSidebarHeader from '$lib/components/AppSidebarHeader.svelte';
    import AdminSidebar from '$lib/components/admin/AdminSidebar.svelte';
    import { Toaster } from 'svelte-sonner';
    import type { LayoutData } from './$types';
    
    let { data, children }: { data: LayoutData, children: any } = $props();
</script>

<AppShell variant="sidebar">
    <AdminSidebar />
    <AppContent variant="sidebar" class="overflow-x-hidden">
        <AppSidebarHeader breadcrumbs={data.breadcrumbs || []} />
        {@render children()}
    </AppContent>
</AppShell>

<Toaster richColors position="bottom-right" />
