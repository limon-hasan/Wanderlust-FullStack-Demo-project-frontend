"use client";
import { Destination } from "@/app/destinations/[id]/page";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { ArrowRight, Check } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import React from "react";
import { getTokenFromClient } from "@/lib/getTokenFromClient";

const BookingCard = ({ destination }: { destination: Destination }) => {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  console.log("User data : ", user);

  // console.log("Destination: ", destination);
  // const formattedDate = destination.departureDate
  //   ? new Date(destination.departureDate).toLocaleDateString("en-US", {
  //       month: "2-digit",
  //       day: "2-digit",
  //       year: "numeric",
  //     })
  //   : "05/15/2026";

  const formattedDate = destination?.departureDate
    ? destination.departureDate.split("T")[0]
    : "";
  const handleBooking = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) {
      alert("Please sign in to book a destination");
      return;
    }
    const formData = new FormData(e.currentTarget);
    const departureDate = Object.fromEntries(formData.entries()) as {
      departureDate: string;
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    // const departureDate: string = (e.target as any).departureDate.value;
    console.log("Date : ", departureDate);

    const data = {
      // ...user,
      username: user?.name,
      email: user?.email,
      image: user?.image,
      ...destination,
      ...departureDate, //we have to destructure the "departureDate" because it was object before --> departureDate : { departureDate: "2026-10-15" }
      // Now after destructuring --> departureDate: "2026-10-15" --> before was
      bookingDate: new Date(),
    };
    console.log("Overall data: ", data);

    // Securing through JWT
    const token = await getTokenFromClient();
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/add-my-bookings`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      },
    );
    const bookingResult = await res.json();
    console.log("Booking Result : ", bookingResult);
  };
  return (
    <aside className="sticky top-20 h-fit rounded-2xl border border-gray-100 bg-white p-6 shadow-[0_4px_24px_rgba(0,0,0,0.06)]">
      <p className="text-sm text-muted-foreground">Starting from</p>
      <p className="mt-1 text-3xl font-semibold text-[#00A8E8]">
        ${destination.price}
      </p>
      <p className="mt-1 text-xs text-muted-foreground">per person</p>

      <form onSubmit={handleBooking}>
        <Input
          type="date"
          name="departureDate"
          aria-label="Departure date"
          defaultValue={formattedDate}
          className="mt-4"
        />

        <Button
          type="submit"
          className="mt-4 w-full bg-[#00A8E8] text-white hover:bg-[#0095d1]"
        >
          Book Now
          <ArrowRight />
        </Button>
      </form>

      <ul className="mt-6 space-y-2.5 border-t border-gray-100 pt-5 text-xs text-gray-600">
        <li className="flex items-center gap-2">
          <Check className="size-4 shrink-0 text-emerald-500" />
          <span>Free cancellation up to 7 days</span>
        </li>
        <li className="flex items-center gap-2">
          <Check className="size-4 shrink-0 text-emerald-500" />
          <span>Travel insurance included</span>
        </li>
        <li className="flex items-center gap-2">
          <Check className="size-4 shrink-0 text-emerald-500" />
          <span>24/7 customer support</span>
        </li>
      </ul>
    </aside>
  );
};

export default BookingCard;
