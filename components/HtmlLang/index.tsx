export default function HtmlLang({ locale }: { locale: string }) {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `document.documentElement.lang=${JSON.stringify(locale)}`,
      }}
    />
  );
}
