

import React from "react";
// import useFetch from ".../services/useFetch"; 
// import useFetch from "@/services/useFetch";
import useFetch from "../services/useFetch"; 
import { Link } from "react-router-dom";
import { motion } from "framer-motion"; 

const Blogpost = () => {
    
    const {
        data: blogs, 
        loading,
        error,
    } = useFetch(import.meta.env.VITE_BACKEND_URL + "/blogs"); 

    if (loading) return <div className="text-center py-8 text-xl font-semibold">Loading blog posts...</div>;
    if (error) return <div className="text-center py-8 text-red-500 text-xl font-semibold">Error fetching data: {error.message}</div>;

    
    const cardVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <div className="container mx-auto py-8 sm:py-12 px-4">
            <h1 className="text-gray-800 dark:text-white text-center text-4xl sm:text-5xl font-bold mb-10 pb-6 border-b-2 border-gray-300">
                Our Latest Blogs
            </h1>

            {/* Grid for Blog Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogs && blogs.length > 0 ? (
                    blogs.map((blog) => (
                        <Link
                            
                            to={`/blog/${blog.slug}`} 
                            key={blog._id} // MongoDB's unique ID
                            className="flex justify-center"
                        >
                            <motion.div
                                className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-2xl transition-transform duration-300 hover:scale-[1.03] w-full max-w-sm"
                                variants={cardVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.2 }}
                                transition={{ duration: 0.5 }}
                            >
                                {/* Blog Image */}
                                <img
                                    src={blog.image.url}
                                    alt={blog.title}
                                    className="w-full h-56 object-cover"
                                    loading="lazy"
                                />
                                
                                {/* Text Content (matches your visual design) */}
                                <div className="p-5">
                                    <h2 className="text-xl font-extrabold text-gray-900 dark:text-white mb-2 line-clamp-2">
                                        {blog.title}
                                    </h2>
                                    <p className="text-base font-semibold text-blue-600">
                                        {blog.authorName}
                                    </p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                        {blog.authorRole}
                                    </p>
                                </div>
                            </motion.div>
                        </Link>
                    ))
                ) : (
                    <p className="col-span-full text-center text-gray-500 text-lg">No blog posts found.</p>
                )}
            </div>
        </div>
    );
};

export default Blogpost;