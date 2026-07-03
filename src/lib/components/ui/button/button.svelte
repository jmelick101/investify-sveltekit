<script lang="ts" module>
	import { cn, type WithElementRef } from '$lib/utils.js';
	import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements';

	export type ButtonProps = WithElementRef<HTMLButtonAttributes> &
		WithElementRef<HTMLAnchorAttributes> & {
			variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
			size?: 'default' | 'sm' | 'lg' | 'icon' | 'icon-sm' | 'icon-lg';
		};
</script>

<script lang="ts">
	let {
		class: className,
		variant = 'default',
		size = 'default',
		ref = $bindable(null),
		href = undefined,
		type = 'button',
		disabled,
		children,
		...restProps
	}: ButtonProps = $props();

	// Custom tailwind classes based on variant/size without needing tailwind-variants
	const baseClass =
		"focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive inline-flex shrink-0 items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap transition-all outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4";

	const variantClasses = {
		default: 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-xs',
		destructive:
			'bg-destructive hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60 text-white shadow-xs',
		outline:
			'bg-background hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 border shadow-xs',
		secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-xs',
		ghost: 'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50',
		link: 'text-primary underline-offset-4 hover:underline'
	};

	const sizeClasses = {
		default: 'h-12 px-5 py-2 has-[>svg]:px-4',
		sm: 'h-10 gap-1.5 rounded-md px-4 has-[>svg]:px-3',
		lg: 'h-14 rounded-md px-8 has-[>svg]:px-5',
		icon: 'size-12',
		'icon-sm': 'size-10',
		'icon-lg': 'size-14'
	};

	let buttonClass = $derived(cn(baseClass, variantClasses[variant], sizeClasses[size], className));
</script>

{#if href}
	<a
		bind:this={ref}
		data-slot="button"
		class={buttonClass}
		href={disabled ? undefined : href}
		aria-disabled={disabled}
		role={disabled ? 'link' : undefined}
		tabindex={disabled ? -1 : undefined}
		{...restProps}
	>
		{@render children?.()}
	</a>
{:else}
	<button bind:this={ref} data-slot="button" class={buttonClass} {type} {disabled} {...restProps}>
		{@render children?.()}
	</button>
{/if}
