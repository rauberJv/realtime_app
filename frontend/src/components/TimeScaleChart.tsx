import { Line } from "react-chartjs-2"
import {ExperimentDTO} from "../services/experiments/dto"
import {timeScaleChart} from "../utils/chart"
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from "chart.js"
interface TimeScaleProps {
    experiment: ExperimentDTO
}
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
);
const TimeScaleChart: React.FC<TimeScaleProps> = ({ experiment }) => {
    const data = timeScaleChart(experiment);
    return (
        <div className="w-full h-full">
            <h2 className="text-lg font-bold">Experiment {experiment.experimentId}</h2>
            <Line data={data} />
        </div>
    )
}

export default TimeScaleChart