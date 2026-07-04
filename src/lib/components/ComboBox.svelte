<script lang="ts">
    import * as Select from '$lib/components/ui/select/index.js';
    import { Input } from '$lib/components/ui/input/index.js';
    import * as InputGroup from '$lib/components/ui/input-group/index.js';
    import { Search } from 'lucide-svelte';

    let { options, value = $bindable(), placeholder = 'Select option...', type = 'single', search = true, ...props } = $props();

    let searchValue = $state('');

    const filteredOptions = $derived(searchValue ? options.filter((o) => o.label.toLowerCase().includes(searchValue.toLowerCase())) : options);

    const triggerContent = $derived(
        Array.isArray(value)
            ? value.length > 0
                ? value.length > 3
                    ? `${value.length} Items Selected`
                    : value
                          .map((v) => options.find((o) => o.value === v)?.label)
                          .filter((l) => l)
                          .join(', ')
                : placeholder
            : (options.find((f) => f.value === value)?.label ?? placeholder),
    );
</script>

<Select.Root type={type as any} bind:value allowDeselect={false} disabled={props.disabled}>
    <Select.Trigger class="w-full capitalize overflow-hidden">
        {triggerContent}
    </Select.Trigger>
    <Select.Content class="max-h-[300px] overflow-y-auto">
        {#if search}
            <div class="sticky top-0 z-10 border-b mb-2 bg-popover p-2">
                <InputGroup.Root>
                    <InputGroup.Addon>
                        <Search />
                    </InputGroup.Addon>
                    <InputGroup.Input
                        {...props}
                        placeholder="Search..."
                        bind:value={searchValue}
                        class="h-8 focus-visible:ring-0"
                        onkeydown={(e) => e.stopPropagation()}
                    />
                </InputGroup.Root>
            </div>
        {/if}
        <Select.Group>
            {#each filteredOptions as option (option.value)}
                <Select.Item value={option.value} label={option.label} class="capitalize">
                    {option.label}
                </Select.Item>
            {/each}
            {#if filteredOptions.length === 0}
                <div class="px-2 py-4 text-center text-sm text-muted-foreground">No results found.</div>
            {/if}
        </Select.Group>
    </Select.Content>
</Select.Root>
