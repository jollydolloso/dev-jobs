'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Job } from '@/types/models/Jobs';
import useDebounce from '@/hooks/useDebounce';

const SearchJobsContext = createContext<null | ReturnType<typeof useSearchJobsInner>>(null);

function useSearchJobsInner() {
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 300);

  const { data: jobs = [], isLoading } = useQuery({
    queryKey: ['jobs'],
    queryFn: async () => {
      const res = await fetch('/api/jobs');
      return res.json();
    },
  });

  const filteredJobs = jobs.filter((job: Job) =>
    job.title.toLowerCase().includes(debouncedSearch.toLowerCase())
  );

  return { search, setSearch, filteredJobs, isLoading };
}

export function SearchJobsProvider({ children }: { children: ReactNode }) {
  const value = useSearchJobsInner();
  return (
    <SearchJobsContext.Provider value={value}>
      {children}
    </SearchJobsContext.Provider>
  );
}

export function useSearchJobs() {
  const context = useContext(SearchJobsContext);
  if (!context) {
    throw new Error('useSearchJobs must be used within a SearchJobsProvider');
  }
  return context;
}
