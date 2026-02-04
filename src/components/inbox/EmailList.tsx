import { Mail, Paperclip, Clock, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import { Email, EmailGroup } from "@/data/emails";

interface EmailListProps {
  groups: EmailGroup[];
  selectedId: string | null;
  onSelect: (email: Email) => void;
}

export function EmailList({ groups, selectedId, onSelect }: EmailListProps) {
  return (
    <div className="flex-1 overflow-auto">
      {groups.map((group, groupIndex) => (
        <div key={groupIndex}>
          {group.label && (
            <div className="px-4 py-2 text-xs text-muted-foreground font-medium">
              {group.label}
            </div>
          )}
          {group.emails.map((email) => (
            <div
              key={email.id}
              onClick={() => onSelect(email)}
              className={cn(
                "flex items-center gap-3 px-4 py-3 cursor-pointer border-l-2 border-transparent hover:bg-muted/50 transition-colors",
                selectedId === email.id && "bg-muted border-l-primary",
                email.isUnread && "border-l-primary"
              )}
            >
              {/* Unread indicator */}
              <div className="w-2 flex-shrink-0">
                {email.isUnread && (
                  <div className="w-2 h-2 rounded-full bg-primary" />
                )}
              </div>

              {/* Sender */}
              <div className="w-36 flex-shrink-0">
                <span className={cn(
                  "text-sm truncate",
                  email.isUnread ? "font-semibold" : "font-medium"
                )}>
                  {email.sender}
                </span>
              </div>

              {/* Subject & Preview */}
              <div className="flex-1 min-w-0 flex items-center gap-2">
                {email.hasAttachment && (
                  <Paperclip className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
                )}
                <span className={cn(
                  "text-sm truncate",
                  email.isUnread ? "font-semibold" : ""
                )}>
                  {email.subject}
                </span>
                <span className="text-sm text-muted-foreground truncate">
                  {email.mention ? (
                    <>
                      <span className="text-primary">{email.mention}</span>
                      {" "}{email.preview.replace(email.mention, "")}
                    </>
                  ) : (
                    email.preview
                  )}
                </span>
              </div>

              {/* Actions (shown on hover) */}
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-1 hover:bg-muted rounded">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                </button>
                <button className="p-1 hover:bg-muted rounded">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                </button>
                <button className="p-1 hover:bg-muted rounded">
                  <Settings className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>

              {/* Date */}
              <div className="w-16 text-right flex-shrink-0">
                <span className="text-xs text-muted-foreground">{email.date}</span>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
