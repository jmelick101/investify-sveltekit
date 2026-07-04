// InertiaPageProps removed
import { AxiosInstance } from 'axios';
import type { route as routeFn } from 'ziggy-js';
import { PageProps as AppPageProps } from './';

declare global {
    const route: typeof routeFn;
    interface Window {
        axios: AxiosInstance;
    }
}

