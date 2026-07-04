<script lang="ts">
    import { siteSettings } from '$lib/stores/site.svelte';
    import { animate, splitText } from '$lib/utils/gsap';
</script>

<!-- Hero -->
<section class="border-b border-border/40 py-20 lg:py-28">
    <div class="mx-auto max-w-3xl px-6 lg:px-8">
        <p use:animate={{ type: 'fadeUp', delay: 0.1 }} class="editorial-label mb-6">Legal</p>
        <h1 use:splitText={{ delay: 0.2 }} class="editorial-heading text-5xl font-semibold text-foreground sm:text-6xl">Privacy Policy</h1>
        <p use:animate={{ type: 'fadeUp', delay: 0.6 }} class="mt-6 text-sm leading-relaxed text-muted-foreground">
            We are committed to protecting your privacy and ensuring the security of your personal information.
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
            <h3>1. Introduction</h3>
            <p>
                {siteSettings.company} ("we," "our," or "us") respects your privacy and is committed to protecting it through our compliance
                with this policy. This policy describes the types of information we may collect from you or that you may provide when you visit
                our website and our practices for collecting, using, maintaining, protecting, and disclosing that information.
            </p>

            <h3>2. Information We Collect</h3>
            <p>We collect several types of information from and about users of our Website, including information:</p>
            <ul>
                <li>By which you may be personally identified, such as name, postal address, e-mail address, or telephone number ("personal information");</li>
                <li>That is about you but individually does not identify you; and/or</li>
                <li>About your internet connection, the equipment you use to access our Website, and usage details.</li>
            </ul>

            <h3>3. How We Use Your Information</h3>
            <p>We use information that we collect about you or that you provide to us, including any personal information:</p>
            <ul>
                <li>To present our Website and its contents to you.</li>
                <li>To provide you with information, products, or services that you request from us.</li>
                <li>To fulfill any other purpose for which you provide it.</li>
                <li>To carry out our obligations and enforce our rights arising from any contracts entered into between you and us.</li>
            </ul>

            <h3>4. Data Security</h3>
            <p>
                We have implemented measures designed to secure your personal information from accidental loss and from unauthorized access, use,
                alteration, and disclosure. All information you provide to us is stored on our secure servers behind firewalls.
            </p>

            <h3>5. Changes to Our Privacy Policy</h3>
            <p>
                It is our policy to post any changes we make to our privacy policy on this page. If we make material changes to how we treat our
                users' personal information, we will notify you through a notice on the Website home page.
            </p>

            <h3>6. Contact Information</h3>
            <p>
                To ask questions or comment about this privacy policy and our privacy practices, contact us via our <a href="/contact-us">Contact Page</a>.
            </p>
        </div>
    </div>
</section>
