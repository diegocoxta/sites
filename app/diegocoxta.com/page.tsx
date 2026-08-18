import Linktree, { LinktreeProps } from '~/components/Linktree';
import Username from '~/components/Username';

import config from '~/app/diegocoxta.com/config';

export const revalidate = 3600;

export default function HomePage() {
  return (
    <Linktree
      background={config.background}
      icons={config.icons as LinktreeProps['icons']}
      cards={config.cards as LinktreeProps['cards']}
    >
      <Username username={config.author} size={32} />
      <p className="bio">{config.description}</p>
    </Linktree>
  );
}
