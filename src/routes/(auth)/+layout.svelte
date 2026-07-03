<script lang="ts">
	import Card from '$lib/components/ui/card/card.svelte';
	import CardContent from '$lib/components/ui/card/card-content.svelte';
	import CardHeader from '$lib/components/ui/card/card-header.svelte';
	import CardTitle from '$lib/components/ui/card/card-title.svelte';
	import CardDescription from '$lib/components/ui/card/card-description.svelte';
	import type { Snippet } from 'svelte';

	interface Props {
		children?: Snippet;
	}

	let { children }: Props = $props();

	// Fallback/Default values for simple auth card layout
	const title = 'Welcome back';
	const description = 'Sign in to access your portfolio and manage your investments';
</script>

<div class="relative flex min-h-svh">
	<!-- Left side: Background image (hidden on mobile) -->
	<div class="relative hidden w-0 flex-1 lg:block">
		<img
			class="absolute inset-0 h-full w-full object-cover"
			src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=2000"
			alt="Financial cityscape"
		/>
		<div class="absolute inset-0 bg-primary/60 mix-blend-multiply"></div>
		<div
			class="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent"
		></div>
		<!-- Overlay content -->
		<div class="absolute bottom-0 left-0 right-0 p-12">
			<blockquote class="space-y-3">
				<p class="text-lg font-light leading-relaxed text-white/90">
					"The best investment you can make is an investment in yourself. The more you learn, the
					more you'll earn."
				</p>
				<footer class="text-sm font-medium text-white/60">— Warren Buffett</footer>
			</blockquote>
		</div>
	</div>

	<!-- Right side: Auth form -->
	<div
		class="relative flex w-full flex-col items-center justify-center bg-background p-6 md:p-10 lg:w-[520px] lg:shrink-0"
	>
		<!-- Subtle background pattern -->
		<div
			class="pointer-events-none absolute inset-0 opacity-[0.02] dark:opacity-[0.04]"
			style="background-image: radial-gradient(circle, currentColor 1px, transparent 1px); background-size: 32px 32px;"
		></div>

		<div class="relative z-10 flex w-full max-w-md flex-col gap-8">
			<!-- Logo + Brand -->
			<a href="/" class="flex items-center justify-center gap-2.5">
				<div
					class="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-md"
				>
					<span class="text-base font-bold">I</span>
				</div>
				<span class="text-lg font-semibold tracking-tight text-foreground">Investify</span>
			</a>

			<Card class="overflow-hidden rounded-2xl border-border/50 shadow-xl">
				<CardHeader class="px-8 pb-0 pt-8 text-center sm:px-10">
					<CardTitle class="text-xl font-semibold">{title}</CardTitle>
					<CardDescription class="mt-1.5 text-sm">
						{description}
					</CardDescription>
				</CardHeader>
				<CardContent class="px-8 py-8 sm:px-10">
					{@render children?.()}
				</CardContent>
			</Card>

			<p class="text-center text-xs text-muted-foreground">
				By continuing, you agree to our
				<a href="/terms-of-use" class="underline hover:text-foreground">Terms</a>
				and
				<a href="/privacy-policy" class="underline hover:text-foreground">Privacy Policy</a>.
			</p>
		</div>
	</div>
</div>
