import type { LucideIcon } from "lucide-react";
import {
  Archive,
  BarChart3,
  Bell,
  BellOff,
  Briefcase,
  Clock,
  CreditCard,
  FileText,
  FolderKanban,
  FolderOpen,
  History,
  IdCard,
  ImageIcon,
  Key,
  KeyRound,
  Languages,
  Mail,
  MonitorSmartphone,
  Package,
  Plug,
  Receipt,
  Settings,
  ShieldAlert,
  ShieldCheck,
  Sliders,
  Smartphone,
  TrendingUp,
  User,
  UserCircle,
  UserPlus,
  Users,
  UsersRound,
  Wallet,
} from "lucide-react";

type MenuItem = {
  label: string;
  icon: LucideIcon;
  items?: MenuItem[];
};

type THistory = { stack: MenuItem[]; title: string };

const nestedMenuItems: MenuItem[] = [
  {
    label: "Account",
    icon: User,
    items: [
      {
        label: "Profile",
        icon: UserCircle,
        items: [
          { label: "Personal Info", icon: IdCard },
          { label: "Avatar", icon: ImageIcon },
          { label: "Language", icon: Languages },
          { label: "Time Zone", icon: Clock },
        ],
      },
      {
        label: "Security",
        icon: ShieldCheck,
        items: [
          { label: "Password", icon: KeyRound },
          { label: "Two-factor Auth", icon: ShieldAlert },
          { label: "Active Sessions", icon: MonitorSmartphone },
          { label: "Login History", icon: History },
        ],
      },
      {
        label: "Notifications",
        icon: Bell,
        items: [
          { label: "Email Preferences", icon: Mail },
          { label: "Push Notifications", icon: Smartphone },
          { label: "Do Not Disturb", icon: BellOff },
        ],
      },
    ],
  },
  {
    label: "Workspace",
    icon: Briefcase,
    items: [
      {
        label: "Projects",
        icon: FolderKanban,
        items: [
          { label: "Active Projects", icon: FolderOpen },
          { label: "Archived Projects", icon: Archive },
        ],
      },
      {
        label: "Teams",
        icon: Users,
        items: [
          { label: "My Teams", icon: UsersRound },
          { label: "Team Invites", icon: UserPlus },
        ],
      },
      {
        label: "Settings",
        icon: Settings,
        items: [
          { label: "General", icon: Sliders },
          { label: "Integrations", icon: Plug },
          { label: "API Keys", icon: Key },
        ],
      },
    ],
  },
  {
    label: "Billing",
    icon: CreditCard,
    items: [
      {
        label: "Subscription",
        icon: Receipt,
        items: [
          { label: "Current Plan", icon: Package },
          { label: "Usage & Limits", icon: BarChart3 },
          { label: "Upgrade Plan", icon: TrendingUp },
        ],
      },
      {
        label: "Payment",
        icon: Wallet,
        items: [
          { label: "Payment Methods", icon: CreditCard },
          { label: "Invoices", icon: FileText },
          { label: "Billing History", icon: Receipt },
        ],
      },
    ],
  },
];

export { nestedMenuItems, type MenuItem, type THistory };
