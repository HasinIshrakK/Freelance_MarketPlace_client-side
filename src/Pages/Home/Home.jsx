import React, { use } from 'react';
import Jobs from '../../Components/Jobs/Jobs';

const categories = [
    { name: "IT & Software", img: "/it.png" },
    { name: "Marketing & Sales", img: "/marketing.png" },
    { name: "Design & Creative", img: "/design.png" },
    { name: "Finance & Accounting", img: "/finance.jpg" },
    { name: "Customer Service", img: "/customer_care.jpg" },
    { name: "Engineering", img: "/engineering.jpg" }
];

const fetchJob = fetch('http://localhost:3000/jobs').then(res => res.json());

const Home = () => {
    const jobs = use(fetchJob);
    const sortedJobs = jobs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    return (
        <div className=''>
            Home

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