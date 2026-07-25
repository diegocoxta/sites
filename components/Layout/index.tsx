import Header from '~/components/Header';
import ThemeSwitcher from '~/components/ThemeSwitcher';
import CommandBar from '~/components/CommandBar';
import Footer from '~/components/Footer';

import { BlogContentAttributes } from '~/app/cms';

import styles from './styles.module.css';

interface LayoutProps {
  pages: Array<BlogContentAttributes>;
  posts: Array<BlogContentAttributes>;
  repository: string;
  author: string;
  centered?: boolean;
}

export default function Layout(props: React.PropsWithChildren<LayoutProps>) {
  return (
    <div className={props.centered ? styles.centered : ''}>
      <Header name={props.author}>
        <ThemeSwitcher />
        <CommandBar pages={props.pages} posts={props.posts} repository={props.repository} />
      </Header>
      {props.children}
      <Footer sourceCode={props.repository} author={props.author} />
    </div>
  );
}
