import { Divisor } from '~/components/diegocosta.com.br';

export default function BlogLayout(props: React.PropsWithChildren) {
  return (
    <main>
      <Divisor />
      {props.children}
      <Divisor />
    </main>
  );
}
