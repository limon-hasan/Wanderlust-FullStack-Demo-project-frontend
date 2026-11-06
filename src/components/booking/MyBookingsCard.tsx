"use client";
import { getTokenFromClient } from "@/lib/getTokenFromClient";
import { Calendar, Trash2, Eye, CheckCircle2, Ticket } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const MyBookingsCard = ({ booking }: { booking: any }) => {
  const { _id, destinationId } = booking;
  const router = useRouter();

  // Date format: "May 15, 2026"
  const formattedDate = booking?.departureDate
    ? new Date(booking.departureDate).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "N/A";

  const handleDeleteBooking = async () => {
    try {
      const token = await getTokenFromClient();
      const API_URL =
        process.env.NEXT_PUBLIC_API_URL ||
        "https://wanderlust-backend-green.vercel.app";

      const res = await fetch(`${API_URL}/my-booking-details/${_id}`, {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      const afterDelete = await res.json();
      console.log("Delete response:", afterDelete);

      if (afterDelete.deletedCount > 0) {
        router.refresh(); // Instant data update kore card remove korbe
      }
    } catch (error) {
      console.error("Failed to cancel booking:", error);
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 p-6 border border-gray-100 rounded-3xl bg-white shadow-sm hover:shadow-md transition">
      {/* Left + Middle Content */}
      <div className="flex flex-col md:flex-row items-start md:items-center gap-6 flex-1 w-full">
        {/* Destination Image */}
        <div className="w-full md:w-64 h-40 shrink-0 overflow-hidden rounded-2xl bg-gray-100">
          <img
            src={booking?.imageUrl || booking?.image || "/placeholder.jpg"}
            alt={booking?.name || "Destination"}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Booking Information */}
        <div className="space-y-2 w-full">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold text-emerald-600 bg-emerald-50 border border-emerald-100">
            <CheckCircle2 className="size-3.5" />
            <span>Confirmed</span>
          </div>

          {/* Title */}
          <h3 className="text-2xl font-bold text-gray-900">{booking?.name}</h3>

          {/* Departure Date & ID */}
          <div className="space-y-1.5 text-xs text-gray-500 font-medium">
            <p className="flex items-center gap-2">
              <Calendar className="size-3.5 text-gray-400" />
              <span>Departure: {formattedDate}</span>
            </p>
            <p className="flex items-center gap-2">
              <Ticket className="size-3.5 text-gray-400" />
              <span>Booking ID: {booking?._id?.slice(-6)}</span>
            </p>
          </div>

          {/* Price */}
          <p className="text-3xl font-bold text-[#00A8E8] pt-1">
            ${booking?.price}
          </p>
        </div>
      </div>

      {/* Right Side: Action Buttons side-by-side */}
      <div className="flex items-center gap-3 w-full md:w-auto justify-end shrink-0">
        <button
          onClick={handleDeleteBooking}
          type="button"
          className="flex items-center justify-center gap-1.5 px-4 py-2 border border-red-200 text-red-500 rounded-xl text-xs font-semibold hover:bg-red-50 transition cursor-pointer"
        >
          <Trash2 className="size-3.5" /> Cancel
        </button>
        {/* Destination-er ashol ID diye View Details page-e jabe */}
        <Link
          href={`/destinations/${destinationId || _id}`}
          className="flex items-center justify-center gap-1.5 px-5 py-2 bg-[#00A8E8] text-white rounded-xl text-xs font-semibold hover:bg-[#0095d1] transition shadow-sm"
        >
          <Eye className="size-3.5" /> View
        </Link>
      </div>
    </div>
  );
};

export default MyBookingsCard;
