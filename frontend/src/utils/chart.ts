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

export { barChart }