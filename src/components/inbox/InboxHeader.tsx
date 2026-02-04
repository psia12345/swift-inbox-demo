import { Pencil, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { splitInboxCategories, SplitInboxCategory, EmailGroup } from "@/data/emails";

interface InboxHeaderProps {
  selectedCategory: SplitInboxCategory | null;
  onSelectCategory: (category: SplitInboxCategory | null) => void;
  emailGroups: EmailGroup[];
}

export function InboxHeader({ selectedCategory, onSelectCategory, emailGroups }: InboxHeaderProps) {
  // Calculate counts for each category
  const getCategoryCount = (categoryId: string) => {
    return emailGroups.reduce((acc, group) => {
      return acc + group.emails.filter(email => email.category === categoryId).length;
    }, 0);
  };

  return (
    <div className="flex items-center justify-between px-4 py-2 border-b">
      <div className="flex items-center gap-1 overflow-x-auto">
        {splitInboxCategories.map((category) => {
          const count = getCategoryCount(category.id);
          const isSelected = selectedCategory === category.id;
          
          return (
            <button
              key={category.id}
              onClick={() => onSelectCategory(isSelected ? null : category.id)}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors whitespace-nowrap",
                isSelected
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
            >
              <span>{category.label}</span>
              {count > 0 && (
                <span className={cn(
                  "text-xs",
                  isSelected ? "text-primary-foreground/80" : "text-muted-foreground"
                )}>
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>
      <div className="flex items-center gap-2 flex-shrink-0">
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
