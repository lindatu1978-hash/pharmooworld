import { useState } from "react";
import { Bitcoin, Copy, Check, QrCode, RefreshCw } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useBitcoinPrice, BITCOIN_WALLET } from "@/hooks/useBitcoinPrice";
import { useToast } from "@/hooks/use-toast";

interface BitcoinPaymentDetailsProps {
  usdAmount: number;
  showQrCode?: boolean;
}

export const BitcoinPaymentDetails = ({
  usdAmount,
  showQrCode = true,
}: BitcoinPaymentDetailsProps) => {
  const { btcPrice, isLoading, convertToBtc, refetch, lastUpdated } = useBitcoinPrice();
  const [copied, setCopied] = useState<"address" | "amount" | null>(null);
  const { toast } = useToast();

  const btcAmount = convertToBtc(usdAmount);

  const handleCopy = async (text: string, type: "address" | "amount") => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(type);
      toast({
        title: "Copied!",
        description: `${type === "address" ? "Wallet address" : "BTC amount"} copied to clipboard`,
      });
      setTimeout(() => setCopied(null), 2000);
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please copy manually",
        variant: "destructive",
      });
    }
  };

  // Generate QR code URL using a free QR code API
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=bitcoin:${BITCOIN_WALLET}?amount=${btcAmount}`;

  return (
    <Card className="border-orange-500/20 bg-orange-500/5">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Bitcoin className="h-5 w-5 text-orange-500" />
          Bitcoin Payment
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* BTC Amount */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Amount to Pay</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={refetch}
              className="h-6 px-2"
              disabled={isLoading}
            >
              <RefreshCw className={`h-3 w-3 ${isLoading ? "animate-spin" : ""}`} />
            </Button>
          </div>
          <div className="flex items-center justify-between p-3 bg-background rounded-lg border">
            <div>
              <p className="text-2xl font-bold text-orange-500">
                {isLoading ? "Loading..." : `${btcAmount} BTC`}
              </p>
              <p className="text-sm text-muted-foreground">
                ≈ ${usdAmount.toFixed(2)} USD
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleCopy(btcAmount, "amount")}
              disabled={isLoading || btcAmount === "—"}
            >
              {copied === "amount" ? (
                <Check className="h-4 w-4" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </div>
          {btcPrice && (
            <p className="text-xs text-muted-foreground text-center">
              Rate: 1 BTC = ${btcPrice.toLocaleString()} USD
              {lastUpdated && ` • Updated ${lastUpdated.toLocaleTimeString()}`}
            </p>
          )}
        </div>

        {/* Wallet Address */}
        <div className="space-y-2">
          <span className="text-sm text-muted-foreground">Send to Wallet Address</span>
          <div className="flex items-center gap-2 p-3 bg-background rounded-lg border">
            <code className="flex-1 text-xs break-all font-mono">{BITCOIN_WALLET}</code>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleCopy(BITCOIN_WALLET, "address")}
            >
              {copied === "address" ? (
                <Check className="h-4 w-4" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>

        {/* QR Code */}
        {showQrCode && (
          <div className="flex flex-col items-center gap-2 pt-2">
            <div className="p-3 bg-white rounded-lg">
              <img
                src={qrCodeUrl}
                alt="Bitcoin payment QR code"
                width={160}
                height={160}
                className="rounded"
              />
            </div>
            <Badge variant="outline" className="text-xs">
              <QrCode className="h-3 w-3 mr-1" />
              Scan to pay
            </Badge>
          </div>
        )}

        {/* Important Notes */}
        <div className="text-xs text-muted-foreground space-y-1 pt-2 border-t">
          <p>• Send exact BTC amount to avoid payment issues</p>
          <p>• Payment confirmation may take 10-60 minutes</p>
          <p>• Rate is updated every 60 seconds</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default BitcoinPaymentDetails;
