import { useState } from "react";
import { Sidebar } from "@/components/inbox/Sidebar";
import { InboxHeader } from "@/components/inbox/InboxHeader";
import { EmailList } from "@/components/inbox/EmailList";
import { ContactPanel } from "@/components/inbox/ContactPanel";
import { CommandPalette, useCommandPalette } from "@/components/inbox/CommandPalette";
import { emailGroups, contacts, Email } from "@/data/emails";

const Index = () => {
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const { open, setOpen } = useCommandPalette();

  const totalEmails = emailGroups.reduce((acc, group) => acc + group.emails.length, 0);
  
  const selectedContact = selectedEmail 
    ? contacts[selectedEmail.sender] || null 
    : null;

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
        Press <kbd className="px-1.5 py-0.5 bg-background rounded text-foreground font-mono">⌘K</kbd> for commands
      </div>
    </div>
  );
};

export default Index;
