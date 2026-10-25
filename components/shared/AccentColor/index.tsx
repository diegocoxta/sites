interface AccentColorProps {
  color: string;
}

export default function AccentColor({ color }: AccentColorProps) {
  return <style>{`body{--main-accent-color:${color}}`}</style>;
}
