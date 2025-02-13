import {useEffect, useState} from "preact/hooks";
import {useRealtimeData} from "../contexts/RealtimeContext";
import {calculateConversionRate, calculateRevenuePerVisitor, calculateTotalVisitors} from "../utils/metrics";
import Card from "./Card";

interface MetricsSearchParameters {
    experimentId: string | null;
}

interface Metrics {
    totalVisitors: number | null;
    conversionRate: number | null;
    revenuePerVisitor: number | null;
}

const initialMetrics: Metrics = {
    conversionRate: null,
    totalVisitors: null,
    revenuePerVisitor: null,
};

const MetricsPanel: React.FC<MetricsSearchParameters> = ({ experimentId }) => {
    const { data } = useRealtimeData();
    const [metrics, setMetrics] = useState<Metrics>(initialMetrics);

    useEffect(() => {
        if (!data?.data) return;

        setMetrics({
            conversionRate: calculateConversionRate(data.data, experimentId),
            totalVisitors: calculateTotalVisitors(data.data, experimentId),
            revenuePerVisitor: calculateRevenuePerVisitor(data.data, experimentId)
        });
    }, [data, experimentId]);

    const experimentLabel = experimentId || 'All';

    return (
        <div className="flex flex-col w-full gap-y-4">
            <div>
                <h2 className="text-2xl font-bold">Metrics Panel</h2>
                <p>Selected Experiment: {experimentLabel}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 w-full">
                <Card 
                    title={metrics.totalVisitors?.toString() ?? '-'} 
                    description={`Total Visitors (${experimentLabel})`} 
                />
                <Card 
                    title={metrics.conversionRate?.toString() ?? '-'} 
                    description={`Conversion Rate (${experimentLabel})`} 
                />
                <Card 
                    title={metrics.revenuePerVisitor?.toString() ?? '-'} 
                    description={`Revenue P.V. (${experimentLabel})`} 
                />
            </div>
        </div>
    );
};

export default MetricsPanel;