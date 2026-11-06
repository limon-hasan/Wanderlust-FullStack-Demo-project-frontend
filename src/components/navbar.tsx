"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, UserRound, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useRouter } from "next/navigation";
const navLinks = [
  { label: "Home", href: "/" },
  { label: "Destinations", href: "/destinations" },
  { label: "Add Destination", href: "/add-destination" },
  { label: "My Bookings", href: "/my-bookings" },
];

const authLinks = [
  { label: "Sign in", href: "/signin" },
  { label: "Sign Up", href: "/signup" },
];

export function Navbar() {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const user = session?.user;
  console.log("User data : ", user);

  const handleSignOut = () => {
    authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/signin");
          router.refresh();
        },
      },
    });
  };

  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-[0_2px_10px_rgba(0,0,0,0.08)]">
      {/* max-w-6xl mx-auto jog koray eita nicher content-er shathe exact line-e thakbe */}
      <nav className="relative mx-auto grid h-14 max-w-6xl grid-cols-[1fr_auto_1fr] items-center px-6 text-[#1c1f23] sm:px-8 lg:px-12">
        {/* ১. Baam pasher Links (Nicher "Showing 19 destinations"-er sathe align hobe) */}
        <div className="flex items-center pr-4">
          <Button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
            className="inline-flex size-8 items-center justify-center text-[#1c1f23] lg:hidden"
          >
            {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>

          <div className="hidden items-center gap-5 text-sm font-semibold lg:flex xl:gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={
                  link.label === "Home"
                    ? "relative font-bold text-brand-dark after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-full after:bg-brand-dark"
                    : "text-[#1c1f23] transition-colors hover:text-brand-dark"
                }
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* ২. Majhkhaner Logo */}
        <Link href="/" className="justify-self-center px-4">
          <Image
            src="/images/Wanderlast.png"
            alt="Wanderlast"
            width={162}
            height={24}
            priority
            className="h-6 w-auto"
          />
        </Link>

        {/* ৩. Daan pasher Profile o Auth Links */}
        <div className="flex items-center justify-end pl-4">
          <div className="hidden items-center gap-5 text-sm font-semibold lg:flex xl:gap-6">
            <Link
              href="/profile"
              className="inline-flex items-center gap-1.5 text-[#1c1f23] transition-colors hover:text-brand-dark"
            >
              <UserRound className="size-4" strokeWidth={1.8} />
              Profile
            </Link>
            {user ? (
              <Popover>
                <PopoverTrigger
                  nativeButton={false}
                  render={
                    <Avatar>
                      <AvatarImage
                        referrerPolicy="no-referrer"
                        src={user?.image as string}
                      />
                      <AvatarFallback>{user?.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  }
                ></PopoverTrigger>
                <PopoverContent>
                  <PopoverHeader>
                    <PopoverTitle>{user?.name}</PopoverTitle>
                    <PopoverDescription>
                      <p>{user?.email}</p>
                      <Button
                        onClick={handleSignOut}
                        variant={"destructive"}
                        className="my-2"
                      >
                        Sign out
                      </Button>
                    </PopoverDescription>
                  </PopoverHeader>
                </PopoverContent>
              </Popover>
            ) : (
              authLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-[#1c1f23] transition-colors hover:text-brand-dark"
                >
                  {link.label}
                </Link>
              ))
            )}
          </div>

          <Link
            href="#signup"
            className="text-sm font-bold text-brand-dark lg:hidden"
          >
            Sign Up
          </Link>
        </div>

        {/* Mobile Dropdown Menu */}
        {menuOpen && (
          <div className="absolute inset-x-0 top-full mt-1 border-t border-black/10 bg-white p-4 shadow-xl lg:hidden">
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={closeMenu}
                  className="text-[15px] font-semibold text-[#1c1f23]"
                >
                  {link.label}
                </Link>
              ))}

              <div className="my-1 h-px bg-black/10" />

              <Link
                href="/profile"
                onClick={closeMenu}
                className="inline-flex items-center gap-1.5 text-[15px] font-semibold text-[#1c1f23]"
              >
                <UserRound className="size-4" strokeWidth={1.8} />
                Profile
              </Link>
              {authLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={closeMenu}
                  className="text-[15px] font-semibold text-[#1c1f23]"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
