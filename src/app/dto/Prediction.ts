// Define interfaces for API responses
export interface Prediction {
  label: string;
  confidence: number;
  [key: string]: unknown; // Accommodates additional metadata returned by the service
}
