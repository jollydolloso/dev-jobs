"use client";

import { Input } from "@/components/ui/input";
import { useSearchJobs } from "@/context/SearchJobsContext";

export function SearchJob() {
  const { search, setSearch } = useSearchJobs();
  return (
    <div className="flex gap-2 items-center">
      <p className="text-base font-bold">Search</p>
      <Input
        type="text"
        placeholder="Search by job title..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-2 border rounded"
      />
    </div>
  );
}
