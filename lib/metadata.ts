import type { Metadata } from 'next';

const BASE_URL = 'https://www.lavage.com';

export interface GenerateMetadataOptions {
  title?: string;
  description?: string;
  path?: string;
  currentLang?: string;
  noIndex?: boolean;
}

export function generateMetadata({
  title,
  description,
  path = '',
  currentLang = 'fr',
  noIndex = false,
}: GenerateMetadataOptions): Metadata {
  const canonicalUrl = `${BASE_URL}${path}?lang=${currentLang}`;

  return {
    title: title
      ? `${title} | Lavage-Auto`
      : 'Lavage-Auto - Plateforme de lavage autommobile',
    description:
      description ||
      'Lavage Auto pour vos service de lavage auto a domicile',
    alternates: {
      canonical: canonicalUrl,
      languages: {
        fr: `${BASE_URL}${path}?lang=fr`,
        en: `${BASE_URL}${path}?lang=en`,
        'x-default': `${BASE_URL}${path}`,
      },
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      title:
        title ||
        'Lavage Auto pour vos service de lavage auto a domicile',
      description:
        description ||
        'Lavage Auto pour vos service de lavage auto a domicile',
      type: 'website',
      locale: currentLang === 'fr' ? 'fr_FR' : 'en_US',
      url: canonicalUrl,
      siteName: 'Lavage-Auto',
      images: [
        {
          url: '/images/logo/logo.svg',
          width: 1200,
          height: 630,
          alt: 'Samu Academie Logo',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title:
        title ||
          'Lavage Auto pour vos service de lavage auto a domicile',
      description:
        description ||
        'Lavage Auto pour vos service de lavage auto a domicile',
      images: ['/images/logo/logo.svg'],
    },
  };
}

// Fonction pour obtenir la langue depuis les paramètres de recherche
export function getLanguageFromSearchParams(
  searchParams: URLSearchParams,
): string {
  const lang = searchParams.get('lang');
  return lang && ['fr', 'en'].includes(lang) ? lang : 'fr';
}