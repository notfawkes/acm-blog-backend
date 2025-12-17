

import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
// import useFetch from ".../services/useFetch"; 
// import useFetch from "@/services/useFetch";
import useFetch from "../services/useFetch"; 

const Blogdetail = () => {
    
    const { slug } = useParams(); 
    
    
    const { loading, error, data } = useFetch(
        import.meta.env.VITE_BACKEND_URL + "/blogs/" + slug
    );
    
    
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [slug]); 

    if (loading) return <p className="text-center p-8 text-2xl">Loading full article...</p>;
    
    
    if (error)
        return (
            <p className="text-center p-8 text-red-600 text-2xl font-bold">
                Error: Failed to load blog post. The post might not exist.
            </p>
        );
        
    
    if (!data) return null;

    
    const { 
        title, 
        largeImage, 
        smallDescription, 
        detailInfo, 
        authorName, 
        authorRole, 
        datePublished 
    } = data;

    
    const formattedDate = new Date(datePublished).toLocaleDateString('en-US', {
        year: 'numeric', month: 'long', day: 'numeric'
    });

    return (
        <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white pb-12">
            
            {/* Header and Banner Image */}
            <div className="w-full">
                <img
                    src={largeImage.url}
                    alt={title}
                    className="w-full max-h-[600px] object-cover object-center"
                />
            </div>

            {/* Content Area */}
            <div className="container mx-auto max-w-4xl px-4 mt-8">
                
                {/* Title and Metadata */}
                <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
                    {title}
                </h1>
                <div className="text-lg text-gray-600 dark:text-gray-400 mb-8 border-b pb-4">
                    <p>
                        By **{authorName}** ({authorRole})
                    </p>
                    <p className="text-sm mt-1">
                        Published on {formattedDate}
                    </p>
                </div>
                
                {/* Introduction/Small Description */}
                <p className="text-xl italic mb-12 bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                    {smallDescription}
                </p>
                
                {/* 4. Main Article Content (Mapping over the detailInfo array) */}
                <div className="space-y-12">
                    {detailInfo.map((info, index) => (
                        <div key={index}>
                            <h3 className="text-3xl font-bold mb-4 border-l-4 border-blue-500 pl-3">
                                {info.title}
                            </h3>
                            <p className="text-lg leading-relaxed text-justify">
                                {info.paragraph}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Blogdetail;