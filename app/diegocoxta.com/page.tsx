import Linktree, { LinktreeProps } from '~/components/Linktree';
import Username from '~/components/Username';

import config from '~/app/diegocoxta.com/config';

export const revalidate = 3600;

export default function HomePage() {
  const icons = config.links?.filter((l) => l.type === 'icon');
  const cards = config.links?.filter((l) => l.type === 'card');

  return (
    <Linktree
      background={config.avatar}
      icons={icons as LinktreeProps['icons']}
      cards={cards as LinktreeProps['cards']}
    >
      <Username username={config.author} size={32} />
      <p className="bio">{config.description}</p>
    </Linktree>
  );
}
