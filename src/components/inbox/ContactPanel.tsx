import { 
  Mail, 
  Linkedin, 
  Github, 
  Dribbble, 
  Facebook, 
  Globe, 
  Twitter, 
  User, 
  List,
  Rocket,
  Calendar,
  HelpCircle,
  CalendarDays,
  Settings
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface ContactPanelProps {
  contact: {
    name: string;
    email: string;
    location: string;
    bio: string;
    links: { icon: string; label: string; url: string }[];
    recentEmails: { subject: string; isRecap?: boolean }[];
  } | null;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  mail: Mail,
  linkedin: Linkedin,
  github: Github,
  dribbble: Dribbble,
  facebook: Facebook,
  globe: Globe,
  twitter: Twitter,
  user: User,
  list: List,
};

export function ContactPanel({ contact }: ContactPanelProps) {
  if (!contact) {
    return (
      <div className="w-72 border-l bg-background p-6 flex items-center justify-center">
        <p className="text-sm text-muted-foreground">Select an email to view contact</p>
      </div>
    );
  }

  return (
    <div className="w-72 border-l bg-background flex flex-col">
      <div className="p-6 flex-1 overflow-auto">
        {/* Header */}
        <h2 className="text-lg font-semibold mb-4">{contact.name}</h2>

        {/* Avatar & Email */}
        <div className="flex items-start gap-3 mb-4">
          <Avatar className="w-12 h-12">
            <AvatarFallback className="bg-muted text-muted-foreground text-lg">
              {contact.name.split(" ").map(n => n[0]).join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm">{contact.email}</p>
            <p className="text-sm text-muted-foreground">{contact.location}</p>
          </div>
        </div>

        {/* Bio */}
        <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
          {contact.bio}
        </p>

        {/* Links */}
        <div className="space-y-1">
          {/* Recent emails under Mail */}
          <div className="flex items-center gap-3 py-1.5">
            <Mail className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm">Mail</span>
          </div>
          {contact.recentEmails.map((email, i) => (
            <div key={i} className="flex items-center gap-3 py-1.5 pl-7">
              <span className="text-sm text-muted-foreground">
                {email.subject}
                {email.isRecap && " 🚀"}
              </span>
            </div>
          ))}

          {/* Other links */}
          {contact.links.slice(1).map((link, i) => {
            const Icon = iconMap[link.icon] || Globe;
            return (
              <a
                key={i}
                href={link.url}
                className="flex items-center gap-3 py-1.5 hover:bg-muted/50 rounded transition-colors"
              >
                <Icon className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">{link.label}</span>
              </a>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <div className="border-t p-4 flex items-center justify-between">
        <span className="text-xs text-muted-foreground tracking-wider">SUPERHUMAN MAIL</span>
        <div className="flex items-center gap-2">
          <button className="p-1 hover:bg-muted rounded">
            <Calendar className="w-4 h-4 text-muted-foreground" />
          </button>
          <button className="p-1 hover:bg-muted rounded">
            <HelpCircle className="w-4 h-4 text-muted-foreground" />
          </button>
          <button className="p-1 hover:bg-muted rounded">
            <CalendarDays className="w-4 h-4 text-muted-foreground" />
          </button>
          <button className="p-1 hover:bg-muted rounded">
            <Settings className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>
      </div>
    </div>
  );
}
