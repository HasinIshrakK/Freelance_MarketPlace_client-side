import React, { useContext } from 'react';
import { ThemeContext } from '../../Contexts/Theme';
import { Link } from 'react-router';

const Jobs = ({ job }) => {

    const { themeMode } = useContext(ThemeContext);

    return (
        <div className={`shadow-lg rounded-xl overflow-hidden hover:border-4 hover:shadow-2xl min-h-[350px] transition-shadow duration-300 
      ${themeMode ? 'bg-white border-blue-400' : 'bg-gray-800 border-blue-600'}`}>
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

                <Link to={`/all-jobs/${job._id}`}>
                    <button className="mt-auto w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200">
                        View Details
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default Jobs;