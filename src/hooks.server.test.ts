import { describe, expect, it } from 'vitest';
import { handle } from './hooks.server';

describe('security headers', () => {
	it('adds browser security headers to responses', async () => {
		const response = await handle({
			event: {} as never,
			resolve: async () => new Response('ok')
		});

		expect(response.headers.get('x-content-type-options')).toBe('nosniff');
		expect(response.headers.get('referrer-policy')).toBe('strict-origin-when-cross-origin');
		expect(response.headers.get('permissions-policy')).toContain('camera=()');
		expect(response.headers.get('x-frame-options')).toBe('SAMEORIGIN');
	});
});
