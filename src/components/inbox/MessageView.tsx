import { ArrowLeft, Check, Clock, ChevronUp, ChevronDown, Share2, Calendar, Users, FileText, GitBranch, BarChart3, Paperclip } from "lucide-react";
import { cn } from "@/lib/utils";
import { Email } from "@/data/emails";

interface MessageViewProps {
  email: Email;
  onBack: () => void;
}

// Helper to determine email type based on content
function getEmailType(email: Email): "invitation" | "feedback" | "metrics" | "review" | "partnership" | "newsletter" | "general" {
  const subject = email.subject.toLowerCase();
  const preview = email.preview.toLowerCase();
  
  if (subject.includes("invitation") || subject.includes("fireside") || subject.includes("chat")) return "invitation";
  if (subject.includes("feedback") || preview.includes("feedback")) return "feedback";
  if (subject.includes("metrics") || subject.includes("dashboard") || preview.includes("dashboard")) return "metrics";
  if (subject.includes("review") || subject.includes("mockup")) return "review";
  if (subject.includes("partnership") || preview.includes("partnership") || preview.includes("proposal")) return "partnership";
  if (subject.includes("recap") || subject.includes("newsletter") || email.category === "news") return "newsletter";
  return "general";
}

// Get avatar colors based on sender name
function getAvatarColors(name: string): string {
  const colors = [
    "from-purple-400 to-purple-600",
    "from-blue-400 to-blue-600",
    "from-green-400 to-green-600",
    "from-orange-400 to-orange-600",
    "from-pink-400 to-pink-600",
    "from-cyan-400 to-cyan-600",
  ];
  const index = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % colors.length;
  return colors[index];
}

export function MessageView({ email, onBack }: MessageViewProps) {
  const emailType = getEmailType(email);
  const avatarColors = getAvatarColors(email.sender);

  // Render different content based on email type
  const renderEmailContent = () => {
    switch (emailType) {
      case "invitation":
        return <InvitationContent email={email} avatarColors={avatarColors} />;
      case "feedback":
        return <FeedbackContent email={email} avatarColors={avatarColors} />;
      case "metrics":
        return <MetricsContent email={email} avatarColors={avatarColors} />;
      case "review":
        return <ReviewContent email={email} avatarColors={avatarColors} />;
      case "partnership":
        return <PartnershipContent email={email} avatarColors={avatarColors} />;
      case "newsletter":
        return <NewsletterContent email={email} avatarColors={avatarColors} />;
      default:
        return <GeneralContent email={email} avatarColors={avatarColors} />;
    }
  };

  return (
    <div className="flex-1 flex flex-col min-h-0">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b">
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <button 
            onClick={onBack}
            className="p-2 hover:bg-muted rounded-lg transition-colors flex-shrink-0"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div className="flex items-center gap-2 min-w-0">
            <h1 className="text-base font-medium truncate">{email.subject}</h1>
            {email.labels && email.labels.map((label, idx) => (
              <span 
                key={idx}
                className={cn(
                  "px-1.5 py-0.5 text-xs rounded flex-shrink-0",
                  label.includes("review") 
                    ? "bg-green-500/20 text-green-600" 
                    : "bg-purple-500/20 text-purple-600"
                )}
              >
                {label}
              </span>
            ))}
            {email.category && (
              <span className="px-1.5 py-0.5 text-xs rounded bg-blue-500/20 text-blue-600 flex-shrink-0">
                {email.category}
              </span>
            )}
          </div>
        </div>
        <div className="flex items-center gap-1 flex-shrink-0">
          <button className="px-3 py-1.5 text-sm text-muted-foreground hover:bg-muted rounded-lg transition-colors flex items-center gap-1">
            <Share2 className="w-4 h-4" />
            Share
          </button>
          <button className="p-2 hover:bg-muted rounded-lg transition-colors">
            <Check className="w-4 h-4 text-muted-foreground" />
          </button>
          <button className="p-2 hover:bg-muted rounded-lg transition-colors">
            <Clock className="w-4 h-4 text-muted-foreground" />
          </button>
          <button className="p-2 hover:bg-muted rounded-lg transition-colors">
            <ChevronUp className="w-4 h-4 text-muted-foreground" />
          </button>
          <button className="p-2 hover:bg-muted rounded-lg transition-colors">
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>
      </div>

      {/* Email content */}
      <div className="flex-1 overflow-auto p-4">
        {renderEmailContent()}
      </div>
    </div>
  );
}

