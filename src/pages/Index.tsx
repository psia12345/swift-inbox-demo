import { useState, useEffect, useCallback, useMemo } from "react";
import { Sidebar } from "@/components/inbox/Sidebar";
import { InboxHeader } from "@/components/inbox/InboxHeader";
import { EmailList } from "@/components/inbox/EmailList";
import { ContactPanel } from "@/components/inbox/ContactPanel";
import { CommandPalette, useCommandPalette } from "@/components/inbox/CommandPalette";
import { MessageView } from "@/components/inbox/MessageView";
import { emailGroups as initialEmailGroups, contacts, Email, EmailGroup, SplitInboxCategory } from "@/data/emails";
import { toast } from "@/hooks/use-toast";

const Index = () => {
  const [emailGroups, setEmailGroups] = useState<EmailGroup[]>(initialEmailGroups);
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [hoveredEmail, setHoveredEmail] = useState<Email | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<SplitInboxCategory | null>(null);
  const { open, setOpen } = useCommandPalette();

  // Mark email as read when selected
  const handleSelectEmail = useCallback((email: Email) => {
    setSelectedEmail(email);
    
    // Mark as read
    if (email.isUnread) {
      setEmailGroups(prev => 
        prev.map(group => ({
          ...group,
          emails: group.emails.map(e => 
            e.id === email.id ? { ...e, isUnread: false } : e
          )
        }))
      );
    }
  }, []);

  // Filter email groups based on selected category
  const filteredEmailGroups = useMemo(() => {
    if (!selectedCategory) return emailGroups;
    
    return emailGroups
      .map(group => ({
        ...group,
        emails: group.emails.filter(email => email.category === selectedCategory)
      }))
      .filter(group => group.emails.length > 0);
  }, [emailGroups, selectedCategory]);

  const totalEmails = filteredEmailGroups.reduce((acc, group) => acc + group.emails.length, 0);
  
  // Show contact for hovered email, or selected email as fallback
  const displayEmail = hoveredEmail || selectedEmail;
  const selectedContact = displayEmail 
    ? contacts[displayEmail.sender] || null 
    : null;

  const markAsDone = useCallback((emailToMark?: Email | null) => {
    const emailToRemove = emailToMark || hoveredEmail || selectedEmail;
    if (!emailToRemove) return;
    
    // Find the next email to select from filtered groups (only if removing selected email)
    let nextEmail: Email | null = null;
    if (selectedEmail && emailToRemove.id === selectedEmail.id) {
      for (const group of filteredEmailGroups) {
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
      setSelectedEmail(nextEmail);
    }

    // Remove the email from groups
    setEmailGroups(prev => 
      prev.map(group => ({
        ...group,
        emails: group.emails.filter(e => e.id !== emailToRemove.id)
      })).filter(group => group.emails.length > 0)
    );

    // Show toast
    toast({
      description: "Marked as Done.",
    });
  }, [selectedEmail, hoveredEmail, filteredEmailGroups]);

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
        {selectedEmail ? (
          <MessageView 
            email={selectedEmail} 
            onBack={() => setSelectedEmail(null)} 
          />
        ) : (
          <>
            <InboxHeader 
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              emailGroups={emailGroups}
            />
            <EmailList
              groups={filteredEmailGroups}
              selectedId={selectedEmail?.id || null}
              onSelect={handleSelectEmail}
              onHover={setHoveredEmail}
            />
          </>
        )}
      </div>

      {/* Contact Panel */}
      <ContactPanel contact={selectedContact} />

      {/* Command Palette */}
      <CommandPalette open={open} onOpenChange={setOpen} onMarkDone={markAsDone} />

      {/* Keyboard shortcut hint */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-muted/80 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs text-muted-foreground">
        Press <kbd className="px-1.5 py-0.5 bg-background rounded text-foreground font-mono">E</kbd> to mark done · <kbd className="px-1.5 py-0.5 bg-background rounded text-foreground font-mono">⌘K</kbd> for commands
      </div>
    </div>
  );
};

export default Index;
