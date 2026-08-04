import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  value: number;
  size?: "sm" | "md" | "lg";
  className?: string;
  interactive?: boolean;
  onChange?: (value: number) => void;
}

const sizeMap = {
  sm: "h-3.5 w-3.5",
  md: "h-4 w-4",
  lg: "h-6 w-6",
};

const StarRating = ({ value, size = "md", className, interactive = false, onChange }: StarRatingProps) => {
  const stars = [1, 2, 3, 4, 5];

  if (interactive) {
    return (
      <div className={cn("flex items-center gap-1", className)} role="radiogroup" aria-label="Star rating">
        {stars.map((star) => (
          <button
            key={star}
            type="button"
            role="radio"
            aria-checked={value === star}
            aria-label={`${star} star${star > 1 ? "s" : ""}`}
            onClick={() => onChange?.(star)}
            className="p-1.5 -m-0.5 rounded-md hover:bg-muted transition-colors"
          >
            <Star
              className={cn(
                sizeMap[size],
                star <= value ? "fill-warning text-warning" : "text-muted-foreground",
              )}
            />
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className={cn("flex items-center gap-0.5", className)} aria-label={`Rated ${value.toFixed(1)} out of 5`}>
      {stars.map((star) => (
        <Star
          key={star}
          aria-hidden="true"
          className={cn(
            sizeMap[size],
            star <= Math.round(value) ? "fill-warning text-warning" : "text-muted-foreground/40",
          )}
        />
      ))}
    </div>
  );
};

export default StarRating;
