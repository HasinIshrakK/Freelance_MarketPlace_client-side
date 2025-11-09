import React from 'react';

const AddJobs = () => {
    return (
        <div className='min-h-screen flex flex-col md:flex-row md:gap-x-20 justify-center items-center'>
            <div className="text-center">
                <h1 className="text-5xl font-bold">Post now!</h1>
                <p className="py-6">
                    Let's hire the most skilled person
                </p>
            </div>
            <form>
                <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
                    <legend className="fieldset-legend">Job details</legend>

                    <label className="label">Title</label>
                    <input type="text" className="input" placeholder="My awesome page" />

                    <label className="label">Name</label>
                    <input type="text" name='name' className="input" placeholder="Your Name" />

                    <label className="label">Category</label>
                    <input type="text" name='cat' className="input" placeholder="Your Category" />

                    <label className="label">Summary</label>
                    <input type="text" name='summary' className="input" placeholder="Job summary" />

                    <label className="label">Photo-URL</label>
                    <input type="text" name='photo' className="input" placeholder="Your Photo's URL" />

                    <label className="label">Email</label>
                    <input type="email" name='email' className="input" placeholder="Your Email" />
                    
                    <button className="btn btn-neutral mt-4">Post</button>
                </fieldset>
            </form>
        </div>
    );
};

export default AddJobs;