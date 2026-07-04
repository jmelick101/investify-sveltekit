<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { Editor } from '@tiptap/core';
	import StarterKit from '@tiptap/starter-kit';
	import Link from '@tiptap/extension-link';
	import Image from '@tiptap/extension-image';
	import Placeholder from '@tiptap/extension-placeholder';
	import {
		Bold,
		Italic,
		Strikethrough,
		Code,
		Heading1,
		Heading2,
		List,
		ListOrdered,
		Quote,
		Undo,
		Redo,
		Link as LinkIcon,
		Image as ImageIcon
	} from 'lucide-svelte';
	import { Button } from '$lib/components/ui/button';

	interface Props {
		content?: string;
		placeholder?: string;
		onUpdate?: (html: string) => void;
	}

	let { content = '', placeholder = 'Write something...', onUpdate }: Props = $props();

	let element: HTMLElement;
	let editor: Editor;

	onMount(() => {
		editor = new Editor({
			element,
			extensions: [
				StarterKit,
				Link.configure({
					openOnClick: false,
					HTMLAttributes: {
						class: 'text-primary underline'
					}
				}),
				Image,
				Placeholder.configure({
					placeholder
				})
			],
			content,
			editorProps: {
				attributes: {
					class: 'prose prose-sm max-w-none focus:outline-none min-h-[300px] p-4'
				}
			},
			onUpdate: ({ editor }) => {
				const html = editor.getHTML();
				onUpdate?.(html);
			}
		});
	});

	onDestroy(() => {
		editor?.destroy();
	});

	function toggleBold() {
		editor.chain().focus().toggleBold().run();
	}

	function toggleItalic() {
		editor.chain().focus().toggleItalic().run();
	}

	function toggleStrike() {
		editor.chain().focus().toggleStrike().run();
	}

	function toggleCode() {
		editor.chain().focus().toggleCode().run();
	}

	function toggleHeading(level: 1 | 2) {
		editor.chain().focus().toggleHeading({ level }).run();
	}

	function toggleBulletList() {
		editor.chain().focus().toggleBulletList().run();
	}

	function toggleOrderedList() {
		editor.chain().focus().toggleOrderedList().run();
	}

	function toggleBlockquote() {
		editor.chain().focus().toggleBlockquote().run();
	}

	function setLink() {
		const url = window.prompt('Enter URL:');
		if (url) {
			editor.chain().focus().setLink({ href: url }).run();
		}
	}

	function addImage() {
		const url = window.prompt('Enter image URL:');
		if (url) {
			editor.chain().focus().setImage({ src: url }).run();
		}
	}

	function undo() {
		editor.chain().focus().undo().run();
	}

	function redo() {
		editor.chain().focus().redo().run();
	}
</script>

<div class="rounded-lg border border-border bg-card">
	<!-- Toolbar -->
	<div class="flex flex-wrap items-center gap-1 border-b border-border bg-muted/30 p-2">
		<Button variant="ghost" size="sm" onclick={toggleBold} class="h-8 w-8 p-0">
			<Bold class="h-4 w-4" />
		</Button>
		<Button variant="ghost" size="sm" onclick={toggleItalic} class="h-8 w-8 p-0">
			<Italic class="h-4 w-4" />
		</Button>
		<Button variant="ghost" size="sm" onclick={toggleStrike} class="h-8 w-8 p-0">
			<Strikethrough class="h-4 w-4" />
		</Button>
		<Button variant="ghost" size="sm" onclick={toggleCode} class="h-8 w-8 p-0">
			<Code class="h-4 w-4" />
		</Button>

		<div class="h-6 w-px bg-border mx-1"></div>

		<Button variant="ghost" size="sm" onclick={() => toggleHeading(1)} class="h-8 w-8 p-0">
			<Heading1 class="h-4 w-4" />
		</Button>
		<Button variant="ghost" size="sm" onclick={() => toggleHeading(2)} class="h-8 w-8 p-0">
			<Heading2 class="h-4 w-4" />
		</Button>

		<div class="h-6 w-px bg-border mx-1"></div>

		<Button variant="ghost" size="sm" onclick={toggleBulletList} class="h-8 w-8 p-0">
			<List class="h-4 w-4" />
		</Button>
		<Button variant="ghost" size="sm" onclick={toggleOrderedList} class="h-8 w-8 p-0">
			<ListOrdered class="h-4 w-4" />
		</Button>
		<Button variant="ghost" size="sm" onclick={toggleBlockquote} class="h-8 w-8 p-0">
			<Quote class="h-4 w-4" />
		</Button>

		<div class="h-6 w-px bg-border mx-1"></div>

		<Button variant="ghost" size="sm" onclick={setLink} class="h-8 w-8 p-0">
			<LinkIcon class="h-4 w-4" />
		</Button>
		<Button variant="ghost" size="sm" onclick={addImage} class="h-8 w-8 p-0">
			<ImageIcon class="h-4 w-4" />
		</Button>

		<div class="h-6 w-px bg-border mx-1"></div>

		<Button variant="ghost" size="sm" onclick={undo} class="h-8 w-8 p-0">
			<Undo class="h-4 w-4" />
		</Button>
		<Button variant="ghost" size="sm" onclick={redo} class="h-8 w-8 p-0">
			<Redo class="h-4 w-4" />
		</Button>
	</div>

	<!-- Editor -->
	<div bind:this={element} class="bg-background"></div>
</div>
