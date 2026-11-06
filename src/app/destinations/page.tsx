import { Suspense } from "react";
import DestinationsGrid, {
  Destination,
} from "@/components/destination/DestinationsGrid";

// ১. ডেটা ফেচিং কম্পোনেন্ট (কাউন্ট এবং কার্ড গ্রিড রেন্ডার করবে)
async function Destinations() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/destinations`, {
    cache: "no-store",
  });
  const data: Destination[] = await res.json();

  return (
    <>
      {/* প্যাকেজের সংখ্যা */}
      <p className="mt-8 text-sm font-medium text-gray-500">
        Showing {data.length} destinations
      </p>

      {/* কার্ড গ্রিড */}
      <DestinationsGrid destinations={data} />
    </>
  );
}

// ২. লোডিং স্কেলিটন (কাউন্ট ও কার্ডের ডামি লোডার)
function DestinationsSkeleton() {
  return (
    <div className="mt-8">
      {/* কাউন্ট টেক্সট স্কেলিটন */}
      <div className="h-4 w-40 animate-pulse rounded bg-gray-200" />

      {/* কার্ড গ্রিড স্কেলিটন */}
      <div className="mt-6 grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="flex flex-col overflow-hidden rounded-xl border border-gray-100 bg-white p-2.5 shadow-sm"
          >
            {/* ছবি স্কেলিটন */}
            <div className="aspect-[16/10] w-full animate-pulse rounded-lg bg-gray-200" />

            {/* টেক্সট স্কেলিটন */}
            <div className="flex flex-1 flex-col px-1 pt-3 pb-1">
              <div className="h-3 w-20 animate-pulse rounded bg-gray-200" />
              <div className="mt-2.5 flex items-center justify-between gap-2">
                <div className="h-4 w-32 animate-pulse rounded bg-gray-200" />
                <div className="h-4 w-14 animate-pulse rounded bg-gray-200" />
              </div>
              <div className="mt-2.5 h-3 w-24 animate-pulse rounded bg-gray-200" />
              <div className="mt-4 h-3.5 w-20 animate-pulse rounded bg-gray-200" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ৩. মেইন পেজ কম্পোনেন্ট
export default function AllDestinationsPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 pt-24 pb-16 sm:px-8 lg:px-12">
      {/* ডেমো UI-এর মেইন হেডার ও সাব-টাইটেল (ইনস্ট্যান্ট লোড হবে) */}
      <h1 className="font-heading text-4xl font-normal tracking-tight text-[#111315] sm:text-5xl">
        Explore All Destinations
      </h1>
      <p className="mt-2 text-sm text-gray-500">
        Find your perfect travel experience from our curated collection
      </p>

      {/* ডাইনামিক ডেটা আসার আগ পর্যন্ত স্কেলিটন দেখাবে */}
      <Suspense fallback={<DestinationsSkeleton />}>
        <Destinations />
        {/* <DestinationsGrid/> */}
      </Suspense>
    </main>
  );
}
