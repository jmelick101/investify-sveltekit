<script lang="ts">
    import { onMount, onDestroy } from 'svelte';
    import { Editor } from '@tiptap/core';
    import StarterKit from '@tiptap/starter-kit';
    import { cn } from '$lib/utils';
    import { Bold, Italic, List, ListOrdered, Heading1, Heading2, Quote, Undo, Redo } from 'lucide-svelte';

    let { value = $bindable(''), class: className = '', ...props } = $props();

    let element: HTMLElement;
    let editor = $state<Editor | undefined>(undefined);
    let isFocused = $state(false);

    onMount(() => {
        editor = new Editor({
            element,
            extensions: [
                StarterKit.configure({
                    heading: {
                        levels: [1, 2],
                    },
                }),
            ],
            content: value,
            editorProps: {
                attributes: {
                    class: 'prose prose-sm dark:prose-invert max-w-none focus:outline-none min-h-[24rem] px-3 py-2',
                },
            },
            onUpdate: ({ editor }) => {
                value = editor.getHTML();
            },
            onFocus: () => {
                isFocused = true;
            },
            onBlur: () => {
                isFocused = false;
            },
        });
    });

    onDestroy(() => {
        if (editor) {
            editor.destroy();
        }
    });

    // React to external value changes
    $effect(() => {
        if (editor && value !== editor.getHTML()) {
            editor.commands.setContent(value);
        }
    });

    function toggleBold() {
        editor?.chain().focus().toggleBold().run();
    }

    function toggleItalic() {
        editor?.chain().focus().toggleItalic().run();
    }

    function toggleHeading(level: 1 | 2) {
        editor?.chain().focus().toggleHeading({ level }).run();
    }

    function toggleBulletList() {
        editor?.chain().focus().toggleBulletList().run();
    }

    function toggleOrderedList() {
        editor?.chain().focus().toggleOrderedList().run();
    }

    function toggleBlockquote() {
        editor?.chain().focus().toggleBlockquote().run();
    }

    function undo() {
        editor?.chain().focus().undo().run();
    }

    function redo() {
        editor?.chain().focus().redo().run();
    }
</script>

<div
    class={cn(
        'border-input dark:bg-input/30 rounded-md border bg-transparent shadow-xs transition-colors',
        isFocused && 'border-ring ring-1 ring-ring/50',
        className,
    )}
    {...props}
>
    {#if editor}
        <div class="flex items-center gap-1 border-b px-2 py-1 flex-wrap">
            <button
                type="button"
                onclick={toggleBold}
                class={cn(
                    'p-1.5 rounded-md hover:bg-muted text-muted-foreground transition-colors',
                    editor.isActive('bold') && 'bg-muted text-foreground',
                )}
                title="Bold"
            >
                <Bold class="size-4" />
            </button>
            <button
                type="button"
                onclick={toggleItalic}
                class={cn(
                    'p-1.5 rounded-md hover:bg-muted text-muted-foreground transition-colors',
                    editor.isActive('italic') && 'bg-muted text-foreground',
                )}
                title="Italic"
            >
                <Italic class="size-4" />
            </button>

            <div class="w-px h-4 bg-border mx-1"></div>

            <button
                type="button"
                onclick={() => toggleHeading(1)}
                class={cn(
                    'p-1.5 rounded-md hover:bg-muted text-muted-foreground transition-colors',
                    editor.isActive('heading', { level: 1 }) && 'bg-muted text-foreground',
                )}
                title="Heading 1"
            >
                <Heading1 class="size-4" />
            </button>
            <button
                type="button"
                onclick={() => toggleHeading(2)}
                class={cn(
                    'p-1.5 rounded-md hover:bg-muted text-muted-foreground transition-colors',
                    editor.isActive('heading', { level: 2 }) && 'bg-muted text-foreground',
                )}
                title="Heading 2"
            >
                <Heading2 class="size-4" />
            </button>

            <div class="w-px h-4 bg-border mx-1"></div>

            <button
                type="button"
                onclick={toggleBulletList}
                class={cn(
                    'p-1.5 rounded-md hover:bg-muted text-muted-foreground transition-colors',
                    editor.isActive('bulletList') && 'bg-muted text-foreground',
                )}
                title="Bullet List"
            >
                <List class="size-4" />
            </button>
            <button
                type="button"
                onclick={toggleOrderedList}
                class={cn(
                    'p-1.5 rounded-md hover:bg-muted text-muted-foreground transition-colors',
                    editor.isActive('orderedList') && 'bg-muted text-foreground',
                )}
                title="Ordered List"
            >
                <ListOrdered class="size-4" />
            </button>

            <div class="w-px h-4 bg-border mx-1"></div>

            <button
                type="button"
                onclick={toggleBlockquote}
                class={cn(
                    'p-1.5 rounded-md hover:bg-muted text-muted-foreground transition-colors',
                    editor.isActive('blockquote') && 'bg-muted text-foreground',
                )}
                title="Quote"
            >
                <Quote class="size-4" />
            </button>

            <div class="ml-auto flex items-center gap-1">
                <button
                    type="button"
                    onclick={undo}
                    class="p-1.5 rounded-md hover:bg-muted text-muted-foreground transition-colors disabled:opacity-50"
                    title="Undo"
                >
                    <Undo class="size-4" />
                </button>
                <button
                    type="button"
                    onclick={redo}
                    class="p-1.5 rounded-md hover:bg-muted text-muted-foreground transition-colors disabled:opacity-50"
                    title="Redo"
                >
                    <Redo class="size-4" />
                </button>
            </div>
        </div>
    {/if}
    <div bind:this={element} class="w-full"></div>
</div>
