import React, { use } from 'react';
import Jobs from '../../Components/Jobs/Jobs';
import { motion } from "framer-motion";
import SearchBar from '../../Components/SearchBar';
import { Link } from 'react-router';
import useAxios from '../../hooks/useAxios';

const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } },
};

const categories = [
    { name: "IT & Software", img: "/it.png" },
    { name: "Marketing & Sales", img: "/marketing.png" },
    { name: "Design & Creative", img: "/design.png" },
    { name: "Finance & Accounting", img: "/finance.jpg" },
    { name: "Customer Service", img: "/customer_care.jpg" },
    { name: "Engineering", img: "/engineering.jpg" }
];

const axiosSecure = useAxios();

const jobsPromise = axiosSecure.get('/jobs');

const Home = () => {

    const jobsData = use(jobsPromise);
    const jobs = jobsData.data;
    const sortedJobs = jobs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    return (
        <div className=''>
            <div className='md:relative'>
                <div className='overflow-hidden rounded-t-2xl md:my-10 mt-4'>
                    <div className='overflow-hidden ml-[-50%]'>
                        <img className='md:rounded-2xl rounded-t-2xl' src="/banner.jpg" alt="Banner" />
                    </div>
                </div>
                <section className="hero flex flex-col items-center text-center bg-cyan-700 md:bg-transparent px-3
                md:py-20 sm:py-10 py-6 md:absolute text-white text-shadow-cyan-800 text-shadow-sm 
                -inset-y-10 lg:-inset-y-8 2xl:inset-y-0 left-8 md:items-start md:text-left md:w-1/2">
                    <motion.h1
                        variants={fadeUp}
                        initial="hidden"
                        animate="visible"
                        className="lg:text-4xl text-3xl font-bold"
                    >
                        Connecting Talent with Opportunity
                    </motion.h1>

                    <motion.p
                        variants={fadeUp}
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: 0.2 }}
                        className="mt-4 lg:text-lg text-base max-w-xl font-semibold w-4/5"
                    >
                        Freelance MarketPlace helps Freelancers find projects they love and Hirers find the perfect fit — faster, smarter, and simpler.
                    </motion.p>

                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: 0.4 }}
                        className="mt-6 xl:flex md:hidden flex gap-4"
                    >
                        <SearchBar></SearchBar>
                    </motion.div>

                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: 0.4 }}
                        className="mt-6 gap-4 flex"
                    >
                        <Link to='/all-jobs'>
                            <button className="btn btn-primary">Find Jobs</button>

                        </Link>
                        <Link to='/add-job'>
                            <button className="btn btn-outline border-2">Post a Job</button>

                        </Link>
                    </motion.div>
                </section>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-10'>
                {
                    sortedJobs.slice(0, 6).map(job => <Jobs key={job._id} job={job}></Jobs>
                    )
                }
            </div>

            <section className="py-12">
                <h2 className="text-3xl font-bold text-center mb-8">Top Categories</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                    {categories.map((cat, index) => (
                        <div
                            key={index}
                            className="border rounded-lg shadow hover:shadow-lg transition p-4 flex flex-col items-center"
                        >
                            <img
                                src={cat.img}
                                alt={cat.name}
                                className="w-24 h-24 object-cover rounded-full mb-4"
                            />
                            <h3 className="text-xl font-semibold">{cat.name}</h3>
                        </div>
                    ))}
                </div>
            </section>

            <section className="py-12 bg-gray-400 text-gray-100 my-10">
                <div className="max-w-4xl mx-auto text-center px-4">
                    <h2 className="text-3xl font-bold mb-4 text-white">About Freelance MarketPlace</h2>

                    <p className="leading-relaxed mb-4">
                        Finding the right job is hard; we make it simple. Freelance MarketPlace connects
                        skilled professionals with verified employers, offering a fast and
                        transparent hiring experience.
                    </p>

                    <p className="leading-relaxed mb-6">
                        Whether you're exploring new opportunities or posting a job, we help
                        you bridge the gap.
                    </p>

                    <a
                        href="/all-jobs"
                        className="inline-block bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
                    >
                        Browse Jobs
                    </a>
                </div>
            </section>


        </div>
    );
};

export default Home;