// Invitation email (e.g., Fireside chat)
function InvitationContent({ email, avatarColors }: { email: Email; avatarColors: string }) {
  return (
    <div className="max-w-3xl mx-auto bg-card rounded-lg border shadow-sm">
      <div className="flex items-center justify-between px-6 py-4 border-b">
        <div className="flex items-center gap-3">
          <div className={cn("w-10 h-10 rounded-full bg-gradient-to-br flex items-center justify-center text-white font-medium", avatarColors)}>
            {email.sender.charAt(0)}
          </div>
          <div>
            <div className="font-medium">{email.sender}</div>
            <div className="text-sm text-muted-foreground">{email.email}</div>
          </div>
        </div>
        <span className="text-sm text-muted-foreground">{email.date}</span>
      </div>

      <div className="px-6 py-6">
        {/* Calendar invite banner */}
        <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="font-semibold">{email.subject}</div>
              <div className="text-sm text-muted-foreground">Wednesday, Feb 5 · 2:00 PM - 3:00 PM PST</div>
            </div>
          </div>
        </div>

        <div className="space-y-4 text-sm leading-relaxed">
          <p>Hi there! 👋</p>
          <p>{email.preview}</p>
          <p>We'll be discussing team culture, growth opportunities, and answering any questions you might have. This is a great opportunity to connect with the People Team in an informal setting.</p>
          
          <div className="flex items-center gap-2 py-4">
            <Users className="w-4 h-4 text-muted-foreground" />
            <span className="text-muted-foreground">12 people have RSVP'd</span>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
            Accept
          </button>
          <button className="px-4 py-2 border rounded-lg hover:bg-muted transition-colors">
            Maybe
          </button>
          <button className="px-4 py-2 border rounded-lg hover:bg-muted transition-colors">
            Decline
          </button>
        </div>
      </div>
    </div>
  );
}

// Feedback email
function FeedbackContent({ email, avatarColors }: { email: Email; avatarColors: string }) {
  return (
    <div className="max-w-3xl mx-auto bg-card rounded-lg border shadow-sm">
      <div className="flex items-center justify-between px-6 py-4 border-b">
        <div className="flex items-center gap-3">
          <div className={cn("w-10 h-10 rounded-full bg-gradient-to-br flex items-center justify-center text-white font-medium", avatarColors)}>
            {email.sender.charAt(0)}
          </div>
          <div>
            <div className="font-medium">{email.sender}</div>
            <div className="text-sm text-muted-foreground">{email.email}</div>
          </div>
        </div>
        <span className="text-sm text-muted-foreground">{email.date}</span>
      </div>

      <div className="px-6 py-6">
        <div className="space-y-4 text-sm leading-relaxed">
          <p>Hi there! 🙏</p>
          <p>{email.preview}</p>
          <p>We really appreciate you taking the time to share your thoughts with us. Your input helps us build a better product for everyone.</p>
          
          <div className="bg-green-500/10 border border-green-200 rounded-lg p-4 mt-6">
            <div className="flex items-center gap-2 text-green-700">
              <Check className="w-5 h-5" />
              <span className="font-medium">Your feedback has been logged</span>
            </div>
            <p className="text-sm text-green-600 mt-1">We'll notify you when we ship updates based on your suggestions.</p>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t">
          <p className="text-sm text-muted-foreground">Best regards,</p>
          <p className="font-medium">{email.sender}</p>
        </div>
      </div>
    </div>
  );
}

