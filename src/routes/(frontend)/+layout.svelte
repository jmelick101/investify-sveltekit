<script lang="ts">
    import Header from '$lib/components/frontend/Header.svelte';
    import Footer from '$lib/components/frontend/Footer.svelte';
    import CookieConsent from '$lib/components/frontend/CookieConsent.svelte';
    import { Toaster } from 'svelte-sonner';
    import '$lib/styles/frontend.css';

    let { children } = $props();
</script>

<div class="flex min-h-screen flex-col font-display antialiased">
    <Header />

    <main class="flex-1">
        {@render children()}
    </main>

    <Footer />
</div>

<CookieConsent />
<Toaster richColors position="bottom-right" />
