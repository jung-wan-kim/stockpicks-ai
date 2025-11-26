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

export interface SignalMarker {
  date: string;
  price: number;
  action: 'buy' | 'sell';
  strategy: string;
}

export interface ChartDataWithSignals extends ChartDataPoint {
  signal?: 'buy' | 'sell';
  signalPrice?: number;
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
export async function fetchRecommendations(limit = 20, action?: string): Promise<RecommendationsResponse> {
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

// Merge chart data with signal markers
export function mergeChartWithSignals(
  chartData: ChartDataPoint[],
  signals: Recommendation[]
): ChartDataWithSignals[] {
  const signalMap = new Map<string, Recommendation>();

  // Create a map of date -> signal
  signals.forEach(signal => {
    const signalDate = signal.timestamp?.split('T')[0] || signal.createdAt?.split('T')[0];
    if (signalDate) {
      // If multiple signals on same date, keep the latest
      if (!signalMap.has(signalDate) || new Date(signal.createdAt) > new Date(signalMap.get(signalDate)!.createdAt)) {
        signalMap.set(signalDate, signal);
      }
    }
  });

  return chartData.map(point => {
    const signal = signalMap.get(point.date);
    if (signal) {
      return {
        ...point,
        signal: signal.action as 'buy' | 'sell',
        signalPrice: signal.price
      };
    }
    return point;
  });
}

// Get signals for a specific symbol
export function getSignalsForSymbol(
  allSignals: Recommendation[],
  symbol: string
): Recommendation[] {
  return allSignals.filter(s => s.symbol === symbol);
}

// Calculate performance metrics from signals
export function calculatePerformanceMetrics(recommendations: Recommendation[]) {
  const buySignals = recommendations.filter(r => r.action === 'buy');
  const sellSignals = recommendations.filter(r => r.action === 'sell');

  // Group by symbol to find paired trades
  const symbolGroups = new Map<string, Recommendation[]>();
  recommendations.forEach(r => {
    const existing = symbolGroups.get(r.symbol) || [];
    existing.push(r);
    symbolGroups.set(r.symbol, existing);
  });

  const trades: { symbol: string; entry: number; exit?: number; pnl?: number; daysHeld?: number }[] = [];

  symbolGroups.forEach((signals, symbol) => {
    const sorted = signals.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    let currentTrade: { symbol: string; entry: number; entryDate: Date } | null = null;

    sorted.forEach(signal => {
      if (signal.action === 'buy' && !currentTrade) {
        currentTrade = {
          symbol,
          entry: signal.price,
          entryDate: new Date(signal.createdAt)
        };
      } else if (signal.action === 'sell' && currentTrade) {
        const daysHeld = Math.floor((new Date(signal.createdAt).getTime() - currentTrade.entryDate.getTime()) / (1000 * 60 * 60 * 24));
        const pnl = ((signal.price - currentTrade.entry) / currentTrade.entry) * 100;
        trades.push({
          symbol: currentTrade.symbol,
          entry: currentTrade.entry,
          exit: signal.price,
          pnl,
          daysHeld
        });
        currentTrade = null;
      }
    });

    // Open position (buy without sell)
    if (currentTrade) {
      trades.push({
        symbol: currentTrade.symbol,
        entry: currentTrade.entry
      });
    }
  });

  const closedTrades = trades.filter(t => t.exit !== undefined);
  const winningTrades = closedTrades.filter(t => (t.pnl || 0) > 0);
  const totalReturn = closedTrades.reduce((sum, t) => sum + (t.pnl || 0), 0);
  const avgReturn = closedTrades.length > 0 ? totalReturn / closedTrades.length : 0;
  const winRate = closedTrades.length > 0 ? (winningTrades.length / closedTrades.length) * 100 : 0;
  const avgHoldingDays = closedTrades.length > 0
    ? closedTrades.reduce((sum, t) => sum + (t.daysHeld || 0), 0) / closedTrades.length
    : 0;

  return {
    totalSignals: recommendations.length,
    buySignals: buySignals.length,
    sellSignals: sellSignals.length,
    closedTrades: closedTrades.length,
    openPositions: trades.length - closedTrades.length,
    winRate,
    avgReturn,
    totalReturn,
    avgHoldingDays,
    trades,
    winningTrades: winningTrades.length,
    losingTrades: closedTrades.length - winningTrades.length
  };
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

// Get unique symbols from recommendations
export function getUniqueSymbols(recommendations: Recommendation[]): string[] {
  return [...new Set(recommendations.map(r => r.symbol))];
}

// Group recommendations by various criteria
export function groupRecommendations(recommendations: Recommendation[]) {
  const byAction = {
    buy: recommendations.filter(r => r.action === 'buy'),
    sell: recommendations.filter(r => r.action === 'sell'),
    other: recommendations.filter(r => r.action !== 'buy' && r.action !== 'sell')
  };

  const byStrategy = recommendations.reduce((acc, r) => {
    const strategy = r.strategy || 'Unknown';
    if (!acc[strategy]) acc[strategy] = [];
    acc[strategy].push(r);
    return acc;
  }, {} as Record<string, Recommendation[]>);

  const byTimeframe = recommendations.reduce((acc, r) => {
    const tf = r.timeframe || '1D';
    if (!acc[tf]) acc[tf] = [];
    acc[tf].push(r);
    return acc;
  }, {} as Record<string, Recommendation[]>);

  const bySymbol = recommendations.reduce((acc, r) => {
    if (!acc[r.symbol]) acc[r.symbol] = [];
    acc[r.symbol].push(r);
    return acc;
  }, {} as Record<string, Recommendation[]>);

  return { byAction, byStrategy, byTimeframe, bySymbol };
}
