<script lang="ts">
	import { Select as SelectPrimitive } from 'bits-ui';

	type Props = SelectPrimitive.Props;

	let { children, ...restProps }: Props = $props();
</script>

<SelectPrimitive.Root {...restProps}>
	{@render children?.()}
</SelectPrimitive.Root>
