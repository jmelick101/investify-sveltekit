<script lang="ts">
    import Editor from './Editor.svelte';
    let { value = $bindable(), ...props } = $props();
</script>

<Editor bind:value {...props} />
