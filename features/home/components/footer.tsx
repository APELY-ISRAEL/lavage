"use client";

import { FaFacebook, FaInstagram, FaLinkedin, FaX } from "react-icons/fa6";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <>
      <div className=" p-4 text-primary-50">
        <div className="container mx-auto flex flex-col gap-6  md:flex-row lg:flex-row">
          {/* First column */}
          <div className="flex w-full flex-col md:w-1/3 md:px-3 lg:w-1/3 lg:px-3">
            <Link href="/">
              <Image
                src="/images/logo/logo.png"
                alt="Logo"
                width={160} // Set the width according to your preference
                height={60} // Set the height according to your preference
              />
            </Link>
            <span className="font-kantumruy-medium text-[1rem] text-primary-50">
              Lorem ipsum dolor sit amet, consectetur <br />
              adipiscing elit, sed do eiusmod tempor <br />
              incididunt ut labore et dolore magna aliqua.
            </span>
          </div>

          {/* Second column */}
          <div className="flex w-full font-kantumruy flex-row gap-6 pt-6 md:w-2/3 lg:w-2/3">
            {/* Sub-column 1 */}
            <div className="w-1/3 text-[0.7rem] md:text-[0.7rem] lg:text-[0.9rem]">
              <span className="font-kantumruy-semibold text-[1rem]  text-primary-50">
              {t(`Footer.foot1`)}
              </span>
              <ul className="space-y-3 mt-4">
                <li>
                  <Link href="/terms"> {t(`Footer.foot2`)}</Link>
                </li>

                <li>
                  <Link href="/privacy"> {t(`Footer.foot3`)}</Link>
                </li>
                <li>
                  <Link href="#"> {t(`Footer.foot4`)}</Link>
                </li>
              
                {/* Add more menu items as needed */}
              </ul>
            </div>

            {/* Sub-column 2 */}
            <div className="w-1/3 text-[0.7rem] md:text-[0.7rem] lg:text-[0.9rem]">
              <span className="font-kantumruy-semibold text-[1rem]  text-primary-50">
                 {t(`Footer.foot5`)}
              </span>
              <ul className="space-y-3 mt-4">
                <li>
                  <Link href="/terms"> {t(`Footer.foot6`)}</Link>
                </li>

                <li>
                  <Link href="/privacy"> {t(`Footer.foot4`)}</Link>
                </li>
                <li>
                  <Link href="#"> {t(`Footer.foot7`)}</Link>
                </li>

                {/* Add more menu items as needed */}
              </ul>
            </div>

            {/* Sub-column 4 */}
            <div className="w-1/3 text-[0.7rem] md:text-[0.7rem] lg:text-[0.9rem]">
              <span className="font-kantumruy-semibold text-[1rem]  text-primary-50">
                 {t(`Footer.foot8`)}
              </span>
              <ul className="space-y-3 mt-4">
                <li>
                  <Link href="/terms"> {t(`Footer.foot9`)}</Link>
                </li>

                <li>
                  <Link href="/privacy"> {t(`Footer.foot10`)}</Link>
                </li>

                <div className="mt-4 flex flex-row gap-4 ">
                  <Link href="#">
                    <FaFacebook className="h-4 w-4 text-primary-100" />
                  </Link>
                  <Link href="#">
                    <FaInstagram className="h-4 w-4 text-primary-100" />
                  </Link>
                  <Link href="#">
                    <FaX className="h-4 w-4 text-primary-100" />
                  </Link>
                  <Link href="#">
                    <FaLinkedin className="h-4 w-4 text-primary-100" />
                  </Link>
                </div>
                {/* Add more menu items as needed */}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="flex h-[2rem] items-center justify-center bg-ring">
        <p className="mt-2 gap-2 font-poppins text-[0.7rem] text-white md:text-[0.7rem] lg:text-[0.8rem]">
          {t("Footer.foot2")} copyright
          <Link href="https://blkempire.fr/" className="hover:underline">
            {" "}
             {t(`Footer.foot1`)}
          </Link>
        </p>
      </div>
    </>
  );
};

export default Footer;