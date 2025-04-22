'use client';

import { useSearchJobs } from '@/context/SearchJobsContext';
import { Job } from '@/types/models/Jobs';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';

export default function JobList() {
  const queryClient = useQueryClient();
  const { filteredJobs, isLoading } = useSearchJobs();
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

  if (isLoading) return <p>Loading...</p>;

  return (
    <ul className="space-y-2">
      {filteredJobs.map((job: Job) => (
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
      ))}
    </ul>
  );
}
