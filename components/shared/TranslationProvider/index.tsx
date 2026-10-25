'use client';

import { createContext, useContext, useMemo } from 'react';

import { createTranslator, type Translator } from '~/lib/i18n/translator';
import type { Locale } from '~/lib/i18n/locale';

const TranslatorContext = createContext<Translator | null>(null);

interface TranslationProviderProps {
  messages: Record<string, string>;
  locale: Locale;
  children: React.ReactNode;
}

export default function TranslationProvider({ messages, locale, children }: TranslationProviderProps) {
  const t = useMemo(() => createTranslator(messages, locale), [messages, locale]);
  return <TranslatorContext.Provider value={t}>{children}</TranslatorContext.Provider>;
}

export function useTranslator(): Translator {
  const t = useContext(TranslatorContext);

  if (!t) {
    throw new Error('useTranslator() must be used within <TranslationProvider>.');
  }

  return t;
}
