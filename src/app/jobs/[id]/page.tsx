
import { jobs } from '@/app/data/jobs';
import { notFound } from 'next/navigation';

export default function JobPage({ params }: { params: { id: string } }) {
  const job = jobs.find(j => j.id === parseInt(params.id));
  if (!job) return notFound();

  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-2">{job.title}</h1>
      <p className="text-gray-600 mb-2">{job.company} • {job.location}</p>
      <p className="text-sm mb-4">Stack: {job.stack.join(', ')}</p>
      <p>{job.description}</p>
    </main>
  );
}