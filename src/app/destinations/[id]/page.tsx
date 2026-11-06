import Link from "next/link";
import { ArrowLeft, Calendar, Check, MapPin, Star } from "lucide-react";
import EditDestinationDialog from "@/components/destination/EditDestinationDialog";
import DeleteDestinationDialog from "@/components/destination/DeleteDestinationDialog";
import BookingCard from "@/components/booking/BookingCard";
import { getTokenFromServer } from "@/lib/getTokenFromServer";

export type Destination = {
  _id: string;
  name: string;
  country: string;
  category: string;
  price: number | string;
  duration: string;
  departureDate: string;
  imageUrl: string;
  description: string;
};

const DestinationsListPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  // Fallback সহ লাইভ ব্যাকএন্ড URL
  const API_URL =
    process.env.NEXT_PUBLIC_API_URL ||
    "https://wanderlust-backend-green.vercel.app";

  const token = await getTokenFromServer();

  // টোকেন থাকলে তবেই পাঠাবে, undefined পাঠাবে না
  const headersList: HeadersInit = {};
  if (token) {
    headersList["authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_URL}/destinations/${id}`, {
    headers: headersList,
    cache: "no-store",
  });

  if (!res.ok) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center">
        <h2 className="text-xl font-bold text-gray-800">
          Destination Not Found
        </h2>
        <Link
          href="/destinations"
          className="mt-4 text-sm font-semibold text-[#029cb7] underline"
        >
          Back to all destinations
        </Link>
      </div>
    );
  }

  const destination: Destination = await res.json();

  return (
    <div className="min-h-screen bg-white">
      <main className="mx-auto max-w-6xl px-6 py-8 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between pb-6">
          <Link
            href="/destinations"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-[#111315]"
          >
            <ArrowLeft className="size-4" />
            Back to Destinations
          </Link>

          <div className="flex items-center gap-3">
            <EditDestinationDialog destination={destination} />
            <DeleteDestinationDialog id={id} />
          </div>
        </div>

        <div className="relative aspect-[21/9] w-full overflow-hidden rounded-2xl bg-gray-100 shadow-sm">
          {/* eslint-disable-next-line @next/next/no-img-element*/}
          <img
            src={
              destination.imageUrl ||
              "https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
            }
            alt={destination.name}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-1.5 text-xs text-gray-500">
              <MapPin className="size-3.5 text-gray-400" />
              <span>{destination.country}</span>
            </div>

            <h1 className="font-heading mt-2 text-4xl font-normal tracking-tight text-[#111315] sm:text-5xl">
              {destination.name}
            </h1>

            <div className="mt-4 flex items-center gap-5 text-sm text-gray-600">
              <div className="flex items-center gap-1.5">
                <Star className="size-4 fill-amber-400 text-amber-400" />
                <span className="font-bold text-[#111315]">4.9</span>
                <span className="text-gray-400">(234 reviews)</span>
              </div>
              <div className="flex items-center gap-1.5 text-gray-500">
                <Calendar className="size-4 text-gray-400" />
                <span>{destination.duration}</span>
              </div>
            </div>

            <div className="mt-10">
              <h2 className="text-xl font-bold text-[#111315]">Overview</h2>
              <p className="mt-3 text-sm leading-relaxed text-gray-600">
                {destination.description}
              </p>
            </div>

            <div className="mt-10">
              <h2 className="text-xl font-bold text-[#111315]">Highlights</h2>
              <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 text-xs text-gray-600">
                <div className="flex items-center gap-2">
                  <Check className="size-4 shrink-0 text-emerald-500" />
                  <span>Luxury beachfront accommodation</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="size-4 shrink-0 text-emerald-500" />
                  <span>Visit scenic view points</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="size-4 shrink-0 text-emerald-500" />
                  <span>Local food & culture tasting</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="size-4 shrink-0 text-emerald-500" />
                  <span>24/7 Guided support tour</span>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Booking Card */}
          <BookingCard destination={destination} />
        </div>
      </main>
    </div>
  );
};

export default DestinationsListPage;
