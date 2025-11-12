import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router';
import { AuthContext } from '../../Contexts/AuthProvider'
import NoJobsFound from '../../Components/NoJobsFound';

const MyJobs = () => {
    const { user } = useContext(AuthContext);
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        if (!user?.email) return;

        fetch(`http://localhost:3000/my-jobs?email=${user.email}`)
            .then(res => res.json())
            .then(data => setJobs(data));
    }, [user]);

    return (<>
        {
            jobs.length ?
                <div className='space-y-6 grid grid-cols-1 my-10'>
                    {
                        jobs.map((job) => (
                            <div key={job._id} className="card lg:grid grid-cols-5 bg-base-100 shadow-sm border border-gray-200">
                                <figure className="col-span-2">
                                    <img
                                        src={job.coverImage}
                                        alt={job.title}
                                        className="h-full w-full object-cover"
                                    />
                                </figure>

                                <div className="card-body col-span-3">
                                    <h2 className="card-title">{job.title}</h2>

                                    <p className="text-gray-500 text-sm">
                                        {job.category} • Posted by {job.postedBy}
                                    </p>

                                    <p className="line-clamp-3 text-gray-600">
                                        {job.summary}
                                    </p>

                                    <p className="text-xs text-gray-400">
                                        Posted on: {new Date(job.createdAt).toLocaleDateString()}
                                    </p>

                                    <div className="card-actions justify-start sm:justify-end mt-3">
                                        <Link to={`/all-jobs/${job._id}`}>
                                            <button className="w-40 btn px-5 py-2 bg-black hover:bg-gray-950 text-white rounded-md">
                                                View Details
                                            </button>
                                        </Link>
                                        <Link to={`/update-job/${job._id}`}>
                                            <button className="w-40 btn px-5 py-2 bg-gray-700 hover:bg-gray-800 text-white rounded-md"
                                            >
                                                Edit Job
                                            </button>
                                        </Link>
                                        <Link to={`/delete-job/${job._id}`}>
                                            <button className="w-40 btn px-5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md"
                                            >
                                                Delete Job
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
                :
                <NoJobsFound></NoJobsFound>
        }
    </>
    );
};

export default MyJobs;