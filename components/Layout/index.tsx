import Header from '~/components/Header';
import ThemeSwitcher from '~/components/ThemeSwitcher';
import CommandBar from '~/components/CommandBar';
import Footer from '~/components/Footer';

import { BlogContentAttributes } from '~/app/cms';

interface LayoutProps {
  pages: Array<BlogContentAttributes>;
  repository: string;
  author: string;
}

export default function Layout(props: React.PropsWithChildren<LayoutProps>) {
  return (
    <>
      <Header name={props.author}>
        <ThemeSwitcher />
        <CommandBar pages={props.pages} repository={props.repository} />
      </Header>
      {props.children}
      <Footer sourceCode={props.repository} author={props.author} />
    </>
  );
}
