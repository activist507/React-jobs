import Jobs from '../jobs.json';
import type { Listing } from '../data/Joblisting';
import JobListing from './JobListing';


const JobListings = () => {
    const items: Listing[] = Jobs;
    const recentItems = items.slice(0,3);
  return (
    <section className="bg-blue-50 px-4 py-10">
        <div className="container-xl lg:container m-auto">
          <h2 className="text-3xl font-bold text-indigo-500 mb-6 text-center">
            Browse Jobs
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {
                recentItems.map( (job, index) => {
                    return (
                        <JobListing key={index} id={job.id} title={job.title} type={job.type} description={job.description} location={job.location} salary={job.salary}  />
                    );
                } ) 
            }

          </div>
        </div>
    </section>
  )
}

export default JobListings