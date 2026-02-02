import { Bitcoin, RefreshCw } from "lucide-react";
import { useBitcoinPrice } from "@/hooks/useBitcoinPrice";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface BitcoinPriceDisplayProps {
  usdAmount: number;
  showRefresh?: boolean;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export const BitcoinPriceDisplay = ({
  usdAmount,
  showRefresh = false,
  className,
  size = "md",
}: BitcoinPriceDisplayProps) => {
  const { btcPrice, isLoading, convertToBtc, refetch, lastUpdated } = useBitcoinPrice();

  const sizeClasses = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  };

  const iconSizes = {
    sm: "h-3 w-3",
    md: "h-4 w-4",
    lg: "h-5 w-5",
  };

  if (isLoading) {
    return (
      <span className={cn("flex items-center gap-1 text-muted-foreground animate-pulse", sizeClasses[size], className)}>
        <Bitcoin className={iconSizes[size]} />
        <span>Loading...</span>
      </span>
    );
  }

  const btcAmount = convertToBtc(usdAmount);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <span className={cn("flex items-center gap-1 text-orange-500", sizeClasses[size], className)}>
            <Bitcoin className={iconSizes[size]} />
            <span className="font-medium">{btcAmount} BTC</span>
            {showRefresh && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  refetch();
                }}
                className="ml-1 hover:text-orange-400 transition-colors"
                aria-label="Refresh Bitcoin price"
              >
                <RefreshCw className="h-3 w-3" />
              </button>
            )}
          </span>
        </TooltipTrigger>
        <TooltipContent>
          <p>
            1 BTC = ${btcPrice?.toLocaleString() ?? "—"} USD
            {lastUpdated && (
              <span className="block text-xs text-muted-foreground">
                Updated: {lastUpdated.toLocaleTimeString()}
              </span>
            )}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default BitcoinPriceDisplay;
