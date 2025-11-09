import React, { use } from 'react';
import Jobs from '../../Components/Jobs/Jobs';

const fetchJob = fetch('http://localhost:3000/jobs').then(res => res.json());

const Home = () => {
    const jobs = use(fetchJob);

    return (
        <div className=''>
            Home

            {
                jobs.map(job => <Jobs key={job._id} job={job}></Jobs>
                )
            }
        </div>
    );
};

export default Home;