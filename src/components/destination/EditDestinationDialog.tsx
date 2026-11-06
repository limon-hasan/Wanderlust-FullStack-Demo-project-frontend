"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Pencil, Save, Trash2 } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { getTokenFromClient } from "@/lib/getTokenFromClient";

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

interface EditDestinationDialogProps {
  destination: Destination;
}

// Local timezone onushare YYYY-MM-DD format bananor function (jate 1 din na kome)
const formatToLocalDateInput = (dateString?: string) => {
  if (!dateString) return "";
  const d = new Date(dateString);
  if (isNaN(d.getTime())) return "";
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const EditDestinationDialog = ({ destination }: EditDestinationDialogProps) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // Initial state-e ager date-ti local timezone onushare load hobe
  const [formData, setFormData] = useState({
    ...destination,
    departureDate: formatToLocalDateInput(destination.departureDate),
  });
  console.log("Form data: ", formData);
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { _id, ...updatedData } = formData;

    const token = await getTokenFromClient();

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/destinations/${destination._id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        // body: JSON.stringify(formData),  //evabeo pathano jay
        body: JSON.stringify(updatedData), // backend e immutable id("_id") chara bakigula pathalam
      },
    );
    const result = await res.json();
    console.log("Result Destinaiton from server: ", result);
    if (result.modifiedCount > 0) {
      setOpen(false);
      router.refresh();
    }
    setLoading(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-4 py-1.5 text-sm font-semibold text-gray-700 shadow-sm transition hover:bg-gray-50 active:scale-95">
        <Pencil className="size-3.5 text-gray-600" />
        Edit
      </DialogTrigger>

      <DialogContent className="max-h-[92vh] overflow-y-auto sm:max-w-lg rounded-2xl p-6 sm:p-8">
        <DialogHeader className="space-y-1 text-left">
          <DialogTitle className="text-xl font-semibold tracking-tight text-[#111315]">
            Update Travel Package
          </DialogTitle>
          <DialogDescription className="text-xs text-gray-500">
            Make changes to the travel package details below
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          {/* ১. ডেস্টিনেশন নাম */}
          <div>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Destination Name"
              required
              className="w-full rounded-md border border-gray-200 bg-[#f9fafb] px-3.5 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#029cb7] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#029cb7]"
            />
          </div>

          {/* ২. কান্ট্রি ও ক্যাটাগরি */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#111315]">
                Country
              </label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                placeholder="Indonesia"
                required
                className="w-full rounded-md border border-gray-200 bg-[#f9fafb] px-3.5 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#029cb7] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#029cb7]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#111315]">
                Category
              </label>
              <div className="relative">
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full appearance-none rounded-md border border-gray-200 bg-[#f9fafb] px-3.5 py-2.5 text-sm text-gray-900 focus:border-[#029cb7] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#029cb7]"
                >
                  <option value="Beach">Beach</option>
                  <option value="Cultural">Cultural</option>
                  <option value="Nature">Nature</option>
                  <option value="Mountain">Mountain</option>
                  <option value="Island">Island</option>
                  <option value="City">City</option>
                  <option value="Historical">Historical</option>
                  <option value="Luxury">Luxury</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-400">
                  <svg
                    className="size-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* ৩. প্রাইস ও ডিউরেশন */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#111315]">
                Price (USD)
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="e.g., 1299"
                required
                className="w-full rounded-md border border-gray-200 bg-[#f9fafb] px-3.5 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#029cb7] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#029cb7]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#111315]">
                Duration
              </label>
              <input
                type="text"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                placeholder="e.g., 7 Days/6 Nights"
                required
                className="w-full rounded-md border border-gray-200 bg-[#f9fafb] px-3.5 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#029cb7] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#029cb7]"
              />
            </div>
          </div>

          {/* ৪. ডিপার্চার ডেট (Details card-er moto shothik date pabe) */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#111315]">
              Departure Date
            </label>
            <input
              type="date"
              name="departureDate"
              value={formData.departureDate}
              onChange={handleChange}
              required
              className="w-full rounded-md border border-gray-200 bg-[#f9fafb] px-3.5 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#029cb7] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#029cb7]"
            />
          </div>

          {/* ৫. ইমেজ URL */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#111315]">
              Image URL
            </label>
            <input
              type="url"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
              required
              className="w-full rounded-md border border-gray-200 bg-[#f9fafb] px-3.5 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#029cb7] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#029cb7]"
            />
          </div>

          {/* ৬. ডেসক্রিপশন */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#111315]">
              Description
            </label>
            <textarea
              name="description"
              rows={4}
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe the travel experience..."
              required
              className="w-full rounded-md border border-gray-200 bg-[#f9fafb] px-3.5 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#029cb7] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#029cb7]"
            />
          </div>

          {/* ৭. ফুটার অ্যাকশন বাটন */}
          <DialogFooter className="flex flex-row justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="inline-flex items-center gap-1.5 rounded-lg border border-red-300 bg-white px-4 py-2 text-sm font-semibold text-red-500 shadow-sm transition hover:bg-red-50 active:scale-95"
            >
              <Trash2 className="size-4 text-red-500" />
              Delete
            </button>

            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center gap-1.5 rounded-lg bg-[#029cb7] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#0288a0] active:scale-95 disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="size-4 text-white" />
                  Save Changes
                </>
              )}
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditDestinationDialog;
