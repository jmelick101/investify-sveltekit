import { page } from '$app/stores';
import { derived } from 'svelte/store';


// This
export const isAdmin = derived(page, ($page) => $page.url.startsWith('/admin'));


// or this
export const isAdminUser = derived(page, ($page) => $page.props.auth?.user?.role === 'admin');

export const isCompanyUser = derived(page, ($page) => $page.props.auth?.user?.role === 'company');