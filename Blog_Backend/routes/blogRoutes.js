

// const express = require('express');
// const router = express.Router();
// const Blog = require('../models/Blog'); 


// router.get('/', async (req, res) => {
//     try {
//         const blogs = await Blog.find()
//             .select('_id title authorName authorRole image slug') 
//             .sort({ datePublished: -1 }); 
//         res.status(200).json(blogs);
//     } catch (err) {
//         res.status(500).json({ message: 'Error fetching blogs' });
//     }
// });


// router.get('/:slug', async (req, res) => {
//     try {
//         const blog = await Blog.findOne({ slug: req.params.slug });
//         if (!blog) { return res.status(404).json({ message: 'Blog post not found' }); }
//         res.status(200).json(blog);
//     } catch (err) {
//         res.status(500).json({ message: 'Error fetching blog post' });
//     }
// });



// module.exports = router;




const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog'); 


router.get('/', async (req, res) => {
    try {
        // FIX: Added 'smallDescription' to the select list. 
        // This ensures the frontend gets the data needed for the card summary.
        const blogs = await Blog.find()
            .select('_id title authorName authorRole image slug smallDescription') 
            .sort({ datePublished: -1 }); 
        res.status(200).json(blogs);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching blogs' });
    }
});


router.get('/:slug', async (req, res) => {
    try {
        // FIX: Removed .select() here. 
        // The detail page needs ALL fields (smallDescription, largeImage, detailInfo) 
        // to render the full content, so we fetch everything.
        const blog = await Blog.findOne({ slug: req.params.slug });
        if (!blog) { return res.status(404).json({ message: 'Blog post not found' }); }
        res.status(200).json(blog);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching blog post' });
    }
});


module.exports = router;
