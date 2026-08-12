import Linktree, { LinktreeProps } from '~/components/Linktree';
import Avatar from '~/components/Avatar';
import Username from '~/components/Username';

import config from '~/app/diegocoxta.com/config';

export const revalidate = 3600;

export default function HomePage() {
  return (
    <Linktree social={config.social as LinktreeProps['social']} pages={config.pages as LinktreeProps['pages']}>
      <Avatar src={config.avatar} alt={config.title} size={96} />
      <Username username={config.title} size={32} />
    </Linktree>
  );
}
