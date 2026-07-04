<script lang="ts">
    import { onMount, onDestroy } from 'svelte';
    import Chart from 'chart.js/auto';
    import * as Card from '$lib/components/ui/card';

    let chartCanvas: HTMLCanvasElement;
    let chart: Chart;

    type TimeFrame = 'daily' | 'monthly' | 'yearly';
    let currentTimeFrame: TimeFrame = $state('monthly');

    const mockData = {
        daily: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            data: [1200, 1900, 3000, 5000, 2400, 3500, 4200],
        },
        monthly: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            data: [45000, 52000, 48000, 61000, 55000, 67000, 71000, 75000, 82000, 88000, 94000, 102000],
        },
        yearly: {
            labels: ['2021', '2022', '2023', '2024', '2025'],
            data: [250000, 420000, 680000, 950000, 1200000],
        },
    };

    function initChart() {
        if (chart) {
            chart.destroy();
        }

        const ctx = chartCanvas.getContext('2d');
        if (!ctx) return;

        const data = mockData[currentTimeFrame];

        chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: data.labels,
                datasets: [
                    {
                        label: 'Investments',
                        data: data.data,
                        fill: true,
                        backgroundColor: 'rgba(59, 130, 246, 0.1)',
                        borderColor: 'rgb(59, 130, 246)',
                        borderWidth: 2,
                        tension: 0.4,
                        pointBackgroundColor: 'rgb(59, 130, 246)',
                        pointBorderColor: '#fff',
                        pointHoverRadius: 6,
                        pointHoverBackgroundColor: 'rgb(59, 130, 246)',
                        pointHoverBorderColor: '#fff',
                        pointHoverBorderWidth: 2,
                        pointRadius: 4,
                        pointHitRadius: 10,
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false,
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false,
                        backgroundColor: 'rgba(17, 24, 39, 0.9)',
                        titleColor: '#fff',
                        bodyColor: '#fff',
                        borderColor: 'rgba(255, 255, 255, 0.1)',
                        borderWidth: 1,
                        padding: 12,
                        displayColors: false,
                        callbacks: {
                            label: function (context) {
                                let label = context.dataset.label || '';
                                if (label) {
                                    label += ': ';
                                }
                                if (context.parsed.y !== null) {
                                    label += new Intl.NumberFormat('en-US', {
                                        style: 'currency',
                                        currency: 'USD',
                                    }).format(context.parsed.y);
                                }
                                return label;
                            },
                        },
                    },
                },
                scales: {
                    x: {
                        grid: {
                            display: false,
                        },
                        ticks: {
                            color: 'rgba(156, 163, 175, 0.8)',
                            font: {
                                size: 12,
                            },
                        },
                    },
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(156, 163, 175, 0.1)',
                        },
                        ticks: {
                            color: 'rgba(156, 163, 175, 0.8)',
                            font: {
                                size: 12,
                            },
                            callback: function (value) {
                                if (Number(value) >= 1000) {
                                    return '$' + Number(value) / 1000 + 'k';
                                }
                                return '$' + value;
                            },
                        },
                    },
                },
            },
        });
    }

    $effect(() => {
        if (currentTimeFrame && chartCanvas) {
            initChart();
        }
    });

    onMount(() => {
        initChart();
    });

    onDestroy(() => {
        if (chart) {
            chart.destroy();
        }
    });

    function setTimeFrame(tf: TimeFrame) {
        currentTimeFrame = tf;
    }
</script>

<Card.Root class="flex h-full w-full flex-col overflow-hidden py-2">
    <Card.Header class="flex flex-row items-center justify-between space-y-0 py-7">
        <div class="space-y-1">
            <Card.Title class="text-lg font-semibold leading-none tracking-tight">Investment Growth</Card.Title>
            <Card.Description class="text-sm text-muted-foreground">Portfolio performance over time</Card.Description>
        </div>
        <div class="flex items-center gap-1 rounded-lg bg-muted p-1">
            <button
                class="rounded-md px-3 py-1.5 text-xs font-medium transition-colors {currentTimeFrame === 'daily'
                    ? 'bg-background text-foreground shadow-sm'
                    : 'text-muted-foreground hover:bg-background/50 hover:text-foreground'}"
                onclick={() => setTimeFrame('daily')}
            >
                Daily
            </button>
            <button
                class="rounded-md px-3 py-1.5 text-xs font-medium transition-colors {currentTimeFrame === 'monthly'
                    ? 'bg-background text-foreground shadow-sm'
                    : 'text-muted-foreground hover:bg-background/50 hover:text-foreground'}"
                onclick={() => setTimeFrame('monthly')}
            >
                Monthly
            </button>
            <button
                class="rounded-md px-3 py-1.5 text-xs font-medium transition-colors {currentTimeFrame === 'yearly'
                    ? 'bg-background text-foreground shadow-sm'
                    : 'text-muted-foreground hover:bg-background/50 hover:text-foreground'}"
                onclick={() => setTimeFrame('yearly')}
            >
                Yearly
            </button>
        </div>
    </Card.Header>

    <Card.Content class="relative min-h-[400px] w-full grow pb-3">
        <canvas bind:this={chartCanvas}></canvas>
    </Card.Content>
</Card.Root>
