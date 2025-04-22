'use client';

import { useSearchJobs } from '@/context/SearchJobsContext';
import { Job } from '@/types/models/Jobs';
import Link from 'next/link';
import { DeleteJob } from './delete';

export default function JobList() {

  const { filteredJobs, isLoading } = useSearchJobs();
  
  if (isLoading) return <p>Loading...</p>;

  if (filteredJobs.length === 0) return

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
        {job.id && <DeleteJob id={job.id}/>}
      </li>
      ))}
    </ul>
  );
}
