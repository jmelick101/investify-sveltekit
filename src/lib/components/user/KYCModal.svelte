<script lang="ts">
    import { Button, buttonVariants } from '$lib/components/ui/button/index.js';
    import * as Dialog from '$lib/components/ui/dialog/index.js';
    import * as Select from '$lib/components/ui/select';

    import { Label } from '$lib/components/ui/label/index.js';
    import { cn } from '$lib/utils';
    import { Upload, FileText, X, Loader2 } from 'lucide-svelte';
    import { toast } from 'svelte-sonner';
    import { SYSTEM } from '$lib/store';

    let open = $state(false);
    let isDragging = $state(false);
    let selectedFile: File | null = $state(null);
    let isSubmitting = $state(false);
    let documentType = $state('');

    function handleFileChange(event: Event) {
        const input = event.target as HTMLInputElement;
        if (input.files && input.files.length > 0) {
            const file = input.files[0];
            validateAndSetFile(file);
        }
    }

    function handleDrop(event: DragEvent) {
        event.preventDefault();
        isDragging = false;
        if (event.dataTransfer?.files && event.dataTransfer.files.length > 0) {
            const file = event.dataTransfer.files[0];
            validateAndSetFile(file);
        }
    }

    function validateAndSetFile(file: File) {
        // Validate file type (flexible for now, mainly images/pdf for ID)
        const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'];
        if (!validTypes.includes(file.type)) {
            toast.error('Invalid file type. Please upload a valid image or PDF.');
            return;
        }

        // Validate size (e.g., 5MB limit)
        if (file.size > 5 * 1024 * 1024) {
            toast.error('File size exceeds 5MB limit.');
            return;
        }

        selectedFile = file;
    }

    function removeFile() {
        selectedFile = null;
        // Reset input value if needed, though state drives the UI
        const input = document.getElementById('kyc-file-upload') as HTMLInputElement;
        if (input) input.value = '';
    }

    function formatBytes(bytes: number, decimals = 2) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }

    async function handleSubmit(e: Event) {
        e.preventDefault();
        if (!selectedFile) return;

        isSubmitting = true;

        // Simulate upload delay
        await new Promise((resolve) => setTimeout(resolve, 1500));

        toast.success('Document uploaded successfully!');
        isSubmitting = false;
        open = false;
        selectedFile = null;
    }
</script>

<Dialog.Root bind:open>
    <Dialog.Trigger class={cn(buttonVariants({ variant: 'default' }))}>Get Started</Dialog.Trigger>
    <Dialog.Content class="sm:max-w-md">
        <Dialog.Header>
            <Dialog.Title>Verify your Identity</Dialog.Title>
            <Dialog.Description>To comply with regulations, we need to verify your identity. Please upload a valid Government ID.</Dialog.Description>
        </Dialog.Header>

        <div class="grid gap-6 py-4">
            <div class="space-y-2">
                <h4 class="font-medium text-sm leading-none">Accepted Documents</h4>
                <ul class="text-xs text-muted-foreground list-disc list-inside space-y-1">
                    <li>Government-issued ID card</li>
                    <li>Driver's License</li>
                    <li>Passport</li>
                </ul>
            </div>

            <form id="kyc-form" onsubmit={handleSubmit} class="grid gap-4">
                <div class="grid gap-2">
                    <Label>Document Type</Label>
                    <Select.Root type="single" bind:value={documentType}>
                        <Select.Trigger class="w-full">
                            {documentType ? $SYSTEM.supportedDocuments.find((c) => c.value === documentType)?.name : 'Select a document type'}
                        </Select.Trigger>
                        <Select.Content>
                            {#each $SYSTEM.supportedDocuments as doc}
                                <Select.Item value={doc.value} label={doc.name}>{doc.name}</Select.Item>
                            {/each}
                        </Select.Content>
                    </Select.Root>
                </div>

                <div class="grid w-full items-center gap-1.5">
                    <Label for="kyc-file-upload">Upload Document</Label>

                    {#if !selectedFile}
                        <!-- Drag and Drop Area -->
                        <div
                            role="button"
                            tabindex="0"
                            class={cn(
                                'border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer flex flex-col items-center justify-center gap-2',
                                isDragging ? 'border-primary bg-primary/5' : 'border-border hover:bg-accent/50',
                            )}
                            ondragover={(e) => {
                                e.preventDefault();
                                isDragging = true;
                            }}
                            ondragleave={() => (isDragging = false)}
                            ondrop={handleDrop}
                            onclick={() => document.getElementById('kyc-file-upload')?.click()}
                            onkeydown={(e) => e.key === 'Enter' && document.getElementById('kyc-file-upload')?.click()}
                        >
                            <div class="p-3 bg-secondary rounded-full">
                                <Upload class="size-6 text-muted-foreground" />
                            </div>
                            <div class="space-y-1">
                                <p class="text-sm font-medium">Click to upload or drag and drop</p>
                                <p class="text-xs text-muted-foreground">PDF, PNG, JPG or WEBP (max. 5MB)</p>
                            </div>
                            <input id="kyc-file-upload" type="file" class="hidden" accept=".jpg,.jpeg,.png,.webp,.pdf" onchange={handleFileChange} />
                        </div>
                    {:else}
                        <!-- Selected File Preview -->
                        <div class="border rounded-lg p-4 flex items-center justify-between bg-card text-card-foreground shadow-sm">
                            <div class="flex items-center gap-3 overflow-hidden">
                                <div class="bg-primary/10 p-2 rounded-md">
                                    <FileText class="size-5 text-primary" />
                                </div>
                                <div class="grid gap-0.5 max-w-[200px] sm:max-w-[250px]">
                                    <p class="text-sm font-medium truncate" title={selectedFile.name}>
                                        {selectedFile.name}
                                    </p>
                                    <p class="text-xs text-muted-foreground">
                                        {formatBytes(selectedFile.size)}
                                    </p>
                                </div>
                            </div>
                            <Button
                                variant="ghost"
                                size="icon"
                                class="h-8 w-8 text-muted-foreground hover:text-destructive"
                                onclick={removeFile}
                                type="button"
                            >
                                <X class="size-4" />
                                <span class="sr-only">Remove file</span>
                            </Button>
                        </div>
                    {/if}
                </div>
            </form>
        </div>

        <Dialog.Footer class="sm:justify-end gap-2">
            <Dialog.Close class={buttonVariants({ variant: 'outline' })}>Cancel</Dialog.Close>
            <Button type="submit" form="kyc-form" disabled={!selectedFile || isSubmitting}>
                {#if isSubmitting}
                    <Loader2 class="mr-2 h-4 w-4 animate-spin" />
                    Uploading...
                {:else}
                    Submit Document
                {/if}
            </Button>
        </Dialog.Footer>
    </Dialog.Content>
</Dialog.Root>
