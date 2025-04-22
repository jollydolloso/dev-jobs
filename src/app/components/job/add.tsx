'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { JobForm } from './job-form';
import { Job } from '@/types/models/Jobs';

async function postJob(newJob: Job) {
  const res = await fetch('/api/jobs', {
    method: 'POST',
    body: JSON.stringify(newJob),
  });
  if (!res.ok) throw new Error('Failed to create job');
  return res.json();
}

export default function AddJob() {
  const queryClient = useQueryClient();

  const createJob = useMutation({
    mutationFn: postJob,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
    },
  });

  const handleCreate = async (data: Job) => {
    createJob.mutate({
      ...data,
    });
  };

  return <JobForm submit={handleCreate} />;
}
