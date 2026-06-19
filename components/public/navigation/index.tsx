"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useMount, useUnmount } from "react-use";
import classNames from "classnames";

import Logo from "@/assets/favicon-logo.png";

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);

  useMount(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
  });

  useUnmount(() => {
    window.removeEventListener("scroll", () => {});
  });

  return (
    <div
      className={classNames(
        "sticky top-0 z-10 transition-all duration-200 backdrop-blur-md",
        { "bg-black/30": isScrolled }
      )}
    >
      <nav className="flex items-center justify-between p-4 container mx-auto">
        <Link href="/" className="flex items-center gap-1">
          <Image
            src={Logo}
            className="w-9 mr-1"
            alt="LandingForge Logo"
            width={64}
            height={64}
          />
          <p className="font-sans text-white text-xl font-bold">LandingForge</p>
        </Link>
        <Link
          href="/projects/new"
          className="text-sm text-neutral-300 hover:text-white transition-colors"
        >
          Create Website →
        </Link>
      </nav>
    </div>
  );
}
