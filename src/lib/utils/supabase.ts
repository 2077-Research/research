import { createClient } from '@supabase/supabase-js';

// Authentication is disabled until Supabase is configured. Keeping these
// placeholders local avoids a deployment-specific runtime env chunk in browsers.
const supabaseUrl = 'https://unavailable.supabase.co';
const supabaseAnonKey = 'unavailable';

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
