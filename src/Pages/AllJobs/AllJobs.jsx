import React, { use, useState } from 'react';
import Jobs from '../../Components/Jobs/Jobs';

const fetchJob = fetch('http://localhost:3000/jobs').then(res => res.json());

const AllJobs = () => {

    const jobs = use(fetchJob);
    const sortedJobsA = [...jobs].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    const sortedJobsD = [...jobs].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

    const [a, setA] = useState(jobs);

    return (
        <div>
            <h2 className='text-center my-6 font-bold text-3xl'>
                All Jobs Are Here
            </h2>
            <div className='flex justify-between items-center'>
                <h3 className='font-semibold text-xl'>Total Jobs: {
                    a.length
                }</h3>
                <div className="dropdown dropdown-left justify-end dropdown-hover">
                    <div tabIndex={0} role="button" className="btn m-1">Sort</div>
                    <ul tabIndex="-1" className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                        <li onClick={() => setA(sortedJobsA)}><a>Newest First</a></li>
                        <li onClick={() => setA(sortedJobsD)}><a>Oldest First</a></li>
                    </ul>
                </div>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-10'>
                {
                    a.map(job => <Jobs key={job._id} job={job}></Jobs>
                    )
                }
            </div>
        </div>
    );
};

export default AllJobs;