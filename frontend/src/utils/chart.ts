import { ExperimentDTO } from '../services/experiments/dto';

export interface BarChartDefinition {
    labels: string[],
    datasets: {
        label: string,
        data: number[],
        backgroundColor: string | string[],
        borderColor: string | string[],
        borderWidth: number
    }[]
}

const barChart = (experiments: ExperimentDTO[]): BarChartDefinition | null => {
    if (!experiments || experiments.length === 0) return null;
    const labels = [];
    const visitors = [];
    const conversions = [];
    const revenues = [];
    for(const experiment of experiments) {
        const lastUpdate = experiment.liveUpdates[experiment.liveUpdates.length - 1];
        const visitorsCount = lastUpdate.control.visitors + lastUpdate.variantB.visitors;
        const conversionsCount = lastUpdate.control.conversions + lastUpdate.variantB.conversions;
        const revenuesCount = lastUpdate.control.revenue + lastUpdate.variantB.revenue;
        visitors.push(visitorsCount);
        conversions.push(conversionsCount);
        revenues.push(revenuesCount);
        labels.push(experiment.experimentId);
    }
    const chartData = {
        labels,
        datasets: [
            {
                label: 'Visitors',
                data: visitors,
                backgroundColor: 'rgba(0, 0, 0, 0.84)',
                borderColor: 'rgb(0, 0, 0)',
                borderWidth: 1
            },
            {
                label: 'Conversions',
                data: conversions,
                backgroundColor: 'rgb(0, 11, 109)',
                borderColor: 'rgb(0, 11, 109)',
                borderWidth: 1
            },
            {
                label: 'Revenues',
                data: revenues,
                backgroundColor: 'rgb(87, 87, 87)',
                borderColor: 'rgb(87, 87, 87)',
                borderWidth: 1
            },
        ]
    };
    return chartData;
};

export interface TimeScaleChartDefinition {
    labels: string[],
    datasets: {
        label: string,
        data: number[],
        backgroundColor: string,
        borderColor: string,
        borderWidth: number,
        tension: number
    }[]
}

const timeScaleChart = (experiment: ExperimentDTO): TimeScaleChartDefinition | null => {
    if (!experiment || !experiment.liveUpdates.length) return null;

    const recentUpdates = experiment.liveUpdates.slice(-10);
    let labels = recentUpdates.map(update => update.timestamp);
    labels = labels.map(label => {
        const dateObject = new Date(label);
        return `${dateObject.getHours()}h${dateObject.getMinutes()}m${dateObject.getSeconds()}s`
    })
    const chartData = {
        labels,
        datasets: [
            {
                label: 'Control Visitors',
                data: recentUpdates.map(update => update.control.visitors),
                backgroundColor: 'rgba(0, 0, 0, 0.1)',
                borderColor: 'rgb(0, 0, 0)',
                borderWidth: 2,
                tension: 0.4
            },
            {
                label: 'Control Conversions',
                data: recentUpdates.map(update => update.control.conversions),
                backgroundColor: 'rgba(0, 11, 109, 0.1)',
                borderColor: 'rgb(0, 11, 109)',
                borderWidth: 2,
                tension: 0.4
            },
            {
                label: 'Control Revenue',
                data: recentUpdates.map(update => update.control.revenue),
                backgroundColor: 'rgba(87, 87, 87, 0.1)',
                borderColor: 'rgb(87, 87, 87)',
                borderWidth: 2,
                tension: 0.4
            },
            {
                label: 'Variant B Visitors',
                data: recentUpdates.map(update => update.variantB.visitors),
                backgroundColor: 'rgba(54, 162, 235, 0.1)',
                borderColor: 'rgb(54, 162, 235)',
                borderWidth: 2,
                tension: 0.4
            },
            {
                label: 'Variant B Conversions',
                data: recentUpdates.map(update => update.variantB.conversions),
                backgroundColor: 'rgba(255, 99, 132, 0.1)',
                borderColor: 'rgb(255, 99, 132)',
                borderWidth: 2,
                tension: 0.4
            },
            {
                label: 'Variant B Revenue',
                data: recentUpdates.map(update => update.variantB.revenue),
                backgroundColor: 'rgba(75, 192, 192, 0.1)',
                borderColor: 'rgb(75, 192, 192)',
                borderWidth: 2,
                tension: 0.4
            }
        ]
    };

    return chartData;
};

export { barChart, timeScaleChart }