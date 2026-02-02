import { useState, useEffect, useCallback } from "react";

interface BitcoinPriceData {
  btcPrice: number | null;
  isLoading: boolean;
  error: string | null;
  lastUpdated: Date | null;
  convertToBtc: (usdAmount: number) => string;
  refetch: () => void;
}

const BITCOIN_WALLET_ADDRESS = "1JubZfEM6UxL7kNcGDCQuf5uTVt9tRauZY";

export const useBitcoinPrice = (): BitcoinPriceData => {
  const [btcPrice, setBtcPrice] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchBtcPrice = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Use CoinGecko's free API for BTC/USD price
      const response = await fetch(
        "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd",
        {
          headers: {
            "Accept": "application/json",
          },
        }
      );
      
      if (!response.ok) {
        throw new Error("Failed to fetch Bitcoin price");
      }
      
      const data = await response.json();
      const price = data?.bitcoin?.usd;
      
      if (typeof price === "number") {
        setBtcPrice(price);
        setLastUpdated(new Date());
      } else {
        throw new Error("Invalid price data received");
      }
    } catch (err) {
      console.error("Error fetching BTC price:", err);
      setError(err instanceof Error ? err.message : "Failed to fetch BTC price");
      // Use a fallback price if API fails (this won't be used for actual transactions)
      setBtcPrice(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBtcPrice();
    
    // Refresh price every 60 seconds
    const interval = setInterval(fetchBtcPrice, 60000);
    
    return () => clearInterval(interval);
  }, [fetchBtcPrice]);

  const convertToBtc = useCallback((usdAmount: number): string => {
    if (!btcPrice || btcPrice === 0) return "—";
    const btcAmount = usdAmount / btcPrice;
    // Format to 8 decimal places (satoshi precision)
    return btcAmount.toFixed(8);
  }, [btcPrice]);

  return {
    btcPrice,
    isLoading,
    error,
    lastUpdated,
    convertToBtc,
    refetch: fetchBtcPrice,
  };
};

export const BITCOIN_WALLET = BITCOIN_WALLET_ADDRESS;

export default useBitcoinPrice;
