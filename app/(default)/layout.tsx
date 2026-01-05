
import I18nProvider from "@/locales/I18nProvider";
import { Metadata } from "next";
import {
  generateMetadata as generateMetadataUtil,
  getLanguageFromSearchParams,
} from "@/lib/metadata";
import { ReactNode } from "react";
import Footer from "@/features/home/components/footer";
import NavbarComponent from "@/features/home/components/navbar";

interface LayoutProps {
  children: React.ReactNode;
  searchParams: { [key: string]: string | string[] | undefined };
}

export async function generateMetadata({
  searchParams,
}: LayoutProps): Promise<Metadata> {
  const lang = getLanguageFromSearchParams(
    new URLSearchParams(searchParams as Record<string, string>)
  );

  return generateMetadataUtil({
    title: lang === "fr" ? "Accueil" : "Home",
    description:
      lang === "fr"
        ? "Lavage Auto pour vos service de lavage auto a domicile"
        : "Car Wash Service Delivered to Your Home",
    path: "",
    currentLang: lang,
  });
}

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <section className={`flex min-h-screen flex-col `}>
      <I18nProvider>
        <main className="flex-grow">{children}</main>
        <NavbarComponent />
        <Footer />
      </I18nProvider>
    </section>
  );
}