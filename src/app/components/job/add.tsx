'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { JobForm, JobFormData } from './job-form';

async function postJob(newJob: JobFormData) {
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

  const handleCreate = (data: JobFormData) => {
    createJob.mutate({
      ...data,
    });
  };

  return <JobForm onSubmit={handleCreate} />;
}
