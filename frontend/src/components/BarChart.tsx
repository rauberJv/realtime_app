import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ChartOptions
} from "chart.js";
import {ExperimentDTO} from "../services/experiments/dto";
import { BarChartDefinition, barChart as generateBarChartData} from "../utils/chart"
import {useEffect, useState} from "preact/hooks";
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
);

interface BarChartProps {
    experiments: ExperimentDTO[] | null;
}

const BarChart: React.FC<BarChartProps> = ({ experiments }) => {
    const options: ChartOptions<'bar'> = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'General Experiment Results',
                font: {
                    size: 16,
                }
            }
        },
    };

    const [data, setData] = useState<BarChartDefinition | null>(null);

    useEffect(() => {
        if (experiments) {
            setData(generateBarChartData(experiments));
        }
    }, [experiments]);

    return (
        <div className="w-full h-full">
            {data ? <Bar options={options} data={data} /> : "Loading..."}
        </div>
    );
}

export default BarChart;