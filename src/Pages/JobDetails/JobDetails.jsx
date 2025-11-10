import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function JobDetails() {
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const jobId = window.location.pathname.split("/").pop();

    useEffect(() => {
        const fetchJob = async () => {
            try {
                const res = await fetch(`http://localhost:3000/jobs/${jobId}`);
                const data = await res.json();
                setJob(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchJob();
    }, [jobId]);

    if (loading) return <div className="p-6 text-center text-lg">Loading job details...</div>;
    if (error) return <div className="p-6 text-red-500 text-center">{error}</div>;
    if (!job) return <div className="p-6 text-center text-gray-500">Job not found</div>;


    const handleAccept = () => {
        Swal.fire({
            title: "Job Accepted!",
            icon: "success",
            draggable: true,
            theme: 'auto'
        });
    };

    const handleContact = () => {
        Swal.fire({
            title: `${job.postedBy}`,
            icon: "info",
            html: `Contact Email: <u>${job.userEmail}</u>  `,
            showCloseButton: true,
            focusConfirm: false,
            confirmButtonText: `
    <i class="fa fa-thumbs-up"></i> Great!
  `,
            theme: 'auto'
        });
    };

    return (
        <div className="max-w-3xl mx-auto my-10 p-6 shadow-md rounded-lg border">
            <img
                src={job.coverImage}
                alt={job.title}
                className="w-full h-64 object-cover rounded-md mb-6"
                onError={(e) => (e.target.src = fallbackImage)}
            />

            <h1 className="text-3xl font-bold mb-3">{job.title}</h1>

            <p className="text-gray-500 text-sm mb-1">
                Category: <span className="font-medium">{job.category}</span>
            </p>

            <p className="text-gray-500 text-sm mb-1">
                Posted By: <span className="font-medium">{job.postedBy}</span>
            </p>

            <p className="text-gray-500 text-sm mb-4">
                Email: <span className="font-medium">{job.userEmail}</span>
            </p>

            <p className="text-gray-500 text-sm mb-6">
                Posted On:{" "}
                <span className="font-medium">
                    {new Date(job.createdAt).toLocaleDateString()}
                </span>
            </p>

            <div>
                <h2 className="text-xl font-semibold mb-2">Job Summary</h2>
                <p className="leading-7 text-gray-500">{job.summary}</p>
            </div>

            <div className="flex flex-wrap gap-3 border-t pt-6 mt-6">
                <button
                    onClick={handleAccept}
                    className="px-5 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md"
                >
                    Accept Job
                </button>

                <button
                    onClick={handleContact}
                    className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
                >
                    Contact Poster
                </button>
            </div>
        </div>
    );
};
