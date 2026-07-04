import { page } from '$app/stores';
import { derived } from 'svelte/store';

export const isAdmin = derived(page, ($page) => $page.url.startsWith('/admin'));

export const isAdminUser = derived(page, ($page) => $page.data?.user?.role === 'admin');

export const isCompanyUser = derived(page, ($page) => $page.data?.user?.role === 'company');
