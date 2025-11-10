import React, { useState } from 'react';

const UpdateJob = () => {
    const [selectedCategory, setSelectedCategory] = useState('');

    const categories = [
        'Web Development',
        'Graphic Design',
        'Digital Marketing',
        'AI & ML',
    ];

    const handleOnSubmit = (e) => {
        e.preventDefault();

        if (selectedCategory === "Select Category") {
            return alert('Please select a category')
        };

        const title = e.target.title.value;
        const category = selectedCategory;
        const summary = e.target.summary.value;
        const coverImage = e.target.photo.value;
        const job = { title, category, summary, coverImage };
        console.log(job);

        // fetch('http://localhost:3000/jobs', {
        //     method: 'PUT',
        //     headers: {
        //         'content-type': 'application/json',
        //     },
        //     body: JSON.stringify(job)
        // });

        // e.target.reset();
        // setSelectedCategory("Select Category");
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
                    <input required type="text" name='title' className="input" placeholder="My awesome page" />

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
                    <textarea aria-required type="text" name='summary' className="textarea" placeholder="Job summary" />

                    <label className="label">Cover Image</label>
                    <input required type="text" name='photo' className="input" placeholder="Your cover image's URL" />

                    <button className="btn btn-neutral mt-4">Update</button>
                </fieldset>
            </form>
        </div>
    );
};

export default UpdateJob;