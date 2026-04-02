export interface StatsOverview {
  totalTrainingCount: number;
  consecutiveDays: number;
  monthCompletionRate: number;
  monthTrainingDuration: number;
  weekTrainingCount: number;
  weekCompletionRate: number;
}
export interface TrendData {
  labels: string[];
  trainingCounts: number[];
  completionRates: number[];
}
