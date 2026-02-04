import { useEffect, useState } from "react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  CheckCircle,
  Clock,
  Star,
  Move,
  Tag,
  Reply,
  Forward,
  Trash2,
  Archive,
  Search,
  AtSign,
} from "lucide-react";

interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onMarkDone?: () => void;
}

const commands = [
  { icon: CheckCircle, label: "Mark Done", shortcut: "E", action: "markDone" },
  { icon: Clock, label: "Remind Me", shortcut: "H", action: "remind" },
  { icon: Star, label: "Star", shortcut: "S", action: "star" },
  { icon: Move, label: "Move", shortcut: "V", action: "move" },
  { icon: Tag, label: "Label", shortcut: "L", action: "label" },
  { icon: Reply, label: "Reply", shortcut: "R", action: "reply" },
  { icon: Forward, label: "Forward", shortcut: "F", action: "forward" },
  { icon: Archive, label: "Archive", shortcut: "A", action: "archive" },
  { icon: Trash2, label: "Trash", shortcut: "#", action: "trash" },
  { icon: Search, label: "Search", shortcut: "/", action: "search" },
];

export function CommandPalette({ open, onOpenChange, onMarkDone }: CommandPaletteProps) {
  const handleSelect = (action: string) => {
    onOpenChange(false);
    if (action === "markDone" && onMarkDone) {
      onMarkDone();
    }
  };

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <div className="flex items-center gap-2 px-4 py-3 border-b">
        <AtSign className="w-5 h-5 text-muted-foreground" />
        <span className="text-sm font-medium">Superhuman Command</span>
      </div>
      <CommandInput placeholder='Type "go to done"' />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          {commands.map((command) => (
            <CommandItem
              key={command.label}
              onSelect={() => handleSelect(command.action)}
              className="flex items-center justify-between py-3"
            >
              <div className="flex items-center gap-3">
                <command.icon className="w-5 h-5" />
                <span className="font-mono">{command.label}</span>
              </div>
              <kbd className="px-2 py-1 bg-muted rounded text-xs font-mono">
                {command.shortcut}
              </kbd>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}

export function useCommandPalette() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return { open, setOpen };
}
