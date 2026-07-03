<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		href: string;
		tabindex?: number;
		class?: string;
		children: Snippet;
	}

	let { href, tabindex, class: className, children }: Props = $props();
</script>

<a
	{href}
	{tabindex}
	class="text-foreground underline decoration-neutral-300 underline-offset-4 transition-colors duration-300 ease-out hover:decoration-current! dark:decoration-neutral-500 {className}"
>
	{@render children?.()}
</a>
