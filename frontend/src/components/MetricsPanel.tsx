import {useEffect, useState} from "preact/hooks";
import {useRealtimeData} from "../contexts/RealtimeContext";
import {calculateConversionRate, calculateRevenuePerVisitor, calculateTotalVisitors} from "../utils/metrics";
import Card from "./Card";

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

const MetricsPanel = () => {
    const { data } = useRealtimeData();
    const [metrics, setMetrics] = useState<Metrics>(initialMetrics);
    const [experimentOptions, setExperimentOptions] = useState<string[]>([]);
    const [selectedExperiment, setSelectedExperiment] = useState<string | null>(null);

    useEffect(() => {
        if (!data?.data) return;
        
        setMetrics({
            conversionRate: calculateConversionRate(data.data, selectedExperiment),
            totalVisitors: calculateTotalVisitors(data.data, selectedExperiment),
            revenuePerVisitor: calculateRevenuePerVisitor(data.data, selectedExperiment),
        });
        
        const uniqueExperiments = Array.from(new Set(data.data.map(exp => exp.experimentId)));
        setExperimentOptions(uniqueExperiments);
    }, [data, selectedExperiment]);

    return (
        <div className="flex flex-col w-full gap-y-4">
            <div>
                <h2 className="text-2xl font-bold">
                    Metrics Panel <span className="font-normal">for</span> {selectedExperiment ?? 'All'}
                </h2>
                <div className="flex flex-row gap-4">
                    <button 
                        onClick={() => setSelectedExperiment(null)} 
                        className={`rounded-lg border border-gray-800 ${
                            selectedExperiment == null ? 'bg-black text-white' : 'bg-white text-black'
                        } hover:opacity-75 hover:cursor-pointer px-4 py-2 transition duration-300 ease-in-out`}
                    >
                        All
                    </button>
                    {experimentOptions?.map(experiment => (
                        <button 
                            key={experiment}
                            onClick={() => setSelectedExperiment(experiment)} 
                            className={`rounded-lg border border-gray-800 ${
                                selectedExperiment === experiment ? 'bg-black text-white' : 'bg-white text-black'
                            } hover:opacity-75 hover:cursor-pointer px-4 py-2 transition duration-300 ease-in-out`}
                        >
                            {experiment}
                        </button>
                    ))}
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 w-full">
                <Card 
                    title={metrics.totalVisitors?.toString() ?? '-'} 
                    description={`Total Visitors (${selectedExperiment ?? 'All'})`} 
                />
                <Card 
                    title={metrics.conversionRate?.toString() ?? '-'} 
                    description={`Conversion Rate (${selectedExperiment ?? 'All'})`} 
                />
                <Card 
                    title={metrics.revenuePerVisitor?.toString() ?? '-'} 
                    description={`Revenue P.V. (${selectedExperiment ?? 'All'})`} 
                />
            </div>
        </div>
    );
};

export default MetricsPanel;