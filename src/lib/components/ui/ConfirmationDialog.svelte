<script lang="ts">
	import { fly, fade } from 'svelte/transition';

	let {
		open = $bindable(false),
		title = 'Confirm Action',
		message = 'Are you sure you want to proceed?',
		confirmText = 'Confirm',
		cancelText = 'Cancel',
		variant = 'danger',
		onconfirm,
		oncancel
	}: {
		open: boolean;
		title?: string;
		message?: string;
		confirmText?: string;
		cancelText?: string;
		variant?: 'danger' | 'warning' | 'info';
		onconfirm?: () => void;
		oncancel?: () => void;
	} = $props();

	function handleConfirm() {
		onconfirm?.();
		open = false;
	}

	function handleCancel() {
		oncancel?.();
		open = false;
	}

	const variantClasses = {
		danger: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
		warning: 'bg-yellow-600 text-white hover:bg-yellow-700',
		info: 'bg-primary text-primary-foreground hover:bg-primary/90'
	};
</script>

{#if open}
	<div class="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
		<div class="flex min-h-full items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
			<!-- Background overlay -->
			<div
				class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
				transition:fade={{ duration: 200 }}
				onclick={handleCancel}
				onkeydown={(e) => e.key === 'Escape' && handleCancel()}
				role="button"
				tabindex="-1"
			></div>

			<!-- Center the modal -->
			<span class="hidden sm:inline-block sm:h-screen sm:align-middle">&#8203;</span>

			<!-- Modal panel -->
			<div
				class="relative inline-block transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:align-middle"
				transition:fly={{ y: 20, duration: 200 }}
			>
				<div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
					<div class="sm:flex sm:items-start">
						<div class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-{variant === 'danger' ? 'red' : variant === 'warning' ? 'yellow' : 'blue'}-100 sm:mx-0 sm:h-10 sm:w-10">
							{#if variant === 'danger'}
								<svg class="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
									<path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
								</svg>
							{:else if variant === 'warning'}
								<svg class="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
									<path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
								</svg>
							{:else}
								<svg class="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
									<path stroke-linecap="round" stroke-linejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
								</svg>
							{/if}
						</div>
						<div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
							<h3 class="text-lg font-semibold leading-6 text-gray-900" id="modal-title">
								{title}
							</h3>
							<div class="mt-2">
								<p class="text-sm text-gray-500">
									{message}
								</p>
							</div>
						</div>
					</div>
				</div>
				<div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
					<button
						type="button"
						class="inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold shadow-sm sm:ml-3 sm:w-auto {variantClasses[variant]}"
						onclick={handleConfirm}
					>
						{confirmText}
					</button>
					<button
						type="button"
						class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
						onclick={handleCancel}
					>
						{cancelText}
					</button>
				</div>
			</div>
		</div>
	</div>
{/if}
