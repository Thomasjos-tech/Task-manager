import { Badge } from "@/components/ui/badge";
import { Status } from "@/lib/store";
import { cn } from "@/lib/utils";

const styles: Record<Status, string> = {
  Todo: "bg-muted text-muted-foreground hover:bg-muted",
  "In Progress": "bg-warning/15 text-warning hover:bg-warning/15 border-warning/20",
  Done: "bg-success/15 text-success hover:bg-success/15 border-success/20",
};

export const StatusBadge = ({ status }: { status: Status }) => (
  <Badge variant="outline" className={cn("font-medium", styles[status])}>
    {status}
  </Badge>
);