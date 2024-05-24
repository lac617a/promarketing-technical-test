export interface DataProviders {
  id: number;
  name: string;
  Name: string;
  description: string;
  Description: string;
}

export interface DataSelfLimitationRequest {
  description?: string;
  dailyAmount: number;
  weeklyAmount: number;
  monthlyAmount: number;
  minimumAmount: number;
}
