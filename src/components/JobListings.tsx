import { useEffect, useState } from 'react';
import { API } from "../constants/api";
import type { Listing } from "../data/Listing";
import JobListing from "./JobListing";
import Loading from './Loading';


interface Props {
  title: string;
  isHome: boolean;
}

const JobListings = ({ title, isHome }: Props) => {
  const [jobs, setJobs] = useState<Listing[]>([]);
  const [isLoading,setIsLoading] = useState(true);
  const [error,setError] = useState<string | null>(null);
  
  useEffect( () => {
    const controller = new AbortController();

    const url = isHome ? `${API.baseURL}/jobs?_per_page=3&_page=1` : `${API.baseURL}/jobs`;
    const fetchJobs = async () => {
      try {
        const res = await fetch( url,{ signal: controller.signal } );

        if(!res.ok){
          throw new Error( `HTTP error ! Status: ${res.status}` );
        }

        
        const json = await res.json();
        const data: Listing[] = ( isHome ) ? json.data : json ;
        setJobs( data );

      } catch( err ){
        if ( err instanceof DOMException && err.name == "AbortError" ) return;
        setError( err instanceof Error ? err.message : "Something went wrong" );
      }
    }
    fetchJobs();

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => {
      controller.abort();
      clearTimeout( timer )
    }
  },[ isHome ]);

  if( isLoading ) return <Loading name='infinityspin' />;
  if( error ) return <p>Error: {error}</p>;
    
  return (
    <section className="bg-blue-50 px-4 py-10">
      <div className="container-xl lg:container m-auto">
        <h2 className="text-3xl font-bold text-indigo-500 mb-6 text-center">
          {title}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {jobs.map((job, index) => {
            return (
              <JobListing
                key={index}
                id={job.id}
                title={job.title}
                type={job.type}
                description={job.description}
                location={job.location}
                salary={job.salary}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default JobListings;
