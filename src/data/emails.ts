export interface Email {
  id: string;
  sender: string;
  email: string;
  subject: string;
  preview: string;
  date: string;
  isUnread?: boolean;
  hasAttachment?: boolean;
  mention?: string;
  category?: string;
  labels?: string[];
}

export const splitInboxCategories = [
  { id: "important", label: "Important" },
  { id: "shared", label: "Shared" },
  { id: "calendar", label: "Calendar" },
  { id: "news", label: "News" },
  { id: "github", label: "GitHub" },
  { id: "linear", label: "Linear" },
  { id: "engineering", label: "Engineering" },
  { id: "other", label: "Other" },
] as const;

export type SplitInboxCategory = typeof splitInboxCategories[number]["id"];

export interface EmailGroup {
  label: string;
  emails: Email[];
}

export const emailGroups: EmailGroup[] = [
  {
    label: "",
    emails: [
      {
        id: "1",
        sender: "Rahul Vohra",
        email: "rahul.vohra@superhuman.com",
        subject: "Invitation: Fireside chat with the People Team",
        preview: "Join us for a fireside chat with the people team about upcoming process...",
        date: "FEB 3",
        isUnread: true,
        category: "important",
      },
      {
        id: "2",
        sender: "Noel Ruan",
        email: "noel@company.com",
        subject: "Thanks for sharing your feedback!",
        preview: "Your feedback is going to make an impact! We'll let you know when we make these...",
        date: "FEB 3",
        category: "important",
      },
      {
        id: "3",
        sender: "Nicole Luvalle",
        email: "nicole@startup.io",
        subject: "Company metrics update",
        preview: "Hey team! Here's the dashboard that we talked through last week regarding progress towards our...",
        date: "FEB 3",
        category: "news",
        labels: ["website", "review"],
      },
      {
        id: "4",
        sender: "Rahul Vohra",
        email: "rahul.vohra@superhuman.com",
        subject: "Product Feedback",
        preview: "Thank you for the note! We're glad to hear you're enjoying Superhuman.",
        date: "FEB 3",
        category: "shared",
      },
    ],
  },
  {
    label: "Last 7 days",
    emails: [
      {
        id: "5",
        sender: "Simone Johnson",
        email: "simone@design.co",
        subject: "[For Review] Latest web mockups",
        preview: "Hey there, we updated the designs with your feedback. Can you please review by end of...",
        date: "FEB 2",
        category: "engineering",
      },
      {
        id: "6",
        sender: "Noel Ruan",
        email: "noel@company.com",
        subject: "Partnership",
        preview: "Hi Noel, Here's the partnership proposal we discussed. We're excited about the potential to collaborate!",
        date: "JAN 30",
        isUnread: true,
        category: "news",
      },
      {
        id: "7",
        sender: "Miles, Laura, Amelia",
        email: "miles@hyperfusion.io",
        subject: "Hyperfusion <> Superhuman",
        preview: "@Peik do we have a contract for 100+ users?",
        date: "JAN 30",
        mention: "@Peik",
        hasAttachment: true,
        category: "github",
      },
    ],
  },
  {
    label: "Earlier in January",
    emails: [
      {
        id: "8",
        sender: "Rahul Vohra",
        email: "rahul.vohra@superhuman.com",
        subject: "Superhuman Recap 🚀",
        preview: "Email takes hours each day.",
        date: "JAN 28",
        category: "calendar",
      },
    ],
  },
];

export const contacts: Record<string, {
  name: string;
  email: string;
  location: string;
  bio: string;
  avatar?: string;
  links: { icon: string; label: string; url: string }[];
  recentEmails: { subject: string; isRecap?: boolean }[];
}> = {
  "Rahul Vohra": {
    name: "Rahul Vohra",
    email: "rahul.vohra@superhuman.com",
    location: "San Francisco",
    bio: "Founder & CEO of Superhuman. Founded Rapportive. Computer Scientist, Gamer, Entrepreneur, Designer.",
    links: [
      { icon: "mail", label: "Mail", url: "#" },
      { icon: "linkedin", label: "LinkedIn", url: "#" },
      { icon: "github", label: "GitHub", url: "#" },
      { icon: "dribbble", label: "Dribbble", url: "#" },
      { icon: "facebook", label: "Facebook", url: "#" },
      { icon: "user", label: "about.me", url: "#" },
      { icon: "list", label: "AngelList", url: "#" },
      { icon: "globe", label: "superhuman.com", url: "#" },
      { icon: "twitter", label: "@rahulvohra", url: "#" },
    ],
    recentEmails: [
      { subject: "Product Feedback" },
      { subject: "Superhuman Recap", isRecap: true },
    ],
  },
  "Noel Ruan": {
    name: "Noel Ruan",
    email: "noel@company.com",
    location: "New York",
    bio: "Product Manager at Company. Building the future of productivity.",
    links: [
      { icon: "mail", label: "Mail", url: "#" },
      { icon: "linkedin", label: "LinkedIn", url: "#" },
    ],
    recentEmails: [
      { subject: "Thanks for sharing your feedback!" },
      { subject: "Partnership" },
    ],
  },
};
