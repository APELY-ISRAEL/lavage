'use client';

import { useLanguageStore } from '@/stores/languageStore';
import {  useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export const useLanguageFromUrl = () => {
  const { i18n } = useTranslation();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setLanguage } = useLanguageStore();

  // Synchroniser la langue depuis l'URL au chargement
  useEffect(() => {
    const langFromUrl = searchParams.get('lang');
    const validLang = langFromUrl && ['fr', 'en'].includes(langFromUrl) ? langFromUrl : 'fr';

    // Synchroniser le store avec l'URL (source de vérité = URL)
    if (validLang !== i18n.language && i18n.changeLanguage) {
      setLanguage(validLang);
      i18n.changeLanguage(validLang);
    }
  }, [searchParams, i18n, setLanguage]);

  // Fonction pour changer la langue et mettre à jour l'URL
  const changeLanguage = (lang: string) => {
    if (!['fr', 'en'].includes(lang)) return;

    // Créer une nouvelle URL avec le paramètre de langue
    const url = new URL(window.location.href);
    url.searchParams.set('lang', lang);

    // Mettre à jour l'URL avec le nouveau paramètre de langue
    router.push(url.pathname + '?' + url.searchParams.toString());

    // Changer la langue dans i18next
    if (i18n.changeLanguage) {
      i18n.changeLanguage(lang);
    }
    // Mettre à jour le store Zustand
    setLanguage(lang);
  };

  return {
    currentLanguage: i18n.language,
    changeLanguage,
  };
};