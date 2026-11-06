"use client";

import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const testimonials = [
  {
    quote:
      '"The Bali Trip Was Absolutely Magical! Every Detail Was Perfectly Planned. The Resorts Were Luxurious And The Cultural Experiences Were Unforgettable."',
    author: "Michael Chen",
    location: "Singapore",
    image: "/images/person2.png", // চশমা পরা পুরুষের ছবি
  },
  {
    quote:
      '"Swiss Alps Adventure Exceeded All Expectations. The Mountain Views Were Breathtaking And Our Guide Was Incredibly Knowledgeable. Highly Recommend!"',
    author: "Sarah Johnson",
    location: "New York, USA",
    image: "/images/person1.png", // নারীর ছবি
  },
  {
    quote:
      '"An unforgettable journey through Kyoto! The personalized itinerary and expert local guides made our vacation seamless and deeply enriching."',
    author: "David Lee",
    location: "Tokyo, Japan",
    image: "/images/person2.png",
  },
  {
    quote:
      '"Exploring the Greek islands was a dream come true. Flawless hotel bookings, easy transfers, and 24/7 support whenever we had questions."',
    author: "Elena Rostova",
    location: "Athens, Greece",
    image: "/images/person1.png",
  },
];

export function TravelersSay() {
  return (
    <section id="testimonials" className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          {/* হেডার: টাইটেল ও অ্যারো বাটন */}
          <div className="flex items-center justify-between gap-6">
            <h2 className="font-heading text-4xl font-normal tracking-[-0.01em] text-[#111315] sm:text-5xl">
              What Travelers Say
            </h2>

            <div className="flex shrink-0 items-center gap-3">
              <CarouselPrevious
                size="icon"
                className="static size-10 cursor-pointer border-[#d9e0e5] bg-transparent text-[#8d99a3] shadow-none transition-colors duration-200 hover:bg-[#f5f8fa] hover:text-[#111315] active:scale-95"
              />
              <CarouselNext
                size="icon"
                className="static size-10 cursor-pointer border-[#d9e0e5] bg-transparent text-[#8d99a3] shadow-none transition-colors duration-200 hover:bg-[#f5f8fa] hover:text-[#111315] active:scale-95"
              />
            </div>
          </div>

          <p className="mt-2 text-sm text-[#6b7280]">
            Real experiences from our happy travelers
          </p>

          {/* রিভিউ কার্ড স্লাইডার */}
          <CarouselContent className="-ml-5 mt-8">
            {testimonials.map((item) => (
              <CarouselItem
                key={item.author}
                className="basis-full pl-5 md:basis-1/2"
              >
                <article className="grid h-full grid-cols-1 overflow-hidden border border-[#e3e8eb] bg-white shadow-[0_2px_14px_rgba(0,0,0,0.03)] transition-all duration-300 hover:border-gray-300 hover:shadow-lg sm:grid-cols-[1.35fr_1fr]">
                  {/* বাম পাশের টেক্সট */}
                  <div className="flex flex-col justify-between p-6 sm:p-7">
                    <p className="font-heading text-[15px] leading-[1.5] text-[#111315] sm:text-base">
                      {item.quote}
                    </p>

                    <div className="mt-8">
                      <div className="flex items-center gap-2">
                        <span aria-hidden className="h-0.5 w-5 bg-brand" />
                        <p className="text-sm font-semibold text-brand">
                          {item.author}
                        </p>
                      </div>
                      <p className="mt-1 text-xs text-[#8a949e]">
                        {item.location}
                      </p>
                    </div>
                  </div>

                  {/* ডান পাশের ইমেজ */}
                  <div className="relative min-h-[220px] overflow-hidden bg-neutral-100 sm:min-h-[230px]">
                    <Image
                      src={item.image}
                      alt={item.author}
                      fill
                      sizes="(min-width: 768px) 25vw, 100vw"
                      className="object-cover object-center"
                    />
                  </div>
                </article>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}
