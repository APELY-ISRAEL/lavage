'use client';

import { useTranslation } from 'react-i18next';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Globe, Check } from 'lucide-react';
import Image from 'next/image';
import { useLanguageFromUrl } from '@/hooks/useLanguageFromUrl';
import { Suspense } from 'react';
import { Button } from '../ui/button';




const LanguageSwitcherContent = () => {
  const { t } = useTranslation();
  const { currentLanguage, changeLanguage } = useLanguageFromUrl();

  const languages = [
    {
      code: 'fr',
      name: 'Français',
      flag: '/images/flags/france.svg',
    },
    {
      code: 'en',
      name: 'English',
      flag: '/images/flags/uk.svg',
    },
  ];

  const handleLanguageChange = (langCode: string) => {
    changeLanguage(langCode);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="flex items-center rounded-md  ">
          <Globe className="h-4 w-4 text-white " />
          <span className={`hidden sm:inline font-kantumruy-medium text-white hover:text-white `}>{t('home.navbar.language')}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => handleLanguageChange(language.code)}
            className="flex cursor-pointer items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <Image
                src={language.flag}
                alt={`${language.name} flag`}
                width={16}
                height={16}
                
              />
              <span>{language.name}</span>
            </div>
            {currentLanguage === language.code && <Check className="h-4 w-4" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const LanguageSwitcher = () => {
  return (
    <Suspense fallback={
      <Button className="flex items-center rounded-md">
        <Globe className="h-4 w-4 text-white" />
        <span className="hidden sm:inline font-kantumruy-medium text-white hover:text-white">Language</span>
      </Button>
    }>
      <LanguageSwitcherContent />
    </Suspense>
  );
};

export default LanguageSwitcher;