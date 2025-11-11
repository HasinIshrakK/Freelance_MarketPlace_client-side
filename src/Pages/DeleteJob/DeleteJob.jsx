import React, { useContext, useEffect, useState } from 'react';
import Loader from '../../Components/Loader';
import { ThemeContext } from '../../Contexts/Theme';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router';

const DeleteJob = () => {
    const { themeMode } = useContext(ThemeContext)
    const [job, setJob] = useState(null);

    const navigate = useNavigate();

    const jobId = window.location.pathname.split("/").pop();

    useEffect(() => {
        const fetchJob = async () => {
            try {
                const res = await fetch(`http://localhost:3000/jobs/${jobId}`);
                const data = await res.json();

                setJob(data);
            } catch (err) {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: err.message || err,
                    theme: 'auto'
                });
            }
        };

        fetchJob();
    }, [jobId]);

    const del = () => {

        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: "btn btn-success ml-2 text-white",
                cancelButton: "btn btn-danger"
            },
            buttonsStyling: false
        });
        swalWithBootstrapButtons.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, cancel!",
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:3000/jobs/${jobId}`, {
                    method: 'DELETE',
                }).then(res => res.json())
                    .then(() => {
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: "Job deleted successfully",
                            showConfirmButton: false,
                            timer: 1500,
                            theme: 'auto'
                        });
                        navigate('/my-added-jobs')
                    })
                    .catch((err) => {
                        Swal.fire({
                            icon: "error",
                            title: "Oops...",
                            text: err.message || err,
                            theme: 'auto'
                        });
                    });
            } else if (
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire({
                    title: "Cancelled",
                    text: "Your job post is safe :)",
                    icon: "error"
                });
            }
        });
    }

    if (!job) return <Loader></Loader>

    return (
        <div className='flex justify-center items-center min-h-screen'>
            <div className={`shadow-lg rounded-xl md:w-96 overflow-hidden hover:border-4 hover:shadow-2xl min-h-[350px] transition-shadow duration-300 
      ${themeMode ? 'bg-white border-red-400' : 'bg-gray-800 border-red-600'}`}>
                {job.coverImage && (
                    <img
                        src={job.coverImage}
                        alt={job.title}
                        className="w-full h-40 object-cover"
                    />
                )}

                <div className="p-4 flex flex-col justify-between">
                    <h2 className={`text-xl font-semibold mb-1 
          ${themeMode ? 'text-gray-900' : 'text-white'}`}>
                        {job.title}
                    </h2>

                    <div className={`flex flex-wrap md:justify-between mb-6 items-center text-sm 
          ${themeMode ? 'text-gray-500' : 'text-gray-400'}`}>
                        <span className="mr-2 font-medium">{job.category}</span>
                        <span className="ml-2">
                            {new Date(job.createdAt).toLocaleDateString()}
                        </span>
                    </div>

                    <p className={`text-sm mb-4 line-clamp-3
          ${themeMode ? 'text-gray-700' : 'text-gray-300'}`}>
                        {job.summary}
                    </p>

                    <button onClick={del} className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md">
                        Delete
                    </button>
                    <Link to='/my-added-jobs'>
                        <button className="px-5 py-2 bg-black hover:bg-gray-700 text-white rounded-md w-full mt-2">
                            Go Back
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default DeleteJob;