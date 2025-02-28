export interface ExperimentVariant {
	name: string;
	visitors: number;
	conversions: number;
	revenue: number;
}

interface VariantMetrics {
	visitors: number;
	conversions: number;
	revenue: number;
}

export interface ExperimentLiveUpdate {
	timestamp: string;
	control: VariantMetrics;
	variantB: VariantMetrics;
}

export interface ExperimentDTO {
	experimentId: string;
	variants: ExperimentVariant[],
	liveUpdates: ExperimentLiveUpdate[]
}

export interface ExperimentResponseDTO {
	experiments: ExperimentDTO[];
}