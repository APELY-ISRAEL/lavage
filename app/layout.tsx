import { anektelugu } from '@/lib/fonts';
import './globals.css';
import Script from 'next/script';
import { AuthProvider } from '@/context/AuthContext';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={anektelugu.variable}>
      <head>
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#903727" />
        <meta name="msapplication-TileColor" content="#903727" />

        {/* Structured Data - Organization */}
        <Script
          id="organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Samu Academie',
              url: 'https://www.lavage.com',
              logo: 'https://www.lavage.com/images/logo/logo.svg',
              description:
                'Plateforme de formation des agents immobiliers',
              contactPoint: {
                '@type': 'ContactPoint',
                contactType: 'customer service',
                url: 'https://www.lavage.com/contact',
              },
            }),
          }}
        />

        {/* Structured Data - Website */}
        <Script
          id="website-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'Samu Academie',
              url: 'https://www.slavage.com',
              description:
                'Lavage Auto pour vos service de lavage auto a domicile',
            }),
          }}
        />
      </head>
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}