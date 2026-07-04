<script lang="ts">

    let visible = $state(false);
    let dismissed = $state(false);

    $effect(() => {
        if (typeof window !== 'undefined') {
            const consent = localStorage.getItem('cookie-consent');
            if (!consent) {
                setTimeout(() => { visible = true; }, 1500);
            }
        }
    });

    function accept() {
        localStorage.setItem('cookie-consent', 'accepted');
        dismissed = true;
        setTimeout(() => { visible = false; }, 400);
    }

    function decline() {
        localStorage.setItem('cookie-consent', 'declined');
        dismissed = true;
        setTimeout(() => { visible = false; }, 400);
    }
</script>

{#if visible}
    <div
        class="fixed bottom-0 left-0 right-0 z-[100] transition-all duration-500 {dismissed ? 'translate-y-full opacity-0' : 'translate-y-0 opacity-100'}"
    >
        <div class="mx-auto max-w-7xl px-6 pb-6 lg:px-8">
            <div class="flex flex-col gap-4 border border-border bg-card p-6 shadow-2xl sm:flex-row sm:items-center sm:justify-between dark:border-border/50">
                <div class="flex-1">
                    <p class="text-sm font-medium text-foreground">We use cookies</p>
                    <p class="mt-1 text-xs leading-relaxed text-muted-foreground">
                        This website uses cookies to ensure you get the best experience. By continuing to browse, you agree to our
                        <a href="/privacy-policy" class="underline underline-offset-2 hover:text-foreground transition-colors">privacy policy</a>.
                    </p>
                </div>
                <div class="flex shrink-0 gap-3">
                    <button
                        onclick={decline}
                        class="px-5 py-2.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground cursor-pointer"
                    >
                        Decline
                    </button>
                    <button
                        onclick={accept}
                        class="border border-foreground bg-foreground px-5 py-2.5 text-xs font-medium text-background transition-all hover:bg-transparent hover:text-foreground cursor-pointer"
                    >
                        Accept All
                    </button>
                </div>
            </div>
        </div>
    </div>
{/if}
