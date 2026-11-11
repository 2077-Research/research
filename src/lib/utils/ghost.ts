import { env } from '$env/dynamic/public';
import GhostContentAPI from '@tryghost/content-api';

export const ghostAPI =
	env.PUBLIC_GHOST_URL && env.PUBLIC_GHOST_KEY
		? new GhostContentAPI({
				url: env.PUBLIC_GHOST_URL,
				key: env.PUBLIC_GHOST_KEY,
				version: 'v5.0'
			})
		: null;
