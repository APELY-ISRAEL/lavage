/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import * as React from "react";
import Image from "next/image";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  parsePhoneNumberFromString,
  getCountryCallingCode,
  getCountries,
  type CountryCode,
} from "libphonenumber-js";
import worldCountriesData from "world-countries";
import { Input } from "./ui/input";

const countries = Array.isArray(worldCountriesData)
  ? worldCountriesData
  : (worldCountriesData as any).default || [];

interface Country {
  code: string;
  name: string;
  flag: string;
  callingCode: string;
}

interface PhoneInputProps {
  value?: string;
  onChange?: (value: string, isValid: boolean) => void;
  placeholder?: string;
  className?: string;
  defaultCountry?: string;
  disabled?: boolean;
  label?: string;
  id?: string;
}

export function PhoneInput({
  value = "",
  onChange,
  placeholder = "",
  className,
  defaultCountry = "TG",
  disabled = false,
  label,
  id,
}: PhoneInputProps) {
  const [open, setOpen] = React.useState(false);
  const [selectedCountry, setSelectedCountry] = React.useState<Country | null>(
    null
  );
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [searchQuery, setSearchQuery] = React.useState("");

  // Liste des pays disponibles
  const countryList = React.useMemo(() => {
    const countryCodes = getCountries();
    return countries
      .filter((country: any) => {
        // world-countries utilise 'cca2' pour le code du pays
        return (
          country.cca2 && countryCodes.includes(country.cca2 as CountryCode)
        );
      })
      .map((country: any) => {
        const callingCode = getCountryCallingCode(country.cca2 as CountryCode);
        return {
          code: country.cca2,
          name: country.name?.common || country.name,
          flag: `https://flagcdn.com/16x12/${country.cca2.toLowerCase()}.png`,
          callingCode: `+${callingCode}`,
        };
      })
      .sort((a: Country, b: Country) => a.name.localeCompare(b.name));
  }, []);

  // Fonction pour obtenir un pays par son code
  const getCountryByCode = React.useCallback(
    (code: string) => {
      try {
        const countryCode = code.toUpperCase();
        const callingCode = getCountryCallingCode(countryCode as CountryCode);
        if (!callingCode) return countryList[0];

        const country = countryList.find(
          (c: Country) => c.code === countryCode
        );
        if (country) return country;

        return {
          code: countryCode,
          name: countryCode,
          flag: "/placeholder.svg",
          callingCode: `+${callingCode}`,
        };
      } catch (error) {
        console.error("Error getting country:", error);
        return countryList[0];
      }
    },
    [countryList]
  );

  // Initialiser le pays par défaut
  React.useEffect(() => {
    if (!selectedCountry && countryList.length > 0) {
      setSelectedCountry(getCountryByCode(defaultCountry));
    }
  }, [countryList, defaultCountry, selectedCountry, getCountryByCode]);

  // Fonction pour formater le numéro pendant la saisie
  const formatPhoneNumberAsYouType = React.useCallback(
    (input: string, countryCode: string) => {
      // Pour le Togo (code 'TG')
      if (countryCode === "TG") {
        const cleaned = ("" + input).replace(/\D/g, "");
        const match = cleaned.match(/^(\d{0,2})(\d{0,2})(\d{0,2})(\d{0,2})$/);
        if (match) {
          return [match[1], match[2], match[3], match[4]]
            .filter((group) => group.length > 0)
            .join(" ");
        }
      }

      // Format générique pour d'autres pays
      return input;
    },
    []
  );

  // Fonction pour valider un numéro de téléphone
  const validatePhoneNumber = React.useCallback(
    (phoneNumber: string, countryCode: string) => {
      try {
        const parsedNumber = parsePhoneNumberFromString(
          phoneNumber,
          countryCode as CountryCode
        );
        return parsedNumber ? parsedNumber.isValid() : false;
      } catch (error) {
        console.error("Phone number validation error:", error);
        return false;
      }
    },
    []
  );

  // Gérer le changement de numéro
  const handlePhoneChange = (input: string) => {
    const rawValue = input.replace(/\D/g, "");
    setPhoneNumber(rawValue);

    if (selectedCountry && onChange) {
      const fullNumber = `${selectedCountry.callingCode}${rawValue}`;
      const isValid = validatePhoneNumber(fullNumber, selectedCountry.code);
      // Retourner le numéro complet avec le code pays
      onChange(fullNumber, isValid);
    }
  };

  // Gérer la sélection du pays
  const handleCountrySelect = (country: Country) => {
    setSelectedCountry(country);
    setOpen(false);

    if (onChange && phoneNumber) {
      const fullNumber = `${country.callingCode}${phoneNumber}`;
      const isValid = validatePhoneNumber(fullNumber, country.code);
      // Retourner le numéro complet avec le code pays
      onChange(fullNumber, isValid);
    }
  };

  // Filtrer les pays selon la recherche
  const filteredCountries = React.useMemo(() => {
    if (!searchQuery) return countryList;

    return countryList.filter(
      (country: Country) =>
        country.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        country.callingCode.includes(searchQuery)
    );
  }, [countryList, searchQuery]);

  // Mettre à jour le numéro depuis les props
  React.useEffect(() => {
    if (value) {
      // Si la valeur commence par +, extraire le code pays et le numéro
      if (value.startsWith("+")) {
        try {
          const parsed = parsePhoneNumberFromString(value);
          if (parsed) {
            const countryCode = parsed.country;
            if (countryCode) {
              const country = getCountryByCode(countryCode);
              setSelectedCountry(country);
              setPhoneNumber(parsed.nationalNumber);
            }
          }
        } catch (error) {
          console.error("Error parsing phone number:", error);
          setPhoneNumber(value.replace(/^\+\d+/, "").replace(/\D/g, ""));
        }
      } else if (value !== phoneNumber) {
        setPhoneNumber(value);
      }
    }
  }, [value, phoneNumber, getCountryByCode]);

  const isValid = phoneNumber
    ? selectedCountry
      ? validatePhoneNumber(
          `${selectedCountry.callingCode}${phoneNumber}`,
          selectedCountry.code
        )
      : false
    : true;

  return (
    <div>
      {label && (
        <label htmlFor={id} className="block text-[1rem]">
          {label}
        </label>
      )}
      <div className={cn("flex w-full gap-0", label ? "mt-1" : "", className)}>
        {/* Sélection pays */}
        <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            disabled={disabled}
            className="w-[100px] justify-between rounded-r-none border-r-0 bg-gray-50 px-3 py-6 font-poppins-regular">
            <div className="flex items-center gap-2">
              {selectedCountry && (
                <Image
                  src={selectedCountry.flag || "/placeholder.svg"}
                  alt={selectedCountry.name}
                  width={16}
                  height={12}
                  className="h-3 w-4 object-cover"
                />
              )}
              <span className="text-sm">
                {selectedCountry ? selectedCountry.callingCode : "Pays"}
              </span>
            </div>
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[300px] p-0" align="start">
          <Command>
            <CommandInput
              placeholder="Rechercher un pays..."
              value={searchQuery}
              onValueChange={setSearchQuery}
              className="h-9"
            />
            <CommandList>
              <CommandEmpty>Aucun pays trouvé.</CommandEmpty>
              <CommandGroup>
                {filteredCountries.map((country: Country) => (
                  <CommandItem
                    key={country.code}
                    value={country.code}
                    onSelect={() => handleCountrySelect(country)}
                    className="cursor-pointer">
                    <div className="flex items-center gap-3">
                      <Image
                        src={country.flag || "/placeholder.svg"}
                        alt={country.name}
                        width={16}
                        height={12}
                        className="h-3 w-4 object-cover"
                      />
                      <div className="flex-1">
                        <span className="block text-sm font-poppins-medium">
                          {country.name}
                        </span>
                        <span className="block text-xs text-gray-500 font-poppins-regular">
                          {country.callingCode}
                        </span>
                      </div>
                    </div>
                    <Check
                      className={cn(
                        "ml-auto h-4 w-4",
                        selectedCountry?.code === country.code
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {/* Input téléphone */}
      <div className="flex-1">
        <Input
          id={id}
          type="tel"
          value={
            selectedCountry
              ? formatPhoneNumberAsYouType(phoneNumber, selectedCountry.code)
              : phoneNumber
          }
          onChange={(e) => handlePhoneChange(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          className={cn(
            "w-full rounded-l-none rounded-r-lg border px-3 py-6 font-poppins-regular text-sm focus:outline-none focus:ring-2",
            !isValid && phoneNumber
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-200 focus:border-primary-50 focus:ring-primary-50"
          )}
          maxLength={15}
          pattern="[0-9 ]*"
          autoComplete="tel"
        />
        {!isValid && phoneNumber && (
          <p className="mt-1 text-xs text-red-500 font-poppins-regular">
            Numéro de téléphone invalide
          </p>
        )}
      </div>
      </div>
    </div>
  );
}