export const formatXAxis = (tickItem: string) => {
    try {
        const date = new Date(tickItem);
        return date.toLocaleString("en-US", { month: "short" });
    } catch (e) {
        return tickItem;
    }
};

// STATUS COLORS
export const STATUS_COLORS: Record<string, string> = {
  completed: "#00BC7D",
  inProgress: "#2B7FFF",
  canceled: "#DC2626",
};

// FILTER STATUS
export const ALLOWED_STATUSES = ["completed", "inProgress", "canceled"];