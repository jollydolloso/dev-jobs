import AddJob from "./components/job/add";
import JobList from "./components/job/list";
import { SearchJob } from "./components/job/search";
import { SearchJobsProvider } from "./context/SearchJobsContext";

export default function Home() {
  return (
    <>
    
      <AddJob />
      <SearchJobsProvider>
      <SearchJob />
        <JobList />
      </SearchJobsProvider>
    </>
  );
}
