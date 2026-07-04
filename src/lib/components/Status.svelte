<script lang="ts">
    import { Badge } from '$lib/components/ui/badge/index.js';
    import { CircleCheck, Clock, CircleX, Ban, CircleAlert, Check, X, History, BadgeCheck, ShieldCheck } from 'lucide-svelte';

    let { status }: { status: string } = $props();

    const normalizedStatus = $derived(status?.toLowerCase() || '');

    const statusConfig = {
        active: {
            color: 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-950/50 dark:text-emerald-400',
            icon: BadgeCheck,
            label: 'Active',
        },
        approved: {
            color: 'bg-green-50 text-green-700 hover:bg-green-100 dark:bg-green-950/50 dark:text-green-400',
            icon: Check,
            label: 'Approved',
        },
        paid: {
            color: 'bg-green-50 text-green-700 hover:bg-green-100 dark:bg-green-950/50 dark:text-green-400',
            icon: Check,
            label: 'Paid',
        },
        published: {
            color: 'bg-green-50 text-green-700 hover:bg-green-100 dark:bg-green-950/50 dark:text-green-400',
            icon: Check,
            label: 'Published',
        },
        draft: {
            color: 'bg-amber-50 text-amber-700 hover:bg-amber-100 dark:bg-amber-950/50 dark:text-amber-400',
            icon: Clock,
            label: 'Draft',
        },
        completed: {
            color: 'bg-blue-50 text-blue-700 hover:bg-blue-100 dark:bg-blue-950/50 dark:text-blue-400',
            icon: CircleCheck,
            label: 'Completed',
        },
        pending: {
            color: 'bg-amber-50 text-amber-700 hover:bg-amber-100 dark:bg-amber-950/50 dark:text-amber-400',
            icon: Clock,
            label: 'Pending',
        },
        inactive: {
            color: 'bg-slate-50 text-slate-700 hover:bg-slate-100 dark:bg-slate-950/50 dark:text-slate-400',
            icon: CircleAlert,
            label: 'Inactive',
        },
        rejected: {
            color: 'bg-red-50 text-red-700 hover:bg-red-100 dark:bg-red-950/50 dark:text-red-400',
            icon: X,
            label: 'Rejected',
        },
        failed: {
            color: 'bg-rose-50 text-rose-700 hover:bg-rose-100 dark:bg-rose-950/50 dark:text-rose-400',
            icon: CircleX,
            label: 'Failed',
        },
        cancelled: {
            color: 'bg-gray-50 text-gray-700 hover:bg-gray-100 dark:bg-gray-950/50 dark:text-gray-400',
            icon: History,
            label: 'Cancelled',
        },
        blocked: {
            color: 'bg-red-50 text-red-700 hover:bg-red-100 dark:bg-red-950/50 dark:text-red-400',
            icon: Ban,
            label: 'Blocked',
        },
        unverified: {
            color: 'bg-amber-50 text-amber-700 hover:bg-amber-100 dark:bg-amber-950/50 dark:text-amber-400',
            icon: Ban,
            label: 'Unverified',
        },
        verified: {
            color: 'bg-green-50 text-green-700 hover:bg-green-100 dark:bg-green-950/50 dark:text-green-400',
            icon: ShieldCheck,
            label: 'Verified',
        },
    };

    const config = $derived(
        statusConfig[normalizedStatus as keyof typeof statusConfig] || {
            color: 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-100',
            icon: null,
            label: status,
        },
    );
</script>

<Badge variant="secondary" class="gap-1.5 px-2.5 py-0.5 text-[11px] selection:bg-transparent {config.color}">
    {#if config.icon}
        <config.icon class="size-3.5" />
    {/if}
    {config.label}
</Badge>
