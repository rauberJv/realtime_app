import {useRealtimeData} from "../contexts/RealtimeContext";
import BarChart from "./BarChart";
import TimeScaleChart from "./TimeScaleChart";

interface ChartPanelProps {
    experimentId?: string | null;
}
const ChartPanel: React.FC<ChartPanelProps> = ({ experimentId }) => {
    const { data } = useRealtimeData();
    const experimentLabel = experimentId ?? '';

    return (
        <div className="flex flex-col w-full gap-y-4">
            <div>
                <h2 className="text-2xl font-bold">Charts Panel</h2>
                <p>Selected Experiment: {experimentLabel}</p>
            </div>
            <div className="grid grid-cols-12 w-full gap-8">
                <div className="col-span-12 lg:col-span-6">
                    <BarChart experiments={data?.data ?? null}/>
                </div>
                { data?.data.map(experiment => 
                <div className="col-span-12 lg:col-span-6">
                    <TimeScaleChart experiment={experiment} />
                </div>
                )}
            </div>
        </div>
    )
}

export default ChartPanel;