"use client";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import useDebounce from "./utils/useDebounce";

type Job = {
  id?: number;
  title: string;
  company: string;
  location: string;
  stack: string[];
  description: string;
};

type FormField = "title" | "company" | "location" | "stack" | "description";

async function fetchJobs() {
  const res = await fetch("/api/jobs");
  return res.json();
}

export default function Home() {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [form, setForm] = useState<{
    title: string;
    company: string;
    location: string;
    stack: string; // <- change from string[] to string
    description: string;
  }>({
    title: "",
    company: "",
    location: "",
    stack: "",
    description: "",
  });
  const debouncedSearch = useDebounce(search, 300);

  const { data: jobs = [], isLoading } = useQuery({
    queryKey: ["jobs"],
    queryFn: fetchJobs,
  });

  const createJob = useMutation({
    mutationFn: async (newJob: Job) => {
      const res = await fetch("/api/jobs", {
        method: "POST",
        body: JSON.stringify(newJob),
      });
      return res.json();
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["jobs"] }),
  });

  const deleteJob = useMutation({
    mutationFn: async (id: number) => {
      const res = await fetch("/api/jobs", {
        method: "DELETE",
        body: JSON.stringify({ id }),
      });
      return res.json();
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["jobs"] }),
  });

  const filteredJobs = jobs.filter((job: Job) =>
    job.title.toLowerCase().includes(debouncedSearch.toLowerCase())
  );

  const handleCreate = () => {
    if (
      !form.title ||
      !form.company ||
      !form.location ||
      !form.description ||
      !form.stack
    )
      return;

    createJob.mutate({
      title: form.title,
      company: form.company,
      location: form.location,
      description: form.description,
      stack: form.stack.split(",").map((s) => s.trim()),
    });

    setForm({
      title: "",
      company: "",
      location: "",
      stack: "",
      description: "",
    });
  };

  const fields: FormField[] = [
    "title",
    "company",
    "location",
    "stack",
    "description",
  ];

  return (
    <>
      <input
        type="text"
        placeholder="Search by job title..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-2 border rounded"
      />

      <div className="border p-4 rounded">
        <h2 className="text-xl font-semibold mb-2">Add New Job</h2>
        <div className="grid gap-2">
          {fields.map((field) => (<div key={field} className="flex justify-between gap-4">
          <label className="capitalize w-20">{field}</label>
            <input
              key={field}
              value={form[field]}
              onChange={(e) => setForm({ ...form, [field]: e.target.value })}
              className="border rounded p-1 flex-1"
            /></div>
           
          ))}
          <button
            onClick={handleCreate}
            className="bg-blue-600 text-white py-2 px-4 rounded cursor-pointer"
          >
            Create
          </button>
        </div>
      </div>

      <ul className="space-y-4">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          filteredJobs.map((job: Job) => (
            <li key={job.id} className="border p-4 rounded shadow">
              <Link
                href={`/jobs/${job.id}`}
                className="text-xl font-semibold text-blue-600"
              >
                {job.title}
              </Link>
              <p>
                {job.company} • {job.location}
              </p>
              <p className="text-sm text-gray-500">{job.stack.join(", ")}</p>
              <button
                onClick={() => job.id && deleteJob.mutate(job.id)}
                className="mt-2 text-sm text-red-600"
              >
                Delete
              </button>
            </li>
          ))
        )}
      </ul>
    </>
  );
}
