<script lang="ts">
	import { Select as SelectPrimitive } from 'bits-ui';
	import { cn } from '$lib/utils';

	type Props = SelectPrimitive.ValueProps & {
		class?: string;
	};

	let { class: className, ...restProps }: Props = $props();
</script>

<SelectPrimitive.Value class={cn('text-sm', className)} {...restProps} />
