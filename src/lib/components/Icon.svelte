<script lang="ts">
    import * as icons from 'lucide-svelte';

    interface Props {
        name: string;
        class?: string;
        size?: number | string;
        color?: string;
        strokeWidth?: number | string;
    }

    let { name, class: className, size = 16, color, strokeWidth = 2 }: Props = $props();

    const Component = $derived(() => {
        if (!name) return null;

        // Convert kebab-case to PascalCase (e.g., 'dollar-sign' -> 'DollarSign')
        const pascalName = name
            .split('-')
            .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
            .join('');

        return (icons as Record<string, any>)[pascalName];
    });

    const styles = $derived.by(() => {
        return ['h-4 w-4', className].filter(Boolean).join(' ');
    });
</script>

{#if Component}
    <Component class={styles} {size} {color} {strokeWidth} />
{/if}
