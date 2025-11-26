const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

export interface Recommendation {
  id: string;
  symbol: string;
  action: string;
  price: number;
  volume: number;
  strategy: string;
  timeframe: string;
  wrSignal?: number;
  timestamp: string;
  receivedAt: string;
  createdAt: string;
  status: string;
}

export interface ChartDataPoint {
  date: string;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: number;
}

export interface StockChartData {
  symbol: string;
  currency: string;
  regularMarketPrice: number;
  previousClose?: number;
  chartData: ChartDataPoint[];
}

export interface RecommendationsResponse {
  success: boolean;
  count: number;
  recommendations: Recommendation[];
  allSignals: Recommendation[];
}

// Fetch recommendations from TradingView webhooks
export async function fetchRecommendations(limit = 10, action?: string): Promise<RecommendationsResponse> {
  const params = new URLSearchParams({ limit: limit.toString() });
  if (action) {
    params.append('action', action);
  }

  const response = await fetch(
    `${SUPABASE_URL}/functions/v1/get-recommendations?${params}`,
    {
      headers: {
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json'
      }
    }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch recommendations');
  }

  return response.json();
}

// Fetch stock chart data from Yahoo Finance
export async function fetchStockChart(
  symbol: string,
  range: '1d' | '5d' | '1mo' | '3mo' | '6mo' | '1y' = '3mo',
  interval: '1d' | '1wk' | '1mo' = '1d'
): Promise<StockChartData> {
  const params = new URLSearchParams({
    symbol,
    range,
    interval
  });

  const response = await fetch(
    `${SUPABASE_URL}/functions/v1/stock-chart-data?${params}`,
    {
      headers: {
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json'
      }
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch chart data for ${symbol}`);
  }

  return response.json();
}

// Fetch multiple stock charts in parallel
export async function fetchMultipleStockCharts(
  symbols: string[],
  range: '1d' | '5d' | '1mo' | '3mo' | '6mo' | '1y' = '1mo'
): Promise<Map<string, StockChartData>> {
  const results = new Map<string, StockChartData>();

  const promises = symbols.map(async (symbol) => {
    try {
      const data = await fetchStockChart(symbol, range);
      results.set(symbol, data);
    } catch (error) {
      console.error(`Failed to fetch chart for ${symbol}:`, error);
    }
  });

  await Promise.all(promises);
  return results;
}
