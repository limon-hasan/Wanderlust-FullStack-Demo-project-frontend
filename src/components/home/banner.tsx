import Image from "next/image";
import { ArrowRight } from "lucide-react";

const searchFields = [
  { label: "Location", value: "Address, City Or Zip" },
  { label: "Date/Duration", value: "Anytime/3 Days" },
  { label: "Budget", value: "$0-$3000" },
  { label: "People", value: "5-10" },
];

export function Banner() {
  return (
    <section className="font-heading font-normal relative flex min-h-svh flex-col overflow-hidden bg-neutral-900">
      <Image
        src="/images/Banner.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />

      <div className="absolute inset-0 bg-black/25" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/5 to-black/35" />

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-4 pt-28 pb-12 text-center text-white sm:pb-16">
        <h1 className="max-w-4xl font-heading text-[clamp(2.5rem,6.2vw,5rem)] leading-[1.12] font-normal tracking-[-0.02em]">
          Discover Your
          <br />
          Next Adventure
        </h1>

        <p className="mt-7 max-w-[600px] text-base leading-[1.6] text-white/90 md:text-lg">
          Explore breathtaking destinations and create unforgettable memories
          with our curated travel experiences.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-2.5">
          <a
            href="#search"
            className="inline-flex h-[50px] min-w-[175px] items-center justify-center gap-3 bg-brand px-4 text-xs font-bold uppercase tracking-[0.14em] text-white transition-colors hover:bg-brand-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Explore Now
            <ArrowRight className="size-[18px]" strokeWidth={1.8} />
          </a>
          <a
            href="#destinations"
            className="inline-flex h-[50px] min-w-[175px] items-center justify-center bg-white/60 px-4 text-xs font-bold uppercase tracking-[0.14em] text-white backdrop-blur-[2px] transition-colors hover:bg-white/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            View Destination
          </a>
        </div>
      </div>

      <div
        id="search"
        role="search"
        className="relative z-10 grid min-h-[52px] w-full grid-cols-2 border-t border-white/15 bg-white/20 backdrop-blur-md lg:grid-cols-[1fr_1fr_1fr_1fr_170px] lg:divide-x"
      >
        {searchFields.map((field) => (
          <button
            key={field.label}
            type="button"
            className="flex flex-col items-start justify-center border-b border-white/15 px-6 py-2 text-left transition-colors even:border-l hover:bg-white/5 focus-visible:bg-white/10 focus-visible:outline-none lg:border-b-0 lg:border-l-0"
          >
            <span className="text-sm font-bold text-white">{field.label}</span>
            <span className="mt-0.5 text-xs text-white/80">{field.value}</span>
          </button>
        ))}

        <button
          type="button"
          className="col-span-2 flex min-h-[52px] items-center justify-center bg-brand px-8 text-[15px] font-bold text-white transition-colors hover:bg-brand-dark focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-white lg:col-span-1"
        >
          Search
        </button>
      </div>
    </section>
  );
}
