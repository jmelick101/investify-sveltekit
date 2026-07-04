<script lang="ts">
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Button } from '$lib/components/ui/button';
	import { Textarea } from '$lib/components/ui/textarea';
	import { Plus, Trash2, GripVertical } from 'lucide-svelte';
	import { Badge } from '$lib/components/ui/badge';

	interface Question {
		id: string;
		text: string;
		type: 'text' | 'textarea' | 'radio' | 'checkbox' | 'select';
		options: string[];
		required: boolean;
	}

	let surveyName = $state('');
	let surveyDescription = $state('');
	let questions = $state<Question[]>([]);

	function addQuestion() {
		questions = [
			...questions,
			{
				id: crypto.randomUUID(),
				text: '',
				type: 'text',
				options: [],
				required: false
			}
		];
	}

	function removeQuestion(id: string) {
		questions = questions.filter((q) => q.id !== id);
	}

	function addOption(questionId: string) {
		questions = questions.map((q) =>
			q.id === questionId ? { ...q, options: [...q.options, ''] } : q
		);
	}

	function removeOption(questionId: string, index: number) {
		questions = questions.map((q) =>
			q.id === questionId ? { ...q, options: q.options.filter((_, i) => i !== index) } : q
		);
	}
</script>

<div class="p-6">
	<h1 class="text-2xl font-semibold">Create Survey</h1>

	<form method="POST" class="mt-6 space-y-6">
		<div class="grid gap-4">
			<div class="grid gap-2">
				<Label for="name">Survey Name</Label>
				<Input id="name" name="name" bind:value={surveyName} required />
			</div>

			<div class="grid gap-2">
				<Label for="description">Description</Label>
				<Textarea id="description" name="description" bind:value={surveyDescription} rows={3} />
			</div>
		</div>

		<div class="space-y-4">
			<div class="flex items-center justify-between">
				<h2 class="text-lg font-semibold">Questions</h2>
				<Button type="button" variant="outline" size="sm" onclick={addQuestion}>
					<Plus class="mr-2 h-4 w-4" />
					Add Question
				</Button>
			</div>

			{#each questions as question, index (question.id)}
				<div class="rounded-lg border border-border bg-card p-4">
					<div class="flex items-start gap-3">
						<GripVertical class="mt-2 h-5 w-5 text-muted-foreground" />

						<div class="flex-1 space-y-3">
							<div class="flex items-center gap-2">
								<Badge variant="secondary">{index + 1}</Badge>
								<Input
									placeholder="Question text"
									bind:value={question.text}
									name="questions[{index}][text]"
									required
								/>
							</div>

							<div class="grid grid-cols-2 gap-2">
								<select
									bind:value={question.type}
									name="questions[{index}][type]"
									class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
								>
									<option value="text">Short Text</option>
									<option value="textarea">Long Text</option>
									<option value="radio">Single Choice</option>
									<option value="checkbox">Multiple Choice</option>
									<option value="select">Dropdown</option>
								</select>

								<label class="flex items-center gap-2">
									<input
										type="checkbox"
										bind:checked={question.required}
										name="questions[{index}][required]"
										class="h-4 w-4 rounded border-input"
									/>
									<span class="text-sm">Required</span>
								</label>
							</div>

							{#if ['radio', 'checkbox', 'select'].includes(question.type)}
								<div class="space-y-2 pl-4 border-l-2">
									<Label class="text-xs">Options</Label>
									{#each question.options as option, optIndex}
										<div class="flex gap-2">
											<Input
												placeholder="Option {optIndex + 1}"
												bind:value={question.options[optIndex]}
												name="questions[{index}][options][{optIndex}]"
												size="sm"
											/>
											<Button
												type="button"
												variant="ghost"
												size="sm"
												onclick={() => removeOption(question.id, optIndex)}
											>
												<Trash2 class="h-4 w-4" />
											</Button>
										</div>
									{/each}
									<Button
										type="button"
										variant="outline"
										size="sm"
										onclick={() => addOption(question.id)}
									>
										<Plus class="mr-2 h-3 w-3" />
										Add Option
									</Button>
								</div>
							{/if}
						</div>

						<Button
							type="button"
							variant="ghost"
							size="sm"
							onclick={() => removeQuestion(question.id)}
						>
							<Trash2 class="h-4 w-4" />
						</Button>
					</div>
				</div>
			{/each}
		</div>

		<input type="hidden" name="questionsJson" value={JSON.stringify(questions)} />

		<div class="flex gap-2">
			<Button type="submit">Create Survey</Button>
			<Button variant="outline" type="button" onclick={() => window.history.back()}>
				Cancel
			</Button>
		</div>
	</form>
</div>
