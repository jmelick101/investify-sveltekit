<script lang="ts">
    import * as Sheet from '$lib/components/ui/sheet';
    import { Button } from '$lib/components/ui/button';
    import { Send, Bot, Loader2 } from 'lucide-svelte';
    import { page } from '$app/stores';
    import { tick } from 'svelte';
    import { Sparkles } from 'lucide-svelte';
    import axios from 'axios';

    interface Props {
        open: boolean;
    }

    let { open = $bindable(false) }: Props = $props();

    let user = $derived($page.props.auth.user);

    interface ChatMessage {
        role: 'user' | 'assistant';
        content: string;
    }

    let messages = $state<ChatMessage[]>([]);
    let inputValue = $state('');
    let isLoading = $state(false);
    let messagesContainer: HTMLDivElement | undefined = $state();

    async function scrollToBottom(): Promise<void> {
        await tick();
        if (messagesContainer) {
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }
    }

    function formatContent(content: string): string {
        // Convert markdown-style links [text](url) to clickable HTML links
        return content.replace(
            /\[([^\]]+)\]\(([^)]+)\)/g,
            '<a href="$2" class="text-primary underline underline-offset-2 hover:text-primary/80 transition-colors">$1</a>',
        );
    }

    async function sendMessage(): Promise<void> {
        const trimmed = inputValue.trim();
        if (!trimmed || isLoading) return;

        const userMessage: ChatMessage = { role: 'user', content: trimmed };
        messages = [...messages, userMessage];
        inputValue = '';
        isLoading = true;
        await scrollToBottom();

        try {
            const response = await axios.post(route('user.ai-chat'), {
                message: trimmed,
                history: messages.slice(0, -1), // exclude the message we just added
            });

            const assistantMessage: ChatMessage = {
                role: 'assistant',
                content: response.data.message ?? 'Sorry, I could not process your request.',
            };
            messages = [...messages, assistantMessage];
        } catch (error) {
            console.error('AI Chat Error:', error);
            messages = [
                ...messages,
                {
                    role: 'assistant',
                    content: 'Sorry, something went wrong. Please try again.',
                },
            ];
        } finally {
            isLoading = false;
            await scrollToBottom();
        }
    }

    function handleKeydown(event: KeyboardEvent): void {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            sendMessage();
        }
    }

    // Reset conversation when sheet closes
    $effect(() => {
        if (!open) {
            messages = [];
            inputValue = '';
        }
    });
</script>

<Sheet.Root bind:open>
    <Sheet.Trigger>
        <Button class="w-full h-10 p-px relative group bg-transparent hover:bg-transparent border-0 overflow-hidden shadow-sm">
            <span
                class="absolute inset-0 bg-linear-to-r from-pink-500 via-orange-400 to-purple-500 opacity-70 group-hover:opacity-100 transition-opacity duration-300"
            ></span>
            <div
                class="relative flex items-center justify-start w-full h-full bg-background rounded-[calc(var(--radius)-1px)] px-4 transition-all duration-300 group-hover:bg-background/90 group-hover:shadow-[0_0_15px_-3px_rgba(236,72,153,0.4)]"
            >
                <Sparkles class="mr-2 h-4 w-4 text-orange-400 transition-transform group-hover:scale-110 duration-300" />
                <span class="text-transparent bg-clip-text bg-linear-to-r from-pink-500 via-orange-400 to-purple-500 font-semibold tracking-wide">
                    Ask AI
                </span>
            </div>
        </Button>
    </Sheet.Trigger>
    <Sheet.Content side="right" class="sm:max-w-md w-full flex flex-col p-0">
        <!-- Header -->
        <Sheet.Header class="border-b px-5 py-4">
            <div class="flex items-center gap-3">
                <div class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Sparkles class="h-5 w-5" />
                </div>
                <div>
                    <Sheet.Title class="text-base">AI Assistant</Sheet.Title>
                    <Sheet.Description class="text-xs text-muted-foreground">Ask me anything about the platform</Sheet.Description>
                </div>
            </div>
        </Sheet.Header>

        <!-- Messages -->
        <div bind:this={messagesContainer} class="flex-1 overflow-y-auto px-5 py-4 space-y-4 scroll-smooth">
            {#if messages.length === 0}
                <!-- Welcome state -->
                <div class="flex flex-col items-center justify-center h-full text-center py-12">
                    <div class="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-5">
                        <Sparkles class="h-8 w-8" />
                    </div>
                    <h3 class="font-semibold text-foreground text-lg">
                        Hi{user?.first_name ? `, ${user.first_name}` : ''}! 👋
                    </h3>
                    <p class="text-muted-foreground text-sm mt-2 max-w-[260px]">
                        I'm your Investify assistant. Ask me about investments, withdrawals, or navigating the platform.
                    </p>

                    <div class="grid gap-2 mt-6 w-full max-w-[280px]">
                        {#each ['How do I make an investment?', 'How do I withdraw funds?', 'How do I refer a friend?'] as suggestion}
                            <button
                                type="button"
                                class="text-left text-sm px-3.5 py-2.5 rounded-lg border border-border/60 bg-card hover:bg-accent hover:border-primary/20 text-muted-foreground hover:text-foreground transition-all"
                                onclick={() => {
                                    inputValue = suggestion;
                                    sendMessage();
                                }}
                            >
                                {suggestion}
                            </button>
                        {/each}
                    </div>
                </div>
            {:else}
                {#each messages as msg, i}
                    <div class="flex {msg.role === 'user' ? 'justify-end' : 'justify-start'}">
                        <div
                            class="max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed {msg.role === 'user'
                                ? 'bg-primary text-primary-foreground rounded-br-md'
                                : 'bg-muted text-foreground rounded-bl-md'}"
                        >
                            {#if msg.role === 'assistant'}
                                {@html formatContent(msg.content)}
                            {:else}
                                {msg.content}
                            {/if}
                        </div>
                    </div>
                {/each}

                {#if isLoading}
                    <div class="flex justify-start">
                        <div class="bg-muted rounded-2xl rounded-bl-md px-4 py-3">
                            <div class="flex items-center gap-1.5">
                                <span class="h-2 w-2 rounded-full bg-muted-foreground/40 animate-bounce" style="animation-delay: 0ms"></span>
                                <span class="h-2 w-2 rounded-full bg-muted-foreground/40 animate-bounce" style="animation-delay: 150ms"></span>
                                <span class="h-2 w-2 rounded-full bg-muted-foreground/40 animate-bounce" style="animation-delay: 300ms"></span>
                            </div>
                        </div>
                    </div>
                {/if}
            {/if}
        </div>

        <!-- Input -->
        <Sheet.Footer class="border-t px-4 py-3">
            <div class="flex items-center gap-2 w-full">
                <input
                    type="text"
                    bind:value={inputValue}
                    onkeydown={handleKeydown}
                    placeholder="Type a message..."
                    disabled={isLoading}
                    class="flex-1 rounded-lg border border-input bg-background px-3.5 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1 disabled:opacity-50"
                />
                <Button size="icon" disabled={isLoading || !inputValue.trim()} onclick={sendMessage} class="shrink-0 rounded-lg">
                    {#if isLoading}
                        <Loader2 class="h-4 w-4 animate-spin" />
                    {:else}
                        <Send class="h-4 w-4" />
                    {/if}
                </Button>
            </div>
        </Sheet.Footer>
    </Sheet.Content>
</Sheet.Root>
