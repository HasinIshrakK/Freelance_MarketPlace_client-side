import React, { use } from 'react';
import Jobs from '../../Components/Jobs/Jobs';

const fetchJob = fetch('http://localhost:3000/jobs').then(res => res.json());

const AllJobs = () => {

    const jobs = use(fetchJob);

    return (
        <div>
<h2 className='text-center mt-6 font-bold text-3xl'>
    All Jobs Are Here
</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-10'>
                {
                    jobs.map(job => <Jobs key={job._id} job={job}></Jobs>
                    )
                }
            </div>
        </div>
    );
};

export default AllJobs;