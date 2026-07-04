<script lang="ts">
	import { Dialog, DialogContent, DialogHeader, DialogTitle } from '$lib/components/ui/dialog';
	import { Button } from '$lib/components/ui/button';
	import { Badge } from '$lib/components/ui/badge';
	import { Textarea } from '$lib/components/ui/textarea';
	import { Label } from '$lib/components/ui/label';
	import { FileText, Download } from 'lucide-svelte';

	interface KycDocument {
		id: string;
		userId: string;
		documentType: string;
		filePath: string;
		status: string;
		notes: string | null;
		createdAt: Date;
		updatedAt: Date;
	}

	interface Props {
		document: KycDocument;
		open: boolean;
		onClose: () => void;
		onApprove: (notes?: string) => void;
		onReject: (notes: string) => void;
	}

	let { document, open, onClose, onApprove, onReject }: Props = $props();

	let notes = $state('');
	let action = $state<'approve' | 'reject' | null>(null);

	function handleApprove() {
		onApprove(notes || undefined);
		notes = '';
	}

	function handleReject() {
		if (!notes.trim()) {
			alert('Notes required for rejection');
			return;
		}
		onReject(notes);
		notes = '';
	}
</script>

<Dialog bind:open>
	<DialogContent class="max-w-4xl max-h-[90vh] overflow-y-auto">
		<DialogHeader>
			<DialogTitle>KYC Document Review</DialogTitle>
		</DialogHeader>

		<div class="space-y-6">
			<!-- Document Info -->
			<div class="grid grid-cols-2 gap-4 rounded-lg border border-border bg-muted/30 p-4">
				<div>
					<div class="text-sm text-muted-foreground">Document Type</div>
					<div class="font-medium">{document.documentType}</div>
				</div>
				<div>
					<div class="text-sm text-muted-foreground">Status</div>
					<Badge
						variant={document.status === 'approved'
							? 'default'
							: document.status === 'rejected'
								? 'destructive'
								: 'secondary'}
					>
						{document.status}
					</Badge>
				</div>
				<div>
					<div class="text-sm text-muted-foreground">Submitted</div>
					<div class="text-sm">{new Date(document.createdAt).toLocaleDateString()}</div>
				</div>
				<div>
					<div class="text-sm text-muted-foreground">File</div>
					<a
						href={document.filePath}
						target="_blank"
						class="flex items-center gap-1 text-sm text-primary hover:underline"
					>
						<FileText class="h-3 w-3" />
						View Document
						<Download class="h-3 w-3" />
					</a>
				</div>
			</div>

			<!-- Document Preview (if image) -->
			{#if document.filePath.match(/\.(jpg|jpeg|png|gif|webp)$/i)}
				<div class="rounded-lg border border-border overflow-hidden">
					<img src={document.filePath} alt="KYC Document" class="w-full h-auto" />
				</div>
			{:else}
				<div class="rounded-lg border border-border bg-muted/30 p-12 text-center">
					<FileText class="mx-auto h-12 w-12 text-muted-foreground" />
					<p class="mt-2 text-sm text-muted-foreground">
						Preview not available. Click "View Document" above to open.
					</p>
				</div>
			{/if}

			<!-- Existing Notes -->
			{#if document.notes}
				<div class="space-y-2">
					<Label>Previous Notes</Label>
					<div class="rounded-lg border border-border bg-muted/30 p-3 text-sm">
						{document.notes}
					</div>
				</div>
			{/if}

			<!-- Action Section -->
			{#if document.status === 'pending' || document.status === 'submitted'}
				<div class="space-y-4 rounded-lg border border-border bg-card p-4">
					<Label>Review Action</Label>

					<Textarea
						bind:value={notes}
						placeholder="Add notes (optional for approval, required for rejection)..."
						rows={3}
					/>

					<div class="flex gap-2">
						<Button variant="default" onclick={handleApprove}> Approve </Button>
						<Button variant="destructive" onclick={handleReject}> Reject </Button>
						<Button variant="outline" onclick={onClose}> Cancel </Button>
					</div>
				</div>
			{/if}
		</div>
	</DialogContent>
</Dialog>
