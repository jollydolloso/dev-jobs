'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useSession } from 'next-auth/react';

const jobSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  company: z.string().min(1, 'Company is required'),
  location: z.string().min(1, 'Location is required'),
  stack: z.string().min(1, 'Stack is required'),
  description: z.string().min(1, 'Description is required'),
});

export type JobFormData = z.infer<typeof jobSchema>;

export function JobForm({ onSubmit }: { onSubmit: (data: JobFormData) => void }) {
  const { data: session, status } = useSession();
  const { register, handleSubmit, formState: { errors } } = useForm<JobFormData>({
    resolver: zodResolver(jobSchema),
  });

  if (status === 'loading') return null;

  if (!session) return 

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {['title', 'company', 'location', 'stack', 'description'].map(field => (
        <div key={field}>
          <Input placeholder={field} {...register(field as keyof JobFormData)} className='capitalize' />
          {errors[field as keyof JobFormData] && (
            <p className="text-sm text-red-600">
              {errors[field as keyof JobFormData]?.message}
            </p>
          )}
        </div>
      ))}
      <Button type="submit" variant="default">Submit</Button>
    </form>
  );
}
