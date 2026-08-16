import { createRobots } from '~/lib/metadata';

import config from '~/app/diegocosta.com.br/config';

export const GET = () => createRobots(config.domain);
