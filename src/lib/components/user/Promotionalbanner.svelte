<script lang="ts">
    import { formatCurrency } from '$lib/utils';
    // Link: use native <a> tags
    import * as Dialog from '$lib/components/ui/dialog/index.js';

    let {
        referralBonus = 10000,
        href = '',
        linkText = 'Refer a friend',
        title = '',
        description = '',
    }: {
        referralBonus?: number;
        href?: string;
        linkText?: string;
        title?: string;
        description?: string;
    } = $props();
</script>

<!-- here you can do promotional banner-->
<div class="border border-dashed border-blue-400 bg-blue-400/10 rounded-lg p-2">
    <p class="text-xs font-bold text-blue-400">{title}</p>
    <p class="text-xs text-blue-400">{description}</p>
    {#if href}
        <Link {href} class="text-sm font-bold text-blue-400 underline">{linkText}</Link>
    {/if}
</div>
