import { cn } from "@/lib/utils";
import { splitInboxCategories, SplitInboxCategory, Email, EmailGroup } from "@/data/emails";
import { Settings } from "lucide-react";

interface SplitInboxTabsProps {
  selectedCategory: SplitInboxCategory | null;
  onSelectCategory: (category: SplitInboxCategory | null) => void;
  emailGroups: EmailGroup[];
}

export function SplitInboxTabs({ selectedCategory, onSelectCategory, emailGroups }: SplitInboxTabsProps) {
  // Calculate counts for each category
  const getCategoryCount = (categoryId: string) => {
    return emailGroups.reduce((acc, group) => {
      return acc + group.emails.filter(email => email.category === categoryId).length;
    }, 0);
  };

  return (
    <div className="flex items-center gap-1 px-4 py-2 border-b bg-background overflow-x-auto">
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
      
      {/* Settings button */}
      <button className="p-2 ml-auto hover:bg-muted rounded-lg transition-colors flex-shrink-0">
        <Settings className="w-4 h-4 text-muted-foreground" />
      </button>
    </div>
  );
}
