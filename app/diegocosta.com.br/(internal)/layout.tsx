import Divisor from '~/components/Divisor';

export default function InternalLayout({ children }: React.PropsWithChildren) {
  return (
    <>
      {children}
      <Divisor />
    </>
  );
}
