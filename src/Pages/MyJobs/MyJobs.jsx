import React, { use } from 'react';
import { Link } from 'react-router';

const fetchJob = fetch('http://localhost:3000/jobs').then(res => res.json());

const MyJobs = () => {

    const jobs = use(fetchJob);

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

                            <div className="card-actions justify-end mt-3">
                                <Link to={`/all-jobs/${job._id}`}>
                                    <button className="btn btn-neutral">
                                        View Details
                                    </button>
                                </Link>
                                <Link to={`/delete-job/${job._id}`}>
                                    <button
                                        className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md"
                                    >
                                        Delete Job
                                    </button>
                                </Link>
                                <Link to={`/update-job/${job._id}`}>
                                    <button
                                        className="px-5 py-2 bg-gray-700 hover:bg-gray-800 text-white rounded-md"
                                    >
                                        Edit Job
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