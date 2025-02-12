export interface ExperimentDTO {
	id: string;
	name: string;
	visitors: number;
	conversions: number;
	revenue: number;
}

export interface ExperimentResponseDTO {
	experiments: ExperimentDTO[];
}