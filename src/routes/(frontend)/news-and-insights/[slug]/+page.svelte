<script lang="ts">
	import { animate, splitText, heroParallax } from '$lib/gsap';
	import { ArrowLeft, ArrowRight } from 'lucide-svelte';

	let { data } = $props();
</script>

{#if !data.article}
	<!-- 404 State -->
	<section class="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
		<p class="editorial-label mb-4">Article Not Found</p>
		<h1 class="editorial-heading text-4xl font-semibold text-foreground">This article doesn't exist</h1>
		<p class="mt-4 text-sm text-muted-foreground">The article you're looking for may have been moved or removed.</p>
		<a href="/news-and-insights" class="mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-foreground underline underline-offset-4 decoration-muted-foreground hover:decoration-foreground transition-all">
			<ArrowLeft size={16} class="flex-shrink-0" />
			Back to News &amp; Insights
		</a>
	</section>
{:else}
	{@const article = data.article}

	<!-- Hero -->
	<section class="relative min-h-[55vh] overflow-hidden bg-primary">
		<img
			use:heroParallax={0.3}
			src={article.image}
			alt={article.title}
			class="absolute inset-0 h-full w-full object-cover opacity-40"
		/>
		<div class="absolute inset-0 bg-gradient-to-b from-primary/30 via-primary/50 to-primary/80"></div>
		<div class="relative z-10 flex min-h-[55vh] flex-col justify-between px-6 pb-16 pt-24 lg:px-20">
			<!-- Breadcrumb -->
			<div use:animate={{ type: 'fadeUp', delay: 0.1 }}>
				<a href="/news-and-insights" class="text-xs text-primary-foreground/50 hover:text-primary-foreground/80 transition-colors tracking-widest uppercase">
					News &amp; Insights
				</a>
				<span class="mx-2 text-primary-foreground/30">/</span>
				<span class="text-xs text-primary-foreground/50 tracking-widest uppercase">{article.category}</span>
			</div>

			<!-- Title block -->
			<div class="max-w-4xl">
				<p use:animate={{ type: 'fadeUp', delay: 0.2 }} class="editorial-label-light mb-6">{article.category}</p>
				<h1 use:splitText={{ delay: 0.4 }} class="editorial-heading text-4xl font-semibold text-primary-foreground sm:text-5xl lg:text-6xl">
					{article.title}
				</h1>
				<div use:animate={{ type: 'fadeUp', delay: 0.8 }} class="mt-8 flex flex-wrap items-center gap-4 text-sm text-primary-foreground/60">
					<span>{article.date}</span>
					<span>·</span>
					<span>{article.readTime}</span>
					<span>·</span>
					<span>{article.author}</span>
				</div>
			</div>
		</div>
	</section>

	<!-- Article Body -->
	<section class="py-24 lg:py-36">
		<div class="mx-auto max-w-7xl px-6 lg:px-8">
			<div class="grid grid-cols-1 gap-16 lg:grid-cols-[1fr_320px]">

				<!-- Main Content -->
				<div>
					<!-- Excerpt lead -->
					<p use:animate={{ type: 'fadeUp' }} class="text-lg leading-relaxed text-muted-foreground border-l-2 border-foreground/20 pl-6 mb-12">
						{article.excerpt}
					</p>

					<!-- Article content -->
					<div
						use:animate={{ type: 'fadeUp', delay: 0.1 }}
						class="prose prose-neutral max-w-none prose-headings:editorial-heading prose-headings:font-semibold prose-headings:text-foreground prose-p:text-muted-foreground prose-p:leading-relaxed prose-h3:text-xl prose-h3:mt-10 prose-h3:mb-4"
					>
						<!-- eslint-disable-next-line svelte/no-at-html-tags -->
						{@html article.content}
					</div>

					<!-- Article Navigation -->
					<div use:animate={{ type: 'fadeUp' }} class="mt-20 flex items-center justify-between border-t border-border/40 pt-10 gap-4">
						{#if data.prevArticle}
							<a href={`/news-and-insights/${data.prevArticle.slug}`} class="group flex items-start gap-3 max-w-xs">
								<ArrowLeft size={16} class="text-muted-foreground group-hover:text-foreground transition-colors flex-shrink-0 mt-0.5" />
								<div>
									<p class="text-xs text-muted-foreground mb-1 uppercase tracking-widest">Previous</p>
									<p class="text-sm font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2">{data.prevArticle.title}</p>
								</div>
							</a>
						{:else}
							<div></div>
						{/if}

						{#if data.nextArticle}
							<a href={`/news-and-insights/${data.nextArticle.slug}`} class="group flex items-start gap-3 max-w-xs text-right">
								<div>
									<p class="text-xs text-muted-foreground mb-1 uppercase tracking-widest">Next</p>
									<p class="text-sm font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2">{data.nextArticle.title}</p>
								</div>
								<ArrowRight size={16} class="text-muted-foreground group-hover:text-foreground transition-colors flex-shrink-0 mt-0.5" />
							</a>
						{/if}
					</div>
				</div>

				<!-- Sidebar -->
				<aside class="space-y-10">
					<!-- Author Card -->
					<div use:animate={{ type: 'fadeUp', delay: 0.2 }} class="border border-border/40 p-8">
						{#if article.author_image}
							<img src={article.author_image} alt={article.author} class="w-16 h-16 rounded-full object-cover mb-5" />
						{:else}
							<div class="w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-5">
								<span class="text-sm font-semibold text-muted-foreground">{article.author.charAt(0)}</span>
							</div>
						{/if}
						<p class="editorial-label mb-2">Author</p>
						<p class="text-sm font-semibold text-foreground mb-3">{article.author}</p>
						<p class="text-xs leading-relaxed text-muted-foreground">{article.author_bio}</p>
					</div>

					<!-- CTA Card -->
					<div use:animate={{ type: 'fadeUp', delay: 0.3 }} class="border border-border/40 p-8 bg-primary text-primary-foreground">
						<p class="editorial-label-light mb-4">Interested in this topic?</p>
						<p class="text-sm leading-relaxed text-primary-foreground/70 mb-6">
							Speak with one of our investment specialists to discuss how these insights may relate to your portfolio.
						</p>
						<a
							href="/contact-us"
							class="inline-flex items-center gap-1.5 text-sm font-medium text-primary-foreground underline underline-offset-4 decoration-primary-foreground/40 hover:decoration-primary-foreground transition-all"
						>
							Contact us
							<ArrowRight size={16} class="flex-shrink-0" />
						</a>
					</div>
				</aside>
			</div>
		</div>
	</section>

	<!-- Related Articles -->
	{#if data.relatedArticles.length > 0}
		<section class="border-t border-border/40 py-24 lg:py-36">
			<div class="mx-auto max-w-7xl px-6 lg:px-8">
				<p use:animate={{ type: 'fadeUp' }} class="editorial-label mb-3">Continue Reading</p>
				<h2 use:animate={{ type: 'fadeUp', delay: 0.1 }} class="editorial-heading text-3xl font-semibold text-foreground mb-16">Related Articles</h2>

				<div use:animate={{ type: 'stagger', stagger: 0.12 }} class="grid gap-10 md:grid-cols-3">
					{#each data.relatedArticles as related (related!.id)}
						<a href={`/news-and-insights/${related!.slug}`} class="group block">
							<div class="aspect-[16/10] overflow-hidden">
								<img
									src={related!.image}
									alt={related!.title}
									class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
								/>
							</div>
							<div class="mt-5">
								<p class="editorial-label mb-2">{related!.category}</p>
								<h3 class="text-base font-semibold text-foreground transition-colors group-hover:text-primary">{related!.title}</h3>
								<p class="mt-2 text-sm leading-relaxed text-muted-foreground line-clamp-2">{related!.excerpt}</p>
								<div class="mt-4 flex items-center gap-3 text-xs text-muted-foreground">
									<span>{related!.date}</span>
									<span>·</span>
									<span>{related!.readTime}</span>
								</div>
							</div>
						</a>
					{/each}
				</div>
			</div>
		</section>
	{/if}
{/if}
