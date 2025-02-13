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
    Legend,
    ChartOptions
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
    const options: ChartOptions<'line'> = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const
            },
            title: {
                display: true,
                text: `${experiment.experimentId} results`,
                font: {
                    size: 16
                }
            }
        }
    }
    const data = timeScaleChart(experiment);
    return (
        <div className="w-full h-full">
            <Line data={data} options={options}/>
        </div>
    )
}

export default TimeScaleChart