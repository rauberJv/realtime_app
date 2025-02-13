import { ExperimentDTO } from "../services/experiments/dto";

type MetricsCalculator = (experiments: ExperimentDTO[], experimentId?: string | null) => number | null;

const getExperimentsToProcess = (experiments: ExperimentDTO[], experimentId?: string | null): ExperimentDTO[] => {
    return experimentId 
        ? experiments.filter(exp => exp.experimentId === experimentId)
        : experiments;
};

const calculateTotalVisitors: MetricsCalculator = (experiments, experimentId) => {
    if (!experiments) return null;
    let totalVisitors = 0;

    const experimentsToProcess = getExperimentsToProcess(experiments, experimentId);

    for (const experiment of experimentsToProcess) {
        for (const liveUpdate of experiment.liveUpdates) {
            const variantKeys = Object.keys(liveUpdate).filter(key => key !== 'timestamp');
            for (const variantKey of variantKeys) {
                const variantData = liveUpdate[variantKey];
                if (typeof variantData !== 'string') {
                    totalVisitors += variantData.visitors;
                }
            }
        }
    }
    return totalVisitors;
};

const calculateConversionRate: MetricsCalculator = (experiments, experimentId) => {
    if (!experiments) return null;
    let totalVisitors = 0;
    let totalConversions = 0;

    const experimentsToProcess = getExperimentsToProcess(experiments, experimentId);

    for (const experiment of experimentsToProcess) {
        for (const liveUpdate of experiment.liveUpdates) {
            const variantKeys = Object.keys(liveUpdate).filter(key => key !== 'timestamp');
            for (const variantKey of variantKeys) {
                const variantData = liveUpdate[variantKey];
                if (typeof variantData !== 'string') {
                    totalVisitors += variantData.visitors;
                    totalConversions += variantData.conversions;
                }
            }
        }
    }

    if (totalVisitors === 0) return 0;
    return Number(((totalConversions / totalVisitors) * 100).toFixed(2));
};

const calculateRevenuePerVisitor: MetricsCalculator = (experiments, experimentId) => {
    if (!experiments) return null;
    let totalVisitors = 0;
    let totalRevenue = 0;

    const experimentsToProcess = getExperimentsToProcess(experiments, experimentId);

    for (const experiment of experimentsToProcess) {
        for (const liveUpdate of experiment.liveUpdates) {
            const variantKeys = Object.keys(liveUpdate).filter(key => key !== 'timestamp');
            for (const variantKey of variantKeys) {
                const variantData = liveUpdate[variantKey];
                if (typeof variantData !== 'string') {
                    totalVisitors += variantData.visitors;
                    totalRevenue += variantData.revenue;
                }
            }
        }
    }

    if (totalVisitors === 0) return 0;
    return Number((totalRevenue / totalVisitors).toFixed(2));
};

export { 
    calculateTotalVisitors, 
    calculateConversionRate, 
    calculateRevenuePerVisitor 
};