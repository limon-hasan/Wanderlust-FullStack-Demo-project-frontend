"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { getTokenFromClient } from "@/lib/getTokenFromClient";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

const DeleteDestinationDialog = ({ id }: { id: string }) => {
  const router = useRouter();

  const handleDeleteDestination = async () => {
    try {
      const token = await getTokenFromClient();
      const API_URL =
        process.env.NEXT_PUBLIC_API_URL ||
        "https://wanderlust-backend-green.vercel.app";

      const res = await fetch(`${API_URL}/destinations/${id}`, {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      const afterDelete = await res.json();
      console.log("Result Destination from server in frontend: ", afterDelete);

      if (afterDelete.deletedCount > 0) {
        router.push("/destinations");
        router.refresh();
      }
    } catch (error) {
      console.error("Failed to delete destination:", error);
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 bg-white px-4 py-1.5 text-sm font-semibold text-red-500 shadow-sm transition hover:bg-red-50 cursor-pointer">
        <Trash2 className="size-3.5 text-red-500" />
        Delete
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete this
            destination package from our database.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDeleteDestination}
            className="bg-red-600 hover:bg-red-700 text-white cursor-pointer"
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteDestinationDialog;