// Metrics/Dashboard email
function MetricsContent({ email, avatarColors }: { email: Email; avatarColors: string }) {
  return (
    <div className="max-w-3xl mx-auto bg-card rounded-lg border shadow-sm">
      <div className="flex items-center justify-between px-6 py-4 border-b">
        <div className="flex items-center gap-3">
          <div className={cn("w-10 h-10 rounded-full bg-gradient-to-br flex items-center justify-center text-white font-medium", avatarColors)}>
            {email.sender.charAt(0)}
          </div>
          <div>
            <div className="font-medium">{email.sender}</div>
            <div className="text-sm text-muted-foreground">{email.email}</div>
          </div>
        </div>
        <span className="text-sm text-muted-foreground">{email.date}</span>
      </div>

      <div className="px-6 py-6">
        <div className="space-y-4 text-sm leading-relaxed">
          <p>Hey team! 📊</p>
          <p>{email.preview}</p>
        </div>

        {/* Metrics cards */}
        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="bg-muted/50 rounded-lg p-4">
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              <BarChart3 className="w-4 h-4" />
              <span className="text-xs">Revenue</span>
            </div>
            <div className="text-2xl font-bold">$1.2M</div>
            <div className="text-xs text-green-500">↑ 12% vs last month</div>
          </div>
          <div className="bg-muted/50 rounded-lg p-4">
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              <Users className="w-4 h-4" />
              <span className="text-xs">Users</span>
            </div>
            <div className="text-2xl font-bold">24.5K</div>
            <div className="text-xs text-green-500">↑ 8% vs last month</div>
          </div>
          <div className="bg-muted/50 rounded-lg p-4">
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              <Check className="w-4 h-4" />
              <span className="text-xs">Retention</span>
            </div>
            <div className="text-2xl font-bold">94%</div>
            <div className="text-xs text-green-500">↑ 2% vs last month</div>
          </div>
        </div>

        <button className="mt-6 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors inline-flex items-center gap-2">
          <BarChart3 className="w-4 h-4" />
          View Full Dashboard
        </button>
      </div>
    </div>
  );
}

// Design Review email
function ReviewContent({ email, avatarColors }: { email: Email; avatarColors: string }) {
  return (
    <div className="max-w-3xl mx-auto bg-card rounded-lg border shadow-sm">
      <div className="flex items-center justify-between px-6 py-4 border-b">
        <div className="flex items-center gap-3">
          <div className={cn("w-10 h-10 rounded-full bg-gradient-to-br flex items-center justify-center text-white font-medium", avatarColors)}>
            {email.sender.charAt(0)}
          </div>
          <div>
            <div className="font-medium">{email.sender}</div>
            <div className="text-sm text-muted-foreground">{email.email}</div>
          </div>
        </div>
        <span className="text-sm text-muted-foreground">{email.date}</span>
      </div>

      <div className="px-6 py-6">
        <div className="space-y-4 text-sm leading-relaxed">
          <p>Hey there! 🎨</p>
          <p>{email.preview}</p>
        </div>

        {/* Mockup preview cards */}
        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="border rounded-lg overflow-hidden">
            <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
              <FileText className="w-8 h-8 text-muted-foreground" />
            </div>
            <div className="p-3 border-t">
              <div className="font-medium text-sm">Homepage_v2.fig</div>
              <div className="text-xs text-muted-foreground">Updated 2 hours ago</div>
            </div>
          </div>
          <div className="border rounded-lg overflow-hidden">
            <div className="aspect-video bg-gradient-to-br from-green-100 to-cyan-100 flex items-center justify-center">
              <FileText className="w-8 h-8 text-muted-foreground" />
            </div>
            <div className="p-3 border-t">
              <div className="font-medium text-sm">Dashboard_v2.fig</div>
              <div className="text-xs text-muted-foreground">Updated 2 hours ago</div>
            </div>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors inline-flex items-center gap-2">
            Open in Figma
          </button>
          <button className="px-4 py-2 border rounded-lg hover:bg-muted transition-colors inline-flex items-center gap-2">
            <Check className="w-4 h-4" />
            Approve
          </button>
          <button className="px-4 py-2 border rounded-lg hover:bg-muted transition-colors">
            Request Changes
          </button>
        </div>
      </div>
    </div>
  );
}

