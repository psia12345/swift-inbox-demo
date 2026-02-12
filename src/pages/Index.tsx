import { useState, useEffect, useCallback } from "react";
import { Sidebar } from "@/components/inbox/Sidebar";
import { InboxHeader } from "@/components/inbox/InboxHeader";
import { EmailList } from "@/components/inbox/EmailList";
import { ContactPanel } from "@/components/inbox/ContactPanel";
import { CommandPalette, useCommandPalette } from "@/components/inbox/CommandPalette";
import { emailGroups as initialEmailGroups, contacts, Email, EmailGroup } from "@/data/emails";
import { toast } from "@/hooks/use-toast";

const Index = () => {
  const [emailGroups, setEmailGroups] = useState<EmailGroup[]>(initialEmailGroups);
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const { open, setOpen } = useCommandPalette();

  const totalEmails = emailGroups.reduce((acc, group) => acc + group.emails.length, 0);
  
  const selectedContact = selectedEmail 
    ? contacts[selectedEmail.sender] || null 
    : null;

  const markAsDone = useCallback(() => {
    if (!selectedEmail) return;

    const emailToRemove = selectedEmail;
    
    // Find the next email to select
    let nextEmail: Email | null = null;
    for (const group of emailGroups) {
      const idx = group.emails.findIndex(e => e.id === emailToRemove.id);
      if (idx !== -1) {
        if (idx < group.emails.length - 1) {
          nextEmail = group.emails[idx + 1];
        } else if (idx > 0) {
          nextEmail = group.emails[idx - 1];
        }
        break;
      }
    }

    // Remove the email from groups
    setEmailGroups(prev => 
      prev.map(group => ({
        ...group,
        emails: group.emails.filter(e => e.id !== emailToRemove.id)
      })).filter(group => group.emails.length > 0)
    );

    setSelectedEmail(nextEmail);

    // Show toast
    toast({
      description: "Marked as Done.",
    });
  }, [selectedEmail, emailGroups]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input or if command palette is open
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement || open) {
        return;
      }
      
      if (e.key === "e" || e.key === "E") {
        e.preventDefault();
        markAsDone();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [markAsDone, open]);

  return (
    <div className="h-screen flex bg-background">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        <InboxHeader count={totalEmails} />
        <EmailList
          groups={emailGroups}
          selectedId={selectedEmail?.id || null}
          onSelect={setSelectedEmail}
        />
      </div>

      {/* Contact Panel */}
      <ContactPanel contact={selectedContact} />

      {/* Command Palette */}
      <CommandPalette open={open} onOpenChange={setOpen} />

      {/* Keyboard shortcut hint */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-muted/80 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs text-muted-foreground">
        Press <kbd className="px-1.5 py-0.5 bg-background rounded text-foreground font-mono">E</kbd> to mark done · <kbd className="px-1.5 py-0.5 bg-background rounded text-foreground font-mono">⌘K</kbd> for commands
      </div>
    </div>
  );
};

export default Index;
