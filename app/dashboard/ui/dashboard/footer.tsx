"use client";

import { FaEnvelope, FaFacebook, FaInstagram, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";


const Footer = () => {
  const { t } = useTranslation();
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setSubscribed(true);
    setTimeout(() => setSubscribed(false), 3000); // message disparaît après 3s
  };

  return (
    <footer className="bg-primary-250 text-white">
      {/* Ligne du bas */}
      <div className="bg-primary-900 py-1">
        <p className="text-center text-[0.9rem] text-gray-200 font-poppins">
          © {new Date().getFullYear()} <span className="text-primary-100">AutoLuxe</span> — Propulsé par{"israel_dev"}
          <Link href="israelapely@gmail.com" className="hover:underline text-primary-200 font-semibold">
           Isra_dev
          </Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
