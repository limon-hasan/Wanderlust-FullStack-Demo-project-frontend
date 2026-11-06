import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function CtaBanner() {
  return (
    <section className="relative w-full overflow-hidden py-24 sm:py-28 md:py-32">
      {/* Background Image with Dark Overlay */}
      <Image
        src="/images/CTA.png"
        alt="Travel Destination"
        fill
        priority
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-black/45" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center text-white sm:px-6">
        <h2 className="font-heading text-3xl font-normal tracking-tight sm:text-4xl md:text-5xl lg:text-[54px] lg:leading-tight">
          Ready To Start Your Journey?
        </h2>

        <p className="mt-3 text-sm font-light text-gray-200 sm:text-base">
          Join thousands of travelers who have discovered the world with us
        </p>

        <div className="mt-8 flex justify-center">
          <Link
            href="/destinations"
            className="inline-flex items-center gap-2 bg-white px-7 py-3 text-xs font-semibold uppercase tracking-wider text-[#111315] shadow-lg transition-all duration-200 hover:bg-gray-100 active:scale-95"
          >
            Book Your Trip Today
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
