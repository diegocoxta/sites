import { createRobots } from '~/app/metadata';

import config from '~/app/diegocoxta.com/config';

export const GET = () => createRobots(config.domain);
