const MyBookingDetails = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/my-booking-details/${id}`,
  );
  const bookings = await res.json();
  console.log("Bookings info: ", bookings);
  return <div></div>;
};

export default MyBookingDetails;
