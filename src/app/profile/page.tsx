import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import {
  User,
  Mail,
  Calendar,
  ShieldCheck,
  Compass,
  BookmarkCheck,
  PlusCircle,
  Fingerprint,
} from "lucide-react";

export default async function ProfilePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/signin");
  }

  const user = session.user;

  const joinedDate = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      })
    : "Active Member";

  return (
    <div className="min-h-screen bg-[#f8fafc] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* 1. Profile Banner & Header */}
        <div className="bg-white rounded-2xl border border-[#edf0f2] shadow-xs overflow-hidden">
          <div className="h-32 bg-gradient-to-r from-[#029cb7] to-[#01687a] w-full" />

          <div className="px-6 pb-6 pt-0 relative">
            <div className="flex flex-col sm:flex-row sm:items-end gap-4 -mt-16 sm:-mt-12">
              <div className="relative mx-auto sm:mx-0">
                <img
                  src={
                    user.image ||
                    "https://upload.wikimedia.org/wikipedia/commons/a/a3/June_odd-eyed-cat.jpg"
                  }
                  alt={user.name || "User Avatar"}
                  className="w-28 h-28 rounded-full border-4 border-white object-cover shadow-md bg-white"
                />
                <div
                  className="absolute bottom-1 right-1 w-5 h-5 bg-emerald-500 rounded-full border-2 border-white"
                  title="Active"
                />
              </div>

              <div className="space-y-1 text-center sm:text-left flex-1">
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <h1 className="text-2xl font-bold text-[#111315]">
                    {user.name || "Traveler"}
                  </h1>
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold bg-[#029cb7]/10 text-[#029cb7] px-2.5 py-0.5 rounded-full">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Verified
                  </span>
                </div>
                <p className="text-sm text-gray-500 flex items-center justify-center sm:justify-start gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-gray-400" />
                  {user.email}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Quick Links */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link
            href="/my-bookings"
            className="p-5 bg-white rounded-xl border border-[#edf0f2] shadow-xs hover:border-[#029cb7] transition-all flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-lg bg-[#029cb7]/10 flex items-center justify-center text-[#029cb7]">
              <BookmarkCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-900">
                My Bookings
              </h4>
              <p className="text-xs text-gray-500">View your tours</p>
            </div>
          </Link>

          <Link
            href="/add-destination"
            className="p-5 bg-white rounded-xl border border-[#edf0f2] shadow-xs hover:border-[#029cb7] transition-all flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
              <PlusCircle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-900">
                Add Package
              </h4>
              <p className="text-xs text-gray-500">Post new deal</p>
            </div>
          </Link>

          <Link
            href="/destinations"
            className="p-5 bg-white rounded-xl border border-[#edf0f2] shadow-xs hover:border-[#029cb7] transition-all flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-900">Explore</h4>
              <p className="text-xs text-gray-500">Browse all places</p>
            </div>
          </Link>
        </div>

        {/* 3. Detailed Account Information */}
        <div className="bg-white rounded-2xl border border-[#edf0f2] shadow-xs p-6 sm:p-8 space-y-6">
          <div className="border-b border-gray-100 pb-4">
            <h3 className="text-base font-semibold text-gray-900">
              Account Details
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">
              Your registered profile credentials
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Full Name
              </label>
              <div className="flex items-center gap-2.5 p-3.5 bg-gray-50 rounded-xl text-sm font-medium text-gray-800 border border-gray-100">
                <User className="w-4 h-4 text-[#029cb7]" />
                <span>{user.name || "N/A"}</span>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Email Address
              </label>
              <div className="flex items-center gap-2.5 p-3.5 bg-gray-50 rounded-xl text-sm font-medium text-gray-800 border border-gray-100">
                <Mail className="w-4 h-4 text-[#029cb7]" />
                <span>{user.email}</span>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Account ID
              </label>
              <div className="flex items-center gap-2.5 p-3.5 bg-gray-50 rounded-xl text-xs font-mono text-gray-600 border border-gray-100 break-all">
                <Fingerprint className="w-4 h-4 text-[#029cb7] shrink-0" />
                <span>{user.id}</span>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Member Since
              </label>
              <div className="flex items-center gap-2.5 p-3.5 bg-gray-50 rounded-xl text-sm font-medium text-gray-800 border border-gray-100">
                <Calendar className="w-4 h-4 text-[#029cb7]" />
                <span>{joinedDate}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
