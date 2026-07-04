<script lang="ts">
	import { Select as SelectPrimitive } from 'bits-ui';
	import { cn } from '$lib/utils';

	type Props = SelectPrimitive.ContentProps & {
		class?: string;
	};

	let { class: className, children, ...restProps }: Props = $props();
</script>

<SelectPrimitive.Content
	class={cn(
		'relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
		className
	)}
	{...restProps}
>
	<div class="p-1">
		{@render children?.()}
	</div>
</SelectPrimitive.Content>
