"use client";

import React, { useState } from "react";
import { format } from "date-fns";
import { Save, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { getTokenFromClient } from "@/lib/getTokenFromClient";

const categories = [
  { value: "beach", label: "Beach" },
  { value: "mountain", label: "Mountain" },
  { value: "city", label: "City" },
  { value: "adventure", label: "Adventure" },
  { value: "cultural", label: "Cultural" },
  { value: "cruise", label: "Cruise" },
];

type FormState = {
  name: string;
  country: string;
  category: string;
  price: string;
  duration: string;
  departureDate: Date | undefined;
  imageUrl: string;
  description: string;
};

const initialForm: FormState = {
  name: "",
  country: "",
  category: "beach",
  price: "",
  duration: "",
  departureDate: undefined,
  imageUrl: "",
  description: "",
};

const inputClass =
  "h-10 w-full rounded-sm border border-[#e2e8f0] bg-[#f8fafc] px-3.5 text-sm text-[#111315] placeholder:text-[#9aa3ab] focus-visible:border-[#029cb7] focus-visible:ring-1 focus-visible:ring-[#029cb7] shadow-none";

const labelClass = "mb-2 block text-sm font-semibold text-[#111315]";

export default function AddDestinationPage() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [dateOpen, setDateOpen] = useState(false);

  const handleChange = <K extends keyof FormState>(
    field: K,
    value: FormState[K],
  ) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleReset = () => {
    setForm(initialForm);
  };
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = await getTokenFromClient();

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/add-destination/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    });
    const result = await res.json();
    console.log("Data recieved in Frontend from Backend:", result);

    if (result.insertedId) {
      router.push("/destinations");
      router.refresh();
    }
    // const res1 = await fetch(`http://localhost:8000/design/`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(form),
    // });
    // const data1 = await res1.json();
    // console.log("Data recieved in Frontend from Backend:", data1);

    // const res2 = await fetch(`http://localhost:8000/player/`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(form),
    // });
    // const data2 = await res2.json();
    // console.log("Data recieved in Frontend from Backend: ", data2);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto w-full max-w-6xl px-6 pt-24 pb-16 sm:px-8 lg:px-12">
        <h1 className="font-heading text-4xl font-normal text-center tracking-tight text-[#111315] sm:text-5xl">
          Add New Travel Package
        </h1>

        <Card className="mx-auto mt-12 w-full max-w-[560px] rounded-md border border-[#edf0f2] bg-white p-8 shadow-[0_4px_24px_rgba(0,0,0,0.04)] sm:p-10">
          <CardContent className="p-0">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className={labelClass}>Destination Name</label>
                <Input
                  placeholder="Bali Paradise"
                  value={form.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  className={inputClass}
                  required
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className={labelClass}>Country</label>
                  <Input
                    placeholder="Indonesia"
                    value={form.country}
                    onChange={(e) => handleChange("country", e.target.value)}
                    className={inputClass}
                    required
                  />
                </div>

                <div>
                  <label className={labelClass}>Category</label>
                  <Select
                    items={categories}
                    value={form.category}
                    onValueChange={(val) => handleChange("category", val ?? "")}
                  >
                    <SelectTrigger className={`${inputClass} justify-between`}>
                      <SelectValue placeholder="Beach" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((c) => (
                        <SelectItem key={c.value} value={c.value}>
                          {c.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className={labelClass}>Price (USD)</label>
                  <Input
                    type="number"
                    placeholder="e.g., 1299"
                    value={form.price}
                    onChange={(e) => handleChange("price", e.target.value)}
                    className={inputClass}
                    required
                  />
                </div>

                <div>
                  <label className={labelClass}>Duration</label>
                  <Input
                    placeholder="e.g., 7 Days/6 Nights"
                    value={form.duration}
                    onChange={(e) => handleChange("duration", e.target.value)}
                    className={inputClass}
                    required
                  />
                </div>
              </div>

              <div>
                <label className={labelClass}>Departure Date</label>
                <Popover open={dateOpen} onOpenChange={setDateOpen}>
                  <PopoverTrigger
                    render={
                      <button
                        type="button"
                        className={`${inputClass} flex items-center text-left font-normal ${
                          !form.departureDate ? "text-[#9aa3ab]" : ""
                        }`}
                      >
                        {form.departureDate
                          ? format(form.departureDate, "MM/dd/yyyy")
                          : "mm/dd/yyyy"}
                      </button>
                    }
                  />
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      autoFocus
                      selected={form.departureDate}
                      onSelect={(date) => {
                        handleChange("departureDate", date);
                        setDateOpen(false);
                      }}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div>
                <label className={labelClass}>Image URL</label>
                <Input
                  type="url"
                  placeholder="https://example.com/image.jpg"
                  value={form.imageUrl}
                  onChange={(e) => handleChange("imageUrl", e.target.value)}
                  className={inputClass}
                  required
                />
              </div>

              {/* Description */}
              <div>
                <label className={labelClass}>Description</label>
                <Textarea
                  rows={4}
                  placeholder="Describe the travel experience..."
                  value={form.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                  className={`${inputClass} h-auto min-h-[120px] resize-none py-2.5`}
                  required
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleReset}
                  className="h-10 rounded-sm border border-[#f87171] px-5 text-sm font-medium text-[#ef4444] transition-colors hover:bg-red-50 hover:text-red-600"
                >
                  <Trash2 className="mr-1.5 size-4" />
                  Cancel
                </Button>

                <Button
                  type="submit"
                  className="h-10 rounded-sm bg-[#029cb7] px-5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-[#0288a0]"
                >
                  <Save className="mr-1.5 size-4" />
                  Add Travel Packagenew
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
