import { error } from '@sveltejs/kit';

export function load() {
	throw error(404, 'Article review is not currently accepting submissions');
}
