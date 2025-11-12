import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router';
import { AuthContext } from '../../Contexts/AuthProvider'

const MyJobs = () => {
    const { user } = useContext(AuthContext);
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        if (!user?.email) return;

        fetch(`http://localhost:3000/my-jobs?email=${user.email}`)
            .then(res => res.json())
            .then(data => setJobs(data));
    }, [user]);

    return (

        <div className='space-y-6 grid grid-cols-1 my-10'>
            {
                jobs.map((job) => (
                    <div className="card lg:card-side bg-base-100 shadow-sm border border-gray-200">
                        <figure className="w-full lg:w-1/3">
                            <img
                                src={job.coverImage}
                                alt={job.title}
                                className="h-full w-full object-cover"
                                onError={(e) => (e.target.src = fallback)}
                            />
                        </figure>

                        <div className="card-body">
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
                                    <button className="w-40 btn px-5 py-2 border-red-900 bg-black hover:bg-gray-950 text-white rounded-md">
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

    );
};

export default MyJobs;