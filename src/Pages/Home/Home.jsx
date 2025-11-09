import React, { use } from 'react';
import Jobs from '../../Components/Jobs/Jobs';

const fetchJob = fetch('http://localhost:3000/jobs').then(res => res.json());

const Home = () => {
    const jobs = use(fetchJob);
    const sortedJobs = jobs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    return (
        <div className=''>
            Home

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-10'>
                {
                    sortedJobs.slice(0, 6).map(job => <Jobs key={job._id} job={job}></Jobs>
                    )
                }
            </div>
        </div>
    );
};

export default Home;