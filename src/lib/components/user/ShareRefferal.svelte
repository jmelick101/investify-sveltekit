<script lang="ts">
    import * as Dialog from '$lib/components/ui/dialog';
    import { Button, buttonVariants } from '$lib/components/ui/button';
    import { Input } from '$lib/components/ui/input';
    import { Copy, Share2, Mail } from 'lucide-svelte';
    import { copy } from '$lib/utils';
    import { cn } from '$lib/utils';

    let { referralLink = '' } = $props();

    const shareText = 'Join me on this amazing platform!';

    let facebookUrl = $derived(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(referralLink)}`);
    let xUrl = $derived(`https://twitter.com/intent/tweet?url=${encodeURIComponent(referralLink)}&text=${encodeURIComponent(shareText)}`);
    let whatsappUrl = $derived(`https://wa.me/?text=${encodeURIComponent(shareText + ' ' + referralLink)}`);
    let emailUrl = $derived(`mailto:?subject=${encodeURIComponent(shareText)}&body=${encodeURIComponent(shareText + ' ' + referralLink)}`);
</script>

<Dialog.Root>
    <Dialog.Trigger class={cn(buttonVariants({variant: 'ghost',  size: 'icon' }), 'cursor-pointer')}>
        <Share2 class="size-4" />
    </Dialog.Trigger>
    <Dialog.Content class="sm:max-w-md">
        <Dialog.Header>
            <Dialog.Title>Share Referral</Dialog.Title>
            <Dialog.Description>Share your referral link with friends and networks to earn rewards.</Dialog.Description>
        </Dialog.Header>
        <div class="flex items-center space-x-2">
            <div class="grid flex-1 gap-2">
                <Input id="link" readonly value={referralLink} />
            </div>
            <Button size="icon" variant="secondary" onclick={() => copy(referralLink)}>
                <span class="sr-only">Copy</span>
                <Copy class="h-4 w-4" />
            </Button>
        </div>
        <div class="flex justify-center gap-6 pt-4">
            <!-- Facebook -->
            <a href={facebookUrl} target="_blank" rel="noopener noreferrer" class="hover:scale-110 transition-transform">
                <svg class="h-8 w-8 text-blue-600 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
                    ><path
                        d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 2.848-6.463 6.388-6.463 1.695 0 3.155.126 3.578.183v3.841h-2.434c-2.022 0-2.435.961-2.435 2.39v1.628h4.594l-.6 3.667h-3.994v7.98h-5.093z"
                    /></svg
                >
            </a>
            <!-- X (Twitter) -->
            <a href={xUrl} target="_blank" rel="noopener noreferrer" class="hover:scale-110 transition-transform">
                <svg class="h-8 w-8 text-black dark:text-white fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
                    ><path
                        d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
                    /></svg
                >
            </a>
            <!-- WhatsApp -->
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" class="hover:scale-110 transition-transform">
                <svg class="h-8 w-8 text-green-500 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
                    ><path
                        d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.232-.298.347-.497.115-.198.058-.372-.03-.545-.089-.174-.808-1.946-1.106-2.664-.291-.702-.588-.606-.792-.619-.191-.01-.41-.01-.629-.01-.219 0-.575.083-.876.411-.3.33-1.102 1.077-1.102 2.627s1.129 3.049 1.285 3.259c.157.21 2.221 3.391 5.378 4.757 2.391 1.034 2.876.829 3.391.776.514-.052 1.644-.672 1.876-1.32.232-.647.232-1.2.164-1.32-.066-.119-.247-.193-.544-.342zM12.002 0C5.385 0 .012 5.372.012 11.987c0 2.113.551 4.17 1.603 6.007L.427 24l6.195-1.625c1.782.973 3.829 1.558 5.379 1.558 6.618 0 11.99-5.373 11.99-11.978C23.99 5.385 18.618.012 12.002 0z"
                    /></svg
                >
            </a>
            <!-- Email -->
            <a href={emailUrl} class="hover:scale-110 transition-transform">
                <Mail class="h-8 w-8 text-red-500" />
            </a>
        </div>
    </Dialog.Content>
</Dialog.Root>