// Partnership email
function PartnershipContent({ email, avatarColors }: { email: Email; avatarColors: string }) {
  return (
    <div className="max-w-3xl mx-auto bg-card rounded-lg border shadow-sm">
      <div className="flex items-center justify-between px-6 py-4 border-b">
        <div className="flex items-center gap-3">
          <div className={cn("w-10 h-10 rounded-full bg-gradient-to-br flex items-center justify-center text-white font-medium", avatarColors)}>
            {email.sender.charAt(0)}
          </div>
          <div>
            <div className="font-medium">{email.sender}</div>
            <div className="text-sm text-muted-foreground">{email.email}</div>
          </div>
        </div>
        <span className="text-sm text-muted-foreground">{email.date}</span>
      </div>

      <div className="px-6 py-6">
        <div className="space-y-4 text-sm leading-relaxed">
          <p>Hi there! 🤝</p>
          <p>{email.preview}</p>
          <p>I've attached the full proposal document for your review. Please let me know if you have any questions or would like to schedule a call to discuss further.</p>
        </div>

        {/* Attachment */}
        <div className="mt-6 border rounded-lg p-4 flex items-center gap-3 hover:bg-muted/50 transition-colors cursor-pointer">
          <div className="w-10 h-10 bg-red-500/10 rounded-lg flex items-center justify-center">
            <Paperclip className="w-5 h-5 text-red-500" />
          </div>
          <div className="flex-1">
            <div className="font-medium text-sm">Partnership_Proposal_2026.pdf</div>
            <div className="text-xs text-muted-foreground">2.4 MB · PDF Document</div>
          </div>
          <button className="px-3 py-1.5 text-sm border rounded-lg hover:bg-muted transition-colors">
            Download
          </button>
        </div>

        <div className="flex gap-3 mt-6">
          <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
            Schedule Call
          </button>
          <button className="px-4 py-2 border rounded-lg hover:bg-muted transition-colors">
            Reply
          </button>
        </div>
      </div>
    </div>
  );
}

