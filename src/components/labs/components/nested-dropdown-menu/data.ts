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
  id: string;
  label: string;
  icon: LucideIcon;
  children?: MenuItem[];
  [key: string]: unknown;
};

type THistory = { stack: MenuItem[]; title: string };

type DemoMenuItem = MenuItem & { icon: LucideIcon };

const nestedMenuItems: Array<MenuItem> = [
  {
    id: "account",
    label: "Account",
    icon: User,
    children: [
      {
        id: "account-profile",
        label: "Profile",
        icon: UserCircle,
        children: [
          { id: "account-profile-personal-info", label: "Personal Info", icon: IdCard },
          { id: "account-profile-avatar", label: "Avatar", icon: ImageIcon },
          { id: "account-profile-language", label: "Language", icon: Languages },
          { id: "account-profile-time-zone", label: "Time Zone", icon: Clock },
        ],
      },
      {
        id: "account-security",
        label: "Security",
        icon: ShieldCheck,
        children: [
          { id: "account-security-password", label: "Password", icon: KeyRound },
          { id: "account-security-two-factor-auth", label: "Two-factor Auth", icon: ShieldAlert },
          { id: "account-security-active-sessions", label: "Active Sessions", icon: MonitorSmartphone },
          { id: "account-security-login-history", label: "Login History", icon: History },
        ],
      },
      {
        id: "account-notifications",
        label: "Notifications",
        icon: Bell,
        children: [
          { id: "account-notifications-email-preferences", label: "Email Preferences", icon: Mail },
          { id: "account-notifications-push-notifications", label: "Push Notifications", icon: Smartphone },
          { id: "account-notifications-do-not-disturb", label: "Do Not Disturb", icon: BellOff },
        ],
      },
    ],
  },
  {
    id: "workspace",
    label: "Workspace",
    icon: Briefcase,
    children: [
      {
        id: "workspace-projects",
        label: "Projects",
        icon: FolderKanban,
        children: [
          { id: "workspace-projects-active-projects", label: "Active Projects", icon: FolderOpen },
          { id: "workspace-projects-archived-projects", label: "Archived Projects", icon: Archive },
        ],
      },
      {
        id: "workspace-teams",
        label: "Teams",
        icon: Users,
        children: [
          { id: "workspace-teams-my-teams", label: "My Teams", icon: UsersRound },
          { id: "workspace-teams-team-invites", label: "Team Invites", icon: UserPlus },
        ],
      },
      {
        id: "workspace-settings",
        label: "Settings",
        icon: Settings,
        children: [
          { id: "workspace-settings-general", label: "General", icon: Sliders },
          { id: "workspace-settings-integrations", label: "Integrations", icon: Plug },
          { id: "workspace-settings-api-keys", label: "API Keys", icon: Key },
        ],
      },
    ],
  },
  {
    id: "billing",
    label: "Billing",
    icon: CreditCard,
    children: [
      {
        id: "billing-subscription",
        label: "Subscription",
        icon: Receipt,
        children: [
          { id: "billing-subscription-current-plan", label: "Current Plan", icon: Package },
          { id: "billing-subscription-usage-limits", label: "Usage & Limits", icon: BarChart3 },
          { id: "billing-subscription-upgrade-plan", label: "Upgrade Plan", icon: TrendingUp },
        ],
      },
      {
        id: "billing-payment",
        label: "Payment",
        icon: Wallet,
        children: [
          { id: "billing-payment-payment-methods", label: "Payment Methods", icon: CreditCard },
          { id: "billing-payment-invoices", label: "Invoices", icon: FileText },
          { id: "billing-payment-billing-history", label: "Billing History", icon: Receipt },
        ],
      },
    ],
  },
];

export { nestedMenuItems, type MenuItem, type THistory, type DemoMenuItem };
