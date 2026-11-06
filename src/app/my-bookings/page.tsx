import MyBookingsCard from "@/components/booking/MyBookingsCard";
import { auth } from "@/lib/auth";
import { getTokenFromServer } from "@/lib/getTokenFromServer";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const MyBookingsPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const user = session?.user;
  console.log("USER: ", user);
  if (!session) {
    redirect("/signin");
  }

  const token = await getTokenFromServer();
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/my-bookings/${user?.email}`,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    },
  );
  const bookings = await res.json();
  console.log("Specific Bookings Info: ", bookings);

  const res1 = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/my-bookings`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  const showBookings = await res1.json();
  console.log("All Bookings List: ", showBookings);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Header section matching Figma */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">My Bookings</h1>
        <p className="text-sm text-gray-500 mt-1">
          Manage and view your upcoming travel plans
        </p>
      </div>

      {/* Bookings Card List */}
      <div className="space-y-4">
        {bookings && bookings.length > 0 ? (
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          bookings.map((booking: any) => (
            <MyBookingsCard key={booking._id} booking={booking} />
          ))
        ) : (
          <p className="text-gray-500 py-8 text-center">No bookings found.</p>
        )}
      </div>
    </div>
  );
};

export default MyBookingsPage;
