<script lang="ts">
    import { siteSettings } from '$lib/stores/site.svelte';
    import { animate, splitText } from '$lib/utils/gsap';
</script>

<!-- Hero -->
<section class="border-b border-border/40 py-20 lg:py-28">
    <div class="mx-auto max-w-3xl px-6 lg:px-8">
        <p use:animate={{ type: 'fadeUp', delay: 0.1 }} class="editorial-label mb-6">Legal</p>
        <h1 use:splitText={{ delay: 0.2 }} class="editorial-heading text-5xl font-semibold text-foreground sm:text-6xl">Terms of Use</h1>
        <p use:animate={{ type: 'fadeUp', delay: 0.6 }} class="mt-6 text-sm leading-relaxed text-muted-foreground">
            Please read these terms and conditions carefully before using our website.
        </p>
    </div>
</section>

<!-- Content -->
<section class="py-16 lg:py-24">
    <div class="mx-auto max-w-3xl px-6 lg:px-8">
        <p class="mb-10 text-xs text-muted-foreground">
            Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
        <div class="prose prose-sm prose-gray dark:prose-invert max-w-none">
            <h3>1. Acceptance of the Terms of Use</h3>
            <p>
                These terms of use are entered into by and between You and {siteSettings.company} ("Company," "we," or "us"). The following
                terms and conditions, together with any documents they expressly incorporate by reference (collectively, "Terms of Use"), govern
                your access to and use of our website, including any content, functionality, and services offered on or through the website.
            </p>

            <h3>2. No Investment Advice</h3>
            <p>
                The content of this website is for informational purposes only and does not constitute investment advice. You should not construe
                any such information or other material as legal, tax, investment, financial, or other advice. Nothing contained on our Site
                constitutes a solicitation, recommendation, endorsement, or offer by {siteSettings.siteName} or any third party service provider to buy or sell
                any securities or other financial instruments in this or in any other jurisdiction in which such solicitation or offer would be
                unlawful under the securities laws of such jurisdiction.
            </p>

            <h3>3. Intellectual Property Rights</h3>
            <p>
                The Website and its entire contents, features, and functionality (including but not limited to all information, software, text,
                displays, images, video, and audio, and the design, selection, and arrangement thereof) are owned by the Company, its licensors,
                or other providers of such material and are protected by United States and international copyright, trademark, patent, trade
                secret, and other intellectual property or proprietary rights laws.
            </p>

            <h3>4. Prohibited Uses</h3>
            <p>You may use the Website only for lawful purposes and in accordance with these Terms of Use. You agree not to use the Website:</p>
            <ul>
                <li>In any way that violates any applicable federal, state, local, or international law or regulation.</li>
                <li>To transmit, or procure the sending of, any advertising or promotional material without our prior written consent.</li>
                <li>To impersonate or attempt to impersonate the Company, a Company employee, another user, or any other person or entity.</li>
            </ul>

            <h3>5. Disclaimer of Warranties</h3>
            <p>
                You understand that we cannot and do not guarantee or warrant that files available for downloading from the internet or the
                Website will be free of viruses or other destructive code. You are responsible for implementing sufficient procedures and
                checkpoints to satisfy your particular requirements for anti-virus protection and accuracy of data input and output.
            </p>

            <h3>6. Limitation on Liability</h3>
            <p>
                TO THE FULLEST EXTENT PROVIDED BY LAW, IN NO EVENT WILL THE COMPANY, ITS AFFILIATES, OR THEIR LICENSORS, SERVICE PROVIDERS,
                EMPLOYEES, AGENTS, OFFICERS, OR DIRECTORS BE LIABLE FOR DAMAGES OF ANY KIND, UNDER ANY LEGAL THEORY, ARISING OUT OF OR IN
                CONNECTION WITH YOUR USE, OR INABILITY TO USE, THE WEBSITE, ANY WEBSITES LINKED TO IT, ANY CONTENT ON THE WEBSITE OR SUCH OTHER
                WEBSITES.
            </p>

            <h3>7. Changes to the Terms of Use</h3>
            <p>
                We may revise and update these Terms of Use from time to time in our sole discretion. All changes are effective immediately when
                we post them.
            </p>
        </div>
    </div>
</section>
