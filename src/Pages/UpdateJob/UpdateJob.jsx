import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useNavigate } from 'react-router';

const UpdateJob = () => {
    const [selectedCategory, setSelectedCategory] = useState("");
    const [job, setJob] = useState(null);

    const navigate = useNavigate();

    const axiosSecure = useAxiosSecure();

    const categories = [
        'Web Development',
        'Graphic Design',
        'Digital Marketing',
        'AI & ML',
    ];

    const jobId = window.location.pathname.split("/").pop();

    useEffect(() => {
        const jobPromise = async () => {
            try {
                const { data } = await axiosSecure.get(`/jobs/${jobId}`);
                setJob(data);
                setSelectedCategory(data?.category);
            } catch (err) {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: err.message || err,
                    theme: 'auto'
                });
            }
        };

        jobPromise();
    }, [jobId]);

    const handleOnSubmit = (e) => {
        e.preventDefault();

        if (selectedCategory === "Select Category") {
            return Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Please select a category!",
                theme: 'auto'
            });
        };

        const title = e.target.title.value;
        const category = selectedCategory;
        const summary = e.target.summary.value;
        const coverImage = e.target.photo.value;

        const updatedJob = { title, category, summary, coverImage };

        axiosSecure.patch(`/jobs/${jobId}`, updatedJob)
            .then(() => {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Job updated successfully",
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

        e.target.reset();
        setSelectedCategory("Select Category");
        setJob(null);
    };

    return (
        <div className='min-h-screen flex flex-col md:flex-row md:gap-x-20 justify-center items-center'>
            <div className="text-center">
                <h1 className="text-5xl font-bold">Update you post!</h1>
                <p className="py-6">
                    Let's make the best deal
                </p>
            </div>
            <form onSubmit={handleOnSubmit}>
                <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
                    <legend className="fieldset-legend">Job details</legend>

                    <label className="label">Title</label>
                    <input required type="text" name='title' className="input" defaultValue={job?.title} placeholder='Job post title' />

                    <label className="label">Category</label>
                    <div className="dropdown dropdown-end w-full font-normal">
                        <button tabIndex={0} className="btn w-full bg-base-100 border border-gray-300 font-normal justify-between">
                            {selectedCategory || "Select Category"}
                            <svg className="h-4 w-4 opacity-60" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>

                        <ul tabIndex={0} className="dropdown-content menu bg-base-100 border border-gray-300 rounded-box w-full mt-1 shadow">
                            {categories.map((cat) => (
                                <li key={cat}>
                                    <button type="button" className="text-left" onClick={() => setSelectedCategory(cat)}>
                                        {cat}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>


                    <label className="label">Summary</label>
                    <textarea aria-required type="text" name='summary' className="textarea" defaultValue={job?.summary} placeholder="Job summary" />

                    <label className="label">Cover Image</label>
                    <input required type="text" name='photo' className="input" defaultValue={job?.coverImage} placeholder="Your cover image's URL" />

                    <button className="btn btn-neutral mt-4">Update</button>
                </fieldset>
            </form>
        </div>
    );
};

export default UpdateJob;