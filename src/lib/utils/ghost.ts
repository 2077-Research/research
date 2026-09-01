import { env } from '$env/dynamic/public';
import GhostContentAPI from '@tryghost/content-api';

const ghostUrl = env.PUBLIC_GHOST_URL;
const ghostKey = env.PUBLIC_GHOST_KEY;

export const ghostAPI =
	ghostUrl && ghostKey
		? new GhostContentAPI({
				url: ghostUrl,
				key: ghostKey,
				version: 'v5.0'
			})
		: null;
