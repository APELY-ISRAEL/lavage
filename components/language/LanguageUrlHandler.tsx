'use client';

import { useEffect, Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useLanguageStore } from '@/stores/languageStore';

const LanguageUrlHandlerContent = () => {
  const { i18n } = useTranslation();
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const { language, setLanguage } = useLanguageStore();

  useEffect(() => {
    const langFromUrl = searchParams.get('lang');
    const validLang =
      langFromUrl && ['fr', 'en'].includes(langFromUrl) ? langFromUrl : 'fr';

    // Si pas de paramètre lang dans l'URL, l'ajouter avec la langue par défaut ou celle du store
    if (!langFromUrl) {
      const defaultLang = language || 'fr';
      const params = new URLSearchParams(searchParams);
      params.set('lang', defaultLang);
      router.replace(`${pathname}?${params.toString()}`);
      return;
    }

    // Synchroniser le store avec l'URL (source de vérité = URL)
    if (validLang !== language) {
      setLanguage(validLang);
    }

    // Synchroniser i18n avec l'URL
    if (validLang !== i18n.language) {
      i18n.changeLanguage(validLang);
    }
  }, [searchParams, router, pathname, language, i18n, setLanguage]);

  return null;
};

const LanguageUrlHandler = () => {
  return (
    <Suspense fallback={null}>
      <LanguageUrlHandlerContent />
    </Suspense>
  );
};

export default LanguageUrlHandler;