// Newsletter email
function NewsletterContent({ email, avatarColors }: { email: Email; avatarColors: string }) {
  return (
    <div className="max-w-3xl mx-auto">
      {/* Unsubscribe link */}
      <div className="mb-2">
        <button className="text-sm text-muted-foreground hover:text-foreground transition-colors">
          Unsubscribe
        </button>
      </div>
      
      <div className="bg-card rounded-lg border shadow-sm">
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <div className="flex items-center gap-3">
            <div className={cn("w-10 h-10 rounded-full bg-gradient-to-br flex items-center justify-center text-white font-medium", avatarColors)}>
              {email.sender.charAt(0)}
            </div>
            <div>
              <div className="font-medium">{email.sender}</div>
              <div className="text-sm text-muted-foreground">{email.email}</div>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>{email.date}</span>
            <button className="text-primary hover:underline">View in browser</button>
          </div>
        </div>

        <div className="px-6 py-6">
          {/* Decorative header */}
          <div className="mb-6 flex justify-center">
            <div className="flex gap-1">
              {[...Array(12)].map((_, i) => (
                <div 
                  key={i} 
                  className={cn(
                    "rounded-t-sm",
                    i % 5 === 0 && "bg-yellow-400",
                    i % 5 === 1 && "bg-orange-400",
                    i % 5 === 2 && "bg-red-400",
                    i % 5 === 3 && "bg-gray-300",
                    i % 5 === 4 && "bg-amber-500",
                  )}
                  style={{ 
                    width: `${Math.random() * 20 + 15}px`,
                    height: `${Math.random() * 40 + 30}px` 
                  }}
                />
              ))}
            </div>
          </div>

          <div className="space-y-4 text-sm leading-relaxed">
            <p className="flex items-start gap-2">
              <span>👋</span>
              <span>
                Hi, this is {email.sender.split(' ')[0]} with a subscriber-only issue of the Newsletter. 
                In every issue, I cover challenges at Big Tech and startups through the lens of 
                engineering managers and senior engineers.
              </span>
            </p>
          </div>

          {/* Article preview card */}
          <div className="mt-8 border rounded-lg overflow-hidden">
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-4">{email.subject}</h2>
              <p className="text-muted-foreground mb-4">
                {email.preview}
              </p>
              <div className="flex items-center gap-3">
                <div className={cn("w-8 h-8 rounded-full bg-gradient-to-br flex items-center justify-center text-white text-xs font-medium", avatarColors)}>
                  {email.sender.charAt(0)}
                </div>
                <div>
                  <div className="text-sm font-medium">{email.sender.toUpperCase()}</div>
                  <div className="text-xs text-muted-foreground">{email.date}</div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between px-6 py-3 border-t bg-muted/30">
              <div className="flex items-center gap-4">
                <button className="text-muted-foreground hover:text-foreground">♡</button>
                <button className="text-muted-foreground hover:text-foreground">💬</button>
                <button className="text-muted-foreground hover:text-foreground">↗</button>
                <button className="text-muted-foreground hover:text-foreground">🔄</button>
              </div>
              <button className="px-4 py-1.5 text-sm border rounded-full hover:bg-muted transition-colors">
                READ IN APP ↗
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// General email (fallback)
function GeneralContent({ email, avatarColors }: { email: Email; avatarColors: string }) {
  return (
    <div className="max-w-3xl mx-auto bg-card rounded-lg border shadow-sm">
      <div className="flex items-center justify-between px-6 py-4 border-b">
        <div className="flex items-center gap-3">
          <div className={cn("w-10 h-10 rounded-full bg-gradient-to-br flex items-center justify-center text-white font-medium", avatarColors)}>
            {email.sender.charAt(0)}
          </div>
          <div>
            <div className="font-medium">{email.sender}</div>
            <div className="text-sm text-muted-foreground">{email.email}</div>
          </div>
        </div>
        <span className="text-sm text-muted-foreground">{email.date}</span>
      </div>

      <div className="px-6 py-6">
        <div className="space-y-4 text-sm leading-relaxed">
          <p>Hi there,</p>
          <p>{email.preview}</p>
          <p>Please let me know if you have any questions.</p>
        </div>

        {email.hasAttachment && (
          <div className="mt-6 border rounded-lg p-4 flex items-center gap-3 hover:bg-muted/50 transition-colors cursor-pointer">
            <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
              <Paperclip className="w-5 h-5 text-blue-500" />
            </div>
            <div className="flex-1">
              <div className="font-medium text-sm">Attachment.pdf</div>
              <div className="text-xs text-muted-foreground">1.2 MB · PDF Document</div>
            </div>
            <button className="px-3 py-1.5 text-sm border rounded-lg hover:bg-muted transition-colors">
              Download
            </button>
          </div>
        )}

        {email.mention && (
          <div className="mt-6 bg-primary/10 border border-primary/20 rounded-lg p-4">
            <div className="flex items-center gap-2 text-primary">
              <span className="font-medium">{email.mention}</span>
              <span className="text-muted-foreground">was mentioned in this thread</span>
            </div>
          </div>
        )}

        <div className="mt-6 pt-6 border-t">
          <p className="text-sm text-muted-foreground">Best,</p>
          <p className="font-medium">{email.sender}</p>
        </div>
      </div>
    </div>
  );
}
