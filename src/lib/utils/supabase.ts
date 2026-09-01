import { env } from '$env/dynamic/public';
import { createClient } from '@supabase/supabase-js';
const supabaseUrl = env.PUBLIC_SUPABASE_URL || 'https://unavailable.supabase.co';
const supabaseAnonKey = env.PUBLIC_SUPABASE_ANON_KEY || 'unavailable';

const isBrowser = typeof window !== 'undefined';

const sessionStorageAdapter = {
	getItem: (key: string) => sessionStorage.getItem(key),
	setItem: (key: string, value: string) => sessionStorage.setItem(key, value),
	removeItem: (key: string) => sessionStorage.removeItem(key)
};

const options = {
	db: {
		schema: 'public'
	},
	auth: {
		autoRefreshToken: true,
		persistSession: true,
		detectSessionInUrl: true,
		storage: isBrowser ? sessionStorageAdapter : undefined
	}
};

export const supabase = createClient(supabaseUrl, supabaseAnonKey, options);
