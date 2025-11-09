import React from 'react';

const Jobs = ({ job }) => {

    return (
        <div className='p-4 border-2 rounded-2xl'>
            <h1>
                {job.title}
            </h1>
        </div>
    );
};

export default Jobs;