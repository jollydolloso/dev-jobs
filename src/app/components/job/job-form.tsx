"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { Card, CardContent } from "../ui/card";
import { Job } from "@/types/models/Jobs";
import { useState } from "react";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";

interface Props {
  initialData?: Omit<Job, "id">;
  submit: (data: Omit<Job, "id">) => Promise<void>;
}

const RawJobSchema = z.object({
  title: z.string().min(1, "Title is required"),
  company: z.string().min(1, "Company is required"),
  location: z.string().min(1, "Location is required"),
  stack: z.string().min(1, "Stack is required"),
  description: z.string().min(1, "Description is required"),
});

const JobSchema = RawJobSchema.transform((data) => ({
  ...data,
  stack: data.stack
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean),
}));

type FormInputs = z.infer<typeof RawJobSchema>;

export function JobForm({ initialData, submit }: Props) {
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const form = useForm<FormInputs>({
    resolver: zodResolver(RawJobSchema),
    defaultValues: {
      title: initialData?.title ?? "",
      company: initialData?.company ?? "",
      location: initialData?.location ?? "",
      stack: initialData?.stack?.join(", ") ?? "",
      description: initialData?.description ?? "",
    },
  });

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = form;

  const onSubmit = handleSubmit(async (rawData) => {
    if (isLoading || isSubmitted) return;

    const parsed = JobSchema.safeParse(rawData);
    if (!parsed.success) {
      toast.error("Validation failed");
      return;
    }

    setIsLoading(true);
    submit(parsed.data)
      .then(() => {
        setIsSubmitted(true);
        reset({
          title: initialData?.title ?? "",
          company: initialData?.company ?? "",
          location: initialData?.location ?? "",
          stack: initialData?.stack?.join(", ") ?? "",
          description: initialData?.description ?? "",
        });
      })
      .catch((error) => {
        toast.error(error.response.data.message ?? "An error occurred");
      })
      .finally(() => {
        setIsLoading(false);
        setIsSubmitted(false);
      });
  });

  if (status === "loading") return null;
  if (!session) return null;

  return (
    <Card className="w-full">
      <CardContent className="px-4">
        <Form
          form={form}
          onSubmit={onSubmit}
          className="flex flex-col gap-6 p-2"
        >
          <FormField
            control={control}
            name="title"
            render={() => (
              <FormItem>
                <FormLabel>Job Title</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    {...register("title")}
                    placeholder='Job Title'
                    disabled={isLoading || isSubmitted}
                  />
                </FormControl>
                <FormMessage>{errors.title?.message}</FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="company"
            render={() => (
              <FormItem>
                <FormLabel>Company</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    {...register("company")}
                    placeholder="Company"
                    disabled={isLoading || isSubmitted}
                  />
                </FormControl>
                <FormMessage>{errors.company?.message}</FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="stack"
            render={() => (
              <FormItem>
                <FormLabel>Stack</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    {...register("stack")}
                    placeholder="e.g. ('ReactJS, Typescript')"
                    disabled={isLoading || isSubmitted}
                  />
                </FormControl>
                <FormMessage>{errors.stack?.message}</FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="location"
            render={() => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    {...register("location")}
                    placeholder="Location"
                    disabled={isLoading || isSubmitted}
                  />
                </FormControl>
                <FormMessage>{errors.location?.message}</FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="description"
            render={() => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    {...register("description")}
                    placeholder="Description"
                    disabled={isLoading || isSubmitted}
                  />
                </FormControl>
                <FormMessage>{errors.description?.message}</FormMessage>
              </FormItem>
            )}
          />
           <Button
            type="submit"
            className="sm:self-end"
            disabled={isLoading || isSubmitted}
          >
            {isLoading && <Loader2 className="animate-spin" />}
            {initialData ? 'Save Changes' : 'Add Job'}
          </Button>
        </Form>
      </CardContent>
    </Card>
  );
}
