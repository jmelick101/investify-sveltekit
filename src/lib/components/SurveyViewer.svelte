<script lang="ts">
	import { enhance } from '$app/forms';
	import LoadingSpinner from '$lib/components/ui/LoadingSpinner.svelte';

	let { survey, onsubmit }: { survey: any; onsubmit?: (answers: Record<string, any>) => void } = $props();

	function getInitialAnswers(questions: any[]) {
		const initial: Record<string, any> = {};
		if (questions) {
			questions.forEach((q: any, index: number) => {
				const key = q.id || index;
				if (q.type === 'Multiple Choice') {
					initial[key] = [];
				} else if (q.type === 'Single Choice' || q.type === 'Text') {
					initial[key] = '';
				}
			});
		}
		return initial;
	}

	let answers = $state<Record<string, any>>(getInitialAnswers(survey.questions));
	let submitting = $state(false);
	let submitted = $state(false);
	let error = $state('');

	async function handleSubmit() {
		submitting = true;
		error = '';

		try {
			const response = await fetch('/api/surveys', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					surveyId: survey.id,
					answers
				})
			});

			const result = await response.json();

			if (!response.ok) {
				error = result.error || 'Failed to submit survey';
				return;
			}

			submitted = true;
			onsubmit?.(answers);
		} catch (e) {
			error = 'Network error. Please try again.';
		} finally {
			submitting = false;
		}
	}

	function handleCheckboxChange(questionId: string, option: string, checked: boolean) {
		let currentAnswers = answers[questionId] || [];
		if (checked) {
			answers[questionId] = [...currentAnswers, option];
		} else {
			answers[questionId] = currentAnswers.filter((a: string) => a !== option);
		}
	}
</script>

<div class="max-w-3xl mx-auto space-y-6">
	{#if submitted}
		<div class="rounded-xl border bg-card p-8 text-center">
			<h2 class="text-2xl font-bold text-green-600">Thank You!</h2>
			<p class="mt-2 text-muted-foreground">Your response has been recorded.</p>
			<p class="mt-1 text-muted-foreground">We appreciate your feedback.</p>
			<button
				type="button"
				class="mt-4 rounded-lg border px-4 py-2 text-sm hover:bg-muted"
				onclick={() => window.location.reload()}
			>
				Submit Another Response
			</button>
		</div>
	{:else}
		<div class="rounded-xl border bg-card p-6">
			<h2 class="text-2xl font-bold">{survey.name}</h2>
			<p class="mt-1 text-muted-foreground">{survey.description || 'Please answer the following questions.'}</p>
		</div>

		{#if error}
			<div class="rounded-lg bg-red-50 p-4 text-red-700 border border-red-200">
				{error}
			</div>
		{/if}

		<form
			class="space-y-6"
			onsubmit={(e) => {
				e.preventDefault();
				handleSubmit();
			}}
		>
			{#each survey.questions as question, index (index)}
				<div class="rounded-xl border bg-card p-6">
					<h3 class="text-lg font-medium">
						<span class="mr-2 text-muted-foreground">{index + 1}.</span>
						{question.text}
						{#if question.required}
							<span class="text-red-500 ml-1">*</span>
						{/if}
					</h3>

					<div class="mt-4">
						{#if question.type === 'Single Choice'}
							<div class="space-y-2">
								{#each question.options as option}
									<label class="flex items-center gap-3 cursor-pointer rounded-lg border p-3 hover:bg-muted/50 has-[:checked]:border-primary has-[:checked]:bg-primary/5">
										<input
											type="radio"
											name="question-{question.id || index}"
											value={option}
											bind:group={answers[question.id || index]}
											class="accent-primary"
										/>
										<span>{option}</span>
									</label>
								{/each}
							</div>
						{:else if question.type === 'Multiple Choice'}
							<div class="space-y-2">
								{#each question.options as option}
									<label class="flex items-center gap-3 cursor-pointer rounded-lg border p-3 hover:bg-muted/50 has-[:checked]:border-primary has-[:checked]:bg-primary/5">
										<input
											type="checkbox"
											checked={answers[question.id || index]?.includes(option)}
											onchange={(e) => handleCheckboxChange(question.id || index, option, (e.target as HTMLInputElement).checked)}
											class="accent-primary"
										/>
										<span>{option}</span>
									</label>
								{/each}
							</div>
						{:else if question.type === 'Text'}
							<textarea
								placeholder="Type your answer here..."
								bind:value={answers[question.id || index]}
								rows={4}
								class="w-full rounded-lg border bg-background px-4 py-2.5"
							></textarea>
						{/if}
					</div>
				</div>
			{/each}

			<div class="flex justify-end">
				<button
					type="submit"
					disabled={submitting}
					class="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-primary-foreground font-medium hover:bg-primary/90 disabled:opacity-50"
				>
					{#if submitting}
						<LoadingSpinner size="sm" />
						Submitting...
					{:else}
						Submit Response
					{/if}
				</button>
			</div>
		</form>
	{/if}
</div>
