import {useRealtimeData} from "../contexts/RealtimeContext";
import BarChart from "./BarChart";

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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full">
                <div>
                    <BarChart experiments={data?.data ?? null}/>
                </div>
            </div>
        </div>
    )
}

export default ChartPanel;