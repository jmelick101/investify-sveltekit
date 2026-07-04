import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavItem {
    title: string;
    href: string;
    icon?: any;
    isActive?: boolean;
    counter?: number;
}

export interface NavItemGroup {
    menuGroup: string;
    items: NavItem[];
}

export interface UserMenuItem {
    menuGroup: string;
    items: NavItem[];
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    notifications: Notification[];
    [key: string]: unknown;
    ziggy: Config & { location: string };
};

export interface User {
    id: number;
    name: string; // Keep name for backward compatibility if needed, or remove if fully deprecated
    company_name?: string;
    first_name: string;
    last_name: string;
    email: string;
    phone?: string;
    address?: string;
    city?: string;
    state?: string;
    zip_code?: string;
    country?: string;
    avatar_path?: string;
    profile_photo_url?: string;
    role: string;
    email_verified_at: string | null;
    two_factor_confirmed_at: string | null;
    created_at: string;
    updated_at: string;
}

export type BreadcrumbItemType = BreadcrumbItem;

export interface Notification {
    id: string;
    title: string;
    message: string;
    read: boolean;
    created: string;
}
