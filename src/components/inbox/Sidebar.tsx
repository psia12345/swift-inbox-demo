import { Menu, Mail, CalendarDays } from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  return (
    <div className={cn("w-14 border-r bg-background flex flex-col items-center py-4 gap-2", className)}>
      <button className="p-2 hover:bg-muted rounded-lg transition-colors">
        <Menu className="w-5 h-5 text-muted-foreground" />
      </button>
      
      <div className="flex-1 flex flex-col items-center gap-1 mt-4">
        <button className="p-2 bg-muted rounded-lg">
          <Mail className="w-5 h-5" />
        </button>
        <button className="p-2 hover:bg-muted rounded-lg transition-colors">
          <CalendarDays className="w-5 h-5 text-muted-foreground" />
        </button>
      </div>

      <div className="text-xs font-medium text-muted-foreground writing-vertical">
        ai
      </div>
    </div>
  );
}
