<script lang="ts">
    import { siteSettings } from '$lib/stores/site.svelte';
    import { animate, splitText } from '$lib/utils/gsap';
</script>

<!-- Hero -->
<section class="border-b border-border/40 py-20 lg:py-28">
    <div class="mx-auto max-w-3xl px-6 lg:px-8">
        <p use:animate={{ type: 'fadeUp', delay: 0.1 }} class="editorial-label mb-6">Legal</p>
        <h1 use:splitText={{ delay: 0.2 }} class="editorial-heading text-5xl font-semibold text-foreground sm:text-6xl">Regulatory Disclosures</h1>
        <p use:animate={{ type: 'fadeUp', delay: 0.6 }} class="mt-6 text-sm leading-relaxed text-muted-foreground">
            Important information regarding our regulatory status, business practices, and client protections.
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
            <h3>1. SEC Registration</h3>
            <p>
                {siteSettings.company} is an investment adviser registered with the U.S. Securities and Exchange Commission ("SEC").
                Registration as an investment adviser does not imply a certain level of skill or training. Additional information about {siteSettings.company}
                is available on the SEC's website at <a href="https://www.adviserinfo.sec.gov" target="_blank" rel="noopener noreferrer">www.adviserinfo.sec.gov</a>.
            </p>

            <h3>2. Form ADV</h3>
            <p>
                Our Form ADV Part 2A Brochure provides information about our qualifications and business practices. If you have any questions
                about the contents of this Brochure, please contact us. The information in this Brochure has not been approved or verified by the
                United States Securities and Exchange Commission or by any state securities authority.
            </p>

            <div class="my-8 border border-border/40 p-6">
                <h4 class="mb-4 text-sm font-semibold text-foreground">Download Documents</h4>
                <ul class="list-none space-y-3 pl-0">
                    <li>
                        <a href="#" class="flex items-center gap-2 text-sm text-foreground underline underline-offset-4 decoration-muted-foreground hover:decoration-foreground transition-all">
                            <span class="material-icons text-sm">description</span>
                            Form ADV Part 2A (Firm Brochure)
                        </a>
                    </li>
                    <li>
                        <a href="#" class="flex items-center gap-2 text-sm text-foreground underline underline-offset-4 decoration-muted-foreground hover:decoration-foreground transition-all">
                            <span class="material-icons text-sm">description</span>
                            Part 3: Client Relationship Summary (Form CRS)
                        </a>
                    </li>
                </ul>
            </div>

            <h3>3. Proxy Voting</h3>
            <p>
                It is our policy not to vote proxies on behalf of our clients unless specifically agreed to in writing. Clients will receive proxy
                materials directly from the custodian or transfer agent and are responsible for voting their own proxies.
            </p>

            <h3>4. Code of Ethics</h3>
            <p>
                {siteSettings.siteName} has adopted a Code of Ethics pursuant to SEC Rule 204A-1. The Code describes the high standard of business conduct we
                expect of our supervised persons and sets forth provisions regarding potential conflicts of interest, personal securities
                transactions, and the protection of confidential information. A copy of our Code of Ethics is available to clients and prospective
                clients upon request.
            </p>

            <h3>5. Business Continuity Plan</h3>
            <p>
                We have developed a Business Continuity Plan to address how we will respond to events that significantly disrupt our business.
                Since the timing and impact of disasters and disruptions is unpredictable, we will have to be flexible in responding to actual
                events as they occur. Our plan covers data backup and recovery, mission critical systems, financial and operational assessments,
                alternative communications, and alternate physical location of employees.
            </p>

            <h3>6. Anti-Money Laundering</h3>
            <p>
                To help the government fight the funding of terrorism and money laundering activities, federal law requires all financial
                institutions to obtain, verify, and record information that identifies each person who opens an account. What this means for you:
                When you open an account, we will ask for your name, address, date of birth, and other information that will allow us to identify
                you. We may also ask to see your driver's license or other identifying documents.
            </p>
        </div>
    </div>
</section>
