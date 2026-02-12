import { Pencil, Search } from "lucide-react";

interface InboxHeaderProps {
  count: number;
}

export function InboxHeader({ count }: InboxHeaderProps) {
  return (
    <div className="flex items-center justify-between px-4 py-3 border-b">
      <div className="flex items-center gap-2">
        <h1 className="text-lg font-semibold">Inbox</h1>
        <span className="text-sm text-muted-foreground">{count}</span>
      </div>
      <div className="flex items-center gap-2">
        <button className="p-2 hover:bg-muted rounded-lg transition-colors">
          <Pencil className="w-4 h-4 text-muted-foreground" />
        </button>
        <button className="p-2 hover:bg-muted rounded-lg transition-colors">
          <Search className="w-4 h-4 text-muted-foreground" />
        </button>
      </div>
    </div>
  );
}
