"use client";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#0b0d10] pt-16 pb-8 text-white sm:pt-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Brand Section */}
        <div className="mb-14">
          <Link href="/" className="inline-block">
            <span className="font-heading text-4xl font-extrabold tracking-tight sm:text-5xl">
              Wanderlast
            </span>
          </Link>
          <p className="mt-2 text-sm text-gray-400">
            Your gateway to extraordinary travel experiences around the world.
          </p>
        </div>

        {/* 4-Column Links & Newsletter Grid */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-4 lg:gap-8">
          {/* Column 1: Newsletter */}
          <div>
            <h3 className="text-xs font-medium uppercase tracking-wider text-gray-300">
              Newsletter
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-gray-400">
              Subscribe for exclusive travel deals and inspiration.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="mt-4 flex items-center bg-[#25282d] px-3 py-2"
            >
              <input
                type="email"
                placeholder="Enter email"
                className="w-full bg-transparent text-xs text-white placeholder-gray-400 focus:outline-none"
              />
              <button
                type="submit"
                aria-label="Submit Newsletter"
                className="text-gray-300 transition-colors hover:text-white"
              >
                <ArrowUpRight className="size-4" />
              </button>
            </form>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-xs font-medium uppercase tracking-wider text-gray-300">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-2.5 text-xs text-gray-400">
              <li>
                <Link href="/" className="transition-colors hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/destinations"
                  className="transition-colors hover:text-white"
                >
                  Destinations
                </Link>
              </li>
              <li>
                <Link
                  href="/bookings"
                  className="transition-colors hover:text-white"
                >
                  My Bookings
                </Link>
              </li>
              <li>
                <Link
                  href="/profile"
                  className="transition-colors hover:text-white"
                >
                  My Profile
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Support */}
          <div>
            <h3 className="text-xs font-medium uppercase tracking-wider text-gray-300">
              Support
            </h3>
            <ul className="mt-4 space-y-2.5 text-xs text-gray-400">
              <li>
                <Link
                  href="/help-center"
                  className="transition-colors hover:text-white"
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="transition-colors hover:text-white"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="transition-colors hover:text-white"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Us */}
          <div>
            <h3 className="text-xs font-medium uppercase tracking-wider text-gray-300">
              Contact Us
            </h3>
            <div className="mt-4 space-y-2.5 text-xs text-gray-400">
              <p>786 901 1622</p>
              <p>
                <a
                  href="mailto:info@wandarland.com"
                  className="transition-colors hover:text-white"
                >
                  info@wandarland.com
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Socials */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-[#1e2229] pt-6 sm:flex-row">
          <p className="text-[11px] text-gray-500">
            © 2026 Wanderlust. All rights reserved.
          </p>

          <div className="flex items-center gap-5 text-gray-300">
            {/* X / Twitter */}
            <a
              href="https://x.com"
              target="_blank"
              rel="noreferrer"
              aria-label="X"
              className="transition-colors hover:text-white"
            >
              <svg className="size-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>

            {/* LinkedIn */}
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="transition-colors hover:text-white"
            >
              <svg
                className="size-4 fill-none stroke-current stroke-2"
                viewBox="0 0 24 24"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect width="4" height="12" x="2" y="9" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>

            {/* Instagram */}
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="transition-colors hover:text-white"
            >
              <svg
                className="size-4 fill-none stroke-current stroke-2"
                viewBox="0 0 24 24"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
