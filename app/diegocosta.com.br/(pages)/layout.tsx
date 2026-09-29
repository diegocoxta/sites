import { Divisor } from '~/components/Blog';

export default function BlogLayout(props: React.PropsWithChildren) {
  return (
    <main>
      <Divisor />
      {props.children}
      <Divisor />
    </main>
  );
}
