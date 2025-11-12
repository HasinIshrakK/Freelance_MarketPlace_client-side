import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Contexts/AuthProvider'
import Swal from 'sweetalert2';
import Loader from '../../Components/Loader';
import NoJobsFound from '../../Components/NoJobsFound';

const AcceptedJobs = () => {
    const { user } = useContext(AuthContext);
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        if (!user?.email) return;

        fetch(`http://localhost:3000/my-accepted-jobs?email=${user.email}`)
            .then(res => res.json())
            .then(data => setJobs(data));
    }, [user]);

    const handleDone = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, it is done!"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:3000/accepted-jobs/${id}`, {
                    method: 'DELETE',
                }).then(res => res.json())
                    .then(() => {
                        setJobs(prevJobs => prevJobs.filter(job => job._id !== id));
                        Swal.fire({
                            title: "Job Done!",
                            text: "The job is completed.",
                            icon: "success",
                            theme: 'auto'
                        });
                    })
                    .catch((err) => {
                        Swal.fire({
                            icon: "error",
                            title: "Oops...",
                            text: err.message || err,
                            theme: 'auto'
                        });
                    });
            }
        });
    };

    const handleCancel = (id) => {
        fetch(`http://localhost:3000/accepted-jobs/${id}`, {
            method: 'DELETE',
        }).then(res => res.json())
            .then(() => {
                setJobs(prevJobs => prevJobs.filter(job => job._id !== id));
                Swal.fire({
                    title: "Job Canceled!",
                    icon: "info",
                    draggable: true,
                    theme: 'auto'
                });
            })
            .catch((err) => {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: err.message || err,
                    theme: 'auto'
                });
            });

    }

    if (!jobs || !user) return <Loader></Loader>

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
                                        <button onClick={() => handleDone(job._id)} className="w-40 btn px-5 py-2 bg-gray-700 hover:bg-gray-800 text-white rounded-md"
                                        >
                                            Done
                                        </button>
                                        <button onClick={() => handleCancel(job._id)} className="w-40 btn px-5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
                :
                <NoJobsFound></NoJobsFound>
        }</>
    );
};

export default AcceptedJobs;