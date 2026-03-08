import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { Image, Loader2, CheckCircle, XCircle, AlertTriangle } from "lucide-react";
import { toast } from "sonner";

interface GenerationResult {
  id: string;
  name: string;
  status: string;
  imageUrl?: string;
  error?: string;
}

const BulkImageGenerator = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [results, setResults] = useState<GenerationResult[]>([]);
  const [totalGenerated, setTotalGenerated] = useState(0);

  const { data: missingCount, refetch } = useQuery({
    queryKey: ["products-missing-images"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("id", { count: "exact" })
        .or("image_url.is.null,image_url.not.ilike.%supabase.co/storage%");
      if (error) throw error;
      return data?.length || 0;
    },
  });

  const generateBatch = async () => {
    setIsGenerating(true);
    try {
      const { data, error } = await supabase.functions.invoke("bulk-generate-images", {
        body: { batchSize: 3 },
      });

      if (error) throw error;

      if (data.results) {
        setResults(prev => [...data.results, ...prev]);
        const successful = data.results.filter((r: GenerationResult) => r.status === "success").length;
        setTotalGenerated(prev => prev + successful);
        
        if (data.results.some((r: GenerationResult) => r.status === "rate_limited")) {
          toast.warning("Rate limited — wait 1-2 minutes before trying again");
        } else if (successful > 0) {
          toast.success(`Generated ${successful} image(s)`);
        }
      }

      if (data.message === "No products need images") {
        toast.success("All products have images!");
      }

      refetch();
    } catch (err) {
      toast.error("Failed to generate images");
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success": return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "rate_limited": return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      default: return <XCircle className="h-4 w-4 text-destructive" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Image className="h-5 w-5" />
          AI Image Generator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">
              <strong>{missingCount ?? "..."}</strong> products missing images
            </p>
            {totalGenerated > 0 && (
              <p className="text-sm text-green-600">
                {totalGenerated} generated this session
              </p>
            )}
          </div>
          <Button onClick={generateBatch} disabled={isGenerating || missingCount === 0}>
            {isGenerating ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Generating...
              </>
            ) : (
              "Generate Batch (3)"
            )}
          </Button>
        </div>

        {results.length > 0 && (
          <div className="max-h-64 overflow-y-auto space-y-2 border rounded-md p-3">
            {results.map((r, i) => (
              <div key={`${r.id}-${i}`} className="flex items-center gap-2 text-sm">
                {getStatusIcon(r.status)}
                <span className="truncate flex-1">{r.name}</span>
                <span className="text-muted-foreground text-xs">{r.status}</span>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BulkImageGenerator;
