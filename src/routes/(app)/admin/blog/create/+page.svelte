<script lang="ts">
	import TipTapEditor from '$lib/components/admin/TipTapEditor.svelte';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Button } from '$lib/components/ui/button';
	import { Textarea } from '$lib/components/ui/textarea';

	let title = $state('');
	let slug = $state('');
	let excerpt = $state('');
	let coverImage = $state('');
	let content = $state('');
	let status = $state<'draft' | 'published'>('draft');

	function generateSlug() {
		slug = title
			.toLowerCase()
			.replace(/[^a-z0-9]+/g, '-')
			.replace(/^-|-$/g, '');
	}

	function handleContentUpdate(html: string) {
		content = html;
	}
</script>

<div class="p-6">
	<h1 class="text-2xl font-semibold">Create Blog Post</h1>

	<form method="POST" class="mt-6 space-y-6">
		<div class="grid gap-4">
			<div class="grid gap-2">
				<Label for="title">Title</Label>
				<Input id="title" name="title" bind:value={title} onblur={generateSlug} required />
			</div>

			<div class="grid gap-2">
				<Label for="slug">Slug</Label>
				<Input id="slug" name="slug" bind:value={slug} required />
			</div>

			<div class="grid gap-2">
				<Label for="excerpt">Excerpt</Label>
				<Textarea id="excerpt" name="excerpt" bind:value={excerpt} rows={3} />
			</div>

			<div class="grid gap-2">
				<Label for="coverImage">Cover Image URL</Label>
				<Input id="coverImage" name="coverImage" type="url" bind:value={coverImage} />
			</div>

			<div class="grid gap-2">
				<Label>Content</Label>
				<TipTapEditor {content} onUpdate={handleContentUpdate} />
				<input type="hidden" name="content" value={content} />
			</div>

			<div class="grid gap-2">
				<Label for="status">Status</Label>
				<select
					id="status"
					name="status"
					bind:value={status}
					class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
				>
					<option value="draft">Draft</option>
					<option value="published">Published</option>
				</select>
			</div>
		</div>

		<div class="flex gap-2">
			<Button type="submit">Create Post</Button>
			<Button variant="outline" type="button" onclick={() => window.history.back()}>
				Cancel
			</Button>
		</div>
	</form>
</div>
