"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { useConfirmation } from "@/components/confirmation/confirmation";
import { toast } from "sonner";
import type { AxiosError } from "axios";
import { ErrorResponse } from "@/types/responses/ErrorResponse";

interface Props {
  id: number;
}

export const DeleteJob = ({ id }: Props) => {
  const { data: session, status } = useSession();
  const queryClient = useQueryClient();
  const { confirm } = useConfirmation();

  const { mutateAsync: deleteJob } = useMutation({
    mutationFn: async (id: number) => {
      const res = await fetch("/api/jobs", {
        method: "DELETE",
        body: JSON.stringify({ id }),
      });
      return res.json();
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      toast.error(error.response?.data?.message ?? "An error occurred");
    },
    onSuccess: () => {
      toast.success("Term deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
    },
  })

  const handleDelete = (id: number) => {
    confirm({
      variant: "danger",
      title: "Delete Job",
      description: (
        <>Are you sure you want to delete ? This action cannot be undone.</>
      ),
      confirmButtonLabel: "Delete",
      onConfirm: async () => {
        await deleteJob(id);
      },
    });
  };

  if (status === "loading") return null;

  if (!session) return;

  return (
    <Button
      variant="destructive"
      onClick={() => handleDelete(id)}
      className="mt-2 text-sm"
    >
      Delete
    </Button>
  );
};
