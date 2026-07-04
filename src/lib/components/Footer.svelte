<script lang="ts">
    // Link replaced with native <a> tags
    import { SYSTEM } from '$lib/store';
</script>

<footer class="border-t border-border/40 py-6 md:py-0 mt-auto">
    <div class="mx-auto flex h-16 w-full items-center justify-between px-4 sm:px-6 lg:px-8">
        <p class="text-sm leading-loose text-muted-foreground">
            &copy; {new Date().getFullYear()} <a href="/" class="font-medium underline underline-offset-4">{$SYSTEM.siteName}</a>. All rights reserved.
        </p>
        <div class="flex items-center gap-4">
            <Link href="/about" class="text-sm font-medium text-muted-foreground underline underline-offset-4 hover:text-foreground">Any Link You Want</Link>
            <Link href="/about" class="text-sm font-medium text-muted-foreground underline underline-offset-4 hover:text-foreground">Any Link You Want</Link>
        </div>
    </div>
</footer>
