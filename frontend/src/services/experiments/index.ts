import { ExperimentDTO, ExperimentResponseDTO } from "./dto";

const getAllExperiments = async (): Promise<ExperimentResponseDTO> => {
	const response = await fetch('http://localhost:3000/api/experiments/live');
	const data = await response.json();
	return data;
};

const getExperimentMetrics = async (experimentId: string): Promise<ExperimentDTO> => {
	const response = await fetch(`http://localhost:3000/api/experiments/${experimentId}/metrics`);
	const data = await response.json();
	return data;
};

export { getAllExperiments, getExperimentMetrics };
